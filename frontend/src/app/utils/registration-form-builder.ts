import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MustMatch} from './must-match.validator';


export function BuildRegsitrationForm(isModify: boolean, userMail: string): FormGroup {
  const formBuilder: FormBuilder = new FormBuilder();
  return formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    lastname: ['', [Validators.required, Validators.minLength(2)]],
    email: [{value: userMail, disabled: isModify}, [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    phone: ['', [Validators.required, Validators.pattern('^\\d{3}-\\d{3}-\\d{3}$')]],
    street: ['', [Validators.required, Validators.minLength(2)]],
    profile: ['', [Validators.required]],
    city: ['', [Validators.required, Validators.minLength(2)]],
    confirmPassword: ['', Validators.required],
  }, {
    validator: MustMatch('password', 'confirmPassword')
  });
}
