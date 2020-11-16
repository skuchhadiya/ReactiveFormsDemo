import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VfAddressComponent } from './vf-address.component';

describe('VfAddressComponent', () => {
  let component: VfAddressComponent;
  let fixture: ComponentFixture<VfAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VfAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VfAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
