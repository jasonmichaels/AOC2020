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

class Passport {
  constructor(data) {
    this.data = 'string' === typeof data ? data.replace(/\r?\n|\r/g, ' ').split(' ').map(d => d.split(':')) : [];
    this.isPassportValid = false;
    this.passportDetails = {};
    this.complexDetails = {};
  }

  init(strictValidation = false) {
    this.setData(strictValidation);
    return this.getIsValid();
  }

  setData(strictValidation) {
    this.setPassportDetails();

    if (!strictValidation) {
      this.setSimpleIsValid();
    } else {
      this.setComplexIsValid();
    }
  }

  setPassportDetails() {
    for (const [key, value] of this.data) {
      this.passportDetails[key] = value;
    }
  }

  setSimpleIsValid() {
    const { 
      ecl, 
      pid, 
      eyr, 
      hcl, 
      byr, 
      iyr, 
      hgt 
    } = this.getPassportDetails();

    this.isPassportValid = !!ecl && !!pid && !!eyr && !!hcl && !!byr && !!iyr && !!hgt;
  }

  setComplexIsValid() {
    const isByrValid = this.evalByr();
    const isIyrValid = this.evalIyr();
    const isEyrValid = this.evalEyr();
    const isHgtValid = this.evalHgt();
    const isHclValid = this.evalHcl();
    const isValidEcl = this.evalEcl();
    const isPicValid = this.evalPid();
    
    this.isPassportValid = isByrValid && isIyrValid && isEyrValid && isHgtValid && isHclValid && isValidEcl && isPicValid;
  }

  evalByr() {
    const { byr } = this.passportDetails;

    const isInRange = isNumberInRange(byr, 1920, 2002);
    const isLength = isNumberOfLength(byr, 4)

    return !!byr && isInRange && isLength;
  }

  evalIyr() {
    const { iyr } = this.passportDetails;

    const isInRange = isNumberInRange(iyr, 2010, 2020);
    const isLength = isNumberOfLength(iyr, 4);

    return !!iyr && isInRange && isLength;
  }

  evalEyr() {
    const { eyr } = this.passportDetails;

    const isInRange = isNumberInRange(eyr, 2020, 2030);
    const isLength = isNumberOfLength(eyr, 4);

    return !!eyr && isInRange && isLength;
  }

  evalHgt() {
    const { hgt } = this.passportDetails;

    const isValidHeight = !!hgt && this.getIsHeightValid(hgt);

    return !!hgt && isValidHeight;
  }

  evalHcl() {
    const { hcl } = this.passportDetails;

    if (hcl) {
      const matches = hcl.match(/^#[0-9A-F]{6}$/i);

      return !!hcl && !!matches;
    }
    return false;
  }

  evalEcl() {
    const { ecl } = this.passportDetails;
    const colors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];

    return 'string' === typeof ecl && colors.includes(ecl);
  }

  evalPid() {
    const { pid } = this.passportDetails;

    return !!pid && !!pid.match(/^\d{9}$/);
  }

  getIsHeightValid(hgt) {
    if (hgt) {
      const split = hgt.match(/[\d\.]+|\D+/g);

      if (split && Array.isArray(split) && split.length === 2) {
        const [num, measure] = split;
  
        if (measure === 'cm') {
          return isNumberInRange(num, 150, 193);
        } else if (measure === 'in') {
          return isNumberInRange(num, 59, 76);
        }
      }
    }
    return false;
  }

  getPassportDetails() {
    return this.passportDetails;
  }

  getIsValid() {
    return this.isPassportValid;
  }
}

const evaludateBatch = (batch, complexValidation) => {
  if (!Array.isArray(batch)) {
    return new Error(`Batch must be an iterable, ${typeof batch} ${String(batch)} given.`);
  }
  const results = [];

  for (const data of batch) {
    results.push(new Passport(data).init(complexValidation));
  }

  return results.filter(Boolean).length;
}

module.exports = evaludateBatch;