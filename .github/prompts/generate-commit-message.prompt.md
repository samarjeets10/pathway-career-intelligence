---
name: Generate Commit Message
description: "Generate a structured, accurate Git commit message from staged changes and optional implementation context"
argument-hint: "Optional context, such as the intended feature or a draft commit message"
agent: "agent"
---
Review the currently staged Git changes and generate one polished commit message.

Use the staged diff, staged file list, and staged diff statistics as the source of truth. If additional context is provided below, use it to understand intent, but verify it against the actual changes and correct it when necessary.

Optional context:
${input}

Follow these rules:
- Inspect staged changes with `git diff --cached`, including file names, additions, deletions, and meaningful implementation details.
- Do not infer behavior that is not supported by the staged diff.
- Choose the most accurate Conventional Commits type (`feat`, `fix`, `refactor`, `test`, `docs`, `chore`, `perf`, `build`, or `ci`) and a concise scope when one is clear.
- Keep the subject imperative, specific, and no longer than 72 characters.
- Prefer one commit message that describes the complete staged change rather than listing every file mechanically.
- Explain the user-visible or architectural outcome first, then the important implementation details.
- Mention tests or validation only when the staged changes show them or the provided context explicitly states them. Never claim tests passed without evidence.
- Preserve project terminology and use the repository's existing naming conventions.

Return only this Markdown-formatted result:

```text
<type>(<scope>): <imperative summary>

- <important behavior or outcome>
- <important implementation detail>
- <validation or test detail, when supported>
```

Omit the scope when it is not clearly justified. Omit unsupported bullet points. Do not include analysis, alternative messages, file-by-file narration, or code fences around the final commit message.