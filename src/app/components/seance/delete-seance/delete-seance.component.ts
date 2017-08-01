import { Component, OnInit } from '@angular/core';
import { SeanceService } from '../../../services/seance.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delete-seance',
  templateUrl: './delete-seance.component.html',
  styleUrls: ['./delete-seance.component.css']
})
export class DeleteSeanceComponent implements OnInit {

  message;
  messageClass;
  foundSeance = false;
  processing = false;
  seance;
  currentUrl;

  constructor(
    private seanceService: SeanceService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  // Function to delete blogs
  deleteSeance() {
    this.processing = true; // Disable buttons
    // Function for DELETE request
    this.seanceService.deleteSeance(this.currentUrl.id).subscribe(data => {
      // Check if delete request worked
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Return error bootstrap class
        this.message = data.message; // Return error message
      } else {
        this.messageClass = 'alert alert-success'; // Return bootstrap success class
        this.message = data.message; // Return success message
        // After two second timeout, route to blog page
        setTimeout(() => {
          this.router.navigate(['/seance']); // Route users to blog page
        }, 2000);
      }
    });
  }

  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params; // Get URL paramaters on page load
    // Function for GET request to retrieve blog
    this.seanceService.getSingleSeance(this.currentUrl.id).subscribe(data => {
      // Check if request was successfull
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Return bootstrap error class
        this.message = data.message; // Return error message
      } else {
        // Create the blog object to use in HTML
        this.seance = {
          title: data.seance.title, // Set title
          body: data.seance.body, // Set body
          createdBy: data.seance.createdBy, // Set created_by field
          createdAt: data.seance.createdAt,
          StartAt : data.seance.StartAt // Set created_at field
        }
        this.foundSeance = true; // Displaly blog window
      }
    });
  }

}
