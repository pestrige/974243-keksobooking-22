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

// Проверяем нажата ли Ecs

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

// свой Debounce

const debounce = (fn, ms) => {
  let timeout;

  return function () {
    const callFn = () => fn.apply(this, arguments);
    clearTimeout(timeout);
    timeout = setTimeout(callFn, ms);
  };
};

export { generateInt, generateFloat, isEscEvent, debounce };
