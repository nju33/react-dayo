import React from 'react';
import {SeedFactoryImpl, SeedImpl} from '../seed';
import Queue from '../components/queue';
import Box from '../components/box';

enum DispatcherEventName {
  UpdateSeed,
  DoneSeed,
}

class Dispatcher {
  private events = new Map<
    DispatcherEventName,
    ((seedOnCycle: SeedImpl) => void)[]
  >();

  public dispatch = (
    seedFactory: SeedFactoryImpl,
  ): (() => Promise<void>) => async (): Promise<void> => {
    const seed = seedFactory.createSeed();
    for await (const seedOnCycle of seed) {
      this.emit(DispatcherEventName.UpdateSeed, seedOnCycle);
    }

    this.emit(DispatcherEventName.DoneSeed, seed);
  };

  public emit(event: DispatcherEventName, seedOnCycle: SeedImpl): void {
    const callbacks = this.events.get(event);
    if (callbacks === undefined) {
      return;
    }

    callbacks.forEach(
      (callback): void => {
        callback(seedOnCycle);
      },
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public on(event: DispatcherEventName, cb: (resource: any) => void): void {
    if (!this.events.has(event)) {
      this.events.set(event, [cb]);
      return;
    }

    const callbacks = this.events.get(event);
    if (callbacks === undefined) {
      throw new Error('strangely the `callbacks` is undefined');
    }

    callbacks.push(cb);

    this.events.set(event, callbacks);
  }
}

interface DayoImpl {
  dispatcher: Dispatcher;
}

export const createDayo = (): [
  React.ComponentClass,
  Dispatcher['dispatch']
] => {
  const dispatcher = new Dispatcher();

  class Dayo extends React.Component<{}> implements DayoImpl {
    public dispatcher = dispatcher;

    public state = {
      queue: [] as SeedImpl[],
    };

    private rewriteQueueItem(seedOnCycle: SeedImpl): void {
      const targetIndex = this.state.queue.findIndex(
        (item): boolean => {
          return item.id === seedOnCycle.id;
        },
      );

      if (targetIndex === -1) {
        return;
      }

      const {queue} = this.state;
      queue[targetIndex] = seedOnCycle;

      this.setState({queue});
    }

    public componentDidMount(): void {
      dispatcher.on(
        DispatcherEventName.UpdateSeed,
        (seedOnCycle: SeedImpl): void => {
          if (seedOnCycle.cycle.isEnter()) {
            this.addAlert(seedOnCycle);
            return;
          }

          // console.log('UpdateSeed', {
          //   isEnter: seedOnCycle.cycle.isEnter(),
          //   isEntering: seedOnCycle.cycle.isEntering(),
          //   isEntered: seedOnCycle.cycle.isEntered(),
          //   isExit: seedOnCycle.cycle.isExit(),
          // });

          return this.rewriteQueueItem(seedOnCycle);
        },
      );

      dispatcher.on(
        DispatcherEventName.DoneSeed,
        (seed: SeedImpl): void => {
          const {queue} = this.state;
          const nextQueue = queue.filter(
            (item): boolean => {
              return item.id !== seed.id;
            },
          );

          this.setState({queue: nextQueue});
        },
      );
    }

    public addAlert(seedOnCycle: SeedImpl): void {
      const overflowLength =
        this.state.queue.length < 10 ? 0 : this.state.queue.length - 10;

      this.setState({
        queue: [...this.state.queue, seedOnCycle],
      });

      if (overflowLength > 0) {
        this.state.queue.slice(0, overflowLength).forEach(
          (seedOnCycle): void => {
            seedOnCycle.cycle.proceed();
          },
        );
      }
    }

    private onTransitionEnd(seedOnCycle: SeedImpl): () => void {
      return (): void => {
        if (
          seedOnCycle.cycle.isEnter() ||
          seedOnCycle.cycle.isEntered() ||
          seedOnCycle.cycle.isExit() ||
          seedOnCycle.cycle.isExited()
        ) {
          return;
        }

        if (seedOnCycle.cycle.isEntering() || seedOnCycle.cycle.isExiting()) {
          seedOnCycle.cycle.proceed();
        }
      };
    }

    public render(): JSX.Element {
      return (
        <Queue>
          {this.state.queue.map(
            (seedOnCycle): JSX.Element => {
              return (
                <Box
                  key={seedOnCycle.id}
                  theme={seedOnCycle.theme}
                  isEnter={seedOnCycle.cycle.isEnter()}
                  isEntering={seedOnCycle.cycle.isEntering()}
                  isEntered={seedOnCycle.cycle.isEntered()}
                  isExit={seedOnCycle.cycle.isExit()}
                  isExiting={seedOnCycle.cycle.isExiting()}
                  isExited={seedOnCycle.cycle.isExited()}
                  onTransitionEnd={this.onTransitionEnd(seedOnCycle)}
                >
                  <div>{seedOnCycle.message}</div>
                </Box>
              );
            },
          )}
        </Queue>
      );
    }
  }

  return [Dayo, dispatcher.dispatch];
};
