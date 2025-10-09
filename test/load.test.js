import test from "node:test";
import { loadList, loadAsJson } from "../load";
import fs from "fs";
import assert from "node:assert";
import { ListEntry } from "../pub-sort";
import { isEqual } from "lodash-es";

test("load xml file as a JSON", (_t) => {
  const json = loadAsJson(
    process.cwd() + "/test/Scarlett Scott Apearances.xml"
  );
  // TODO: Add this to the load function to get at the text
  // Will need to loop over numbers not just use 0
  const result = json.mediawiki.page[0].revision.text._text;

  const expected = fs.readFileSync(
    process.cwd() + "/test/test_scarlett_first_appearance_test.txt",
    "utf-8"
  );

  return assert(isEqual(result, expected));
});

test("Convert load XML convert to JSON then to list", (_t) => {
  const result = loadList(
    process.cwd() + "/test/Scarlett Scott Apearances.xml"
  );

  const expected = [
    new ListEntry("Detective Comics Vol 1 1090", "2024", "12", "23", ""),
    new ListEntry("Detective Comics Vol 1 1091", "2025", "1", "27", ""),
    new ListEntry("Detective Comics Vol 1 1092", "2025", "2", "26", ""),
    new ListEntry("Detective Comics Vol 1 1093", "2025", "3", "22", ""),
    new ListEntry("Detective Comics Vol 1 1095", "2025", "5", "19", ""),
    new ListEntry("Detective Comics Vol 1 1096", "2025", "6", "16", ""),
  ];

  return assert(isEqual(result, expected));
});
