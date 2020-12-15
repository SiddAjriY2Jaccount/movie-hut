import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { first } from 'rxjs/operators';
import { AccountService } from '../../services/account.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-custom-navbar',
  templateUrl: './custom-navbar.component.html',
  styleUrls: ['./custom-navbar.component.css']
})
export class CustomNavbarComponent implements OnInit {
  title = 'Movie-Hut-Navbar'
  movies = [];
  role = '';
  loggedIn: boolean = false;
  loading: boolean = false;
  loggedInUser: any;
  token: string = '';
  
  showLoginModal: boolean;
  loginForm: FormGroup;
  loginSubmitted = false;

  showRegisterModal: boolean;
  registerForm: FormGroup;
  registerSubmitted = false;

  constructor(private router: Router, 
    private formBuilder: FormBuilder, 
    private route: ActivatedRoute, 
    private accountService: AccountService,
    private alertService: AlertService) {
    
  }

  async ngOnInit() {

    //Set loggedIn value if token exists
    this.token = this.accountService.loadToken();

    if (this.token) {
      this.loggedIn = true;
      this.router.navigate(['/']);
    }
    

    //Toggle Click Function
    $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.registerForm = this.formBuilder.group({
      name: ['',[Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['']
    });
  }

  get f() { return this.loginForm.controls; }
  get reg() { return this.registerForm.controls; }

  onSubmit() {
    this.loginSubmitted = true;
    this.loading = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }
    if(this.loginSubmitted)
    {
      
      this.accountService.login(this.f.email.value, this.f.password.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    // get return url from query parameters or default to home page
                    this.alertService.success('Login successful', { keepAfterRouteChange: false });
                    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                    this.loading = false;
                    this.loggedIn = true;
                    this.loggedInUser = localStorage.getItem('user');
                    this.router.navigateByUrl(returnUrl);
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });

      
      this.showLoginModal = false;
      this.loginForm.reset();
    }
  }

  hide() {
    // Hide Modal Check
    this.showLoginModal = false; 
  }

  show() {
    // Show-Hide Modal Check
    this.showLoginModal = true; 
  }

  onRegisterSubmit() {

    this.registerSubmitted = true;
    this.loading = true;

    /*     
    console.log(this.registerForm.controls.email.value);
    console.log(this.reg.name.value);
    console.log(this.reg.password.value);
    console.log(this.reg.role.value);  
    */
   
    // stop here if form is invalid
    if (this.reg.role.value == '') {
      //console.log('Entered if condition for role is empty');
      this.role = 'user'; 
      this.registerForm.patchValue({
        role: this.role
      });      
    }

    else {
      //console.log('Entered else condition for role is not empty');
      this.role = 'admin';
      this.registerForm.patchValue({
        role: this.role
      }); 
    }
    
    if (this.registerForm.invalid) {
        this.role = '';
        this.registerForm.patchValue({
          role: this.role
        });
        return;
    }


    if(this.registerSubmitted)
    {
      
      this.accountService.register(this.registerForm.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Registration successful, proceed to login!', { keepAfterRouteChange: false });
                    //this.router.navigate(['../login'], { relativeTo: this.route });
                    //this.show();
                    this.loading = false;
                },
                error: error => {
                    //console.log(error);
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
      this.showRegisterModal = false;
      this.registerForm.reset();
    }
  }

  reg_hide() {
    // Hide Modal Check
    this.showRegisterModal = false; 
  }

  reg_show() {
    // Show-Hide Modal Check
    this.showRegisterModal = true; 
  }

  onLogout() {
    this.accountService.logout();
    this.token = '';
    this.loggedIn = false;
    this.alertService.success('Logged out successfully', { keepAfterRouteChange: false });
  }
}
