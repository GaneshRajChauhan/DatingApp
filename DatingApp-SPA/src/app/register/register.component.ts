import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  constructor(
    private authSerive: AuthService,
    private alertify: AlertifyService
  ) {}
  @Output()
  cancelRegister = new EventEmitter();
  ngOnInit() {}
  register() {
    this.authSerive.register(this.model).subscribe(
      () => {
        this.alertify.success('registration successeful');
      },
      error => {
        this.alertify.error(error);
      }
    );
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
