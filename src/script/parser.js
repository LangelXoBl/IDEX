import { VarInt, Print, VarString, Input, asignation } from './structures';
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
        const vars = [declarated(x[0].value, x[0].line)];
        try {
          asignation.forEach((part, index) => {
            console.log(x[index].value);
            //revisa si es un string
            if (typeof part == 'string') {
              if (part != x[index].token)
                errors.push(`Invalid syntax in line ${x[index].line} for ${x[index].value}`);
              //console.log('part: ' + part, 'toke:' + x[index].token);
            } else {
              console.log('multi', x[index].value);
              if (!part.includes(x[index].token))
                errors.push(`Invalid syntax in line ${x[index].line} for ${x[index].value}`);
              else if (x[index].token == 'Identifier')
                vars.push(declarated(x[index].value, x[index].line));
              else if (x[index].token == 'Text') vars.push('string');
              else if (x[index].token == 'Integer') vars.push('int');
              console.log('multi', x[index].value);
              //x[index].token == 'Text' ?  : vars.push('int');

              // part.forEach((option) => console.log('part: ' + option, 'toke:' + x[index].token));
            }
          });
          console.table(vars);
        } catch (error) {
          errors.push('incomplete sintax in line ' + x[0].line);
        }

        vars.every((type) => type == vars[0])
          ? null
          : errors.push(`Invalid type in line ${x[0].line}, use ${vars[0]}`);

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
      case 'Input':
        res = analize(x, Input);
        if (res.valid) console.log(`Obtener: ${res.name}`);
        else errors.push(`Incorrect sintax in line ${res.line} for Recibe`);
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
      // console.log(token, tokenLine[index].token);
      // va revisando la estrucura esperada con el que se recive
      if (tokenLine[index].token != token)
        errors.push(
          `Invalid syntax in line ${tokenLine[index].line} for ${tokenLine[index].value}`
        ); //return { valid: false, name: '', line };
      //Revisa si es un nombre
      if (tokenLine[index].token == 'Identifier') name = tokenLine[index].value;

      if (tokenLine[index].token == 'Text') name = tokenLine[index].value;
    });

    return { valid, name, line };
  } catch (error) {
    //console.log('erro');
    return { valid: false, name: '', line };
  }
};
// const varNum = 'var';

const declarated = (variable, line) => {
  const isInt = intVars.includes(variable);
  const isString = textVars.includes(variable);
  // revisa si esta declarado
  if (!isInt && !isString) {
    errors.push(`varible ${variable} in line  ${line} not defined `);
    return null;
  }
  return isInt ? 'int' : 'string';
};
const pushErrors = () => {
  errors.push(
    `${undefined} is unexpected character at position ${current - undefined.length} in line ${line}`
  );
};
export default parser;
