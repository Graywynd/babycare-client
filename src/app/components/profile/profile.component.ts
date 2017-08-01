import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

 user;
 gender;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    // Once component loads, get user's data to display on profile
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user; // Set username
      
      if(this.user.gender === "f"){
        this.gender = "Female";
      }
      if(this.user.gender === "m"){
        this.gender = "Male;"
      }
    
    });
  }

}
