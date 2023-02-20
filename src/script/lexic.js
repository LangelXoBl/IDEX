import regex from './regex.js';
//import { op } from './lenguaje.js';

export const reader = (file) => {
  const reader = new FileReader();
  reader.readAsText(file);
  return new Promise((resolve, reject) => {
    reader.onload = (event) => resolve(event.target.result);
    reader.onerror = (error) => reject(error);
  });
};

export const formatText = (text) => {
  const newText = text.replace(regex.commentAndTab, ''); //reemplaza comentarios y tabs con ''
  return newText
    .split(regex.newLine) //los corta en el salto de linea
    .map((text, index) => ({ line: index + 1, input: text })) //crea un objeto con su numero de linea en el editor
    .filter((item) => !regex.whiteSpace.test(item.input)); //filtra las lineas en blanco
};

export const tokens = () => {
  const lines = [{ line: 0, input: '' }];
};

export function lexer(text) {
  const tokens = [];
  const patterns = [
    { type: 'number', pattern: /\d+/ },
    { type: 'operator', pattern: /[+\-*/]/ },
    { type: 'parenthesis', pattern: /[()]/ },
    { type: 'word', pattern: /[a-zA-Z]+/ },
    { type: 'whitespace', pattern: /\s+/ },
  ];
  let current = 0;

  while (current < text.length) {
    let match = null;

    for (const pattern of patterns) {
      const regex = new RegExp('^' + pattern.pattern.source);
      match = text.slice(current).match(regex);
      if (match) {
        tokens.push({ type: pattern.type, value: match[0] });
        current += match[0].length;
        break;
      }
    }

    if (!match) {
      throw new Error(`Unexpected character at position ${current}`);
    }
  }
  return tokens;
}
