import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component'
import { AboutComponent } from './components/about/about.component'
import { RegisterComponent } from './components/register/register.component'
import { LoginComponent } from './components/login/login.component'
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { ProfileComponent } from './components/profile/profile.component'
import { SeanceComponent } from './components/seance/seance.component'
import { EditSeanceComponent } from './components/seance/edit-seance/edit-seance.component';
import { DeleteSeanceComponent } from './components/seance/delete-seance/delete-seance.component';
import { PublicProfileComponent } from './components/public-profile/public-profile.component';
import { EditProfileComponent } from './components/profile/edit-profile/edit-profile.component';
import { SendInviteComponent } from './components/send-invite/send-invite.component';
import { InvitationComponent } from './components/invitation/invitation.component';
import { EditInvitationComponent } from './components/invitation/edit-invitation/edit-invitation.component';
import { DeleteInvitationComponent } from './components/invitation/delete-invitation/delete-invitation.component';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notauth.guard';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about' , component: AboutComponent},
  {
    path: 'register',
    component: RegisterComponent, // Register Route
    canActivate: [NotAuthGuard] 
  },
  {
    path: 'login',
    component: LoginComponent, // Login Route
    canActivate: [NotAuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent, // Profile Route
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent, // Dashboard Route
    canActivate: [AuthGuard] 
  },
  {
    path: 'seance',
    component: SeanceComponent, // Seance Route,
    canActivate: [AuthGuard] // User must be logged in to view this route
  },
  {
    path: 'edit-seance/:id',
    component: EditSeanceComponent, // Edit Blog ROute
    canActivate: [AuthGuard] // User must be logge din to view this route
  },
  {
    path: 'delete-seance/:id',
    component: DeleteSeanceComponent, // Edit Blog ROute
    canActivate: [AuthGuard] // User must be logge din to view this route
  },
   {
    path: 'user/:username',
    component: PublicProfileComponent, // Public Profile Route
    canActivate: [AuthGuard] // User must be logged in to view this route
  },
  {
    path: 'edit-profile/:id',
    component: EditProfileComponent, // Edit Blog ROute
    canActivate: [AuthGuard] // User must be logge din to view this route
  },
   {
    path: 'invite-babysitter/:username',
    component: SendInviteComponent, // Edit Blog ROute
    canActivate: [AuthGuard] // User must be logge din to view this route
  },
  {
    path: 'invitations',
    component: InvitationComponent, // Edit Blog ROute
    canActivate: [AuthGuard] // User must be logge din to view this route
  },
   {
    path: 'edit-invite/:id',
    component: EditInvitationComponent, // Edit Blog ROute
    canActivate: [AuthGuard] // User must be logge din to view this route
  },
  {
    path: 'delete-invite/:id',
    component: DeleteInvitationComponent, // Edit Blog ROute
    canActivate: [AuthGuard] // User must be logge din to view this route
  },
  
  { path: '**', component: HomeComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [],
  exports : [RouterModule]
})

export class AppRoutingModule { }
