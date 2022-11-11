# docs https://github.com/casey/just
# justfile load .env file
set dotenv-load
set shell := ["bash", "-uc"]
default:
    @just --list

test-deno:
    #!/usr/bin/env sh
    if ! type deno > /dev/null; then
    echo "deno not installed"
    exit 1
    fi

update-nowcast: test-deno
    @deno run --allow-net --allow-env --allow-read  --unstable scripts/seed-nowcast/main.ts

