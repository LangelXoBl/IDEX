import regex from './regex.js';
import { patterns } from './lenguaje.js';
import { format } from 'prettier';

//variables globales
let errors = [];

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
    .replace(regex.commentAndTab, '') //reemplaza comentarios y tabs con ''
    .split(regex.newLine) //los corta en el salto de linea
    .map((text, index) => ({ line: index + 1, input: text })) //crea un objeto con su numero de linea en el editor
    .filter((item) => !regex.whiteSpace.test(item.input)); //filtra las lineas en blanco

  return cleanText;
};

export const lexer = (lines) => {
  errors = [];
  const tokens = [];
  let current = 0; //posicion del texto actual
  let undefined = ''; //conjunto de cadenas no reconocidas

  //recorre las lineas
  lines.forEach((line) => {
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
          //revisa que no sea un espacio en blanco
          if (pattern.type != 'white Space')
            tokens.push({ token: pattern.type, value: match[0], line: line.line });
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
    if (!regex.endLine.test(line.input)) errors.push(`expected | in line ${line.line}`);
    current = 0;
    undefined = '';
  });
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
