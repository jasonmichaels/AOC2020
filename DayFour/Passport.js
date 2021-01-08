const utils = require('./utils.js');

const {
  evalByr,
  evalIyr,
  evalEyr,
  evalHgt,
  evalHcl,
  evalEcl,
  evalPid
} = utils;

class PassportValidator {
  constructor(data, complexValidation = false) {
    this.data = 'string' === typeof data ? data.replace(/\r?\n|\r/g, ' ').split(' ').map(d => d.split(':')) : [];
    this.isPassportValid = false;
    this.passportDetails = {};

    this.init(complexValidation);
  }

  init(strictValidation = false) {
    this.setPassportDetails();

    if (strictValidation) {
      this.setComplexIsValid();
    } else {
      this.setSimpleIsValid();
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
    } = this.passportDetails;

    this.isPassportValid = !!ecl && !!pid && !!eyr && !!hcl && !!byr && !!iyr && !!hgt;
  }

  setComplexIsValid() {
    const {
      ecl,
      pid,
      eyr,
      hcl,
      byr,
      iyr,
      hgt
    } = this.passportDetails;
    const isByrValid = evalByr(byr);
    const isIyrValid = evalIyr(iyr);
    const isEyrValid = evalEyr(eyr);
    const isHgtValid = evalHgt(hgt);
    const isHclValid = evalHcl(hcl);
    const isValidEcl = evalEcl(ecl);
    const isPicValid = evalPid(pid);

    this.isPassportValid = isByrValid && isIyrValid && isEyrValid && isHgtValid && isHclValid && isValidEcl && isPicValid;
  }

  getIsValid() {
    return this.isPassportValid;
  }
}

const evaludateBatch = (batch, complexValidation = false) => {
  if (!Array.isArray(batch)) {
    return new Error(
      `Batch must be an array [string, string, ...strings], ${typeof batch} ${String(batch)} given.`
    );
  }

  let results = [];

  for (let i = 0; i < batch.length; i++) {
    if ('string' !== typeof batch[i]) {
      results = results.splice(0, results.length);
      throw new Error(
        `Unable to process batch. Individual batch elements must of type string, Encountered ${typeof batch[i]} ${String(batch[i])}.`
      );
    }

    const instance = new PassportValidator(batch[i], complexValidation);
    results.push(instance.getIsValid());
  }

  return results.filter(Boolean).length;
}

module.exports = evaludateBatch;