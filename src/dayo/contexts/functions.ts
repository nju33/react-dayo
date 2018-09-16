import React from 'react';

export interface DayoFunctions {
  log(message: string): ((ev?: React.MouseEvent<unknown>) => void);
  success(message: string): ((ev?: React.MouseEvent<unknown>) => void);
  warn(message: string): ((ev?: React.MouseEvent<unknown>) => void);
  error(message: string): ((ev?: React.MouseEvent<unknown>) => void);
  heart(message: string): ((ev?: React.MouseEvent<unknown>) => void);
  help(message: string): ((ev?: React.MouseEvent<unknown>) => void);
  message(message: string): ((ev?: React.MouseEvent<unknown>) => void);
  refresh(message: string): ((ev?: React.MouseEvent<unknown>) => void);
  setting(message: string): ((ev?: React.MouseEvent<unknown>) => void);
  remove(message: string): ((ev?: React.MouseEvent<unknown>) => void);
  star(message: string): ((ev?: React.MouseEvent<unknown>) => void);
  upload(message: string): ((ev?: React.MouseEvent<unknown>) => void);
  user(message: string): ((ev?: React.MouseEvent<unknown>) => void);
  play(message: string): ((ev?: React.MouseEvent<unknown>) => void);
  mail(message: string): ((ev?: React.MouseEvent<unknown>) => void);
  link(message: string): ((ev?: React.MouseEvent<unknown>) => void);
  bookmark(message: string): ((ev?: React.MouseEvent<unknown>) => void);
  hide(itemId: string): ((ev?: React.MouseEvent<unknown>) => void);
  messageClear(itemId: string): void;
}

export const FunctionsContext = React.createContext<DayoFunctions>({
  log: () => () => {
    throw new Error('Please put <DayoProvider> in the parent hierarchy');
  },
  success: () => () => {
    throw new Error('Please put <DayoProvider> in the parent hierarchy');
  },
  warn: () => () => {
    throw new Error('Please put <DayoProvider> in the parent hierarchy');
  },
  error: () => () => {
    throw new Error('Please put <DayoProvider> in the parent hierarchy');
  },
  heart: () => () => {
    throw new Error('Please put <DayoProvider> in the parent hierarchy');
  },
  help: () => () => {
    throw new Error('Please put <DayoProvider> in the parent hierarchy');
  },
  message: () => () => {
    throw new Error('Please put <DayoProvider> in the parent hierarchy');
  },
  refresh: () => () => {
    throw new Error('Please put <DayoProvider> in the parent hierarchy');
  },
  setting: () => () => {
    throw new Error('Please put <DayoProvider> in the parent hierarchy');
  },
  remove: () => () => {
    throw new Error('Please put <DayoProvider> in the parent hierarchy');
  },
  star: () => () => {
    throw new Error('Please put <DayoProvider> in the parent hierarchy');
  },
  upload: () => () => {
    throw new Error('Please put <DayoProvider> in the parent hierarchy');
  },
  user: () => () => {
    throw new Error('Please put <DayoProvider> in the parent hierarchy');
  },
  play: () => () => {
    throw new Error('Please put <DayoProvider> in the parent hierarchy');
  },
  mail: () => () => {
    throw new Error('Please put <DayoProvider> in the parent hierarchy');
  },
  link: () => () => {
    throw new Error('Please put <DayoProvider> in the parent hierarchy');
  },
  bookmark: () => () => {
    throw new Error('Please put <DayoProvider> in the parent hierarchy');
  },
  hide() {
    throw new Error('Please put <DayoProvider> in the parent hierarchy');
  },
  messageClear() {
    throw new Error('Please put <DayoProvider> in the parent hierarchy');
  },
});
