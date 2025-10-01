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
  /**Returns the value contained inside the Option. Panics if the option is None. */
  unwrap(): T | never;

  /**Returns true if the Option is Some T */
  isSome(): boolean;

  // /**Takes the value from an Option leaving a None in it's place. */
  // take(): Option<T>;
}

// Should option be an intereface or class not type
export type Option<T> = Some<T> | None;

abstract class Opt<T> {}

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
