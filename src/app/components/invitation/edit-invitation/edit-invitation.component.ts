import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { InvitationService } from '../../../services/invitation.service';

@Component({
  selector: 'app-edit-invitation',
  templateUrl: './edit-invitation.component.html',
  styleUrls: ['./edit-invitation.component.css']
})
export class EditInvitationComponent implements OnInit {

   message;
  messageClass;
  invitation;
  processing = false;
  currentUrl;
  loading = true;

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private inviteService: InvitationService,
    private router: Router
  ) { }
  
  
   // Function to Submit Update
  updateInvitationSubmit() {
    this.processing = true; // Lock form fields
    // Function to send blog object to backend
    this.inviteService.editInvitation(this.invitation).subscribe(data => {
      // Check if PUT request was a success or not
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Set error bootstrap class
        this.message = data.message; // Set error message
        this.processing = false; // Unlock form fields
        setTimeout(() => {
          this.router.navigate(['/invitations']); // Navigate back to route page
        }, 2000);
      } else {
        this.messageClass = 'alert alert-success'; // Set success bootstrap class
        this.message = data.message; // Set success message
        // After two seconds, navigate back to blog page
        setTimeout(() => {
          this.router.navigate(['/invitations']); // Navigate back to route page
        }, 2000);
      }
    });
  }

  // Function to go back to previous page
  goBack() {
    this.location.back();
  }

  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params; // When component loads, grab the id
    // Function to GET current blog with id in params
    this.inviteService.getSingleInvitation(this.currentUrl.id).subscribe(data => {
      // Check if GET request was success or not
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Set bootstrap error class
        this.message = 'Invitation introuvable.'; // Set error message
      } else {
        this.invitation = data.invitation; // Save blog object for use in HTML
        this.loading = false; // Allow loading of blog form
      }
    });

  }

}
