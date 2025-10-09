import test from "node:test";
import { getAppearances, getAppearancePages } from "../fetch";
import assert from "node:assert";
import { isEqual } from "lodash-es";
import fs from "fs";

test("Fetch appearance names", async (_t) => {
  // Lets test against a pre-crisis character *and* grab the rev number just in case I need to
  let res = await getAppearances("Robert Hobb (Earth-One)");

  let expected = [
    "Superboy Vol 1 6",
    "Superboy Vol 1 7",
    "Superboy Vol 1 8",
    "Superboy Vol 1 9",
    "Superboy Vol 1 11",
    "Superboy Vol 2 24",
  ];

  return assert(isEqual(res, expected));
});

test("Fetch appearance pages", async (_t) => {
  // Using Robbert Hobb (Earth-One) because it is unlikely to change
  let req = [
    "Superboy Vol 1 7",
    "Superboy Vol 1 8",
    "Superboy Vol 1 9",
    "Superboy Vol 1 11",
    "Superboy Vol 1 6",
    "Superboy Vol 2 24",
  ];

  let res = await getAppearancePages(req);

  // FIXME: Compare against current character page but this might fail if there are updates that make the saved xml file outdated
  let expected = fs.readFileSync(
    process.cwd() + "/test/Robert Hobb (Earth-One) Appearances.xml",
    "utf-8"
  );

  return assert(isEqual(res, expected));
});
