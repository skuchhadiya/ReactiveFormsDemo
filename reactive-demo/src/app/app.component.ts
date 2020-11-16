import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Address, User, UserB } from 'src/Interface/user';
import { ageValidator } from 'src/Validator/age-validator';

export const fakeuser: User = {
  id : 'text',
  name: 'xyz',
  age: 25,
  address : {
    houseNo : 2,
    street : 'abc',
    postCode: 'XX2 5XX'
  }
};

export const fakeuserB: UserB = {
  id : 'text',
  name: 'xyz',
  age: 25,
  addresses : [
    {
      houseNo : 1,
      street : 'abc',
      postCode: 'XX1 5XX'
   },
   {
    houseNo : 2,
    street : 'abc',
    postCode: 'XX2 5XX'
  }
]
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  formA: FormGroup;
  formB: FormGroup;
  formC: FormGroup;
  constructor(){}
  ngOnInit(): void {
      this.formA = this.buildFormA(fakeuser);
      this.formB = this.buildFormB(fakeuserB);
      this.formC = this.buildFormC(fakeuser);
  }
  onAddressValueChnage(event: any): void {

  }

  private  buildFormA(user: User): FormGroup {
    return new FormGroup( {
      id : new FormControl(user.id, [Validators.required, Validators.maxLength(10)]),
      name : new FormControl(user.name),
      age : new FormControl(user.age, [Validators.required, ageValidator]),
      address : new FormControl(user.address, [Validators.required]), // can use control value accessor
    });
  }

 private  buildFormB(user: UserB): FormGroup {
   return new FormGroup( {
     id : new FormControl(user.id, [Validators.required, Validators.maxLength(10)]),
     name : new FormControl(user.name),
     age : new FormControl(user.age, [Validators.required, ageValidator]),
     addresses : this.buildAddressFormArray(user.addresses)
   });

 }

 private buildFormC(user: User): FormGroup {
   return new FormGroup( {
     id : new FormControl(user.id, [Validators.required, Validators.maxLength(10)]),
     name : new FormControl(user.name),
     age : new FormControl(user.age, [Validators.required, ageValidator]),
     // nested forms inline
     address : new FormGroup({
       houseNo: new FormControl(user.address.houseNo, [Validators.required, Validators.maxLength(10)]),
       street: new FormControl(user.address.street),
       postCode: new FormControl(user.address.postCode),
     }),
   });
 }

 private buildAddressFormArray( addresses: Address[]): FormArray{
    const formArray = new FormArray([]);
    addresses.forEach( x => {
          const form = new FormGroup({
            houseNo: new FormControl(x.houseNo, [Validators.required, Validators.maxLength(10)]),
            street: new FormControl(x.street),
            postCode: new FormControl(x.postCode),
          });
          formArray.push(form);
    });
    return formArray;
 }
}
