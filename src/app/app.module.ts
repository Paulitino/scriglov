import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { DemoMaterialModule } from './material-module';
import { MatNativeDateModule, MatToolbarModule, MatButtonModule, MatIconModule, MatListModule, MatSidenavModule, MatDialogModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';


import { AppComponent } from './app.component';
import { AuthService } from './auth.service';
import { ProfileService } from './profile.service';
import { StatisticsService } from './statistics.service';
import { LoginComponent } from './login/login.component';
import { SubscribeComponent, DialogOverviewExampleDialog } from './subscribe/subscribe.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from "./app-routing.module";
import { MainNavComponent } from './main-nav/main-nav.component';
import { RelaxationComponent } from './relaxation/relaxation.component';
import { ContactsComponent } from './contacts/contacts.component';
import { FooterComponent } from './footer/footer.component';
import { VideosComponent } from './videos/videos.component';
import { LegalNoticesComponent } from './legal-notices/legal-notices.component';
import { JacobsonComponent } from './relaxation/jacobson/jacobson.component';
import { BaleKneadingComponent } from './relaxation/bale-kneading/bale-kneading.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangeMailComponent } from './change-mail/change-mail.component';

import { GraphicHandComponent } from './graphic-hand/graphic-hand.component';
import { JacobsonVideoComponent } from './videos/jacobson-video/jacobson-video.component';
import { PetrissageBalleComponent } from './relaxation/petrissage-balle/petrissage-balle.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CguComponent } from './cgu/cgu.component';
import { DataProtectionCharterComponent } from './data-protection-charter/data-protection-charter.component';
import { SoonAvailableComponent } from './soon-available/soon-available.component';
import { EmptyStateComponent } from './empty-state/empty-state.component';
import { ModalComponent } from './modal/modal.component';
import { JacobsonVideoDeuxComponent } from './videos/jacobson-video-deux/jacobson-video-deux.component';
import { TutorialsComponent } from './tutorials/tutorials.component';
// import { CountdownModule, CountdownGlobalConfig, CountdownConfig } from 'ngx-countdown';
import { CountdownModule } from 'ngx-countdown';
import { ExoBalleComponent } from './relaxation/petrissage-balle/exo-balle/exo-balle.component';
import { PierreFeuilleCiseauComponent } from './relaxation/pierre-feuille-ciseau/pierre-feuille-ciseau.component';

// function countdownConfigFactory(): CountdownGlobalConfig {
//   return { format: `mm:ss` };
// }

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SubscribeComponent,
    HomeComponent,
    MainNavComponent,
    RelaxationComponent,
    ContactsComponent,
    FooterComponent,
    VideosComponent,
    LegalNoticesComponent,
    JacobsonComponent,
    BaleKneadingComponent,
    GraphicHandComponent,
    JacobsonVideoComponent,
    ProfileComponent,
    EditProfileComponent,
    GraphicHandComponent,
    PetrissageBalleComponent,
    StatisticsComponent,
    ChangePasswordComponent,
    ChangeMailComponent,
    CguComponent,
    DataProtectionCharterComponent,
    SoonAvailableComponent,
    DialogOverviewExampleDialog,
    EmptyStateComponent,
    ModalComponent,
    JacobsonVideoDeuxComponent,
    TutorialsComponent,
    ExoBalleComponent,
    PierreFeuilleCiseauComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    //CountdownTimerModule,
    CountdownModule,
    MatSidenavModule,
    FormsModule,
    HttpClientModule,
    DemoMaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    AppRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    NgxChartsModule,
  ],

  entryComponents: [SubscribeComponent, DialogOverviewExampleDialog],

  providers: [
    ProfileService,
    AuthService,
    StatisticsService,
    // { provide: CountdownGlobalConfig, useFactory: countdownConfigFactory }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
