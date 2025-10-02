import fs from "fs";
import convert from "xml-js";
import { ListEntry } from "./pub-sort.js";
import { TemplateParser } from "./parser.js";

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
  const issue = template
    .get("Issue")
    .unwrap_or(template.get("Chapter").unwrap_or("")) as string;
  let digital = "";

  if (template.getName().unwrap() == "DC Database:Comic Template") {
    digital = " (Digital)";
  }
  return new ListEntry(
    `${title} Vol ${vol} ${issue}${digital}`,
    template.get("Year").unwrap_or("") as string,
    template.get("Month").unwrap_or("") as string,
    template.get("Day").unwrap_or("") as string,
    template.get("Link").unwrap_or("") as string
  );
}
