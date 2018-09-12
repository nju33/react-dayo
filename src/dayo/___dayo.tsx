import React from 'react';
import {Context} from './context';
import {Toast} from './toast.atom';

export class Dayo extends React.Component {
  show = (message: string) => {
    this.setState({
      message,
      hidden: false,
    });
  };

  hide = () => {
    this.setState({
      message: null,
      hidden: true,
    });
  };

  render() {
    return (
      <Context.Consumer>
        {({state}) => {
          return <Toast>{state.message}</Toast>
        }}
      </Context.Consumer>
    )
  }
}
