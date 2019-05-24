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

export interface DayoProps {
  maxLength?: number;
}

export const createDayo = <BlockComponentAdditionalProps extends object = {}>(
  userOptions: Partial<DayoOptions> = {},
): [
  React.ComponentClass<DayoProps>,
  Dispatcher<BlockComponentAdditionalProps>['dispatch']
] => {
  const options: DayoOptions = {...defaultOptions, ...userOptions};

  const dispatcher = new Dispatcher<BlockComponentAdditionalProps>();

  class Dayo extends React.Component<DayoProps>
    implements
      DayoImpl<
        SeedFactoryImpl<BlockComponentAdditionalProps>,
        SeedImpl<BlockComponentAdditionalProps>
      > {
    public dispatcher = dispatcher;

    public state = {
      queue: [] as SeedImpl<BlockComponentAdditionalProps>[],
    };

    private rewriteQueueItem(
      seedOnCycle: SeedImpl<BlockComponentAdditionalProps>,
    ): void {
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

    private handleUpdateSeed = (
      seedOnCycle: SeedImpl<BlockComponentAdditionalProps>,
    ): void => {
      if (seedOnCycle.cycle.isEnter()) {
        this.addAlert(seedOnCycle);
        // this.closeOverflowSeeds();
        return;
      }

      return this.rewriteQueueItem(seedOnCycle);
    };

    private handleDoneSeed = (
      seed: SeedImpl<BlockComponentAdditionalProps>,
    ): void => {
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

    private addAlert(
      seedOnCycle: SeedImpl<BlockComponentAdditionalProps>,
    ): void {
      this.setState({
        queue: [...this.state.queue, seedOnCycle],
      });

      this.closeOverflowSeeds();
    }

    private closeOverflowSeeds(): void {
      const queueMaxLength = this.props.maxLength || 10;
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

    private onTransitionEnd(
      seedOnCycle: SeedImpl<BlockComponentAdditionalProps>,
    ): () => void {
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

    public render(): JSX.Element {
      return (
        <Queue to={options.to}>
          {this.state.queue.map(
            (seedOnCycle): JSX.Element => {
              return (
                <Box
                  key={seedOnCycle.id}
                  to={options.to}
                  Block={seedOnCycle.Block}
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
