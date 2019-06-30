import {Style} from 'iryo';

const style = new Style();

const enum Data {
  Component = "[data-component='dayo--queue']",
}

export const injectStyle = () => {
  style.content = `
    ${Data.Component} {
      width: 100%;
      font-size: 0.8em;
      display: flex;
      justify-content: flex-start;
      backface-visibility: hidden;
      transform: translateZ(0);
    }

    ${Data.Component}[data-to='top'] {
      flex-direction: column;
    }

    ${Data.Component}[data-to='bottom'] {
      flex-direction: column-reverse;
    }

    ${Data.Component}[data-position='left'] {
      align-items: flex-start;
    }

    ${Data.Component}[data-position='center'] {
      align-items: center;
    }

    ${Data.Component}[data-position='right'] {
      align-items: flex-end;
    }
  `;
};

export const eliminateStyle = () => {
  style.content = '';
};
