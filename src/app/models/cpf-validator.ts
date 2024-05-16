import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'

export function cpfValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const cpf = control.value
    if (!cpf) {
      return null 
    }

    const cpfClean = cpf.replace(/\D/g, '')

        if (cpfClean.length !== 11) {
      return { cpfInvalid: true }
    }

    if (/^(\d)\1{10}$/.test(cpfClean)) {
      return { cpfInvalid: true }
    }

    let sum = 0
    let rest

    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cpfClean.substring(i - 1, i)) * (11 - i)
    }

    rest = (sum * 10) % 11

    if (rest === 10 || rest === 11) {
      rest = 0
    }

    if (rest !== parseInt(cpfClean.substring(9, 10))) {
      return { cpfInvalid: true }
    }

    sum = 0

    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cpfClean.substring(i - 1, i)) * (12 - i)
    }

    rest = (sum * 10) % 11

    if (rest === 10 || rest === 11) {
      rest = 0
    }

    if (rest !== parseInt(cpfClean.substring(10, 11))) {
      return { cpfInvalid: true }
    }

    return null 
  }
}
