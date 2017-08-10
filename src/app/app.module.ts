import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { SeanceService } from './services/seance.service';
import { InvitationService } from './services/invitation.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notauth.guard';
import { CustomEmailFilter } from './pipes/CustomEmailFilter';
import { CustomFirstnameFilter } from './pipes/CustomFirstnameFilter';
import { CustomLastnameFilter } from './pipes/CustomLastnameFilter';
import { CustomUsernameFilter } from './pipes/CustomUsernameFilter';
import { SeanceComponent } from './components/seance/seance.component';
import { EditSeanceComponent } from './components/seance/edit-seance/edit-seance.component';
import { DeleteSeanceComponent } from './components/seance/delete-seance/delete-seance.component';
import { PublicProfileComponent } from './components/public-profile/public-profile.component';
import { EditProfileComponent } from './components/profile/edit-profile/edit-profile.component';
import { SendInviteComponent } from './components/send-invite/send-invite.component';
import { InvitationComponent } from './components/invitation/invitation.component';
import { EditInvitationComponent } from './components/invitation/edit-invitation/edit-invitation.component';
import { DeleteInvitationComponent } from './components/invitation/delete-invitation/delete-invitation.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    RegisterComponent,
    DashboardComponent,
    LoginComponent,
    ProfileComponent,
    SeanceComponent,
    EditSeanceComponent,
    DeleteSeanceComponent,
    PublicProfileComponent,
    EditProfileComponent,
    CustomEmailFilter,
    CustomFirstnameFilter,
    CustomLastnameFilter,
    CustomUsernameFilter,
    SendInviteComponent,
    InvitationComponent,
    EditInvitationComponent,
    DeleteInvitationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    FlashMessagesModule
  ],
  providers: [AuthService,SeanceService,UserService,InvitationService,AuthGuard, NotAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
