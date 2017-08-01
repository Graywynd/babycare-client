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
        this.foundProfile = true;
      }
    });
  }
}
