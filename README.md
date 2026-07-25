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

The CLI forwards `--shield-key` directly to the API as `shield_key`. It does
not infer behavior from the token type. The API uses a supplied shield key to
select or create a shield for a user-level token.

```bash
export SHIELDED_TOKEN="sdu_<your user API token>"

shielded --shield-key "production-status" --title "Last Build" --text "$(date)" --color "00AA33"

# Per-shield tokens continue to omit --shield-key.
```
