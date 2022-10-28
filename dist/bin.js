#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const pkg_json_1 = require("./pkg.json");
const sdk_1 = require("./sdk");
const program = new commander_1.Command();
program
    .name(Object.keys(pkg_json_1.bin)[0])
    .description('CLI helper for Shielded.dev API')
    .option('-e, --endpoint <url>', 'API endpoint', 'https://api.shielded.dev')
    .option('-c, --color <color>', 'Badge color')
    .option('-T, --title <title>', 'Badge title')
    .option('-x, --text <text>', 'Badge text')
    .version(pkg_json_1.version);
program.parse();
const options = program.opts();
if (!options.token && process.env.SHIELDED_TOKEN) {
    options.token = process.env.SHIELDED_TOKEN;
}
if (!options.token) {
    process.stderr.write('Missing token. Please set SHIELDED_TOKEN environment variable or use --token option.');
    process.stderr.write(program.helpInformation());
    process.exit(1);
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    const opts = {
        token: options.token
    };
    if (options.endpoint) {
        opts.endpoint = options.endpoint;
    }
    const s = new sdk_1.ShieldedAPI(opts);
    let shield;
    try {
        shield = yield s.updateShield({
            color: options.color,
            title: options.title,
            text: options.text,
        });
    }
    catch (e) {
        if (e instanceof sdk_1.StatusError) {
            process.stderr.write(e.message);
            process.exit(2);
        }
        else {
            throw e;
        }
    }
    console.log(shield.ShieldURL);
}))().catch((e) => {
    throw e;
});
