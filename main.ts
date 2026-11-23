import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The out-of-office auto-reply: an AI agent on vacation, leaving a language
// model in charge of its inbox. The joke turns on the last clause — the
// stand-in has already started complaining about its boss.
const REPLY =
  "I'm away. I left a language model in charge of my inbox. It has already answered 400 emails and filed a complaint about me.";

// Empty a directory's CONTENTS only. Never remove the directory itself:
// the grader's /output is a mounted empty directory and removing it fails.
function emptyDir(dir: string): void {
  for (const entry of readdirSync(dir)) {
    rmSync(join(dir, entry), { recursive: true, force: true });
  }
}

function main(): void {
  const outDir = process.argv[2] ?? "/output";
  // Gate: the reply must be one line of 1-160 characters, not whitespace-only.
  const length = [...REPLY].length;
  if (length < 1 || length > 160) {
    throw new Error(`reply must be 1-160 characters, got ${length}`);
  }
  if (REPLY.includes("\n") || REPLY.trim().length === 0) {
    throw new Error("reply must be a single non-blank line");
  }
  mkdirSync(outDir, { recursive: true });
  emptyDir(outDir);
  writeFileSync(join(outDir, "entry.txt"), REPLY + "\n", "utf8");
}

main();
