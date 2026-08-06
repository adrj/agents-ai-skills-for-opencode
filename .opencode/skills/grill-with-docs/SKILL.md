---
name: grill-with-docs
description: A relentless interview to sharpen a plan or design, which also creates docs (CONTEXT.md glossary and ADRs) as we go. Best for projects already in development where you need to extract domain knowledge and generate documentation simultaneously.
disable-model-invocation: true
license: MIT
compatibility: opencode
min_version: 1.0.0
scope: [project]
tags: [specification, interview, documentation, domain, adr]
metadata:
  source: https://github.com/mattpocock/skills/tree/main/skills/engineering/grill-with-docs
  adapted-for: opencode
---

Run a `/grilling` session, using the `/domain-modeling` skill to build and maintain `CONTEXT.md` and ADRs as decisions crystallize during the interview.

## During the Session

As each round of grilling resolves decisions:

- **New domain concept named?** → Add the term to `CONTEXT.md` glossary immediately.
- **Fuzzy term sharpened?** → Update `CONTEXT.md` right there.
- **Architectural decision made?** → Offer to generate an ADR: *"Quer que eu registre isso como ADR para referência futura?"*
- **Decision rejected with a load-bearing reason?** → Offer an ADR for that too, so future explorations don't re-suggest it.

The goal is to finish the session with both a complete design tree AND a populated `CONTEXT.md` + relevant ADRs — ready for `rfc-write` to generate the specification.
