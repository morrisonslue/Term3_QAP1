#!/usr/bin/env node

// function to analyze flags
function parseArgs(args) {
    const flags = {
      help: false,
      length: 8 
    };
    
    args.forEach(arg => {
      if (arg.startsWith('--help')) {
        flags.help = true;
      } else if (arg.startsWith('--length=')) {
        const lengthValue = arg.split('=')[1];
        // make sure lengthValue is int
        const num = parseInt(lengthValue, 10);
        if (!isNaN(num) && num > 0) {
          flags.length = num;
        } else {
          console.error('Error: password length invalid');
        }
      }
    });
  
    return flags;
  }
  
  // show help menu
  function showHelp() {
    console.log(`
    \n
    To run: node index.js [options]
  
    Options:
      --help          Show help menu
      --length=<num>  Specify the password length (default length is 8 characters)
  
    Example:
      node index.js --length=12
    `);
  }
  
  // lowercase password generation 
  function generatePassword(length) {
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * lowercaseChars.length);
      password += lowercaseChars[randomIndex];
    }
    return password;
  }
  
  function main() {
    const userArgs = process.argv.slice(2);
    const flags = parseArgs(userArgs);
  
    if (flags.help) {
      showHelp();
      return;
    }
  
    // generate and print password
    const pwd = generatePassword(flags.length);
    console.log(`Generated Password: ${pwd}`);
  }
  
  main();
  