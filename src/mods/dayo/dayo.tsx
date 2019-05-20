import React from 'react';
import {AlertImpl} from '../alert';
// import {Alert} from './alert';

enum DispatcherEventName {
  Show,
}

class Dispatcher {
  private events = new Map<
    DispatcherEventName,
    ((alert: AlertImpl) => void)[]
  >();

  public dispatch = (alert: AlertImpl): (() => void) => (): void => {
    this.emit(DispatcherEventName.Show, alert);
  };

  public emit(event: DispatcherEventName, alert: AlertImpl): void {
    const callbacks = this.events.get(event);
    if (callbacks === undefined) {
      return;
    }

    callbacks.forEach(
      (callback): void => {
        callback(alert);
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

interface DayoState {}

export const createDayo = (): [
  React.ComponentClass,
  Dispatcher['dispatch']
] => {
  const dispatcher = new Dispatcher();

  class Dayo extends React.Component<{}> implements DayoImpl {
    public dispatcher = dispatcher;

    public state = {
      queue: [],
    };

    public componentDidMount(): void {
      dispatcher.on(
        DispatcherEventName.Show,
        (alert: AlertImpl): void => {
          this.createAlert(alert);
        },
      );
    }

    public createAlert(alert: AlertImpl): void {
      this.setState({
        queue: [...this.state.queue, alert],
      });
    }

    public render(): JSX.Element {
      // eslint-disable-next-line react/prop-types
      return (
        <>
          {this.props.children}

          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              position: 'flex',
              left: 10,
              top: 10,
              maxWidth: 300,
            }}
          >
            {this.state.queue.map(
              (item): any => {
                return <button key={Math.random()}>{item.data.message}</button>;
              },
            )}
          </ul>
        </>
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
