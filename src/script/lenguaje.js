//export default { tokens, formula, op };

const tokens = {
  whiteSpace: /\s+/, //busca espacio en blanco, puedo poner una validacion que lo ignore
  number: /\d+/, //busca numeros
  names: /[\w-]+/, //strings que pueden servir como nombres de variables
  operator: /[+*-/]/, //busca operadores
  logic: /==|>=|<=|!=/,
  opOpen: /[(]/,
  opClose: /[)]/,
  blockOpen: /{/,
  blockClose: /}/,
  text: /'(.*?)'/, //busca lo que este entre comillas
};

//concatenar un ^ para buscar al inicio del text
export const patterns = [
  { type: 'white Space', pattern: /\s+/ },
  { type: 'Asignation', pattern: /:/ },
  { type: 'Number', pattern: /\d+/ },
  { type: 'Variable', pattern: /[\w]+/ },
  { type: 'Operators Aritmetic', pattern: /[+*-/]/ },
  { type: 'Operators Logic', pattern: /(==|>=|<=|!=)/ },
  { type: 'Operator Open', pattern: /[(]/ },
  { type: 'Operator Close', pattern: /[)]/ },
  { type: 'Block code Open', pattern: /{/ },
  { type: 'Block code close', pattern: /}/ },
  { type: 'Text', pattern: /'(.*?)'/ },
  { type: 'End line', pattern: /\|\s*$/ }, //busca el final de lina pero puede haber 0 o mas espacios
];
//const formula = ['(', op, ')', tokens.operator];
//const op = [tokens.number, tokens.operator, tokens.number];
// \'(.*?)\' busca lo que esta entre comillas, pero se rompe si pones 2
// '[\w\s][^\n]+'|''|'\s' es parecido, pero busca el ' hasta el final de la linea
// =(?!=) busca que sea = y no ==
