import Cycle from './cycle';

test('Cycle', (): void => {
  const cycle = new Cycle();

  expect(cycle.isEnter()).toBeTruthy();
  expect(cycle.isEnterPhase()).toBeFalsy();

  cycle.proceed();
  expect(cycle.isEntering()).toBeTruthy();
  expect(cycle.isEnterPhase()).toBeTruthy();

  cycle.proceed();
  expect(cycle.isEntered()).toBeTruthy();
  expect(cycle.isEnterPhase()).toBeTruthy();

  cycle.proceed();
  expect(cycle.isExit()).toBeTruthy();
  expect(cycle.isEnterPhase()).toBeFalsy();

  cycle.proceed();
  expect(cycle.isExiting()).toBeTruthy();
  expect(cycle.isEnterPhase()).toBeFalsy();

  cycle.proceed();
  expect(cycle.isExited()).toBeTruthy();
  expect(cycle.isEnterPhase()).toBeFalsy();
});
