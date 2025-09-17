import fs from "fs";
import convert from "xml-js";
import process from "process";
import { ListEntry } from "./pub-sort.js";
import { match, None, Some, unwrap, Option } from "./option.js";
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
  #src: Peekable<string>;
  #data: Template;

  constructor(src: string) {
    // This spread syntax converts the string into an array
    this.#src = new Peekable([...src]);
    this.#data = new Template();
  }

  // Parse until a '{' is encountered while (const ch = this.#src.next()) { switch (ch) case '{': {
  // Start parsing template } case '|':{
  // Push the most recent pair of key/value
  // TODO: Templates dont have a trim method so this needs a slight refactor.
  // TODO: Should exit when encounter }} and return the result
  // TODO: Really the ones that encounter {{ or }} need to peek ahead to check the next char then recursively call parse.
  parse(): Template {
    let phase = ParsingStage.Name;
    // These are for storing values currently being parsed
    // In the case of parsing a template, it is just appended to the template not tracked by value
    let key = "";
    let value = "";
    let name = "";

    let tmplt = new Template();

    for (const ch of this.#src) {
      // FIXME: Should not include the brackets in names and values
      // FIXME: Seems like it fails to save because return template is empty
      // That might just be a display error. I need to add a toString method for Templates

      switch (ch) {
        case "|": {
          console.log(name);
          // Add the name if we were just parsing a value
          if (phase == ParsingStage.Name) {
            tmplt.setName(name);
          }
          // Add the previous data if we were just parsing a value
          if (phase == ParsingStage.Value) {
            tmplt.set(key.trim(), value.trim());
          }

          // We're parsing a new key so reset things
          phase = ParsingStage.Key;
          key = "";
        }
        case "=": {
          if (phase == ParsingStage.Name) {
            tmplt.setName(name);
          }
          // We're parsing a new value so reset things
          phase = ParsingStage.Value;
          value = "";
        }
        // TODO: Ensure this early returns
        case "}": {
          if (this.#src.peek() == "}") {
            if (phase == ParsingStage.Name) {
              tmplt.setName(name);
            }
            // Need to consume the following '}' token
            let _ = this.#src.next();
            // Add the previous data if we were just parsing a value
            if (phase == ParsingStage.Value) {
              tmplt.set(key.trim(), value.trim());
            }
            break;
          }
          // FIXME: I need to handle this case, I think the answer is just push to the string
        }
        case "{": {
          // FIXME: Need to handle this case, it should recur and start parsing a new template
          if (this.#src.peek() == "{") {
            phase = ParsingStage.Key;
            // Need to consume the following '{' token
            let _ = this.#src.next();
            // FIXME: This is really more of a problem with figuring out how to store templates
            let inner = this.parse();
            // Store the template value
            tmplt.set(key.trim(), inner);
          }
          // FIXME: I need to handle this case, I think the answer is just push to the string
        }
        default: {
          switch (phase) {
            case ParsingStage.Name: {
              name += ch;
            }
            case ParsingStage.Key: {
              key += ch;
            }
            case ParsingStage.Value: {
              value += ch;
            }
          }
        }
      }
    }
    return tmplt;
  }
}

export class Template {
  #name: Option<string>;
  // Ok anoyingly it needs a base case where a string is accepted
  #data: Map<string, Template | string>;

  constructor() {
    this.#name = None;
    this.#data = new Map();
  }

  get(key: string): Option<Template | string> {
    const res = this.#data.get(key);

    if (res === undefined) {
      return new None();
    } else {
      return new Some(res);
    }
  }

  setName(name: string) {
    this.#name = new Some(name);
  }

  /** Set a value in the template. If the field is already assigned, replace the value. */
  set(key: string, val: Template | string) {
    this.#data.set(key, val);
  }

  log() {
    // TODO: This has to loop through the key value pairs and append them. just printing data returns the Map
    console.log(`{{${unwrap(this.#name)}}| ${this.#data}}}`);
  }
}

// TODO: Move to separate file
export class Peekable<T> {
  #iter: Iterator<T>;
  // This stores the result of calling the underlying iterators next method
  #peeked: Option<IteratorResult<T>>;

  constructor(iter: Iterable<T>) {
    this.#iter = iter[Symbol.iterator]();
    this.#peeked = None;
  }

  next(): IteratorResult<T> {
    if (this.#peeked instanceof Some) {
      // FIXME: This needs to actually confirm it is done
      // return { value: unwrap(this.#peeked), done: false };
      const res = unwrap(this.#peeked);
      // We're taking the peeked value so it's gone now
      this.#peeked = None;
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
        return new Some(res);
      }
    );
  }

  // This is basically into_iter() it returns the underlying iterator the struct contains
  [Symbol.iterator]() {
    return this;
  }
}

enum ParsingStage {
  Name,
  Key,
  Value,
}
