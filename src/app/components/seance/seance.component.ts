import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { SeanceService } from '../../services/seance.service';

@Component({
  selector: 'app-seance',
  templateUrl: './seance.component.html',
  styleUrls: ['./seance.component.css']
})
export class SeanceComponent implements OnInit {

   messageClass;
  message;
  newPost = false;
  loadingSeances = false;
  form;
  processing = false;
  username;
  seancePosts;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private seanceService: SeanceService
  ) {
    this.createNewSeanceForm(); // Create new seance form on start up
  }

   // Function to create new seance form
  createNewSeanceForm() {
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
 // Enable new seance form
  enableFormNewSeanceForm() {
    this.form.get('title').enable(); // Enable title field
    this.form.get('body').enable(); // Enable body field
  }

  // Disable new blog form
  disableFormNewSeanceForm() {
    this.form.get('title').disable(); // Disable title field
    this.form.get('body').disable(); // Disable body field
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

  // Function to display new blog form
  newSeanceForm() {
    this.newPost = true; // Show new blog form
  }

  // Reload blogs on current page
  reloadSeances() {
    this.loadingSeances = true; // Used to lock button
    this.getAllSeances();
    // Get All Blogs
    setTimeout(() => {
      this.loadingSeances = false; // Release button lock after four seconds
    }, 4000);
  }

  // Function to post a new comment on blog post
  draftComment() {

  }

  // Function to submit a new blog post
  onSeanceSubmit() {
    this.processing = true; // Disable submit button
    this.disableFormNewSeanceForm(); // Lock form

    
    // Create blog object from form fields
    const seance = {
      title: this.form.get('title').value, // Title field
      body: this.form.get('body').value, // Body field
      createdBy: this.username, // CreatedBy field
      start : this.form.get('date').value,
      duration : this.form.get('duration').value
    }

    // Function to save blog into database
    this.seanceService.newSeance(seance).subscribe(data => {
      // Check if blog was saved to database or not
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Return error class
        this.message = data.message; // Return error message
        this.processing = false; // Enable submit button
        this.enableFormNewSeanceForm(); // Enable form
      } else {
        this.messageClass = 'alert alert-success'; // Return success class
        this.message = data.message; // Return success message

        this.getAllSeances();

        // Clear form data after two seconds
        setTimeout(() => {
          this.newPost = false; // Hide form
          this.processing = false; // Enable submit button
          this.message = false; // Erase error/success message
          this.form.reset(); // Reset all form fields
          this.enableFormNewSeanceForm(); // Enable the form fields
        }, 2000);
      }
    });
  }

  // Function to go back to previous page
  goBack() {
    window.location.reload(); // Clear all variable states
  }

  getAllSeances() {
    // Function to GET all blogs from database
    this.seanceService.getAllSeances().subscribe(data => {
      this.seancePosts = data.seances; // Assign array to use in HTML
    });
  }

  // Function to like a blog post
  likeSeance(id) {
    // Service to like a blog post
    this.seanceService.likeSeance(id).subscribe(data => {
      this.getAllSeances(); // Refresh blogs after like
    });
  }

  ngOnInit() {
    // Get profile username on page load
    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.username; // Used when creating new blog posts and comments
    });

     this.getAllSeances();
  }

}
