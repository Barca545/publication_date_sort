import { match, None, Option, Some } from "./option.js";

export class Peekable<T> {
  #iter: Iterator<T>;
  // This stores the result of calling the underlying iterators next method
  #peeked: Option<IteratorResult<T>>;

  constructor(iter: Iterable<T>) {
    this.#iter = iter[Symbol.iterator]();
    this.#peeked = new None();
  }

  next(): IteratorResult<T> {
    if (this.#peeked.isSome()) {
      const res = this.#peeked.unwrap();
      // We're taking the peeked value so it's gone now
      // TODO: Give options a take method
      this.#peeked = new None();
      return res;
    } else {
      return this.#iter.next();
    }
  }

  peek(): Option<T> {
    return match(
      this.#peeked,
      (res) => {
        if (res.value === undefined) {
          return new None();
        } else {
          return new Some(res.value);
        }
      },
      () => {
        const res = this.#iter.next();
        this.#peeked = new Some(res);
        return new Some(res.value);
      }
    );
  }

  // This is basically into_iter() it returns the underlying iterator the struct contains
  [Symbol.iterator]() {
    return this;
  }
}
