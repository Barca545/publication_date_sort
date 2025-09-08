import {ListEntry, pubDateSort} from "../pub-sort";
import test from "node:test";
import assert from "node:assert";

test("pubsort", (_t) => {
  const list = [
    // TODO: Need to add zero padding in actual load function
    new ListEntry("Superman and Batman: World's Funnest", "2021", "01", "01"), 
    new ListEntry("Batman Family Vol 1 11", "1977", "06", "24"),
    new ListEntry("Batman Family Vol 1 16", "1978", "03", "21")
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

})









