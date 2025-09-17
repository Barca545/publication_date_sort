import test from "node:test";
import {loadJson, jsonToList, parseComicTemplate} from "../load";
import fs from "fs";
import  assert  from "node:assert";
import { ListEntry } from "../pub-sort";

// TODO: Currently failing because the }} at the end of the page template is not being excised properly
test("Parse JSON Text Section", (_t) => {
  let text = fs.readFileSync(process.cwd() + "/test/test_text_data.txt", "utf-8");
  let result = parseComicTemplate(text);

  let expected = new Map();
  expected.set("Title", "Detective Comics");
  expected.set("Image", "Detective Comics Vol 1 1090.jpg");
  expected.set("Image2", "Detective Comics Vol 1 1090 Textless.jpg");
  expected.set("Links", "");

  return assert.deepEqual(result.data, expected);
})

test("load xml file as a JSON", (_t) => {
  const json = loadJson(process.cwd() + "/test/Scarlett Scott Apearances.xml");
  // TODO: Add this to the load function to get at the text
  // Will need to loop over numbers not just use 0
  const result = json["mediawiki"]["page"][0]["revision"]["text"]["_text"];
  
  const expected = fs.readFileSync(process.cwd() + "/test/test_scarlett_first_appearance_test.txt", "utf-8");
  
  return assert.deepEqual(result, expected);
})

test("Convert Parsed Text Section to list",(_t) => {
  const json = loadJson(process.cwd() + "/test/Scarlett Scott Apearances.xml");
  const result = jsonToList(json);
  const expected = [
    new ListEntry("Detective Comics Vol 1 Issue 1090","2024","12","23",""),
    new ListEntry("Detective Comics Vol 1 Issue 1091","2025","1","27", ""),
    new ListEntry("Detective Comics Vol 1 Issue 1092","2025","2","26", ""),
    new ListEntry("Detective Comics Vol 1 Issue 1093","2025","3","22", ""),
    new ListEntry("Detective Comics Vol 1 Issue 1095","2025","5","19", ""),
    new ListEntry("Detective Comics Vol 1 Issue 1096","2025","6","16", ""),
  ];

  return assert.deepEqual(result, expected);
})

