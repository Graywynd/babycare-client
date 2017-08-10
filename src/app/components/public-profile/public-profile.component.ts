import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.css']
})
export class PublicProfileComponent implements OnInit {

  currentUrl;
  user;
  gender;
  profiletype;
  currentUser;
  currentuserParent = false;
  currentuserBabysitter = false;
  foundProfile = false;
  messageClass;
  message;

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params; // Get URL parameters on page load
    // Service to get the public profile data
    this.authService.getPublicProfile(this.currentUrl.username).subscribe(data => {
      // Check if user was found in database
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Return bootstrap error class
        this.message = data.message; // Return error message
      } else {
        this.user = data.user;
        this.profiletype = data.profiletype;

        if(this.user.gender === "f"){
        this.gender = "Female";
      }
      if(this.user.gender === "m"){
        this.gender = "Male;"
      }

        this.foundProfile = true;
      }
    });

    this.currentUser = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem("user"))));
    if(this.currentUser.usertype === "parent")
      this.currentuserParent = true ; 
    if(this.currentUser.usertype === "babysitter")
      this.currentuserBabysitter = true ; 
  }
}
