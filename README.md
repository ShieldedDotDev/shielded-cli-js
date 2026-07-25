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

The CLI forwards `--id` and `--shield-key` directly to the API as `id` and
`shield_key`. It does not infer behavior from the token type. The current user
API requires an `id` to select or create a shield, while `--shield-key` assigns
or changes a shield key.

```bash
export SHIELDED_TOKEN="sdu_<your user API token>"

shielded --id "production-status" --title "Last Build" --text "$(date)" --color "00AA33"

# Optionally assign or change the shield key.
shielded --id "production-status" --shield-key "production-status-v2"
```
