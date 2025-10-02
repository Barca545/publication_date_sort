import { ListEntry, pubDateSort, EntryDate, isBiggerDate } from "../pub-sort";
import test from "node:test";
import assert from "node:assert";
import { isEqual } from "lodash-es";

test("Date.isGreater: different dates", (_t) => {
  const big = new EntryDate("2021", "9", "13");
  const small = new EntryDate("2020", "8", "29");
  assert(isEqual(big.isGreater(small), true));
});

test("Date.isGreater: same date", (_t) => {
  const big = new EntryDate("2020", "11", "15");
  const big_1 = new EntryDate("2020", "11", "15");
  assert(isEqual(big.isGreater(big_1), false));
});

test("Date.isEqual: different dates", (_t) => {
  const big = new EntryDate("2021", "9", "13");
  const small = new EntryDate("2020", "8", "29");
  assert(isEqual(big.isEqual(small), false));
});

test("Date.isEqual: same date", (_t) => {
  const big = new EntryDate("2020", "11", "15");
  const big_1 = new EntryDate("2020", "11", "15");
  assert(isEqual(big.isEqual(big_1), true));
});

test("isBiggerDate: different dates: big first", (_t) => {
  const big = new EntryDate("2021", "9", "13");
  const small = new EntryDate("2020", "8", "29");
  assert(isEqual(isBiggerDate(big, small), 1));
});

test("isBiggerDate: different dates: small first", (_t) => {
  const big = new EntryDate("2021", "9", "13");
  const small = new EntryDate("2020", "8", "29");
  assert(isEqual(isBiggerDate(small, big), -1));
});

test("isBiggerDate: same date", (_t) => {
  const big = new EntryDate("2020", "11", "15");
  const big_1 = new EntryDate("2020", "11", "15");
  assert(isEqual(isBiggerDate(big, big_1), 0));
});

test("pubsort", (_t) => {
  const list = [
    // TODO: Need to add zero padding in actual load function
    new ListEntry("Superman and Batman: World's Funnest", "2021", "01", "01"),
    new ListEntry("Batman Family Vol 1 11", "1977", "06", "24"),
    new ListEntry("Batman Family Vol 1 16", "1978", "03", "21"),
  ];

  const result = pubDateSort(list);
  const expected = [
    new ListEntry("Batman Family Vol 1 11", "1977", "06", "24"),
    new ListEntry("Batman Family Vol 1 16", "1978", "03", "21"),
    new ListEntry("Superman and Batman: World's Funnest", "2021", "01", "01"),
  ];
  // Arrays are objects and comparing objects just compares their references.
  // Therefore to test we convert it into a string and confirm the strings are the same.
  // Yes I think this is stupid.
  return assert.deepEqual(result.toString(), expected.toString());
});

test("Sort longer list", (_t) => {
  let src = [
    new ListEntry("Catwoman Vol 5 27", "2021", "1", "17", ""),
    new ListEntry("Catwoman Vol 5 28", "2021", "2", "15", ""),
    new ListEntry("Catwoman Vol 5 30", "2021", "6", "20", ""),
    new ListEntry(
      "DC Festival of Heroes: The Asian Superhero Celebration Vo1 1 1",
      "2021",
      "7",
      "11",
      ""
    ),
    new ListEntry("Catwoman Vol 5 31", "2021", "7", "18", ""),
    new ListEntry("Catwoman Vol 5 32", "2021", "8", "15", ""),
    new ListEntry(
      "Infinite Frontier Secret Files Vol 1 1",
      "2021",
      "8",
      "29",
      ""
    ),
    new ListEntry(
      "Infinite Frontier Secret Files Vol 1 2",
      "2021",
      "9",
      "13",
      ""
    ),
    new ListEntry("Catwoman Vol 5 33", "2021", "9", "20", ""),
    new ListEntry("Infinite Frontier Vol 1 3", "2021", "9", "27", ""),
    new ListEntry("Catwoman Vol 5 34", "2021", "10", "17", ""),
    new ListEntry("Infinite Frontier Vol 1 5", "2021", "10", "31", ""),
    new ListEntry("Batman: Fear State: Alpha Vol 1 1", "2021", "10", "31", ""),
    new ListEntry("Catwoman Vol 5 35", "2021", "11", "21", ""),
    new ListEntry("Catwoman Vol 5 36", "2021", "12", "19", ""),
  ];

  const result = pubDateSort(src);

  return assert(isEqual(result, src));
});
