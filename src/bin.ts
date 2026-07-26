#!/usr/bin/env node

import { Command } from 'commander';
import { version, bin } from './pkg.json';
import { ShieldedAPI, ShieldOptions, StatusError } from './sdk';

const program = new Command();
program
	.name(Object.keys(bin)[0])
	.description('CLI helper for Shielded.dev API')
	.option('-e, --endpoint <url>', 'API endpoint', 'https://api.shielded.dev')
	.option('-c, --color <color>', 'Badge color')
	.option('-T, --title <title>', 'Badge title')
	.option('-x, --text <text>', 'Badge text')
	.option('-k, --shield-key <key>', 'Shield key')
	.version(version);

program.parse();

type Options = {
	endpoint: string | undefined;
	token: string;
	color: string | undefined;
	title: string | undefined;
	text: string | undefined;
	shieldKey: string | undefined;
};

const options = program.opts<Options>();

if (!options.token) {
	const tokenEnvironmentVariables = options.shieldKey
		? ['SHIELDED_USER_TOKEN', 'SHIELDED_TOKEN']
		: ['SHIELDED_TOKEN'];

	for (const variable of tokenEnvironmentVariables) {
		if (process.env[variable]) {
			options.token = process.env[variable];
			break;
		}
	}
}

if (!options.token) {
	const tokenVariables = options.shieldKey ? 'SHIELDED_USER_TOKEN or SHIELDED_TOKEN' : 'SHIELDED_TOKEN';
	process.stderr.write(`Missing token. Please set the ${tokenVariables} environment variable or use --token option.`);
	process.stderr.write(program.helpInformation());
	process.exit(1);
}

(async () => {
	const opts : Partial<ShieldOptions> = {
		token: options.token
	};

	if(options.endpoint) {
		opts.endpoint = options.endpoint;
	}
	const s = new ShieldedAPI(opts);

	let shield;
	try {
		shield = await s.updateShield({
			color: options.color,
			shieldKey: options.shieldKey,
			title: options.title,
			text: options.text,
		});
	} catch (e) {
		if(e instanceof StatusError) {
			process.stderr.write((e as Error).message);
			process.exit(2);
		}else{
			throw e;
		}
	}

	console.log(shield.ShieldURL);
})().catch((e) => {
	throw e;
});
