import {Component, Input, OnInit} from '@angular/core';
import {BuildRegsitrationForm} from '../utils/registration-form-builder';
import {FormGroup} from '@angular/forms';
import {RegisterModel} from '../model/register-model';
import {Redirect} from '../utils/redirect';
import {Router} from '@angular/router';
import {CustomerService} from '../customer.service';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  @Input()
  isModify: boolean;
  submitted = false;
  registerForm: FormGroup;
  error: any;
  registerModel: RegisterModel;
  submitButtonText = 'Register';

  constructor(
    private apiService: ApiService,
    private router: Router,
    private customerService: CustomerService
  ) {
  }

  get f() {
    return this.registerForm.controls;
  }

  ngOnInit() {
    if (this.isModify) {
      this.submitButtonText = 'Modify the user';
    }
    this.registerForm = BuildRegsitrationForm(this.isModify, this.customerService.getCurrentEmail());
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.registerForm.invalid);
    if (this.registerForm.invalid) {
      return;
    }
    if (this.isModify) {
      this.tryUpdate();
    } else {
      this.tryRegister();
    }
  }

  tryUpdate() {
    this.registerModel = new RegisterModel(this.registerForm.value);
    delete this.registerModel['confirmPassword'];
    this.apiService.update(
      this.registerModel
    ).subscribe(
      res => {
        if (res.error) {
          this.error = res.error;
        } else {
          window.alert(res.message);
        }
      },
      res => {
        this.error = res.error.error;
        console.log(res);
      });
  }

  tryRegister() {
    this.registerModel = new RegisterModel(this.registerForm.value);
    delete this.registerModel['confirmPassword'];
    this.apiService.register(
      this.registerModel
    ).subscribe(
      res => {
        if (res.error) {
          this.error = res.error;
        } else {
          Redirect(res, this.router, this.customerService, this.registerForm.controls.email.value);
        }
      },
      res => {
        this.error = res.error.error;
      });
  }
}
