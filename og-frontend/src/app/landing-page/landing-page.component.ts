import { Component } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { User } from '@app/_models';
import { AccountService } from '@app/_services';

@Component({ templateUrl: 'landing-page.component.html' })
export class LandingPageComponent {
    user: User;


    constructor(private accountService: AccountService, private router: Router) {
        this.user = this.accountService.userValue;
        console.log(this.user);

        if (this.user) {
            this.router.navigate(['/home']);
        }
    }
}