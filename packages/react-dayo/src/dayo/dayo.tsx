import React from 'react';
import {DayoOptions, DayoProps} from './interfaces';
import {IDayo} from './interfaces';
import {ISeed} from '../entities/seed';
import Dispatcher, {Event as DispatcherEvent} from '../use-cases/dispatcher';
import Queue from '../components/queue';
import Box from '../components/box/box';

export const defaultOptions = {
  to: 'top' as DayoOptions['to'],
  position: 'center' as DayoOptions['position'],
  maxLength: 5,
};

/**
 * To create the `Dayo` component and also`dispatch` function to pass a seed into `Dayo`
 */
export const createDayo = <
  BlockComponentProps extends object = {},
  BCP extends BlockComponentProps = BlockComponentProps
>(
  userOptions: Partial<DayoOptions> = {},
): [React.ComponentClass<Partial<DayoProps>>, Dispatcher['dispatch']] => {
  const options: DayoOptions = {...defaultOptions, ...userOptions};
  const dispatcher = new Dispatcher();

  /**
   * Interface
   */
  class Dayo extends React.Component<Partial<DayoProps>>
    implements IDayo<ISeed<BCP>> {
    public static defaultProps = options;

    public dispatcher = dispatcher;

    public state = {
      queue: [] as ISeed<BCP>[],
    };

    /**
     * To just return `option`
     */
    private getOption<Key extends keyof DayoProps>(key: Key): DayoProps[Key] {
      return (
        ((this.props as unknown) as DayoProps)[key] ||
        ((options as unknown) as DayoProps)[key]
      );
    }

    /**
     * To refresh all items of queue for re-rendering
     */
    private rewriteQueueItem(seedOnCycle: ISeed<BCP>): void {
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

    /**
     * To be called when rendered in the dom
     */
    public componentDidMount(): void {
      dispatcher.on(DispatcherEvent.UpdateSeed, this.handleUpdateSeed);
      dispatcher.on(DispatcherEvent.DoneSeed, this.handleDoneSeed);
    }

    /**
     * To be called when the cycle step is updated
     *
     * if the step of current is 'enter' then addind it into the queue,
     * or else just re-rendering with new state
     *
     */
    private handleUpdateSeed = (seedOnCycle: ISeed<BCP>): void => {
      if (seedOnCycle.cycle.isEnter()) {
        this.addAlert(seedOnCycle);
        return;
      }

      return this.rewriteQueueItem(seedOnCycle);
    };

    /**
     * To be called when the cycle step is ended for removing a ended seed from the queue
     */
    private handleDoneSeed = (seed: ISeed<BCP>): void => {
      const {queue} = this.state;
      const nextQueue = queue.filter(
        (item): boolean => {
          return item.id !== seed.id;
        },
      );

      this.setState({queue: nextQueue});
    };

    /**
     * To add new seed into the queue;
     */
    private addAlert(seedOnCycle: ISeed<BCP>): void {
      this.setState({
        queue: [...this.state.queue, seedOnCycle],
      });

      this.closeOverflowSeeds();
    }

    /**
     * To close seeds overlowed
     */
    private closeOverflowSeeds(): void {
      const queueMaxLength = this.getOption('maxLength');
      const enteredItems = this.state.queue.filter(
        (item): boolean => item.cycle.isEntering() || item.cycle.isEntered(),
      );
      const newItemLength = 1;

      const overflowLength =
        enteredItems.length + newItemLength - queueMaxLength;

      if (overflowLength > 0) {
        enteredItems.slice(0, overflowLength).forEach(
          (seedOnCycle): void => {
            seedOnCycle.cycle.skip();
          },
        );
      }
    }

    /**
     * Advance to the next cycle step at the css animation ended
     */
    private onTransitionEnd(seedOnCycle: ISeed<BCP>): () => void {
      return (): void => {
        if (seedOnCycle.cycle.isEntering()) {
          seedOnCycle.cycle.proceed();
          return;
        }

        if (seedOnCycle.cycle.isExiting()) {
          seedOnCycle.cycle.proceed();
        }
      };
    }

    /**
     * To just render component
     */
    public render(): JSX.Element {
      return (
        <Queue to={this.getOption('to')} position={this.getOption('position')}>
          {this.state.queue.map(
            (seedOnCycle): JSX.Element => {
              if (seedOnCycle.values === undefined) {
                throw new Error('Unexpected error');
              }

              return (
                <Box
                  key={seedOnCycle.id}
                  to={this.getOption('to')}
                  BlockComponent={seedOnCycle.BlockComponent}
                  additionalProps={seedOnCycle.values.props}
                  theme={seedOnCycle.theme}
                  close={seedOnCycle.close}
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
