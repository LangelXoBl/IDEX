// concatenar un ^ para buscar al inicio del text
const patterns = [
  { type: 'whiteSpace', pattern: /\s+/ }, /// espacio en blanco
  { type: 'StartProgram', pattern: /Prog/ },
  { type: 'VariableZone', pattern: /Usar/ },
  { type: 'StartCode', pattern: /In/ },
  { type: 'EndCode', pattern: /Fin/ },
  { type: 'EndProgram', pattern: /Fprog/ },
  { type: 'Conditional', pattern: /si/ },
  { type: 'Else', pattern: /otro/ },
  { type: 'VarInt', pattern: /Num/ },
  { type: 'Mientras', pattern: /Mientras/ },
  { type: 'VarString', pattern: /Text/ }, //# resercado para variables de tipo string
  { type: 'Print', pattern: /Manda/ }, // es un print
  { type: 'Input', pattern: /Recibe/ }, // es para obtener del teclado
  { type: 'Asignation', pattern: /:/ }, // asignar una variable x:5 o y:x+5
  { type: 'Integer', pattern: /\d+/ }, // es un entero de 0....infinito
  { type: 'Identifier', pattern: /[\w]+/ }, // nombres para las variables
  { type: 'OperatorsAritmetic', pattern: /[+*-/]/ }, // suma, resta, etc.
  { type: 'OperatorsLogic', pattern: /(==|>=|<=|!=)/ }, // igual a, mayor que, etc.
  { type: 'OperatorOpen', pattern: /[(]/ }, // abrir op o condicion
  { type: 'OperatorClose', pattern: /[)]/ }, // cerrar op o condicion
  { type: 'BlockCodeOpen', pattern: /{/ }, // abrir bloque de codigo
  { type: 'BlockCodeclose', pattern: /}/ }, // cerrar bloque de codigo
  { type: 'Text', pattern: /'(.*?)'/ }, // textos entre parentesis
  { type: 'End line', pattern: /\|\s*$/ }, // busca el final de lina pero puede haber 0 o mas espacios
];
// const formula = ['(', op, ')', tokens.operator];
// const op = [tokens.number, tokens.operator, tokens.number];
// \'(.*?)\' busca lo que esta entre comillas, pero se rompe si pones 2
// '[\w\s][^\n]+'|''|'\s' es parecido, pero busca el ' hasta el final de la linea
// =(?!=) busca que sea = y no ==

export default patterns;
