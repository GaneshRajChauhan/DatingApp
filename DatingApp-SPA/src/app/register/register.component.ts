import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  constructor(private authSerive: AuthService) { }
  @Output() cancelRegister = new EventEmitter();
  ngOnInit() {
  }
  register() {
    this.authSerive.register(this.model).subscribe(() => {
      console.log('registration successeful');
    }, error => {
      console.log(error);
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
    console.log(' cancelled');
  }

}
