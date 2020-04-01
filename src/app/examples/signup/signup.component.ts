import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/authentication.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    invalidLogin = true;
    test : Date = new Date();
    focus;
    focus1;

    email: string = "";
    password: string = "";
    constructor( private router: Router, public loginservice: AuthenticationService,) { }

    ngOnInit() {
        // localStorage.setItem('token',"");
    }

    login() {
        if(!this.email.trim() || !this.password.trim()){
            alert('Please provide email and password');
        }else{
            return (this.loginservice.authenticate(this.email, this.password).subscribe(
                data => {
                    this.router.navigate([''])
                    this.invalidLogin = false;
                },
                error => {
                    alert('Wrong Credentials')
                    this.invalidLogin = true;
                })
            );
        }
    }
}
