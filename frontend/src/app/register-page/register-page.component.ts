import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CustomerService } from '../customer.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MustMatch} from '../utils/must-match.validator';
import {RegisterModel} from '../model/register-model';


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  error: any;
  registerModel: RegisterModel;

  constructor(
    private apiService: ApiService,
    private customerService: CustomerService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    if (this.customerService.isLogged()) {
      this.router.navigateByUrl('/dashboard');
    }
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
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


  get f() { return this.registerForm.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.tryRegister();
  }

   tryRegister() {
     this.registerModel = new RegisterModel(this.registerForm.value);
     delete this.registerModel['confirmPassword'];
     console.log(this.registerModel);
     this.apiService.register(
       this.registerModel
    ).subscribe(
       res => {
         console.log(res);
        // if (res.profile) {
        //   this.customerService.setCurrentProfile(res.profile);
        //   window.location.reload();
        //   this.router.navigateByUrl('/dashboard');
        // }
      },
      res => {
        this.error = res.error.error;
        console.log(res.error.error);
      });
  }}


