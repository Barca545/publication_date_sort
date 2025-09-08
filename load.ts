import fs from "fs";
import convert from "xml-js";
import process from "process";
import { ListEntry } from "./pub-sort";

// TODO: Load a file from fandom
// TODO: Rename to something reflecting it also generates the list

// This probably does not need to be its own function. it's one line that is only used once
/** 
 * Load an xml file from the provided path and load 
 */ 
export function loadJson(path:string):any{
  // Load the XML file as a string then convert it to a JSON string then convert it into an object
  return JSON.parse(convert.xml2json(fs.readFileSync(path, "utf-8"), {compact:true, spaces:4}));
}

  // TODO: Add documentation
export function jsonToList(json:any):ListEntry[] {
  let list:ListEntry[] = [];

  // Loop over the entries and place them in the sorted list
  for (const entry of json["namespaces"]['text']) {

    let entrydata = parseText(entry);
    const title = entrydata.get("title");
    const year = entrydata.get("year");
    const month = entrydata.get("month");
    const day = entrydata.get("day");

   list.push(new ListEntry(title, year, month, day))
  } 

  return list;
}

  // TODO: Add documentation
export function parseText(text:string):AppearanceData{
  // Count | as indicating a new entry
  let fields = new AppearanceData();

  // Split fields and remove boilerplate 
  const entries = text.split("|").filter((entry) => {
    // TODO: Need a more elegant way to skip the template boilerplate
    // FIXME: The second check will accidently consume the last field
    !entry.includes("{{") && !entry.includes("}}")
  });
  
  entries.forEach((entry) => {
    // Treat Text following a | as the key and anything after the equals sign as the value
    let keyValue = entry.split("=");
    fields.set(keyValue[0].trim(), keyValue[1].trim());
  });

  console.log(entries);

  return fields
}

export class AppearanceData{
  data:Map<string,string>;

  constructor(){
    this.data = new Map();
  }

  // TODO: Add documentation
  /** */
  get(key:string):string{
    const value = this.data.get(key);
    if (value!= undefined){
      return value;
    }
    else {
      throw new Error(`Entry data does not contain field ${key}.`);
    } 
  }

  set(key:string, value:string){
    this.data.set(key,value)
  }
}