import React from 'react';
import {DayoType} from '../dayo-type';
import {DayoCycle} from '../dayo-cycle';

export interface DayoItem {
  id: string;
  type: DayoType;
  cycle: DayoCycle;
  message: string;
}

export interface DayoState {
  store: DayoItem[];
}

export const StateContext = React.createContext<DayoState>({store: []});
