export default {
  commentAndTab: /\t+|[/]+[\S ]+/g, //busca comentarios y tabulaciones
  newLine: /\r\n/, //salto de linea
  whiteSpace: /^\s*$/, //busca lineas donde solo aya espacios en blanco
  endLine: /(\||{|}|\)|Prog|Usar|In|Fin|Fprog)\s*$/m, //busca el final de lina pero puede haber 0 o mas espacios
};
