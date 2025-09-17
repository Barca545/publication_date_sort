export class Some<T> {
  value: T;

  constructor(val: T) {
    this.value = val;
  }
}

export class None {}

// Should option be an intereface or class not type
export type Option<T> = Some<T> | None;

export function unwrap<T>(option: Option<T>): T {
  if (option instanceof None) {
    throw new Error(`Tried to unwrap option None`);
  } else {
    return option.value;
  }
}

export function match<T, R>(
  option: Option<T>,
  some: (val: T) => R,
  none: () => R
): R {
  if (option instanceof Some) {
    return some(option.value);
  } else {
    return none();
  }
}
