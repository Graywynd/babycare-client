import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class SeanceService {

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

  // Function to create a new seance post
  newSeance(seance) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.post(this.domain + '/Seances/newSeance', seance, this.options).map(res => res.json());
  }

  getAllSeances() {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain + '/Seance/allSeances', this.options).map(res => res.json());
  }

   // Function to get the blog using the id
  getSingleSeance(id) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain + '/Seance/singleSeance/' + id, this.options).map(res => res.json());
  }

  // Function to edit/update blog post
  editSeance(seance) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.put(this.domain + '/Seance/updateSeance/', seance, this.options).map(res => res.json());
  }

  // Function to delete a blog
  deleteSeance(id) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.delete(this.domain + '/Seance/deleteSeance/' + id, this.options).map(res => res.json());
  }

  likeSeance(id) {
    const blogData = { id: id };
    return this.http.put(this.domain + '/Seance/likeSeance/', blogData, this.options).map(res => res.json());
  }

}
