import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function matchPassword(password: AbstractControl): ValidatorFn {
  return (c: AbstractControl): ValidationErrors | null => {
    if (c.value !== password.value) {
      return { match: true };
    }
    return null;
  };
}