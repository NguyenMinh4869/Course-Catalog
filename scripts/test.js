#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

// Get command line arguments
const args = process.argv.slice(2);

// Default to running all tests if no arguments provided
const testCommand = args.length > 0 ? args.join(' ') : '';

// Run Jest with the specified arguments
const jestProcess = spawn('npx', ['jest', ...args], {
  stdio: 'inherit',
  shell: true,
  cwd: process.cwd()
});

jestProcess.on('close', (code) => {
  process.exit(code);
});

jestProcess.on('error', (error) => {
  console.error('Error running tests:', error);
  process.exit(1);
});
