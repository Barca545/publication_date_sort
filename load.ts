import fs from "fs";
import convert from "xml-js";
import process from "process";
import { ListEntry } from "./pub-sort.js";
import { match, None, Some, Option } from "./option.js";
// import Wikiapi from "wikiapi";
import wtf from "wtf_wikipedia";
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

// /**
//  * Parses a JSON string of appearance data into a list of ListEntrys.
//  * @param json
//  * @returns
//  */
// export async function jsonToList(json: any) {
//   // :ListEntry[] {
//   // let list:ListEntry[] = [];

//   // // Loop over the entries and place them in the sorted list
//   // for (const entry of json["mediawiki"]["page"]) {
//   //   const entrydata = parseText(entry["revision"]["text"]["_text"]);
//   //   console.log(entrydata);

//   //   const title = unwrap(entrydata.get("Title"));
//   //   const vol = unwrap(entrydata.get("Volume"));
//   //   const issue = match(entrydata.get("Issue"), (issue) => {return issue}, () => {
//   //     return match(entrydata.get("Chapter"), (chap) => {return chap}, () => "")
//   //   });
//   //   const year = match(entrydata.get("Year"), (year) => {return year}, () => {return ""});
//   //   const month = match(entrydata.get("Month"), (month) => {return month}, () => {return ""});
//   //   const day = match(entrydata.get("Day"), (day) => {return day}, () => {return ""});
//   //   const link = "";

//   //  list.push(new ListEntry(title + " Vol " + vol + " Issue " + issue, year, month, day, link))
//   // }
//   // return list;
//   parseComicTemplate(json["revision"]["text"]["_text"]);
// }

// /**
//  * Parse the text section of a DC Wiki Appearance template into a table of data.
//  * @param tmpl
//  * @returns AppearanceData
//  */
// export function parseComicTemplate(tmpl: string): ComicTemplate[] {
//   let tmpls = [];

//   let cur = "";
//   let peek = "";

//   // Iterate over the string char by char
//   for (let i = 0; i < tmpl.length; i++) {
//     cur = tmpl[i];
//     // TODO: Need to handle when on penultimate character
//     peek = tmpl[i + 1];

//     // If {{ is detected recursively parseTemplate
//     if (cur == "{" && peek == "{") {
//       // Pass it the current string
//       const tmpl = parseTemplate();
//     }
//   }

//   return tmpls;

//   // Count | as indicating a new entry
//   // let fields = new Promise(() => {
//   //   let res = await wtf.fetch("Category:Evelyn_Scott_(Prime_Earth)/Appearances", {domain:"https://dc.fandom.com"})
//   // });

//   // try {
//   //   let res = wtf.fetch("Category:Evelyn_Scott_(Prime_Earth)/Appearances", {domain:"https://dc.fandom.com"})
//   //   console.log(res)
//   //   // if (res instanceof wtf.Document){
//   //   //   console.log(res.json())
//   //   // }
//   // }
//   // catch (err) {
//   //   throw new Error("Lookup failed" + err)
//   // }

//   // if (res instanceof wtf.Document){
//   //   res.json()
//   //   console.log(res.json())
//   // forEach((entry) => {
//   //   // Treat Text following a | as the key and anything after the equals sign as the value
//   //   let keyValue = entry.split("=").map((entry) => entry.trim());
//   //   fields.set(keyValue[0], keyValue[1]);
//   // });
//   // }

//   // .then((doc) => {
//   //   if (doc instanceof wtf.Document){
//   //     return doc
//   //   }
//   // }).catch((err) => {
//   //   throw new Error(err)
//   // });

//   // Split fields and remove boilerplate
//   // Splitting at }} should mean it is not included in the resulting array
//   // FIXME: This does not work because other templates might use the }} before the final closing one
//   // Pattern might be any }} following a | without a {{ between them

//   // let pat = /\||}}/;

//   // const entries = text.split(pat).filter((entry) => {
//   //   // FIXME: Need a more elegant way to skip the template boilerplate
//   //   return !entry.includes("{{") && entry.length > 0;
//   // });

//   // let entries = ParseMediawikiTemplate(text, "DC Database:Comic Template")[0];

//   // entries.forEach((entry) => {
//   //   // Treat Text following a | as the key and anything after the equals sign as the value
//   //   let keyValue = entry.split("=").map((entry) => entry.trim());
//   //   fields.set(keyValue[0], keyValue[1]);
//   // });

//   // const parsedText = ParseMediawikiTemplate(text, "DC Database:Comic Template");
//   // console.log(parsedText)

//   // console.log(parsed[0]["Title"]);
//   // parsed
//   // ParseMediawikiTemplate(text, "DC Database:Comic Template")
//   // return fields;
// }

// // TODO: This is the top level parser
// function parseTemplate(tmpl: string) {
//   // Assume the first string is the name of the template and pattern match on it
//   // Anything after the first | is a field
//   // }} terminates parsing the current template
//   // TODO: Only remaining tricky thing is handling the links for now just consume them as text
// }

// // TODO: Ideally it'd be cool if we didn't need to hardcode this
// export class ComicTemplate {
//   name = "DC Database:Comic Template";
//   data: Map<string, string>;

//   constructor() {
//     this.data = new Map();
//   }

//   /** Retrieve an element from the AppearanceData.*/
//   get(key: string): Option<string> {
//     const value = this.data.get(key);
//     if (value != undefined) {
//       return new Some(value);
//     } else {
//       // throw new Error(`Entry data does not contain field ${key}.`);
//       return new None();
//     }
//   }

//   /** Insert an element into the AppearanceData.*/
//   set(key: string, value: string) {
//     this.data.set(key, value);
//   }

//   // TODO: Make special display to show the actual fields
// }

export class TemplateParser {
  /**readonly*/ src: Peekable<string>;
  /**private*/ data: Template;

  constructor(src: string) {
    // This spread syntax converts the string into an array
    this.src = new Peekable([...src]);
    this.data = new Template();
  }

  // Parse until a '{' is encountered while (const ch = this.#src.next()) { switch (ch) case '{': {
  // Start parsing template } case '|':{
  // Push the most recent pair of key/value
  parse(top_level: boolean): Template {
    // This is sort of brute force but it's needed to ensure the top level name does not contain {{
    if (top_level) {
      this.consumeIf("{");
      this.consumeIf("{");
    }
    let phase = ParsingStage.Identifier;
    // These are for storing values currently being parsed
    // In the case of parsing a template, it is just appended to the template not tracked by value
    let key = "";
    let value: string | Template = "";
    let name = "";

    let tmplt = new Template();

    for (const ch of this.src) {
      if (phase === ParsingStage.Value && ch === "{" && this.consumeIf("{")) {
        // If true, this marks the beginning of a new template and tell the function to recur
        value = this.parse(false);
        phase = ParsingStage.Identifier;
      } else if (ch === "|" && phase === ParsingStage.Identifier) {
        // This signifies we are done parsing the identifier and can switch to parsing the first entry
        // TODO: Might be edge cases if there are "|"s in identifiers
        tmplt.setName(name.trim());
        phase = ParsingStage.Key;
      } else if (ch === "|" && phase != ParsingStage.Identifier) {
        // Store the old (key, value) pair
        // Trim the value if it is a string
        if (typeof value === "string") {
          value = value.trim();
          phase = ParsingStage.Key;
        }
        // If there is no key the key value should be the length
        if (key === "") {
          key = tmplt.size().toString();
        }
        tmplt.set(key.trim(), value);

        // Reset for the new (key, value) pair
        key = "";
        value = "";
      } else if (ch === "=" && phase === ParsingStage.Key) {
        phase = ParsingStage.Value;
      } else if (
        phase === ParsingStage.Value &&
        ch === "}" &&
        this.consumeIf("}")
      ) {
        // Trim the value if it is a string
        if (typeof value === "string") {
          value = value.trim();
        }
        // Store the final (key, value) pair
        tmplt.set(key.trim(), value);
      } else {
        switch (phase) {
          case ParsingStage.Identifier: {
            name += ch;
            break;
          }
          case ParsingStage.Key: {
            key += ch;
            break;
          }
          case ParsingStage.Value: {
            value += ch;
            break;
          }
        }
      }
    }
    // console.log(("Whats here " + tmplt.get("Key").unwrap()) as string);
    return tmplt;
  }

  /**Consume the next character from the src iterator if it matches the expexted character. */
  consumeIf(expected: string): boolean {
    let res = this.src.peek();
    if (res.isSome() && res.unwrap() === expected) {
      // Actually consume by calling next and dropping the result
      let _ = this.src.next();
      return true;
    } else {
      return false;
    }
  }
}

export class Template {
  private name: Option<string>;
  private data: Map<string, Template | string>;

  constructor() {
    this.name = new None();
    this.data = new Map();
  }

  get(key: string): Option<Template | string> {
    if (this.data.size === 1) {
    }
    const res = this.data.get(key);

    if (res === undefined) {
      return new None();
    } else {
      return new Some(res);
    }
  }

  /**Return the name of the template. */
  getName(): Option<string> {
    return this.name;
  }

  /**Set the name of the Template. */
  setName(name: string) {
    this.name = new Some(name);
  }

  /** Set a value in the template. If the field is already assigned, replace the value. */
  set(key: string, val: Template | string) {
    this.data.set(key, val);
    // console.log(this.data.entries()); // console.log(`set called w/ \"${key}\"=\"${val}\"`);
  }

  size(): number {
    return this.data.size;
  }

  toString() {
    // TODO: This has to loop through the key value pairs and append them. just printing data returns the Map
    // console.log(JSON.stringify(Object.fromEntries(this.#data)));
    let data = "";
    for (const element of this.data) {
      if (data.length > 0) {
        data += "\n";
      }
      data += JSON.stringify(element);
    }

    return `Template{${this.name.unwrap()}| ${data}}`;
  }
}

// TODO: Move to separate file
export class Peekable<T> {
  #iter: Iterator<T>;
  // This stores the result of calling the underlying iterators next method
  #peeked: Option<IteratorResult<T>>;

  constructor(iter: Iterable<T>) {
    this.#iter = iter[Symbol.iterator]();
    this.#peeked = new None();
  }

  next(): IteratorResult<T> {
    if (this.#peeked.isSome()) {
      const res = this.#peeked.unwrap();
      // We're taking the peeked value so it's gone now
      // TODO: Give options a take method
      this.#peeked = new None();
      return res;
    } else {
      return this.#iter.next();
    }
  }

  peek(): Option<T> {
    return match(
      this.#peeked,
      (res) => {
        if (res.value === undefined) {
          return new None();
        } else {
          return new Some(res.value);
        }
      },
      () => {
        const res = this.#iter.next();
        this.#peeked = new Some(res);
        return new Some(res.value);
      }
    );
  }

  // This is basically into_iter() it returns the underlying iterator the struct contains
  [Symbol.iterator]() {
    return this;
  }
}

enum ParsingStage {
  Identifier,
  Key,
  Value,
}

// TODO: Delete writing console.log() got annoying
function dbg(message: any) {
  console.log(message);
}
