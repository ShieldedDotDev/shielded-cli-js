# shielded-cli

[![Node.js CI](https://github.com/ShieldedDotDev/shielded-cli-js/actions/workflows/ci.yml/badge.svg)](https://github.com/ShieldedDotDev/shielded-cli-js/actions/workflows/ci.yml) ![Last Build](https://img.shielded.dev/s/cli)

A simple CLI for interacting with the shielded.dev service.

## Install

```
npm install -g shielded-cli
```

## Usage

```bash
# You can also use the --token argument
export SHIELDED_TOKEN="<Your token from shielded.dev>"

shielded --title "Last Build" --text "$(date)" --color "00AA33"
```

### User API tokens

The CLI forwards `--shield-key` directly to the API as `shield_key`. When it
is present, the CLI reads `SHIELDED_USER_TOKEN` first, then falls back to
`SHIELDED_TOKEN`. Without `--shield-key`, it reads only `SHIELDED_TOKEN`.

```bash
export SHIELDED_USER_TOKEN="sdu_<your user API token>"

shielded --shield-key "production-status" --title "Last Build" --text "$(date)" --color "00AA33"

# A user-token invocation falls back to SHIELDED_TOKEN when SHIELDED_USER_TOKEN is unset.
```
