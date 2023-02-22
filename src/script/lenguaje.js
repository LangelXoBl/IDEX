//concatenar un ^ para buscar al inicio del text
export const patterns = [
  { type: 'white Space', pattern: /\s+/ }, ///espacio en blanco
  { type: 'Start Program', pattern: /Prog/ },
  { type: 'Variable Zone', pattern: /Usar/ },
  { type: 'Start Code', pattern: /In/ },
  { type: 'End Code', pattern: /Fin/ },
  { type: 'End Program', pattern: /Fprog/ },
  { type: 'Conditional', pattern: /si/ },
  { type: 'Var int', pattern: /Num/ },
  { type: 'Var string', pattern: /Text/ },
  { type: 'Asignation', pattern: /:/ }, //asignar una variable x:5 o y:x+5
  { type: 'Integer', pattern: /\d+/ }, //es un entero de 0....infinito
  { type: 'Identifier', pattern: /[\w]+/ }, //nombres para las variables
  { type: 'Operators Aritmetic', pattern: /[+*-/]/ }, //suma, resta, etc.
  { type: 'Operators Logic', pattern: /(==|>=|<=|!=)/ }, //igual a, mayor que, etc.
  { type: 'Operator Open', pattern: /[(]/ }, //abrir op o condicion
  { type: 'Operator Close', pattern: /[)]/ }, //cerrar op o condicion
  { type: 'Block code Open', pattern: /{/ }, //abrir bloque de codigo
  { type: 'Block code close', pattern: /}/ }, //cerrar bloque de codigo
  { type: 'Text', pattern: /'(.*?)'/ }, //textos entre parentesis
  { type: 'End line', pattern: /\|\s*$/ }, //busca el final de lina pero puede haber 0 o mas espacios
];
//const formula = ['(', op, ')', tokens.operator];
//const op = [tokens.number, tokens.operator, tokens.number];
// \'(.*?)\' busca lo que esta entre comillas, pero se rompe si pones 2
// '[\w\s][^\n]+'|''|'\s' es parecido, pero busca el ' hasta el final de la linea
// =(?!=) busca que sea = y no ==
