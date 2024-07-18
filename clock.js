const getBinary = (n, length) => {
  const binaries = [];

  do {
    binaries.push(n % 2 === 1);
    n = Math.floor(n / 2);
  } while (n > 0);

  while (binaries.length < length) {
    binaries.push(false);
  }
  return binaries;
};

const getUnitBinaries = (n, length) => [
  getBinary(Math.floor(n / 10), length),
  getBinary(n % 10, 4)
];

const TIME_NUMBERS_LENGTH = [
  2, 3,
  3, 4,
  3, 4
];

const getBinaryTime = date => {
  const time = [
    date.getHours(),
    date.getMinutes(),
    date.getSeconds()
  ];

  const binaryTime = [];

  for (let i = 0; i < time.length; i++) {
    const unit = time[i];
    binaryTime.push(... getUnitBinaries(unit, TIME_NUMBERS_LENGTH[i]));
  }

  return binaryTime;
};

const diff = (prev, next, onChangedPip) => {
  for (let i = 0; i < prev.length; i++) {
    const prevNumber = prev[i];
    const nextNumber = next[i];
    for (let j = 0; j < prevNumber.length; j++) {
      if (prevNumber[j] !== nextNumber[j]) {
        onChangedPip(nextNumber[j], i, j);
      }
    }
  }
}

const clock = (container, time) => {

  const numbers = [];

  const numbersElements = container.querySelectorAll('.number');

  for (let i = 0; i < numbersElements.length; i++) {
    const numberElement = numbersElements[i];
    const number = [];
    for (let j = 0; j < numberElement.children.length; j++) {
      const digitElement = numberElement.children[j];
      if (time[i][numberElement.children.length - j - 1]) {
        digitElement.className = 'on';
      }
      number.unshift(digitElement);
    }
    numbers.push(number);
  }

  return newTime => {
    diff(time, newTime, (value, i, j) => {
      const pipElement = numbers[i][j]
      if (value) {
        pipElement.className = 'on';
      } else {
        pipElement.classList.remove('on');
      }
    });
    time = newTime;
  };
};

const update = clock(document.querySelector('.clock-display'), getBinaryTime(new Date()));

setInterval(() => {
  update(getBinaryTime(new Date()));
}, 1000);
