type NonNullable<T> = T extends null | undefined ? never : T;

/**
 * Executes an async function periodically until it resolves to a non-null and non-undefined value or times out.
 *
 * @param asyncFn - The async function to execute.
 * @param timeout - The maximum time to wait (in milliseconds).
 * @param interval - The interval between function calls (in milliseconds).
 * @returns A promise that resolves to the non-null/non-undefined value or rejects if the timeout is reached.
 */
export async function pollUntilDefinedValue<T>(
  asyncFn: () => Promise<T>,
  timeout: number,
  interval: number,
): Promise<NonNullable<T>> {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();

    const checkValue = async () => {
      if (Date.now() - startTime >= timeout) {
        reject(new Error("Timeout reached before receiving a valid value"));
        return;
      }

      try {
        const result = await asyncFn();
        if (result !== null && result !== undefined) {
          resolve(result as NonNullable<T>);
        } else {
          setTimeout(checkValue, interval);
        }
      } catch (error) {
        setTimeout(checkValue, interval);
      }
    };

    checkValue();
  });
}

type Process<T = any, R = any> = (input: T) => Promise<R>;

export function createSequentialProcesses<
  T1 extends Process,
  T2 extends Process<Awaited<ReturnType<T1>>>,
>(p1: T1, p2: T2): [ReturnType<T1>, ReturnType<T2>];

export function createSequentialProcesses<
  T1 extends Process,
  T2 extends Process<Awaited<ReturnType<T1>>>,
  T3 extends Process<Awaited<ReturnType<T2>>>,
>(p1: T1, p2: T2, p3: T3): [ReturnType<T1>, ReturnType<T2>, ReturnType<T3>];

export function createSequentialProcesses<
  T1 extends Process,
  T2 extends Process<Awaited<ReturnType<T1>>>,
  T3 extends Process<Awaited<ReturnType<T2>>>,
  T4 extends Process<Awaited<ReturnType<T3>>>,
>(
  p1: T1,
  p2: T2,
  p3: T3,
  p4: T4,
): [ReturnType<T1>, ReturnType<T2>, ReturnType<T3>, ReturnType<T4>];

export function createSequentialProcesses<
  T1 extends Process,
  T2 extends Process<Awaited<ReturnType<T1>>>,
  T3 extends Process<Awaited<ReturnType<T2>>>,
  T4 extends Process<Awaited<ReturnType<T3>>>,
  T5 extends Process<Awaited<ReturnType<T4>>>,
>(
  p1: T1,
  p2: T2,
  p3: T3,
  p4: T4,
  p5: T5,
): [
  ReturnType<T1>,
  ReturnType<T2>,
  ReturnType<T3>,
  ReturnType<T4>,
  ReturnType<T5>,
];

export function createSequentialProcesses<
  T1 extends Process,
  T2 extends Process<Awaited<ReturnType<T1>>>,
  T3 extends Process<Awaited<ReturnType<T2>>>,
  T4 extends Process<Awaited<ReturnType<T3>>>,
  T5 extends Process<Awaited<ReturnType<T4>>>,
  T6 extends Process<Awaited<ReturnType<T5>>>,
>(
  p1: T1,
  p2: T2,
  p3: T3,
  p4: T4,
  p5: T5,
  p6: T6,
): [
  ReturnType<T1>,
  ReturnType<T2>,
  ReturnType<T3>,
  ReturnType<T4>,
  ReturnType<T5>,
  ReturnType<T6>,
];

export function createSequentialProcesses<
  T1 extends Process,
  T2 extends Process<Awaited<ReturnType<T1>>>,
  T3 extends Process<Awaited<ReturnType<T2>>>,
  T4 extends Process<Awaited<ReturnType<T3>>>,
  T5 extends Process<Awaited<ReturnType<T4>>>,
  T6 extends Process<Awaited<ReturnType<T5>>>,
  T7 extends Process<Awaited<ReturnType<T6>>>,
>(
  p1: T1,
  p2: T2,
  p3: T3,
  p4: T4,
  p5: T5,
  p6: T6,
  p7: T7,
): [
  ReturnType<T1>,
  ReturnType<T2>,
  ReturnType<T3>,
  ReturnType<T4>,
  ReturnType<T5>,
  ReturnType<T6>,
  ReturnType<T7>,
];

export function createSequentialProcesses<
  T1 extends Process,
  T2 extends Process<Awaited<ReturnType<T1>>>,
  T3 extends Process<Awaited<ReturnType<T2>>>,
  T4 extends Process<Awaited<ReturnType<T3>>>,
  T5 extends Process<Awaited<ReturnType<T4>>>,
  T6 extends Process<Awaited<ReturnType<T5>>>,
  T7 extends Process<Awaited<ReturnType<T6>>>,
  T8 extends Process<Awaited<ReturnType<T7>>>,
>(
  p1: T1,
  p2: T2,
  p3: T3,
  p4: T4,
  p5: T5,
  p6: T6,
  p7: T7,
  p8: T8,
): [
  ReturnType<T1>,
  ReturnType<T2>,
  ReturnType<T3>,
  ReturnType<T4>,
  ReturnType<T5>,
  ReturnType<T6>,
  ReturnType<T7>,
  ReturnType<T8>,
];

export function createSequentialProcesses<
  T1 extends Process,
  T2 extends Process<Awaited<ReturnType<T1>>>,
  T3 extends Process<Awaited<ReturnType<T2>>>,
  T4 extends Process<Awaited<ReturnType<T3>>>,
  T5 extends Process<Awaited<ReturnType<T4>>>,
  T6 extends Process<Awaited<ReturnType<T5>>>,
  T7 extends Process<Awaited<ReturnType<T6>>>,
  T8 extends Process<Awaited<ReturnType<T7>>>,
  T9 extends Process<Awaited<ReturnType<T8>>>,
>(
  p1: T1,
  p2: T2,
  p3: T3,
  p4: T4,
  p5: T5,
  p6: T6,
  p7: T7,
  p8: T8,
  p9: T9,
): [
  ReturnType<T1>,
  ReturnType<T2>,
  ReturnType<T3>,
  ReturnType<T4>,
  ReturnType<T5>,
  ReturnType<T6>,
  ReturnType<T7>,
  ReturnType<T8>,
  ReturnType<T9>,
];

export function createSequentialProcesses<
  T1 extends Process,
  T2 extends Process<Awaited<ReturnType<T1>>>,
  T3 extends Process<Awaited<ReturnType<T2>>>,
  T4 extends Process<Awaited<ReturnType<T3>>>,
  T5 extends Process<Awaited<ReturnType<T4>>>,
  T6 extends Process<Awaited<ReturnType<T5>>>,
  T7 extends Process<Awaited<ReturnType<T6>>>,
  T8 extends Process<Awaited<ReturnType<T7>>>,
  T9 extends Process<Awaited<ReturnType<T8>>>,
  T10 extends Process<Awaited<ReturnType<T9>>>,
>(
  p1: T1,
  p2: T2,
  p3: T3,
  p4: T4,
  p5: T5,
  p6: T6,
  p7: T7,
  p8: T8,
  p9: T9,
  p10: T10,
): [
  ReturnType<T1>,
  ReturnType<T2>,
  ReturnType<T3>,
  ReturnType<T4>,
  ReturnType<T5>,
  ReturnType<T6>,
  ReturnType<T7>,
  ReturnType<T8>,
  ReturnType<T9>,
  ReturnType<T10>,
];

export function createSequentialProcesses<
  T1 extends Process,
  T2 extends Process<Awaited<ReturnType<T1>>>,
  T3 extends Process<Awaited<ReturnType<T2>>>,
  T4 extends Process<Awaited<ReturnType<T3>>>,
  T5 extends Process<Awaited<ReturnType<T4>>>,
  T6 extends Process<Awaited<ReturnType<T5>>>,
  T7 extends Process<Awaited<ReturnType<T6>>>,
  T8 extends Process<Awaited<ReturnType<T7>>>,
  T9 extends Process<Awaited<ReturnType<T8>>>,
  T10 extends Process<Awaited<ReturnType<T9>>>,
>(
  p1: T1,
  p2: T2,
  p3?: T3,
  p4?: T4,
  p5?: T5,
  p6?: T6,
  p7?: T7,
  p8?: T8,
  p9?: T9,
  p10?: T10,
): [
  ReturnType<T1>,
  ReturnType<T2>,
  ReturnType<T3>?,
  ReturnType<T4>?,
  ReturnType<T5>?,
  ReturnType<T6>?,
  ReturnType<T7>?,
  ReturnType<T8>?,
  ReturnType<T9>?,
  ReturnType<T10>?,
] {
  const processes = [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10].filter(
    (p): p is NonNullable<typeof p> => p !== undefined,
  );

  return processes.reduce((acc, process, index) => {
    if (index === 0) {
      return [process(undefined)];
    }
    return [...acc, acc[acc.length - 1].then(process)];
  }, [] as Promise<any>[]) as [
    ReturnType<T1>,
    ReturnType<T2>,
    ReturnType<T3>,
    ReturnType<T4>,
    ReturnType<T5>,
    ReturnType<T6>,
    ReturnType<T7>,
    ReturnType<T8>,
    ReturnType<T9>,
    ReturnType<T10>,
  ];
}

export function unsafe_createSequentialProcesses<T extends any[], R>(
  ...processes: [
    (arg?: any) => Promise<T[0]>,
    ...((arg: any) => Promise<any>)[],
  ]
): Promise<R>[] {
  return processes.reduce((acc, process, index) => {
    if (index === 0) {
      return [process(undefined)];
    }
    return [...acc, acc[acc.length - 1].then(process)];
  }, [] as Promise<any>[]);
}
