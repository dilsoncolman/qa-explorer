# BUG-001: Task Board accepts an empty task title

## Summary

Submitting the task form with an empty title creates a task named `(empty task)` instead of rejecting the submission.

## Environment

- Application: Local QA Explorer Task Board
- URL: `http://127.0.0.1:4173`
- Browser: Chromium, launched by Playwright
- Reproducibility: Reproduced during manual exploration and by automated test `TC-02`

## Preconditions

- The Task Board is open.
- The task list is empty.

## Steps to Reproduce

1. Leave the **Task title** field empty.
2. Select **Add task**.

## Expected Result

- No task is added.
- The validation message `Enter a task title.` is displayed.

## Actual Result

- One task is added and displayed as `(empty task)`.
- No validation message is displayed.

## Evidence

- Playwright test `TC-02` expected 0 list items and received 1 at `tests/task-board.spec.ts:18`.
- The Trace Viewer snapshot shows `(empty task)` after the form submission.
- The page request to `127.0.0.1:4173` returned HTTP 200 in 94 ms.
- The browser Console contained no entries during this run.

## Impact

Users can create tasks without a meaningful title, which makes the task list harder to understand and manage.

## Status

Confirmed. Fix not applied yet.
