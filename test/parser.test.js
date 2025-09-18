import test from "node:test";
import assert from "node:assert";
import { TemplateParser, Template, Peekable } from "../load";

test("consumeIf", (_) => {
  const template = "{{Name|Key = Value}}";
  let parser = new TemplateParser(template);
  return assert.deepEqual(true, parser.consumeIf("{"));
  // TODO: Add a test this returns true
});

// FIXME: Name needs to not have a bracket attatched. I suspect this happens because the second bracket is still not being skipped properly
// FIXME: Parser seems to be recurring way more often than it should. Maybe where it starts recurring needs to be tweaked
test("Parse single level template w/ key & value", (_) => {
  const template = "{{Name|Key = Value}}";
  let parser = new TemplateParser(template);
  let res = parser.parse();
  let expected = new Template();
  expected.setName("Name");
  expected.set("Key", "Value");
  // console.log(res);
  // console.log(expected);
  console.log(res.toString());
  console.log(res === expected);
});

test("Parse single level template only name", (_) => {
  const template = "{{Name}}";
});

test("Parse 1 level nested template", (_) => {
  const template = "{{Name|Key = {{value}}}}";
});

test("Parse 3 level nested template", (_) => {
  const template = "{{Name|Key = {{Name1|Key1 = {{Name2|Key2 = {{Value}}}}}}}}";
});
