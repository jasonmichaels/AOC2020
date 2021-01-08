class Passport {
  constructor(data) {
    this.data = data.replace(/\r?\n|\r/g, ' ').split(' ').map(d => d.split(':'));
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

    const isInRange = this.isNumberInRange(byr, 1920, 2002);
    const isLength = this.isNumberOfLength(byr, 4)

    return !!byr && isInRange && isLength;
  }

  evalIyr() {
    const { iyr } = this.passportDetails;

    const isInRange = this.isNumberInRange(iyr, 2010, 2020);
    const isLength = this.isNumberOfLength(iyr, 4);

    return !!iyr && isInRange && isLength;
  }

  evalEyr() {
    const { eyr } = this.passportDetails;

    const isInRange = this.isNumberInRange(eyr, 2020, 2030);
    const isLength = this.isNumberOfLength(eyr, 4);

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
      const matches = hcl.match(/^\#[a-z0-9]*$/);
      const replaced = hcl.replace('#', '');
      const length = replaced.length;

      return !!hcl && !!matches && length === 6;
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

  isNumber(num) {
    return !isNaN(+num) && Number.isInteger(+num);
  }

  isNumberInRange(maybeNum, min, max) {
    return this.isNumber(maybeNum) && (min <= +maybeNum && +maybeNum <= max);
  }

  isNumberOfLength(number, length) {
    if (this.isNumber(number) && this.isNumber(length)) {
      return number.length === length;
    }
    return false;
  }

  getIsHeightValid(hgt) {
    if (hgt) {
      const split = hgt.match(/[\d\.]+|\D+/g);

      if (split && Array.isArray(split) && split.length === 2) {
        const [num, measure] = split;
  
        if (measure === 'cm') {
          return this.isNumberInRange(num, 150, 193);
        } else if (measure === 'in') {
          return this.isNumberInRange(num, 59, 76);
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
  const results = [];

  for (const data of batch) {
    results.push(new Passport(data).init(complexValidation));
  }

  return results.filter(Boolean).length;
}

module.exports = evaludateBatch;