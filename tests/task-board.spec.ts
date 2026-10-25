import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('TC-01: adds a task with a valid title', async ({ page }) => {
  await page.getByLabel('Task title').fill('Review the test plan');
  await page.getByRole('button', { name: 'Add task' }).click();

  await expect(page.getByRole('listitem')).toHaveCount(1);
  await expect(page.getByRole('listitem')).toContainText('Review the test plan');
});

test('TC-02: rejects an empty task title', async ({ page }) => {
  await page.getByRole('button', { name: 'Add task' }).click();

  await expect(page.getByRole('listitem')).toHaveCount(0);
  await expect(page.getByRole('alert')).toHaveText('Enter a task title.');
});

test('TC-03: marks a task as complete', async ({ page }) => {
  await page.getByLabel('Task title').fill('Write test cases');
  await page.getByRole('button', { name: 'Add task' }).click();

  const completeCheckbox = page.getByRole('checkbox', {
    name: 'Complete task: Write test cases',
  });
  await completeCheckbox.check();

  await expect(completeCheckbox).toBeChecked();
});

test('TC-04: filters active and completed tasks', async ({ page }) => {
  await page.getByLabel('Task title').fill('Prepare report');
  await page.getByRole('button', { name: 'Add task' }).click();

  await page.getByLabel('Task title').fill('Review test plan');
  await page.getByRole('button', { name: 'Add task' }).click();

  await page.getByRole('checkbox', { name: 'Complete task: Prepare report' }).check();

  await page.getByLabel('Filter tasks').selectOption('completed');
  await expect(page.getByRole('listitem')).toHaveCount(1);
  await expect(page.getByRole('listitem')).toContainText('Prepare report');

  await page.getByLabel('Filter tasks').selectOption('active');
  await expect(page.getByRole('listitem')).toHaveCount(1);
  await expect(page.getByRole('listitem')).toContainText('Review test plan');
});
