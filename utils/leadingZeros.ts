export const leadingZeros = (n: number, digits: number) => {
  let zero = '';
  const nToString = n.toString();

  if (nToString.length < digits) {
    for (let i = 0; i < digits - nToString.length; i++) zero += '0';
  }

  return zero + n;
};
