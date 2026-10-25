# Test Plan: Task Board

## Objective

Verify that users can create, complete, and filter tasks.

## Acceptance Scenarios

### TC-01: Add a task with a valid title

Given the task board is open
When the user enters a title and submits the form
Then the task appears in the task list

### TC-02: Reject an empty task title

Given the task board is open
When the user submits the form without a title
Then the task is not added
And the validation message "Enter a task title." is shown

### TC-03: Complete a task

Given a task appears in the task list
When the user marks it as complete
Then the task is visibly marked as complete

### TC-04: Filter tasks

Given the task list contains active and completed tasks
When the user selects a status filter
Then only tasks matching that status are shown
