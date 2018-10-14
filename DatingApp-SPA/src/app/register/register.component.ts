import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { User } from '../_models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User;
  registerForm: FormGroup;
  constructor(
    private authSerive: AuthService,
    private alertify: AlertifyService,
    private router: Router,
    private fb: FormBuilder
  ) {}
  @Output()
  cancelRegister = new EventEmitter();
  ngOnInit() {
    this.createRegisterForm();
  }
  createRegisterForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['' , Validators.required],
      knownAs: ['' , Validators.required],
      dateOfBirth: [null , Validators.required],
      city: ['' , Validators.required],
      country: ['' , Validators.required],
      password: ['',  [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required ]
    }, {validator: this.paswordMatchValidator});
  }
  paswordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : { 'mismatch': true};
  }
  register() {
    if (this.registerForm.valid) {
     this.user = Object.assign({} , this.registerForm.value);
     this.authSerive.register(this.user).subscribe( () => {
       this.alertify.success('Registration successeful');
     } , error => {
       this.alertify.error(error);
     }, () => {
       this.authSerive.login(this.user).subscribe( () => {
         this.router.navigate(['/members']);
       });
     });
    }
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
