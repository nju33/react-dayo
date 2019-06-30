import {Style} from 'iryo';

const style = new Style();

const enum Data {
  Component = "[data-component='dayo--box']",
}

export const injectStyle = () => {
  style.content = `
    ${Data.Component} {
      display: flex;
      align-items: center;
      transition: .5s;
      opacity: 1;
    }

   ${Data.Component}[data-is-enter='true'] {
      will-change: transform;
      transition: none;
      opacity: 0;
    }

   ${Data.Component}[data-is-enter='true'] {
      color: orange;
    }

   ${Data.Component}[data-is-enter='true'][data-to='top'] {
      transform: translate3d(0, 0.5em, 0);
    }

   ${Data.Component}[data-is-enter='true'][data-to='bottom'] {
      transform: translate3d(0, -0.5em, 0);
    }

   ${Data.Component}[data-is-entering='true'] {
      transition-property: transform, opacity;
      will-change: transform, opacity;
      opacity: 1;
    }

    ${Data.Component}[data-is-deleting='true'] {
      transition-property: transform margin, padding, opacity, height;
      transition-duration: 0.3s;
      will-change: transform, margin, padding, opacity, height;
      overflow: hidden;
      backface-visibility: hidden;
      padding: 0;
      margin: 0;
      opacity: 0;
      height: 0 !important;
    }

    ${Data.Component}[data-is-deleting='true'][data-to='top'] {
      transform: translate3d(0, -0.5em, 0);
    }

    ${Data.Component}[data-is-deleting='true'][data-to='bottom'] {
      transform: translate3d(0, 0.5em, 0);
    }

    ${Data.Component}[data-is-deleted='true'] {
      transition-duration: none;
      transition-duration: 0;
      overflow: hidden;
      padding: 0;
      margin: 0;
      opacity: 0;
      height: 0 !important;
    }

    ${Data.Component}[data-is-deleted='true'][data-to='top'] {
      transform: translate3d(0, -0.5em, 0) scale(0.7);
    }

    ${Data.Component}[data-is-deleted='true'][data-to='bottom'] {
      transform: translate3d(0, 0.5em, 0) scale(0.7);
    }

    ${Data.Component} > div {
      text-align: center;
    }
  `;
};

export const eliminateStyle = () => {
  style.content = '';
};
