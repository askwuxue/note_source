#!/usr/bin/env node

// console.log('cli working....')
const { program } = require('commander');
const packageJson = require('./package.json')
const version = packageJson.version
program.version(version);
program.parse()
