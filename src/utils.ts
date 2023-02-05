export function sample<T>(arr: readonly T[]) {
  if (arr.length === 0) {
    return null;
  }

  return arr[Math.floor(Math.random() * arr.length)] as T;
}

export function range(start: number, end: number, step = 1) {
  let startBound = start;
  let endBound = end;
  if (end === undefined) {
    endBound = start;
    startBound = 0;
  }

  const output: number[] = [];
  for (let i = start; i < end; i += step) {
    output.push(i);
  }

  return output;
}
