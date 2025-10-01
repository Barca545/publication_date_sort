import test from "node:test";
import assert from "node:assert";
import { TemplateParser, Template } from "../parser";
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
  const res = new TemplateParser(template).parse(true);
  let expected = new Template();
  expected.setName("Name");
  expected.set("Key", "Value");

  // console.log("res");
  // console.log(res);
  // console.log("expected");
  // console.log(expected);

  return assert(isEqual(res, expected));
});

test("Parse single level template only name", (_) => {
  const template = "{{Name}}";
  const res = new TemplateParser(template).parse(true);
  let expected = new Template().setName("Name");

  // console.log("res");
  // console.log(res);
  // console.log("expected");
  // console.log(expected);

  return assert(isEqual(res, expected));
});

test("Parse 2 level nested template only name", (_) => {
  const template = "{{Name|Key = {{Value}}}}";
  const res = new TemplateParser(template).parse(true);
  let expected = new Template();
  expected.setName("Name");
  expected.set("Key", new Template().setName("Value"));

  // console.log("res");
  // console.log(res);
  // console.log("expected");
  // console.log(expected);

  return assert(isEqual(res, expected));
});

test("Parse 3 level nested template", (_) => {
  const template = "{{Name|Key = {{Name1|Key1 = {{Name2|Key2 = {{Value}}}}}}}}";
  const res = new TemplateParser(template).parse(true);
  let expected = new Template();
  let name2 = new Template()
    .setName("Name2")
    .set("Key2", new Template().setName("Value"));
  let name1 = new Template().setName("Name1").set("Key1", name2);
  expected.setName("Name").set("Key", name1);

  return assert(isEqual(res, expected));
});

// function assert_eq(a, b) {
//   if (isEqual(a, b)) {
//     return true;
//   }

// }
