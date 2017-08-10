import { Component, OnInit } from '@angular/core';
import { InvitationService } from '../../../services/invitation.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delete-invitation',
  templateUrl: './delete-invitation.component.html',
  styleUrls: ['./delete-invitation.component.css']
})
export class DeleteInvitationComponent implements OnInit {

  message;
  messageClass;
  foundInvitation = false;
  processing = false;
  invitation;
  currentUrl;

  constructor(
    private invitationService: InvitationService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  // Function to delete blogs
  deleteInvitation() {
    this.processing = true; // Disable buttons
    // Function for DELETE request
    this.invitationService.deleteInvitation(this.currentUrl.id).subscribe(data => {
      // Check if delete request worked
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Return error bootstrap class
        this.message = data.message; // Return error message
        setTimeout(() => {
          this.router.navigate(['/invitations']); // Navigate back to route page
        }, 2000);
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
    this.currentUrl = this.activatedRoute.snapshot.params; // Get URL paramaters on page load
    // Function for GET request to retrieve blog
    this.invitationService.getSingleInvitation(this.currentUrl.id).subscribe(data => {
      // Check if request was successfull
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Return bootstrap error class
        this.message = data.message; // Return error message
      } else {
        // Create the blog object to use in HTML
        this.invitation = {
          title: data.invitation.title, // Set title
          body: data.invitation.body, // Set body
          createdBy: data.invitation.createdBy, // Set created_by field
          createdAt: data.invitation.createdAt,
          Invited : data.invitation.Invited,
          StartAt : data.invitation.StartAt,
          duration : data.invitation.duration // Set created_at field
        }
        this.foundInvitation = true; // Displaly blog window
      }
    });
  }

}
