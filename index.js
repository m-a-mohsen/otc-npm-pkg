#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

let playerName;

const sleep = (ms = 1500) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
    console.clear();
    const rainbowTitle = chalkAnimation.glitch("\n It is not a Glitch ");
    await sleep();
    await sleep();
    rainbowTitle.stop();
    console.clear();
  const rainbowTitle2 = chalkAnimation.neon(`
    #! Open Tech Camp !#
    Welcome to the Game
    `);
    await sleep();
    await sleep();

    rainbowTitle2.stop();
  
  
  console.log(`
    ${chalk.bgBlue('HOW TO PLAY')} 
    If you correctly answered all 5 questions, you will get to know the planed release date.
    If you get any question wrong You will be ${chalk.bgRed('Kicked out')}
    So get all the questions right...

  `);
}

async function handleAnswer(isCorrect) {
  const spinner = createSpinner('Checking answer...').start();
  await sleep();
console.clear();
  if (isCorrect) {
    spinner.success({ text: `Nice work ${playerName}. That's a legit answer` });
  } else {
    spinner.error({ text: `💀💀💀 Game over, you lose ${playerName}!` });
    process.exit(1);
  }
}

async function askName() {
  const answers = await inquirer.prompt({
    name: 'player_name',
    type: 'input',
    message: 'What is your name?',
    default() {
      return 'Player';
    },
  });

  playerName = answers.player_name;
  console.clear();
}

function winner() {
  console.clear();

  figlet.text(
    `#! Open Tech Camp`,
    {
      font: "ANSI Shadow",
      horizontalLayout: "default",
      verticalLayout: "default",
      width: 100,
      whitespaceBreak: true,
    },
    (err, data) => {
      console.log(gradient.pastel.multiline(data) + "\n");

      console.log(chalk.redBright(`Release date is yet TBD\n`));
      console.log(
        chalk.green(
          `Programming isn't about what you know;it's about making the command line look cool`
        )
      );
      console.log(
        chalk.blueBright(
          `Credits to: (Fireship.io)
            `
        )
      );
      process.exit(0);
    }
  );
}

async function question1() {
  const answers = await inquirer.prompt({
    name: 'question_1',
    type: 'list',
    message: ' Which is your favorite cohort in 2023\n',
    choices: [
      'Lime',
      'Lime',
      'Lime',
      'or, Lime',
    ],
  });

  return handleAnswer(true);
}

async function question2() {
  const answers = await inquirer.prompt({
    name: 'question_2',
    type: 'list',
    message: 'When asking "Jan" a question, you should\n',
    choices: ['be concise', 'use the right technical terms', 'all  of the above', 'Better not ask him at all'],
  });
  return handleAnswer(answers.question_2 === "Better not ask him at all");
}

async function question3() {
  const answers = await inquirer.prompt({
    name: 'question_3',
    type: 'list',
    message: `What is the first thing you do in TEAM projects\n`,
    choices: ['github repo', 'plan your tasks', 'google new tech MEMES' ],
  });

  return handleAnswer(answers.question_3 === "google new tech MEMES");
}

async function question4() {
  const answers = await inquirer.prompt({
    name: 'question_4',
    type: 'list',
    message: 'Which of the following is NOT a primitive type?\n',
    choices: [
      'boolean',
      'number',
      'null',
      'object', // Correct
    ],
  });
  return handleAnswer(answers.question_4 === 'object');
}

async function question5() {
  const answers = await inquirer.prompt({
    name: 'question_5',
    type: 'list',
    message:
      'JS is a high-level single-threaded, garbage-collected,\n' +
      'interpreted(or just-in-time compiled), prototype-based,\n' +
      'multi-paradigm, dynamic language with a ____ event loop\n',
    choices: ['multi-threaded', 'non-blocking', 'synchronous', 'promise-based'],
  });

  return handleAnswer(answers.question_5 === 'non-blocking');
}

// Run it with top-level await
console.clear();
await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await question5();
winner();