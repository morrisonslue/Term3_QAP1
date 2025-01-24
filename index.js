#!/usr/bin/env node

// function to analyze flags
function parseArgs(args) {
    const flags = {
      help: false,
      length: 8,
      uppercase: false,
      numbers: false,
      symbols: false
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
      } else if (arg.startsWith('--uppercase')) {
        flags.uppercase = true;
      } else if (arg === '--numbers') {
        flags.numbers = true;
      } else if (arg === '--symbols') {
        flags.symbols = true;
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
      --length=int    Specify the password length (default length is 8 characters)
      --uppercase     Include uppercase letters
      --numbers       Include numbers 
      --symbols       Include special characters
  
    Examples:
      node index.js --length=12
      node index.js --length=10 --symbols
    `);
  }
  
  function generatePassword(length, includeUppercase, includeNumbers, includeSymbols) {
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numericChars = '0123456789';
    const symbolChars = '!@#$%^&*()_-+=~`[]{}|:;,.<>?/';
    
    // lowercase default
    let charPool = lowercaseChars;
  
    // add uppercase
    if (includeUppercase) {
      charPool += uppercaseChars;
    }
  
    // add numbers
    if (includeNumbers) {
      charPool += numericChars;
    }
  
    // add symbols
    if (includeSymbols) {
      charPool += symbolChars;
    }
  
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charPool.length);
      password += charPool[randomIndex];
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
  
    const pwd = generatePassword(
      flags.length,
      flags.uppercase,
      flags.numbers,
      flags.symbols
    );
    console.log(`Password: ${pwd}`);
  }
  
  main();
  