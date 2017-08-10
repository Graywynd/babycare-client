import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { InvitationService } from '../../services/invitation.service';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.css']
})
export class InvitationComponent implements OnInit {

  currentUser;
  userParent = false;
  userBabysitter = false;
  invitationsParent;
  invitationsBabysitter;

 constructor(
    private authService: AuthService,
    private invitationService: InvitationService
  ) {
    
  }

   getAllInvitationsParent() {
    // Function to GET all blogs from database
    this.invitationService.getAllInvitationsParent(this.currentUser.username).subscribe(data => {
      this.invitationsParent = data.invitations;
      
    });
  }

  getAllInvitationsBabysitter() {
    // Function to GET all blogs from database
    this.invitationService.getAllInvitationsBabysitter(this.currentUser.username).subscribe(data => {
      this.invitationsBabysitter = data.invitations; // Assign array to use in HTML
    });
  }

  ConfirmerInvite(id){
    this.invitationService.ConfirmInvitation(id).subscribe(data => {
      this.getAllInvitationsBabysitter(); // Refresh blogs after like
    });

  }

  ngOnInit() {

    this.currentUser = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem("user"))));
    if(this.currentUser.usertype === "parent"){
     
      this.userParent = true ; 
      this.getAllInvitationsParent();
    }
    if(this.currentUser.usertype === "babysitter"){
      this.userBabysitter = true ; 
      this.getAllInvitationsBabysitter();
    }
  }

}
