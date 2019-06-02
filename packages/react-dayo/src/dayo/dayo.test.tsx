import React from 'react';
import TestRenderer from 'react-test-renderer';
// import log from '../seed/presets/alerts/log';
import {createDayo, defaultOptions} from './dayo';

// describe('createDayo', (): void => {
//   describe('options', (): void => {
//     it('not passed options', (): void => {
//       const [Dayo] = createDayo();

//       const renderer = TestRenderer.create(<Dayo />);

//       expect(renderer.root.instance.getOption('to')).toBe(defaultOptions.to);
//       expect(renderer.root.instance.getOption('maxLength')).toBe(
//         defaultOptions.maxLength,
//       );
//     });

//     it('passed options', (): void => {
//       const options = {
//         to: 'bottom',
//         maxLength: 3,
//       } as const;

//       const [Dayo] = createDayo(options);

//       const renderer = TestRenderer.create(<Dayo />);

//       expect(renderer.root.instance.getOption('to')).toBe(options.to);
//       expect(renderer.root.instance.getOption('maxLength')).toBe(
//         options.maxLength,
//       );
//     });

//     it('passed props', (): void => {
//       const options = {
//         to: 'bottom',
//         maxLength: 3,
//       } as const;

//       const [Dayo] = createDayo({
//         to: 'top',
//         maxLength: 10,
//       });

//       const renderer = TestRenderer.create(
//         <Dayo to={options.to} maxLength={options.maxLength} />,
//       );

//       expect(renderer.root.instance.getOption('to')).toBe(options.to);
//       expect(renderer.root.instance.getOption('maxLength')).toBe(
//         options.maxLength,
//       );
//     });
//   });

//   test('rendering', (): void => {
//     const [Dayo, dispatch] = createDayo();

//     const json1 = ((): object => {
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       const renderer = TestRenderer.create(<Dayo to="bottom" />);
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       const object = renderer.toJSON() as any;
//       delete object.props.className;
//       return object;
//     })();
//     expect(json1).toMatchSnapshot();

//     dispatch(log.message('test'))();
//     const json2 = ((): object => {
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       const renderer = TestRenderer.create(<Dayo to="bottom" />);
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       const object = renderer.toJSON() as any;
//       delete object.props.className;
//       return object;
//     })();
//     expect(json2).toMatchSnapshot();
//   });
// });
