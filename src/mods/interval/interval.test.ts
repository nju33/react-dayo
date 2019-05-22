import Interval from './interval';

test('Interval', async (): Promise<void> => {
  const wait = (msec: number): Promise<void> => {
    return new Promise(
      (r): void => {
        setTimeout(r, msec);
      },
    );
  };

  const interval = Interval.create();

  const seed1 = {id: 'a'};
  let seed1Done = false;
  const updateFnForseed1 = (): Promise<void> => {
    return new Promise(
      (resolve): void => {
        setTimeout((): void => {
          seed1Done = true;
          resolve();
        }, 200);
      },
    );
  };

  const seed2 = {id: 'b'};
  let seed2Done = false;
  const updateFnForseed2 = (): Promise<void> => {
    return new Promise(
      (resolve): void => {
        setTimeout((): void => {
          seed2Done = true;
          resolve();
        }, 800);
      },
    );
  };

  Promise.all([
    updateFnForseed1(),
    interval.wait(
      seed1,
      (onTick): Promise<void> => {
        return new Promise(
          (resolve): void => {
            onTick(
              (): void => {
                if (seed1Done) {
                  resolve();
                }
              },
            );
          },
        );
      },
    ),
    updateFnForseed2(),
    interval.wait(
      seed2,
      (onTick): Promise<void> => {
        return new Promise(
          (resolve): void => {
            onTick(
              (): void => {
                if (seed2Done) {
                  resolve();
                }
              },
            );
          },
        );
      },
    ),
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
