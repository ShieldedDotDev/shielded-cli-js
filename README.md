# shielded-cli

[![Node.js CI](https://github.com/ShieldedDotDev/shielded-cli-js/actions/workflows/ci.yml/badge.svg)](https://github.com/ShieldedDotDev/shielded-cli-js/actions/workflows/ci.yml) ![Last Build](https://img.shielded.dev/s/cli)

A simple CLI for interacting with the shielded.dev service.

## Install

```
npm install -g shielded-cli
```

## Usage

```bash
# Update one shield with its own API token.
export SHIELDED_TOKEN="<Your token from shielded.dev>"

shielded --title "Last Build" --text "$(date)" --color "00AA33"
```

### Update shields by key

A user API token can update or create any of your shields. Give the shield a
stable key with `--shield-key`, then keep the user token in
`SHIELDED_USER_TOKEN`:

```bash
export SHIELDED_USER_TOKEN="sdu_<your user API token>"

shielded --shield-key "production-status" --title "Last Build" --text "$(date)" --color "00AA33"
```

When you use `--shield-key`, the CLI prefers `SHIELDED_USER_TOKEN` and falls
back to `SHIELDED_TOKEN` if it is unset. Without `--shield-key`, it uses only
`SHIELDED_TOKEN`, so your existing per-shield-token commands keep working as
before.
