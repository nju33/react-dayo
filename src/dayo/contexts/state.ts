import React from 'react';

export interface DayoState {
  message: string | null;
  hidden: boolean;
  style: any;
}

export const StateContext = React.createContext<DayoState>({
  message: null,
  hidden: false,
  style: {},
});
