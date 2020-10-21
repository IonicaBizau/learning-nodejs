'use strict';

const { program } = require('commander');

program
  .command('hello')
  .description('for when you just need someone to talk to')
  .action(() => console.log('well, hello there!'));

program
  .command('shields')
  .option('-p, --percent <percent>', 'divert a percentage of the ships power to shields (must be a number)')
  .action((args) => {
    const percent = args.percent;
    if (isNaN(percent) || percent < 0 || percent > 100) {
      console.log('input must exist and be a number between 0 and 100. run "shields -h" for help');
    } else {
      console.log(`diverting ${percent}% of power to shields!`);
    }
  });

program.parse(process.argv);