import { VarInt, Print, VarString } from './structures';
let errors = [];
let intVars = [];
let textVars = [];
let res;
const parser = (tokens) => {
  errors = [];
  intVars = [];
  textVars = [];
  //const tokens = [[{ token: 'varInt', value: 'name', line: '12' }]];
  tokens.forEach((x) => {
    switch (x[0].token) {
      case 'VarInt':
        handleVariable(x, VarInt, intVars, 'Num');
        // res = analize(x, VarInt);
        // if (res.valid) intVars.push(res.name);
        // else errors.push(`variable in line ${res.line} not defined correctly `);
        break;
      case 'VarString':
        handleVariable(x, VarString, textVars, 'Text');
        //console.log(x[0].value);
        break;
      case 'Identifier':
        //console.log(x[0].value);
        break;
      case 'Conditional':
        //console.log(x[0].value);
        break;
      case 'Print':
        res = analize(x, Print);
        if (res.valid) console.log(`imprimir: ${res.name}`);
        else errors.push(`Incorrect sintax in line ${res.line} for Manda`);
        //console.log(x[0].value);
        break;
      default:
        break;
    }
  });
  console.table(intVars);
  console.table(errors);
  console.table(textVars);
};

const handleVariable = (tokens, expectedTokens, variablesArray, variableName) => {
  const result = analize(tokens, expectedTokens);
  if (result.valid) {
    variablesArray.push(result.name);
  } else {
    errors.push(`Invalid syntax in line ${result.line} for ${variableName}`);
  }
};

const analize = (tokenLine, struct) => {
  let valid = true;
  let name;
  let line = tokenLine[0].line;
  try {
    //const tokenLine = [{ token: 'varInt', value: 'name', line: '12' }];
    struct.forEach((token, index) => {
      console.log(token, tokenLine[index].token);
      // va revisando la estrucura esperada con el que se recive
      if (tokenLine[index].token != token) throw new Error('invalid token'); //return { valid: false, name: '', line };
      //Revisa si es un nombre
      if (tokenLine[index].token == 'Identifier') name = tokenLine[index].value;

      if (tokenLine[index].token == 'Text') name = tokenLine[index].value;
    });

    return { valid, name, line };
  } catch (error) {
    console.log('erro');
    return { valid: false, name: '', line };
  }
};
// const varNum = 'var';

const pushErrors = () => {
  errors.push(
    `${undefined} is unexpected character at position ${current - undefined.length} in line ${line}`
  );
};
export default parser;
