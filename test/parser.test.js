import test from "node:test";
import { TemplateParser, Template, Peekable } from "../load";

test("Parse single level template w/ key & value", (_) => {
  const template = "{{Name|Key = Value}}";
  let parser = new TemplateParser(template);
  let res = parser.parse();
  let expected = new Template();
  expected.setName("Name");
  expected.set("Key", "Value");
  // console.log(res);
  // console.log(expected);
  res.log();
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
