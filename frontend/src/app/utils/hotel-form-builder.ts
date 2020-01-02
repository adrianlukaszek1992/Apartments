import {FormBuilder, FormGroup, Validators} from '@angular/forms';


export function BuildHotelForm(isModify: boolean, hotelName: string): FormGroup {
  const formBuilder: FormBuilder = new FormBuilder();
  return formBuilder.group({
    hotelName: [{value: hotelName, disabled: isModify}, [Validators.required], Validators.minLength(6)],
    ratting: ['', [Validators.required]],
    street: ['', [Validators.required, Validators.minLength(2)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    city: ['', [Validators.required, Validators.minLength(2)]],
  });
}
