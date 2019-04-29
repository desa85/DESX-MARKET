const validateString = (value) => {
    let reg = /^[A-z0-9_.]+$/g
    let result = value.search(reg)
    return !!~result
  }

export default {
    sumMoney: (a, b) => Math.round(a * 100 + b * 100)/100,
    validateString: value => validateString(value)
}