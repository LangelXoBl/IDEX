import regexs from './regex.js';
import patterns from './lenguaje.js';

//variables globales
let errors = [];
let struct = [];

export const reader = (file) => {
  const reader = new FileReader();
  reader.readAsText(file);

  return new Promise((resolve, reject) => {
    reader.onload = (event) => resolve(event.target.result);
    reader.onerror = (error) => reject(error);
  });
};

export const formatText = (text) => {
  const cleanText = text
    .replace(regexs.commentAndTab, '') //reemplaza comentarios y tabs con ''
    .split(regexs.newLine) //los corta en el salto de linea
    .map((text, index) => ({ line: index + 1, input: text })) //crea un objeto con su numero de linea en el editor
    .filter((item) => !regexs.whiteSpace.test(item.input)); //filtra las lineas en blanco

  return cleanText;
};

export const lexer = (lines) => {
  errors = [];
  struct = [];
  let tokens = [];
  let current = 0; //posicion del texto actual
  let undefined = ''; //conjunto de cadenas no reconocidas

  //recorre las lineas
  lines.forEach((line, index) => {
    tokens.push([]); //crea un nuevo array para los token de esa linea
    //recorre el texto en la linea
    while (current < line.input.length) {
      let match = null;
      //recorre los patrones
      for (const pattern of patterns) {
        const regex = new RegExp('^' + pattern.pattern.source); //se le añade ^ para decir que lo busque al inicio de la linea
        match = line.input.slice(current).match(regex);

        if (match) {
          //cuando haga match revisara si no a ignorado algunos caracteres
          if (undefined.length > 0) {
            pushErrors(undefined, current, line.line);
            undefined = '';
          }
          //Revisara si es un caracter de estructura
          if (regexs.structure.test(match[0])) struct.push({ value: match[0], line: line.line });
          //revisa que no sea un espacio en blanco
          if (pattern.type != 'whiteSpace')
            tokens[index].push({ token: pattern.type, value: match[0], line: line.line }); //pone el token en el array de su linea
          current += match[0].length;
          break;
        }
      }
      //en caso de que no lo reconozca va cortando characters y los guarda
      if (!match) {
        undefined += line.input.slice(current, current + 1); //va eliminando caracteres y los guarda
        current++;
      }
    }
    //en caso de que el acabe la linea y tenga undefined, para que no pase los errores a otra linea
    if (undefined.length > 0) pushErrors(undefined, current, line.line);
    //validar si tiene final de linea
    if (!regexs.endLine.test(line.input)) errors.push(`expected | in line ${line.line}`);
    current = 0;
    undefined = '';
  });
  checkStructure();
  return tokens;
};

export const getErrors = () => {
  return errors;
};

const pushErrors = (undefined, current, line) => {
  errors.push(
    `${undefined} is unexpected character at position ${current - undefined.length} in line ${line}`
  );
};

//funcion para revisar la estructura del codigo
const checkStructure = () => {
  //revisa cuales son las variables que tiene y los quita del array
  const expect = filterStruc(struct);
  //los que quedan los pone como error
  expect.forEach((word) => errors.push(`${word}  is not definded`));
  checkScope(expect); // Revisar el scope de la estructura
};
//Revisa el scope de las palabras
const checkScope = (donsExist) => {
  const expect = filterStruc(donsExist);
  /* const expect = ['Prog', 'Usar', 'In', 'Fin', 'Fprog'];
  donsExist.forEach((word) => {
    expect.splice(expect.indexOf(word), 1); //Busca los elementos que no exiten para quitarlos y dejar el orden que espero con los elementos que si existen
  });*/
  // Revisa que el orden que espero y el que tiene sea el miso
  const outScope = expect.filter((s, index) => s != struct[index].value);
  if (outScope != 0)
    outScope.forEach((word) => errors.push(`${word} esta fuera del scope, ${message[word]}`));
  //expect.expect.expect.forEach;
};
const filterStruc = (array) => {
  const expect = ['Prog', 'Usar', 'In', 'Fin', 'Fprog'];

  array.forEach((word) => {
    expect.splice(expect.indexOf(word.value ?? word), 1)[0]; //lo saca de expect y lo pone en user
  });
  return expect;
};
//Se puede revisar la posicion en el array de los que tengo y los que espero, pero debo de sacarle los que no tengo
const message = {
  Prog: 'debe estar al inicio del programa',
  Usar: 'debe estar despues de prog',
  In: 'debe estar entre Usar y Fin ',
  Fin: 'debe estar entre In y Fprog',
  Fprog: 'debe estar al final del programa',
};
