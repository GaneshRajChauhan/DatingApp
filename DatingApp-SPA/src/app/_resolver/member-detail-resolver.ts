import { Injectable } from '@angular/core';

import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { Observable, of } from 'rxjs';
import { AlertifyService } from '../_services/alertify.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MemberDetailResolver implements Resolve<User> {
    constructor(private userSerive: UserService,
        private router: Router, private alertify: AlertifyService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return this.userSerive.getUser(route.params['id']).pipe(
            catchError(error => {
                this.alertify.error('Problem retriving data');
                this.router.navigate(['/members']);
                return of(null);
            })
        );
    }
}
