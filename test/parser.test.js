import test from "node:test";
import assert from "node:assert";
import { TemplateParser, Template, Peekable } from "../load";
import { isEqual } from "lodash-es";

test("consumeIf", (_) => {
  const template = "ABC";
  let parser = new TemplateParser(template);
  return (
    assert.deepEqual(true, parser.consumeIf("A")) &&
    assert.deepEqual("B", parser.src.next())
  );
});

test("Parse single level template w/ key & value", (_) => {
  const template = "{{Name|Key = Value}}";
  let parser = new TemplateParser(template);
  let res = parser.parse(true);
  let expected = new Template();
  expected.setName("Name");
  expected.set("Key", "Value");

  return isEqual(res, expected);
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
