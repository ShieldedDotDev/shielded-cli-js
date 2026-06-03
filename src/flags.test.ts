import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import test from 'node:test';

const binPath = path.resolve(__dirname, 'bin.js');
const parseErrorPattern = /error:\s+(unknown option|too many arguments|missing required argument)/i;

const runCli = (args: string[]) => spawnSync(process.execPath, [binPath, ...args], {
encoding: 'utf8',
env: {
...process.env,
SHIELDED_TOKEN: 'test-token'
},
timeout: 5000
});

void test('help output includes all defined flags', () => {
const result = runCli(['--help']);

assert.equal(result.status, 0);
assert.ok(result.stdout.includes('-e, --endpoint <url>'));
assert.ok(result.stdout.includes('-c, --color <color>'));
assert.ok(result.stdout.includes('-T, --title <title>'));
assert.ok(result.stdout.includes('-x, --text <text>'));
});

void test('long-form flags parse without commander errors', () => {
const result = runCli([
'--endpoint', 'http://127.0.0.1:9',
'--color', '00AA33',
'--title', 'Last Build',
'--text', 'ok'
]);

assert.doesNotMatch(`${result.stdout}\n${result.stderr}`, parseErrorPattern);
});

void test('short-form flags parse without commander errors', () => {
const result = runCli([
'-e', 'http://127.0.0.1:9',
'-c', '00AA33',
'-T', 'Last Build',
'-x', 'ok'
]);

assert.doesNotMatch(`${result.stdout}\n${result.stderr}`, parseErrorPattern);
});
