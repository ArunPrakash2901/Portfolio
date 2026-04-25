import test from 'node:test';
import assert from 'node:assert/strict';

import { isAmbientBackgroundRoute } from '../lib/ambientRoute.js';

test('ambient background only applies to dynamic content routes', () => {
  assert.equal(isAmbientBackgroundRoute('/projects/icu-mortality'), true);
  assert.equal(isAmbientBackgroundRoute('/experiments/kinematic-flow'), true);
  assert.equal(isAmbientBackgroundRoute('/writing/my-note'), true);

  assert.equal(isAmbientBackgroundRoute('/'), false);
  assert.equal(isAmbientBackgroundRoute('/projects'), false);
  assert.equal(isAmbientBackgroundRoute('/blog/post'), false);
});
