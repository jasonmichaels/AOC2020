const isNumber = num => {
  return !isNaN(+num) && Number.isInteger(+num);
}

const isNumberInRange = (maybeNum, min, max) => {
  return isNumber(maybeNum) && (min <= +maybeNum && +maybeNum <= max);
}

const isNumberOfLength = (number, length) => {
  if (isNumber(number) && isNumber(length)) {
    return number.length === length;
  }
  return false;
}

const evalByr = (byr) => {
  if (byr) {
    const isInRange = isNumberInRange(byr, 1920, 2002);
    const isLength = isNumberOfLength(byr, 4)

    return isInRange && isLength;
  }
  return false;
}

const evalIyr = (iyr) => {
  if (iyr) {
    const isInRange = isNumberInRange(iyr, 2010, 2020);
    const isLength = isNumberOfLength(iyr, 4);

    return isInRange && isLength;
  }
  return false;
}

const evalEyr = (eyr) => {
  if (eyr) {
    const isInRange = isNumberInRange(eyr, 2020, 2030);
    const isLength = isNumberOfLength(eyr, 4);

    return isInRange && isLength;
  }
  return false;
}

const evalHgt = (hgt) => {
  if (hgt) {
    return getIsHeightValid(hgt);
  }
  return false;
}

const evalHcl = (hcl) => {
  if (hcl) {
    const matches = hcl.match(/^#[0-9A-F]{6}$/i);

    return !!matches;
  }
  return false;
}

const evalEcl = (ecl) => {
  if (ecl) {
    return 'string' === typeof ecl && colors.includes(ecl);
  }
  return false;
}

const evalPid = (pid) => {
  if (pid) {
    return !!pid.match(/^\d{9}$/);
  }
  return false;
}

const getIsHeightValid = (hgt) => {
  const split = hgt.match(/[\d\.]+|\D+/g);

  if (split && Array.isArray(split) && split.length === 2) {
    const [num, measure] = split;

    if (measure === 'cm') {
      return isNumberInRange(num, 150, 193);
    } else if (measure === 'in') {
      return isNumberInRange(num, 59, 76);
    }
  }
  return false;
}

const colors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];

module.exports = {
  isNumber,
  isNumberInRange,
  isNumberOfLength,
  evalByr,
  evalIyr,
  evalEyr,
  evalHgt,
  evalHcl,
  evalEcl,
  evalPid,
  getIsHeightValid,
  colors
};