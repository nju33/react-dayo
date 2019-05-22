import Cycle from './cycle';

test('Cycle', (): void => {
  const cycle = new Cycle();

  expect(cycle.isEnter()).toBeTruthy();
  cycle.proceed();
  expect(cycle.isEntering()).toBeTruthy();
  cycle.proceed();
  expect(cycle.isEntered()).toBeTruthy();
  cycle.proceed();
  expect(cycle.isExit()).toBeTruthy();
  cycle.proceed();
  expect(cycle.isExiting()).toBeTruthy();
  cycle.proceed();
  expect(cycle.isExited()).toBeTruthy();
});

// test('Cycle#waitUntil', async (): Promise<void> => {
//   const cycle = new Cycle();

//   setTimeout((): void => {
//     cycle.proceed();
//   }, 100);

//   await expect(cycle.waitUntil(cycle.isEntering)).resolves.toBeUndefined();
// });
