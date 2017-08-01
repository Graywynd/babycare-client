import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class UserService {

  domain = this.authService.domain;
  options;

  constructor(
    private authService: AuthService,
    private http: Http
  ) { }

   // Function to create headers, add token, to be used in HTTP requests
  createAuthenticationHeaders() {
    this.authService.loadToken(); // Get token so it can be attached to headers
    // Headers configuration options
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json', // Format set to JSON
        'authorization': this.authService.authToken // Attach token
      })
    });
  }

   getAllParents() {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain + '/Parents/allParents', this.options).map(res => res.json());
  }

  getAllBabysitters() {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain + '/Babysitters/allBabysitters', this.options).map(res => res.json());
  }

  editParent(user){
    this.createAuthenticationHeaders(); // Create headers
    return this.http.put(this.domain + '/Parents/updateParent/', user, this.options).map(res => res.json());
  }

  editBabysitter(user){
    this.createAuthenticationHeaders(); // Create headers
    return this.http.put(this.domain + '/Babysitters/updateBabysitter/', user, this.options).map(res => res.json());
  }

  getBabysitter(id) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain + '/Babysitters/getBabysitter/' + id, this.options).map(res => res.json());
  }

  getParent(id) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain + '/Parents/getParent/' + id, this.options).map(res => res.json());
  }

  getParentCount(){
     this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain + '/Parents/getCount', this.options).map(res => res.json());
  }

  getBabysitterCount(){
     this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain + '/Babysitters/getCount', this.options).map(res => res.json());
  }


  getSeanceCount(){
     this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain + '/Seance/getCount', this.options).map(res => res.json());
  }


  
  

}
