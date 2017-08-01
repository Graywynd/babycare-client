import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SeanceService } from '../../../services/seance.service';

@Component({
  selector: 'app-edit-seance',
  templateUrl: './edit-seance.component.html',
  styleUrls: ['./edit-seance.component.css']
})
export class EditSeanceComponent implements OnInit {

 message;
  messageClass;
  seance;
  processing = false;
  currentUrl;
  loading = true;

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private seanceService: SeanceService,
    private router: Router
  ) { }
  
  
   // Function to Submit Update
  updateSeanceSubmit() {
    this.processing = true; // Lock form fields
    // Function to send blog object to backend
    this.seanceService.editSeance(this.seance).subscribe(data => {
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

  // Function to go back to previous page
  goBack() {
    this.location.back();
  }

  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params; // When component loads, grab the id
    // Function to GET current blog with id in params
    this.seanceService.getSingleSeance(this.currentUrl.id).subscribe(data => {
      // Check if GET request was success or not
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Set bootstrap error class
        this.message = 'Seance not found.'; // Set error message
      } else {
        this.seance = data.seance; // Save blog object for use in HTML
        this.loading = false; // Allow loading of blog form
      }
    });

  }

}
