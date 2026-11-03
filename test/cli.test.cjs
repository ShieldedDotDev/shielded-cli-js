const { test } = require("node:test");
const assert = require("node:assert/strict");
const { spawnSync } = require("node:child_process");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
function run(args, env = {}) {
	const result = spawnSync(
		process.execPath,
		[
			"--require",
			path.join(__dirname, "mock-fetch.cjs"),
			path.join(root, "dist/bin.js"),
			...args,
		],
		{
			encoding: "utf8",
			env: {
				...process.env,
				SHIELDED_TOKEN: "",
				SHIELDED_USER_TOKEN: "",
				...env,
			},
		},
	);
	if (result.error) throw result.error;
	return result;
}

for (const [name, args] of [
	[
		"long",
		[
			"--endpoint",
			"https://example.test/api",
			"--color",
			"aabbcc",
			"--title",
			"A title",
			"--text",
			"A text",
			"--key",
			"my-key",
			"--token",
			"explicit",
		],
	],
	[
		"short",
		[
			"-e",
			"https://example.test/api",
			"-c",
			"aabbcc",
			"-T",
			"A title",
			"-x",
			"A text",
			"-k",
			"my-key",
			"-t",
			"explicit",
		],
	],
]) {
	test(`${name} flags send the expected request`, () => {
		const result = run(args, {
			SHIELDED_TOKEN: "shield",
			SHIELDED_USER_TOKEN: "user",
		});
		assert.equal(result.status, 0, result.stderr);
		const lines = result.stdout.trim().split("\n");
		assert.deepEqual(JSON.parse(lines[0].slice("REQUEST ".length)), {
			url: "https://example.test/api",
			authorization: "token explicit",
			body: {
				title: "A title",
				text: "A text",
				color: "aabbcc",
				shield_key: "my-key",
			},
		});
		assert.equal(lines[1], "https://example.test/shield");
	});
}

test("token selection follows the key and environment", () => {
	for (const [args, env, token] of [
		[
			["--key", "key"],
			{ SHIELDED_TOKEN: "shield", SHIELDED_USER_TOKEN: "user" },
			"user",
		],
		[["--key", "key"], { SHIELDED_TOKEN: "shield" }, "shield"],
		[
			[],
			{ SHIELDED_TOKEN: "shield", SHIELDED_USER_TOKEN: "user" },
			"shield",
		],
	]) {
		const result = run(args, env);
		assert.equal(result.status, 0, result.stderr);
		assert.equal(
			JSON.parse(result.stdout.split("\n")[0].slice("REQUEST ".length))
				.authorization,
			`token ${token}`,
		);
	}
});

test("help, version, and invalid arguments retain their behavior", () => {
	const help = run(["--help"]);
	assert.equal(help.status, 0);
	for (const flag of [
		"--endpoint",
		"--color",
		"--title",
		"--text",
		"--key",
		"--token",
	])
		assert.match(help.stdout, new RegExp(flag));
	assert.equal(
		run(["--version"]).stdout.trim(),
		require("../package.json").version,
	);
	assert.equal(run(["--unknown"]).status, 1);
	assert.equal(run(["--title"]).status, 1);
	assert.match(run([]).stderr, /Missing token/);
});
