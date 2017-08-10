import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { InvitationService } from '../../services/invitation.service';

@Component({
  selector: 'app-send-invite',
  templateUrl: './send-invite.component.html',
  styleUrls: ['./send-invite.component.css']
})
export class SendInviteComponent implements OnInit {

  invitedUsername;
  username;
  form;
  currentUrl;
  processing = false;
  message;
  messageClass;

  constructor( private location: Location,
    private invitationService : InvitationService,
    private authService : AuthService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router

   ) { this.createNewInviationForm(); }

   createNewInviationForm() {
    this.form = this.formBuilder.group({
      title: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(5),
        this.alphaNumericValidation
      ])],
      body: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(500),
        Validators.minLength(5)
      ])],
      date: ['', Validators.compose([
        Validators.required
      ])],
      duration: ['', Validators.compose([
        Validators.required
      ])]
    })
  }


  // Validation for title
  alphaNumericValidation(controls) {
    const regExp = new RegExp(/^[a-zA-Z0-9 ]+$/); // Regular expression to perform test
    // Check if test returns false or true
    if (regExp.test(controls.value)) {
      return null; // Return valid
    } else {
      return { 'alphaNumericValidation': true } // Return error in validation
    }
  }


  enableFormInvitationForm() {
    this.form.get('title').enable(); // Enable title field
    this.form.get('body').enable(); // Enable body field
  }

  // Disable new blog form
  disableFormInvitationForm() {
    this.form.get('title').disable(); // Disable title field
    this.form.get('body').disable(); // Disable body field
  }


   goBack() {
    this.location.back();
  }

   onInvitationSubmit() {
    this.processing = true; // Disable submit button
    this.disableFormInvitationForm(); // Lock form


    // Create blog object from form fields
    const invitaion = {
      title: this.form.get('title').value, // Title field
      body: this.form.get('body').value, // Body field
      createdBy: this.username, // CreatedBy field
      start : this.form.get('date').value,
      invited : this.invitedUsername,
      duration : this.form.get('duration').value
    }

    // Function to save blog into database
    this.invitationService.newInvitation(invitaion).subscribe(data => {
      // Check if blog was saved to database or not
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Return error class
        this.message = data.message; // Return error message
        this.processing = false; // Enable submit button
        this.enableFormInvitationForm(); // Enable form
      } else {
        this.messageClass = 'alert alert-success'; // Return bootstrap success class
        this.message = data.message; // Return success message
        // After two second timeout, route to blog page
        setTimeout(() => {
          this.router.navigate(['/invitations']); // Route users to blog page
        }, 2000);
      }
    });
  }

  ngOnInit() {

     this.currentUrl = this.activatedRoute.snapshot.params;
    this.invitedUsername = this.currentUrl.username;

    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.username; // Used when creating new blog posts and comments
    });

  }

}
