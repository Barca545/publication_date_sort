import { Peekable } from "./iter.js";
import { None, Option, Some } from "./option.js";

export class TemplateParser {
  readonly src: Peekable<string>;
  // private data: Template;

  constructor(src: string) {
    // This spread syntax converts the string into an array
    this.src = new Peekable([...src]);
    // this.data = new Template();
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

    // FIXME: Should this return when }} is encounterd regardless of anything else?
    // If so the single name case and the key value case can merge
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
        // FIXME: I don't like making this assumption
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
      } else if (ch === "}" && this.consumeIf("}")) {
        // Should always have a name so this is fine
        tmplt.setName(name.trim());

        // If there is no key cannot insert
        if (key.length != 0) {
          // Trim the value if it is a string
          if (typeof value === "string") {
            value = value.trim();
          }
          // FIXME: Should require key have a unique value
          // Store the final (key, value) pair
          tmplt.set(key.trim(), value);
        }

        return tmplt;
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

  // FIXME: See if there us a way to make it so it is never possible to create a template without a name then make getName just return a string

  /**Return the name of the template. */
  getName(): Option<string> {
    return this.name;
  }

  /**Set the name of the Template. */
  setName(name: string): Template {
    this.name = new Some(name);
    return this;
  }

  /** Set a value in the template. If the field is already assigned, replace the value. */
  set(key: string, val: Template | string): Template {
    this.data.set(key, val);
    return this;
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

enum ParsingStage {
  Identifier,
  Key,
  Value,
}

// TODO: Delete writing console.log() got annoying
function dbg(message: any) {
  console.log(message);
}
