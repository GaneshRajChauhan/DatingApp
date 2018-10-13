import { Injectable } from '@angular/core';

import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { Observable, of } from 'rxjs';
import { AlertifyService } from '../_services/alertify.service';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class MemberEditResolver implements Resolve<User> {
    constructor(private userSerive: UserService, private authService: AuthService,
        private router: Router, private alertify: AlertifyService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return this.userSerive.getUser(this.authService.decotedToken.nameid).pipe(
            catchError(error => {
                this.alertify.error('Problem retriving your data');
                this.router.navigate(['/members']);
                return of(null);
            })
        );
    }
}
