'use strict';

const { program } = require('commander');

program
  .command('hello')
  .description('for when you just need someone to talk to')
  .action(() => console.log('well, hello there!'));

program.parse(process.argv);