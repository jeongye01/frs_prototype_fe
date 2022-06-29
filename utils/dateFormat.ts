export const leadingZeros = (n: number, digits: number) => {
  let zero = '';
  const nToString = n.toString();

  if (nToString.length < digits) {
    for (let i = 0; i < digits - nToString.length; i++) zero += '0';
  }

  return zero + n;
};

export const getDefaultDateFrom = () => {
  const date = new Date();

  return `${date.getFullYear()}-01-01`;
};
export const getDefaultDateTo = () => {
  const date = new Date();

  return `${date.getFullYear()}-${leadingZeros(
    date.getMonth() + 1,
    2,
  )}-${leadingZeros(date.getDate(), 2)}`;
};
