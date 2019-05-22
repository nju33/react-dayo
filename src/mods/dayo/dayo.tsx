import React from 'react';
import {DayoOptions, DayoOptionTo} from './dayo-impl';
import DayoImpl from './dayo-impl';
import {SeedFactoryImpl, SeedImpl} from '../seed';
import Dispatcher, {Event as DispatcherEvent} from '../dispatcher';

import Queue from '../components/queue';
import Box from '../components/box';

const defaultOptions = {
  to: 'top' as DayoOptionTo,
};

export const createDayo = (
  userOptions: Partial<DayoOptions> = {},
): [React.ComponentClass, Dispatcher['dispatch']] => {
  const options: DayoOptions = {...defaultOptions, ...userOptions};

  const dispatcher = new Dispatcher();

  class Dayo extends React.Component<{}>
    implements DayoImpl<SeedFactoryImpl, SeedImpl> {
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

    private handleUpdateSeed = (seedOnCycle: SeedImpl): void => {
      if (seedOnCycle.cycle.isEnter()) {
        this.addAlert(seedOnCycle);
        return;
      }

      return this.rewriteQueueItem(seedOnCycle);
    };

    private handleDoneSeed = (seed: SeedImpl): void => {
      const {queue} = this.state;
      const nextQueue = queue.filter(
        (item): boolean => {
          return item.id !== seed.id;
        },
      );

      this.setState({queue: nextQueue});
    };

    public componentDidMount(): void {
      dispatcher.on(DispatcherEvent.UpdateSeed, this.handleUpdateSeed);
      dispatcher.on(DispatcherEvent.DoneSeed, this.handleDoneSeed);
    }

    private addAlert(seedOnCycle: SeedImpl): void {
      const overflowLength =
        this.state.queue.length < 2 ? 0 : this.state.queue.length - 2;
      // this.state.queue.length < 10 ? 0 : this.state.queue.length - 10;

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

    private onClickCloseButton(seedOnCycle: SeedImpl): () => void {
      return (): void => {
        seedOnCycle.setCloseButtonClicked();
        seedOnCycle.cycle.proceed();
      };
    }

    public render(): JSX.Element {
      return (
        <Queue to={options.to}>
          {this.state.queue.map(
            (seedOnCycle): JSX.Element => {
              return (
                <Box
                  key={seedOnCycle.id}
                  to={options.to}
                  theme={seedOnCycle.theme}
                  isEnter={seedOnCycle.cycle.isEnter()}
                  isEntering={seedOnCycle.cycle.isEntering()}
                  isEntered={seedOnCycle.cycle.isEntered()}
                  isExit={seedOnCycle.cycle.isExit()}
                  isExiting={seedOnCycle.cycle.isExiting()}
                  isExited={seedOnCycle.cycle.isExited()}
                  onTransitionEnd={this.onTransitionEnd(seedOnCycle)}
                  closeButton={seedOnCycle.closeButton}
                  onClickCloseButton={this.onClickCloseButton(seedOnCycle)}
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
