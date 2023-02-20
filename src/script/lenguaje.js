//export default { tokens, formula, op };

const tokens = {
  number: /\d+/, //busca numeros
  text: /'(.*?)'/, //busca lo que este entre parentesis
  names: /[\w-]+/, //strings que pueden servir como nombres de variables
  operator: /[+\-*/]/, //busca operadores
  logic: /[=]/,
  opOpen: /[(]/,
  opClose: /[)]/,
  blockOpen: /{/,
  blockClose: /}/,
};

const formula = ['(', op, ')', tokens.operator];
export const op = [tokens.number, tokens.operator, tokens.number];
// \'(.*?)\' busca lo que esta entre comillas, pero se rompe si pones 2
// '[\w\s][^\n]+'|''|'\s' es parecido, pero busca el ' hasta el final de la linea
