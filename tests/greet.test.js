import test from "node:test";
import assert from "node:assert";
import { greet } from "../public/greet.js";

test("Hello, World!", () => {
  assert.strictEqual(greet("World"), "Hello, World!");
});