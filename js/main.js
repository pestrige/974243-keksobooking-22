// Генерируем случайное целое число

const generateInt = (a, b) => {
  const min = Math.ceil(Math.min(a, b));
  const max = Math.floor(Math.max(a, b));

  if (min < 0) {
    return NaN;
  }

  return Math.floor(min + Math.random() * (max + 1 - min));
};

// Генерируем число с плаваюшей точкой

const generateFloat = (a, b, digits) => {
  const min = Math.min(a, b);
  const max = Math.max(a, b);

  if (min < 0) {
    throw new Error('Отрицательное значение недопустимо');
  }

  const exponent = Math.pow(10, digits);
  const random = min + Math.random() * (max - min);

  return (Math.trunc(random * exponent) / exponent).toFixed(digits); //toFixed для отображения нулей
};
