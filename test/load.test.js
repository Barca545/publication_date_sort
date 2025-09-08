import test from "node:test";
import {loadJson, jsonToList, parseText} from "../load";
import fs from "fs";
import  assert  from "node:assert";

// TODO: Make a type for the xml file
test("loadJSON", (_t) => {
  const json = loadJson("test/Scarlett Scott Apearances.xml");
  // TODO: Add this to the load function to get at the text
  // Will need to loop over numbers not just use 0
  // console.log(json["mediawiki"]["page"][0]["revision"]["text"]);
  // const list = jsonToList(json);
  // console.log(list);
  // TODO: Add assert
})



test("Parse Text Section", (_t) => {
  let text = fs.readFileSync(process.cwd() + "/test/test_text_data.txt", "utf-8");
  let result = parseText(text);

 console.log(JSON.stringify(result.get("Title")));

  let expected = new Map();
console.log(assert.deepEqual(result.data, expected));
  return assert.deepEqual(result.data, expected);
})

