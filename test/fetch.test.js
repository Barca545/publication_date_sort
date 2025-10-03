import test from "node:test";
import { getAppearances, getAppearancePages } from "../fetch";
import assert from "node:assert";
import { isEqual } from "lodash-es";
import fs from "fs";

test("Fetch appearance names", async (_t) => {
  let res = await getAppearances("Lian Harper (Prime Earth)");
  let expected = [
    "Batman: Fear State: Alpha Vol 1 1",
    "Catwoman Vol 5 25",
    "Catwoman Vol 5 26",
    "Catwoman Vol 5 27",
    "Catwoman Vol 5 28",
    "Catwoman Vol 5 30",
    "Catwoman Vol 5 31",
    "Catwoman Vol 5 32",
    "Catwoman Vol 5 33",
    "Catwoman Vol 5 34",
    "Catwoman Vol 5 35",
    "Catwoman Vol 5 36",
    "Catwoman Vol 5 37",
    "Catwoman Vol 5 38",
    "Catwoman Vol 5 49",
    "Catwoman Vol 5 50",
    "Cheetah & Cheshire Rob the Justice League Vol 1 2",
    "DC Festival of Heroes: The Asian Superhero Celebration Vol 1 1",
    "Deathstroke Inc. Vol 1 5",
    "Detective Comics Vol 1 1069",
    "Detective Comics Vol 1 1070",
    "Detective Comics Vol 1 1077",
    "Detective Comics Vol 1 1078",
    "Detective Comics Vol 1 1079",
    "Green Arrow Vol 7 1",
    "Green Arrow Vol 7 2",
    "Green Arrow Vol 7 3",
    "Green Arrow Vol 7 4",
    "Green Arrow Vol 7 5",
    "Green Arrow Vol 7 6",
    "Green Arrow Vol 7 10",
    "Green Arrow Vol 7 11",
    "Green Arrow Vol 7 12",
    "Green Arrow Vol 7 13",
    "Green Arrow Vol 7 14",
    "Green Arrow Vol 7 15",
    "Green Arrow Vol 7 16",
    "Green Arrow Vol 7 17",
    "Green Arrow Vol 7 26",
    "Green Arrow Vol 7 27",
    "Green Arrow Vol 7 28",
    "Green Arrow 80th Anniversary 100-Page Super Spectacular Vol 1 1",
    "Green Arrow 2024 Annual Vol 7 1",
    "Infinite Frontier Vol 1 2",
    "Infinite Frontier Vol 1 3",
    "Infinite Frontier Vol 1 5",
    "Infinite Frontier Secret Files Vol 1 1",
    "Infinite Frontier Secret Files Vol 1 2 (Digital)",
    "Knight Terrors: Batman Vol 1 2",
    "New History of the DC Universe Vol 1 3",
    "Titans 2025 Annual Vol 4 1",
    "Titans: Beast World Tour: Star City Vol 1 1",
  ];

  return assert(isEqual(res, expected));
});

test("fetch appearance pages", async (_t) => {
  let req = [
    "Infinite Frontier Secret Files Vol 1 2 (Digital)",
    "Catwoman Vol 5 25",
    "Catwoman Vol 5 26",
    "Catwoman Vol 5 27",
    "Catwoman Vol 5 28",
    "Catwoman Vol 5 30",
    "DC Festival of Heroes: The Asian Superhero Celebration Vol 1 1",
    "Catwoman Vol 5 31",
    "Catwoman Vol 5 32",
    "Infinite Frontier Secret Files Vol 1 1",
    "Infinite Frontier Vol 1 2",
    "Catwoman Vol 5 33",
    "Infinite Frontier Vol 1 3",
    "Catwoman Vol 5 34",
    "Infinite Frontier Vol 1 5",
    "Batman: Fear State: Alpha Vol 1 1",
    "Catwoman Vol 5 35",
    "Catwoman Vol 5 36",
    "Catwoman Vol 5 37",
    "Catwoman Vol 5 38",
    "Deathstroke Inc. Vol 1 5",
    "Catwoman Vol 5 49",
    "Catwoman Vol 5 50",
    "Detective Comics Vol 1 1069",
    "Detective Comics Vol 1 1070",
    "Green Arrow Vol 7 1",
    "Green Arrow Vol 7 2",
    "Green Arrow Vol 7 3",
    "Knight Terrors: Batman Vol 1 2",
    "Green Arrow 80th Anniversary 100-Page Super Spectacular Vol 1 1",
    "Green Arrow Vol 7 4",
    "Green Arrow Vol 7 5",
    "Detective Comics Vol 1 1077",
    "Green Arrow Vol 7 6",
    "Detective Comics Vol 1 1078",
    "Detective Comics Vol 1 1079",
    "Titans: Beast World Tour: Star City Vol 1 1",
    "Green Arrow Vol 7 10",
    "Green Arrow Vol 7 11",
    "Green Arrow Vol 7 12",
    "Green Arrow Vol 7 13",
    "Green Arrow Vol 7 14",
    "Green Arrow Vol 7 15",
    "Green Arrow Vol 7 16",
    "Green Arrow Vol 7 17",
    "Green Arrow 2024 Annual Vol 7 1",
    "Green Arrow Vol 7 26",
    "Titans 2025 Annual Vol 4 1",
    "Green Arrow Vol 7 27",
    "Cheetah & Cheshire Rob the Justice League Vol 1 2",
    "New History of the DC Universe Vol 1 3",
    "Green Arrow Vol 7 28",
  ];

  let res = await getAppearancePages(req);

  // FIXME: Compare against current character page but this might fail if there are updates that make the saved xml file outdated
  let expected = fs.readFileSync(
    process.cwd() + "/test/Lian Harper (Prime Earth) Appearances.xml",
    "utf-8"
  );

  return assert(isEqual(res, expected));
});
