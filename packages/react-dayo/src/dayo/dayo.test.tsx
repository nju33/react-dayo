import React from 'react';
import {DayoOptions} from 'core-dayo';
import {render, cleanup, wait, waitForElement} from '@testing-library/react';
import success from '../presets/notifications/success';
import {createDayo} from './dayo';
import 'jest-dom/extend-expect';

describe('dayo', () => {
  afterEach(cleanup);

  /* eslint-disable @typescript-eslint/no-explicit-any */
  let Dayo: React.ComponentClass<Partial<DayoOptions>, any>;
  let dispatch: any;
  /* eslint-enable @typescript-eslint/no-explicit-any */

  beforeEach(() => {
    const [_Dayo, _dispatch] = createDayo();
    Dayo = _Dayo;
    dispatch = _dispatch;
  });

  test('default', async () => {
    jest.setTimeout(10000);

    const {container, queryByTestId, queryByText, queryAllByText} = render(
      <Dayo />,
    );
    const message = 'test';

    expect(queryByTestId('dayo--queue')).toBeTruthy();
    expect(queryByTestId('dayo--box')).toBeFalsy();
    expect(queryByText(message)).toBeFalsy();
    expect(container.firstChild).toMatchSnapshot();

    dispatch(
      success()
        .message(message)
        .timeout(1500),
    )();
    const dayoBoxNode = await waitForElement(() => queryByTestId('dayo--box'));
    expect(dayoBoxNode).toBeTruthy();

    /**
     * dispatch two more times
     */
    dispatch(
      success()
        .message(message)
        .timeout(1500),
    )();
    dispatch(
      success()
        .message(message)
        .timeout(1500),
    )();
    await wait(() => new Promise(r => setTimeout(r, 1000)));
    const messages = queryAllByText(message);
    expect(messages).toHaveLength(3);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('attributes', () => {
    const {container, queryByTestId} = render(
      <Dayo to="bottom" position="right" />,
    );

    const queue = queryByTestId('dayo--queue');
    expect(queue).toBeTruthy();
    expect(queue).toHaveAttribute('data-to', 'bottom');
    expect(queue).toHaveAttribute('data-position', 'right');
    expect(container.firstChild).toMatchSnapshot();
  });
});
