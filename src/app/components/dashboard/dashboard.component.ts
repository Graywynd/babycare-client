import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import {Router} from '@angular/router';
import {CustomEmailFilter} from '../../pipes/CustomEmailFilter';
import {CustomFirstnameFilter} from '../../pipes/CustomFirstnameFilter';
import {CustomLastnameFilter} from '../../pipes/CustomLastnameFilter';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  email = '';
  firstname = '';
  lastname = '';
  userParent = false;
  userBabysitter = false;
  currentUser;
  Parents;
  Babysitters;
  numParents;
  numBabysitters;
  numSeances;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router : Router
  ) { }

  getAllParents() {
    // Function to GET all blogs from database
    this.userService.getAllParents().subscribe(data => {
      this.Parents = data.parents; // Assign array to use in HTML
    });
  }

  getAllBabysitters() {
    // Function to GET all blogs from database
    this.userService.getAllBabysitters().subscribe(data => {
      this.Babysitters = data.babysitters; // Assign array to use in HTML
    });
  }

  getStats(){
    this.userService.getParentCount().subscribe(data => {
      this.numParents = data.num; // Assign array to use in HTML
    });
    this.userService.getBabysitterCount().subscribe(data => {
      this.numBabysitters = data.num; // Assign array to use in HTML
    });
    this.userService.getSeanceCount().subscribe(data => {
      this.numSeances = data.num; // Assign array to use in HTML
    });
  }

  redirectToUser(username){
    console.log(username);
    this.router.navigate(['/user/'+username]);

  }

  ngOnInit() {

    this.currentUser = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem("user"))));
    if(this.currentUser.usertype === "parent")
      this.userParent = true ; 
    if(this.currentUser.usertype === "babysitter")
      this.userBabysitter = true ; 

    this.getAllParents();
    this.getAllBabysitters();
    this.getStats();

  }

}
