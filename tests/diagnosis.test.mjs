import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import ts from "typescript";

// Run the actual domain module without a Next.js server or an extra test dependency.
const compiled = ts.transpileModule(
  readFileSync("src/lib/existential.ts", "utf8"),
  { compilerOptions: { module: ts.ModuleKind.CommonJS } },
).outputText;
const domain = {};
new Function("exports", compiled)(domain);
const { diagnose, diagnoseFromScores, FACTOR_ORDER, QUESTIONS, toPercentile } = domain;
const from = (values) => diagnoseFromScores(Object.fromEntries(
  FACTOR_ORDER.map((factor, index) => [factor, values[index]]),
));

test("20 questions contain five items per factor and preserve score anchors", () => {
  assert.equal(QUESTIONS.length, 20);
  assert.equal(new Set(QUESTIONS.map((q) => q.id)).size, 20);
  for (const factor of FACTOR_ORDER) {
    assert.equal(QUESTIONS.filter((q) => q.factor === factor).length, 5);
  }
  assert.deepEqual([5, 15, 25].map(toPercentile), [0, 50, 100]);
  for (const [answer, expected] of [[1, "meaning-seeker"], [3, "balanced-observer"], [5, "integrated-existence"]]) {
    assert.equal(diagnose(Array(20).fill(answer)).type.id, expected);
  }
});

test("three equally high factors never imply all four are high", () => {
  for (let low = 0; low < 4; low++) {
    const values = [25, 25, 25, 25];
    values[low] = 5;
    assert.equal(from(values).type.id, "balanced-observer");
  }
});

test("all six distinct leading pairs retain their own classification", () => {
  const cases = [
    [[25, 25, 5, 5], "aesthetic-practitioner"],
    [[25, 5, 25, 5], "solitary-architect"],
    [[25, 5, 5, 25], "autonomous-creator"],
    [[5, 25, 25, 5], "introspective-thinker"],
    [[5, 25, 5, 25], "solitary-witness"],
    [[5, 5, 25, 25], "existential-resolve"],
  ];
  for (const [values, expected] of cases) assert.equal(from(values).type.id, expected);
});

test("every valid score combination respects integration and tie constraints", () => {
  const reachable = new Set();
  const single = new Set(["creative-realizer", "world-receiver", "fate-dialogist", "self-contained"]);
  for (let c = 5; c <= 25; c++) for (let e = 5; e <= 25; e++)
    for (let a = 5; a <= 25; a++) for (let u = 5; u <= 25; u++) {
      const values = [c, e, a, u];
      const result = from(values);
      reachable.add(result.type.id);
      if (result.type.id === "integrated-existence") {
        assert.ok(values.every((score) => toPercentile(score) >= 65));
        assert.ok(Math.max(...values) - Math.min(...values) <= 3);
      }
      if (single.has(result.type.id)) {
        assert.equal(values.filter((score) => score === Math.max(...values)).length, 1);
      }
    }
  assert.equal(reachable.size, 13);
});
