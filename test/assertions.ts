import { isEqual } from "lodash-es";

function assert_eq<T>(a: T, b: T) {
  let t = isEqual(a, b);
}
