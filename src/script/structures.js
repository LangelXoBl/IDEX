const variable = ['Identifier', 'Integer', 'Text'];

export const VarInt = ['VarInt', 'Identifier', 'End line'];
export const VarString = ['VarString', 'Identifier', 'End line'];

export const Print = ['Print', 'Text', 'End line'];

export const operation = [
  'Identifier',
  'Asignation',
  variable,
  'OperatorsAritmetic',
  variable,
  'End line',
];

// const variable = ['Identifier', 'Integer', 'Text']

// export default VarInt;
