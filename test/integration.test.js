import test from "node:test";
import { loadList } from "../load";
import { ListEntry, pubDateSort } from "../pub-sort";
import { isEqual } from "lodash-es";
import assert from "node:assert";

test("Load, Parse, & Sort", (_t) => {
  // Load the file and turn it into a list of ListEntrys
  const list = loadList(
    process.cwd() + "/test/Lian Harper (Prime Earth) Appearances.xml"
  );

  // Sort the list
  const result = pubDateSort(list);

  const expected = [
    new ListEntry("Catwoman Vol 5 25", "2020", "11", "15", ""),
    new ListEntry("Catwoman Vol 5 26", "2020", "12", "20", ""),
    new ListEntry("Catwoman Vol 5 27", "2021", "1", "17", ""),
    new ListEntry("Catwoman Vol 5 28", "2021", "2", "15", ""),
    new ListEntry(
      "Infinite Frontier Secret Files Vol 1 2",
      "2021",
      "5",
      "2",
      ""
    ),
    new ListEntry("Catwoman Vol 5 30", "2021", "6", "20", ""),
    new ListEntry(
      "DC Festival of Heroes: The Asian Superhero Celebration Vol 1 1",
      "2021",
      "7",
      "11",
      ""
    ),
    new ListEntry("Catwoman Vol 5 31", "2021", "7", "18", ""),
    new ListEntry("Catwoman Vol 5 32", "2021", "8", "15", ""),
    new ListEntry(
      "Infinite Frontier Secret Files Vol 1 1 (Digital)",
      "2021",
      "8",
      "29",
      ""
    ),
    new ListEntry(
      "Green Arrow 80th Anniversary 100-Page Super Spectacular Vol 1 1",
      "2021",
      "8",
      "29",
      ""
    ),
    new ListEntry("Infinite Frontier Vol 1 2", "2021", "9", "13", ""),
    new ListEntry("Catwoman Vol 5 33", "2021", "9", "20", ""),
    new ListEntry("Infinite Frontier Vol 1 3", "2021", "9", "27", ""),
    new ListEntry("Catwoman Vol 5 34", "2021", "10", "17", ""),
    new ListEntry("Infinite Frontier Vol 1 5", "2021", "10", "31", ""),
    new ListEntry("Batman: Fear State: Alpha Vol 1 1", "2021", "10", "31", ""),
    new ListEntry("Catwoman Vol 5 35", "2021", "11", "21", ""),
    new ListEntry("Catwoman Vol 5 36", "2021", "12", "19", ""),
    new ListEntry("Catwoman Vol 5 37", "2022", "1", "23", ""),
    new ListEntry("Catwoman Vol 5 38", "2022", "2", "21", ""),
    new ListEntry("Deathstroke Inc. Vol 1 5", "2022", "3", "25", ""),
    new ListEntry("Catwoman Vol 5 49", "2023", "1", "15", ""),
    new ListEntry("Catwoman Vol 5 50", "2023", "2", "20", ""),
    new ListEntry("Detective Comics Vol 1 1069", "2023", "4", "28", ""),
    new ListEntry("Detective Comics Vol 1 1070", "2023", "5", "28", ""),
    new ListEntry("Green Arrow Vol 7 1", "2023", "6", "25", ""),
    new ListEntry("Green Arrow Vol 7 2", "2023", "7", "23", ""),
    new ListEntry("Green Arrow Vol 7 3", "2023", "8", "27", ""),
    new ListEntry("Knight Terrors: Batman Vol 1 2", "2023", "10", "1", ""),

    new ListEntry("Green Arrow Vol 7 4", "2023", "11", "26", ""),
    new ListEntry("Green Arrow Vol 7 5", "2023", "12", "24", ""),
    new ListEntry("Detective Comics Vol 1 1077", "2024", "1", "14", ""),
    new ListEntry("Green Arrow Vol 7 6", "2024", "1", "28", ""),
    new ListEntry("Detective Comics Vol 1 1078", "2024", "1", "28", ""),
    new ListEntry("Detective Comics Vol 1 1079", "2024", "2", "12", ""),
    new ListEntry(
      "Titans: Beast World Tour: Star City Vol 1 1",
      "2024",
      "3",
      "23",
      ""
    ),
    new ListEntry("Green Arrow Vol 7 10", "2024", "5", "26", ""),
    new ListEntry("Green Arrow Vol 7 11", "2024", "6", "23", ""),
    new ListEntry("Green Arrow Vol 7 12", "2024", "7", "28", ""),
    new ListEntry("Green Arrow Vol 7 13", "2024", "8", "25", ""),
    new ListEntry("Green Arrow Vol 7 14", "2024", "9", "24", ""),
    new ListEntry("Green Arrow Vol 7 15", "2024", "10", "28", ""),
    new ListEntry("Green Arrow Vol 7 16", "2024", "11", "25", ""),
    new ListEntry("Green Arrow Vol 7 17", "2024", "12", "23", ""),
    new ListEntry("Green Arrow 2024 Annual Vol 7 1", "2025", "1", "6", ""),
    new ListEntry("Green Arrow Vol 7 26", "2025", "9", "23", ""),
    new ListEntry("Titans 2025 Annual Vol 4 1", "2025", "9", "30", ""),
    new ListEntry("Green Arrow Vol 7 27", "2025", "10", "27", ""),
    new ListEntry(
      "Cheetah & Cheshire Rob the Justice League Vol 1 2",
      "2025",
      "11",
      "3",
      ""
    ),
  ];

  return assert(isEqual(result, expected));
});
