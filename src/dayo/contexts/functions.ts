import React from 'react';

export interface DayoFunctions {
  show(message: string): void;
  hide(): void;
}

export const FunctionsContext = React.createContext<DayoFunctions>({
  // tslint:disable-next-line:no-empty
  show(_message: string) {},
  // tslint:disable-next-line:no-empty
  hide() {},
});
