import Interval from './interval';

test('Interval', async () => {
  const wait = (msec: number) => {
    return new Promise(r => {
      setTimeout(r, msec);
    });
  };

  const interval = Interval.create();

  const seed1 = {id: 'a'};
  let seed1Done = false;
  const updateFnForseed1 = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        seed1Done = true;
        resolve();
      }, 200);
    });
  };

  const seed2 = {id: 'b'};
  let seed2Done = false;
  const updateFnForseed2 = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        seed2Done = true;
        resolve();
      }, 800);
    });
  };

  Promise.all([
    updateFnForseed1(),
    interval.wait(seed1, onTick => {
      return new Promise(resolve => {
        onTick(() => {
          if (seed1Done) {
            resolve();
          }
        });
      });
    }),
    updateFnForseed2(),
    interval.wait(seed2, onTick => {
      return new Promise(resolve => {
        onTick(() => {
          if (seed2Done) {
            resolve();
          }
        });
      });
    }),
  ]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const anyInterval = interval as any;

  expect(anyInterval.items.size).toBe(2);
  expect(anyInterval.isRunningTick()).toBeTruthy();
  expect(anyInterval.intervalId).not.toBeUndefined();
  await wait(500);
  expect(anyInterval.items.size).toBe(1);
  await wait(900);
  expect(anyInterval.items.size).toBe(0);
  expect(anyInterval.isRunningTick()).toBeFalsy();
  expect(anyInterval.intervalId).toBeUndefined();
});
