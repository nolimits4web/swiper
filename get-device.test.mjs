import test from 'node:test';
import assert from 'node:assert';
import { getDevice } from './src/shared/get-device.mjs';

test('性能测试：超长 userAgent 时执行时间应该足够短', () => {

  const str = 'iPad'.repeat(100000) + '\u0000';

  const start = performance.now();
  const deviceInfo = getDevice({ userAgent: str });
  const elapsed = performance.now() - start;
  console.log(`time taken: ${elapsed.toFixed(3)} ms`);


  assert.ok(elapsed < 50, `getDevice 执行过慢：${elapsed.toFixed(3)} ms`);

});
