import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { DataServiceService } from './data-service.service';
import { User } from './model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  currentUser: User
  constructor(
    private httpClient:HttpClient, private dataService: DataServiceService) { 
  }
  
  authenticate(email, password) {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(email + ':' + password) });
    return this.httpClient.post<any>(
      this.dataService.apiUrl+'login',{},{headers}
      ).pipe(
      map(
       user => {
         this.currentUser = new User();
         let authString = 'Basic ' + btoa(email + ':' + password);
         this.currentUser.name = user.name;
         this.currentUser.email = user.email;
         this.currentUser.id = user.id;
         this.currentUser.token = authString;
         this.currentUser.loggedIn = true;

         localStorage.setItem('user', JSON.stringify(this.currentUser))
         localStorage.setItem('email',email);
         
         localStorage.setItem('basicauth', authString); 
         
         return "successful login";
       }
     )
    );
  }

  isUserLoggedIn() {
    let user = localStorage.getItem('user')
    return !(user === null)
  }

  logOut() {
    this.currentUser = null;
    localStorage.removeItem('user')
    localStorage.removeItem('email')
    localStorage.removeItem('basicauth') 
  }
}