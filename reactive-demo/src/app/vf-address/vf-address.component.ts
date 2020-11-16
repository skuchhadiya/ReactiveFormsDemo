import {AfterViewInit, Component, EventEmitter, forwardRef, OnDestroy, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Address } from 'src/Interface/user';

@Component({
  selector: 'app-vf-address',
  templateUrl: './vf-address.component.html',
  styleUrls: ['./vf-address.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VfAddressComponent),
      multi: true
    }]
})
export class VfAddressComponent implements OnInit, ControlValueAccessor, AfterViewInit, OnDestroy {
  @Output() valueChange = new  EventEmitter<Address>();
  private valueChangeListner = new Subject<any>();
  private fnChange: (value: any ) => void;
  private fnTouch: (value: any ) => void;
  private onDestroy = new Subject();
  addressForm: FormGroup;
  constructor() { }
  ngAfterViewInit(): void {
    this.addressForm.valueChanges
    .pipe( takeUntil(this.onDestroy))
    .subscribe( value => {
      if (value){
        this.fnTouch(value);
        this.fnChange(value);
        this.valueChange.emit(value);
      }
    });
  }
  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  ngOnInit(): void {
    this.valueChangeListner
    .pipe( takeUntil(this.onDestroy))
    .subscribe( (data: Address) => {
      if (data) {
        this.addressForm = this.buildFrom(data);
      }
    });
  }

  private buildFrom(x: Address): FormGroup{
    return new FormGroup({
      houseNo: new FormControl(x.houseNo, [Validators.pattern('[0-9]+')]),
      street: new FormControl(x.street),
      postCode: new FormControl(x.postCode),
    });
  }

 writeValue(obj: any): void {
    this.valueChangeListner.next(obj);
 }
 ignorDot(key: string): boolean  {
   if (key === '.'){
    return false;
   }
   return true;
 }

 registerOnChange(fn: any): void {
    this.fnChange = fn;
 }

 registerOnTouched(fn: any): void {
   this.fnTouch = fn;
 }
 setDisabledState(isDisabled: boolean): void {
    if (isDisabled) { this.addressForm.disable(); }
     else { this.addressForm.enable(); }
 }

}
