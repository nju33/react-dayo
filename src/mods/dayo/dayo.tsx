import React from 'react';
import {SeedImpl} from '../seed';
import Cycle from '../cycle';
import Queue from '../components/queue';
// import {Alert} from './alert';

enum DispatcherEventName {
  UpdateState,
}

class Dispatcher {
  private events = new Map<DispatcherEventName, ((state: object) => void)[]>();

  public dispatch = (
    seed: SeedImpl,
  ): (() => Promise<void>) => async (): Promise<void> => {
    for await (const state of seed) {
      this.emit(DispatcherEventName.UpdateState, state);
    }

    // this.emit(DispatcherEventName.Show, seed);
  };

  public emit(event: DispatcherEventName, state: object): void {
    const callbacks = this.events.get(event);
    if (callbacks === undefined) {
      return;
    }

    callbacks.forEach(
      (callback): void => {
        callback(state);
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

// const Alert: React.FC<{}> = (props): JSX.Element => {
//   return (
//     <div></div>
//   )
// }

export const createDayo = (): [
  React.ComponentClass,
  Dispatcher['dispatch']
] => {
  const dispatcher = new Dispatcher();

  class Dayo extends React.Component<{}> implements DayoImpl {
    public dispatcher = dispatcher;

    public state = {
      queue: [] as {id: string; cycle: Cycle}[],
    };

    public componentDidMount(): void {
      dispatcher.on(
        DispatcherEventName.UpdateState,
        (state: {id: string; cycle: Cycle}): void => {
          if (state.cycle.isCreating()) {
            this.addAlert(state);
            return;
          }

          if (state.cycle.isCreated()) {
            console.log(state);
            console.log(1);
            return;
          }

          console.log(9);
        },
      );
    }

    public addAlert(state: {id: string; cycle: Cycle}): void {
      this.setState({
        queue: [...this.state.queue, state],
      });
    }

    // public createAlert(seed: SeedImpl): void {
    //   this.setState({
    //     queue: [...this.state.queue, seed],
    //   });
    // }

    public render(): JSX.Element {
      // eslint-disable-next-line react/prop-types
      return (
        <Queue>
          {this.state.queue.map(
            (item): any => {
              return <div key={Math.random()}>aa</div>;
            },
          )}
        </Queue>
      );
    }
  }

  return [Dayo, dispatcher.dispatch];
};

// (
//   <Dayo>
//     {/* ... */}
//       <button onClick={dispatch(log)}>button</button>
//     {/* ... */}
//   </Dayo>
// )
