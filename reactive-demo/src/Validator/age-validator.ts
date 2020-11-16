import { AbstractControl } from '@angular/forms';

export function  ageValidator(control: AbstractControl): {[key: string]: boolean} | null {
    if ( control.value !== null && (isNaN(control.value) || control.value < 20  || control.value > 70)){
      return { ageValidator: true };
    }
    return null;
 }
