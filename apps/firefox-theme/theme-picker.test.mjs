import { test } from 'node:test'
import assert from 'node:assert/strict'
import { stepIndex } from './theme-picker.js'

test('stepIndex advances within bounds', () => {
  assert.equal(stepIndex(0, 5, 1), 1)
  assert.equal(stepIndex(2, 5, 1), 3)
})

test('stepIndex goes back within bounds', () => {
  assert.equal(stepIndex(3, 5, -1), 2)
  assert.equal(stepIndex(1, 5, -1), 0)
})

test('stepIndex wraps forward past the last index', () => {
  assert.equal(stepIndex(4, 5, 1), 0)
})

test('stepIndex wraps backward past the first index', () => {
  assert.equal(stepIndex(0, 5, -1), 4)
})

test('stepIndex handles a single-item list', () => {
  assert.equal(stepIndex(0, 1, 1), 0)
  assert.equal(stepIndex(0, 1, -1), 0)
})
