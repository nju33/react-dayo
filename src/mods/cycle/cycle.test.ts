import Cycle from './cycle';

test('Cycle', (): void => {
  const cycle = new Cycle();

  expect(cycle.isCreating()).toBeTruthy();
  cycle.proceed();
  expect(cycle.isCreated()).toBeTruthy();
  cycle.proceed();
  expect(cycle.isDeleting()).toBeTruthy();
  cycle.proceed();
  expect(cycle.isDeleted()).toBeTruthy();
});
