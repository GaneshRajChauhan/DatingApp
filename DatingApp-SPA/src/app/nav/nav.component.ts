import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {

  };
  phtoUrl: string;
  constructor(public authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(photourl => this.phtoUrl = photourl)
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('Logged in successfylly');
    }, error => {
      this.alertify.error(error);
    }, () => {
     this.router.navigate(['/members']);
    });
  }
  loggedIn() {
   return this.authService.loggedIn();
  }
  loggedout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decotedToken = null;
    this.authService.currentUser = null;
    this.alertify.message('Logout');
    this.router.navigate(['/home']);
  }
}
