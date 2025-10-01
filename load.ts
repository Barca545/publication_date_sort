import fs from "fs";
import convert from "xml-js";
import process from "process";
import { ListEntry } from "./pub-sort.js";
import { match, None, Some, Option } from "./option.js";
// import Wikiapi from "wikiapi";
import wtf from "wtf_wikipedia";
import { TemplateParser } from "./parser.js";
import { list } from "fs-jetpack";
// // import ParseMediawikiTemplate from "parse-mediawiki-template";
// // import ParseMediawikiTemplate from "parse-mediawiki-template"
// // const parseMediawikiTemplate = require('parse-mediawiki-template')
// // const { default: ParseMediawikiTemplate } = await import("parse-mediawiki-template");

// // TODO: Load a file from fandom
// // TODO: Rename to something reflecting it also generates the list

// This probably does not need to be its own function. it's one line that is only used once
/**
 * Load an xml file from the provided path and load
 */
export function loadJson(path: string): any {
  // Load the XML file as a string then convert it to a JSON string then convert it into an object
  return JSON.parse(
    convert.xml2json(fs.readFileSync(path, "utf-8"), {
      compact: true,
      spaces: 4,
    })
  );
}

/**
 * Parses a JSON string of appearance data into a list of ListEntrys.
 * @param json
 * @returns
 */
export function loadList(path: string): ListEntry[] {
  // Load the file
  const json = loadJson(path);

  // Convert each appearance into a list entry
  let appearances: ListEntry[] = [];
  for (const entry of json["mediawiki"]["page"]) {
    appearances.push(
      templateStringToListEntry(entry["revision"]["text"]["_text"] as string)
    );
  }
  return appearances;
}

function templateStringToListEntry(data: string): ListEntry {
  const template = new TemplateParser(data).parse(true);
  const title = template.get("Title").unwrap() as string;
  const vol = template.get("Volume").unwrap() as string;
  const issue = template.get("Issue").unwrap() as string;

  return new ListEntry(
    `${title} Vol ${vol} ${issue}`,
    template.get("Year").unwrap_or("") as string,
    template.get("Month").unwrap_or("") as string,
    template.get("Day").unwrap_or("") as string,
    template.get("Link").unwrap_or("") as string
  );
}
