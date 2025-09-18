export class Some<T> implements OptionInterface<T> {
  private value: T;

  constructor(val: T) {
    this.value = val;
  }

  unwrap(): T {
    return this.value;
  }

  isSome(): boolean {
    return true;
  }
}

export class None implements OptionInterface<any> {
  unwrap(): never {
    throw new Error(`Tried to unwrap option None`);
  }

  isSome(): boolean {
    return false;
  }
}

interface OptionInterface<T> {
  unwrap(): T | never;
  isSome(): boolean;
}

// Should option be an intereface or class not type
export type Option<T> = Some<T> | None;

export function match<T, R>(
  option: Option<T>,
  some: (val: T) => R,
  none: () => R
): R {
  if (option instanceof Some) {
    return some(option.unwrap());
  } else {
    return none();
  }
}
