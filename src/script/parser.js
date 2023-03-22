const parser = (tokens) => {
  // const tokens = [{ token: pattern.type, value: match[0], line: line.line }];
  tokens.forEach((element) => {
    switch (element.token) {
      case 'VarInt':
        console.log(element.value);
        break;
      case 'VarString':
        console.log(element.value);
        break;
      case 'Identifier':
        console.log(element.value);
        break;
      case 'Conditional':
        console.log(element.value);
        break;

      default:
        break;
    }
  });
};

// const varNum = 'var';

export default parser;
