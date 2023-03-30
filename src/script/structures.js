const variable = ['Identifier', 'Integer', 'Text'];

export const VarInt = ['VarInt', 'Identifier', 'End line'];
export const VarString = ['VarString', 'Identifier', 'End line'];

export const Print = ['Print', 'Text', 'End line'];
export const Input = ['Input', 'Identifier', 'End line'];

export const asignation = [
  'Identifier',
  'Asignation',
  variable,
  'OperatorsAritmetic',
  variable,
  'End line',
];
export const Conditional = [
  'Conditional',
  'OperatorOpen',
  variable,
  'OperatorsLogic',
  variable,
  'OperatorClose',
  'BlockCodeOpen',
];
export const Mientras = [
  'Mientras',
  'OperatorOpen',
  variable,
  'OperatorsLogic',
  variable,
  'OperatorClose',
  'BlockCodeOpen',
];

export const Else = () => ['Else', 'BlockCodeOpen'];
const validateTypeVar = () => {};
// const variable = ['Identifier', 'Integer', 'Text']

// export default VarInt;
