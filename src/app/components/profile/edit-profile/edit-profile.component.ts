import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  currentUser;
  usertype;
  message;
  messageClass;
  user;
  processing = false;
  currentUrl;
  loading = true;

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) { }
  
  
   // Function to Submit Update
  updateUserSubmit() {
    this.processing = true; // Lock form fields
    // Function to send blog object to backend
    if(this.usertype === "parent"){
      console.log(this.user);
    this.userService.editParent(this.user).subscribe(data => {
      // Check if PUT request was a success or not
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Set error bootstrap class
        this.message = data.message; // Set error message
        this.processing = false; // Unlock form fields
      } else {
        this.messageClass = 'alert alert-success'; // Set success bootstrap class
        this.message = data.message; // Set success message
        // After two seconds, navigate back to blog page
        setTimeout(() => {
          this.router.navigate(['/profile']); // Navigate back to route page
        }, 2000);
      }
    });
    }

    if(this.usertype === "babysitter"){
      this.userService.editBabysitter(this.user).subscribe(data => {
      // Check if PUT request was a success or not
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Set error bootstrap class
        this.message = data.message; // Set error message
        this.processing = false; // Unlock form fields
      } else {
        this.messageClass = 'alert alert-success'; // Set success bootstrap class
        this.message = data.message; // Set success message
        // After two seconds, navigate back to blog page
        setTimeout(() => {
          this.router.navigate(['/seance']); // Navigate back to route page
        }, 2000);
      }
    });
    }


  }

  // Function to go back to previous page
  goBack() {
    this.location.back();
  }

  ngOnInit() {

    this.currentUser = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem("user"))));
    this.usertype = this.currentUser.usertype ; 
    

    this.currentUrl = this.activatedRoute.snapshot.params; // When component loads, grab the id
    // Function to GET current blog with id in params

    if(this.usertype === "parent"){
    this.userService.getParent(this.currentUrl.id).subscribe(data => {
      // Check if GET request was success or not
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Set bootstrap error class
        this.message = 'Seance not found.'; // Set error message
      } else {
        this.user = data.user; // Save blog object for use in HTML
        this.loading = false; // Allow loading of blog form
      }
    });
    }
  if(this.usertype === "babysitter"){
    this.userService.getBabysitter(this.currentUrl.id).subscribe(data => {
      // Check if GET request was success or not
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Set bootstrap error class
        this.message = 'Seance not found.'; // Set error message
      } else {
        this.user = data.user; // Save blog object for use in HTML
        this.loading = false; // Allow loading of blog form
      }
    });
     
  }

  }
}
