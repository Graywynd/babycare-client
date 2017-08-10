import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class InvitationService {

 options;
  domain = this.authService.domain;

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


  newInvitation(invitation){
    this.createAuthenticationHeaders(); // Create headers
    return this.http.post(this.domain + '/Invitations/newInvitation', invitation, this.options).map(res => res.json());

  }

   getAllInvitationsParent(username) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain + '/Invitations/Parent/'+ username ,this.options).map(res => res.json());
  }

  getAllInvitationsBabysitter(username) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain + '/Invitations/Babysitter/'+ username ,this.options).map(res => res.json());
  }

  ConfirmInvitation(id) {
    const invitation = { id: id };
    return this.http.put(this.domain + '/Invitations/ConfirmInvitation/', invitation, this.options).map(res => res.json());
  }

   getSingleInvitation(id) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain + '/Invitations/singleInvitation/' + id, this.options).map(res => res.json());
  }

   // Function to edit/update blog post
  editInvitation(invite) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.put(this.domain + '/Invitations/updateInvitation/', invite, this.options).map(res => res.json());
  }


  // Function to delete a blog
  deleteInvitation(id) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.delete(this.domain + '/Invitations/deleteInvitation/' + id, this.options).map(res => res.json());
  }


}
