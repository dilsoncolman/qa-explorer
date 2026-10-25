# QA Explorer: Local AI Test Triage

QA Explorer is a small portfolio project that combines browser automation with a local language model. Playwright checks a sample task board, and a Node.js agent uses a local Ollama model to summarize failed tests and suggest a next investigation step.

The agent does not edit application code, change tests, or approve lessons. A human reviews every suggestion.

## What the project demonstrates

- Writing browser tests with Playwright and accessible roles.
- Checking expected and actual behavior from a failed assertion.
- Reproducing and documenting a functional bug.
- Sending structured failure evidence to a local model.
- Keeping approved lessons separate from unreviewed AI suggestions.
- Verifying a fix with a regression test.

## Technology

- Node.js
- Playwright Test
- Ollama
- Qwen3 1.7B, run locally

No paid AI API or API key is used. Ollama downloads the model once; later triage requests run on the local machine.

## Requirements

- Node.js and npm
- Ollama for Windows
- The Qwen3 1.7B model

## Setup

From the project directory, install the Node.js dependencies and the Playwright Chromium browser:

    npm install
    npx playwright install chromium

Download the local model once:

    ollama pull qwen3:1.7b

## Run the browser tests

    npx playwright test

Playwright starts the sample app automatically and writes a JSON report to **test-results/report.json**. It also saves an HTML report and a trace for failed tests.

The sample app can also be started manually:

    npm run start:app

Then open http://127.0.0.1:4173.

## Run the QA agent

After a Playwright run, execute:

    npm run qa:agent

When all tests pass, the agent records the green run and skips AI triage. When tests fail, it sends the failed test title, location, browser project, error message, and relevant approved lessons to Ollama at **http://127.0.0.1:11434/api/generate**.

For each failure, the local model returns a structured triage with:

- A category: application bug, test issue, environment issue, or unclear.
- A short hypothesis and supporting evidence.
- One concrete next check.
- An optional proposed lesson.

The model response is validated before it is displayed. Invalid responses are rejected and recorded as unavailable triage.

## Learning and human review

- **agent-memory/lessons.json** contains approved lessons. The agent only uses lessons with the status **approved**.
- **agent-memory/runs.jsonl** stores a local history of test summaries, failures, and triage results. The generated history file is ignored by Git.
- AI lesson proposals are not added to **lessons.json** automatically. Review the evidence, confirm a fix, and verify it with a regression test before approving a new lesson.

The model can still make mistakes. Treat its classification and hypothesis as suggestions, not as proof of root cause.

## Example learning cycle

1. Run the Playwright suite and inspect the report.
2. Reproduce the empty-title bug documented in **docs/bug-reports/BUG-001-empty-task-title.md**.
3. Run the agent to receive a local triage proposal.
4. Review the proposal against the test plan and approved lessons.
5. Restore the validation fix and rerun the suite.
6. Run the agent again to record the green result.

## Current test cases

- **TC-01:** Add a task with a valid title.
- **TC-02:** Reject an empty task title and show a validation message.
- **TC-03:** Mark a task as complete.
- **TC-04:** Filter active and completed tasks.

See **docs/test-plan.md** for the test plan.

## Configuration

The agent defaults to the Qwen3 1.7B model and the local Ollama API. Override these values in PowerShell if needed:

    $env:QA_AGENT_MODEL = 'qwen3:1.7b'
    $env:QA_AGENT_OLLAMA_URL = 'http://127.0.0.1:11434'

The agent analyzes Playwright's failure report; it does not inspect trace files, screenshots, browser console entries, or network logs automatically.
