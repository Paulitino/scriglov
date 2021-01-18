import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { LoginComponent } from './login/login.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { HomeComponent } from './home/home.component';
import { RelaxationComponent } from './relaxation/relaxation.component';
import { ContactsComponent } from './contacts/contacts.component';
import { FooterComponent } from './footer/footer.component';
import { VideosComponent } from './videos/videos.component';
import { LegalNoticesComponent } from './legal-notices/legal-notices.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { JacobsonComponent } from './relaxation/jacobson/jacobson.component';
import { BaleKneadingComponent } from './relaxation/bale-kneading/bale-kneading.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { GraphicHandComponent } from './graphic-hand/graphic-hand.component';
import { JacobsonVideoComponent } from './videos/jacobson-video/jacobson-video.component';
import { JacobsonVideoDeuxComponent } from './videos/jacobson-video-deux/jacobson-video-deux.component';
import { TutorialsComponent } from "./tutorials/tutorials.component";
import { PetrissageBalleComponent } from './relaxation/petrissage-balle/petrissage-balle.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangeMailComponent } from './change-mail/change-mail.component';
import { CguComponent } from './cgu/cgu.component';
import { DataProtectionCharterComponent } from './data-protection-charter/data-protection-charter.component';
import { SoonAvailableComponent } from './soon-available/soon-available.component';
import { EmptyStateComponent } from './empty-state/empty-state.component';
import { ExoBalleComponent } from './relaxation/petrissage-balle/exo-balle/exo-balle.component';
import { PierreFeuilleCiseauComponent } from './relaxation/pierre-feuille-ciseau/pierre-feuille-ciseau.component';

export const appRouteList: Routes = [
    { path: '', component: LoginComponent },
    { path: 'change_mail', component: ChangeMailComponent },
    { path: 'change_password', component: ChangePasswordComponent },
    { path: 'profile_edit', component: EditProfileComponent },
    { path: 'subscribe', component: SubscribeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'main-nav', component: MainNavComponent },
    { path: 'statistics', component: StatisticsComponent },
    { path: 'main-nav', component: MainNavComponent, outlet: "primary" },
    { path: 'home', component: HomeComponent },
    { path: 'relaxation', component: RelaxationComponent },
    { path: 'jacobson', component: JacobsonComponent },
    { path: 'petrissage-balle', component: PetrissageBalleComponent },
    { path: 'pierre-feuille-ciseau', component: PierreFeuilleCiseauComponent},
    { path: 'exo-balle', component: ExoBalleComponent },
    { path: 'graphic-hand', component: GraphicHandComponent },
    { path: 'videos', component: VideosComponent },
    { path: 'jacobson-video', component: JacobsonVideoComponent },
    { path: 'jacobson-video-deux', component: JacobsonVideoDeuxComponent },
    { path: 'tutorials', component: TutorialsComponent },
    { path: 'contacts', component: ContactsComponent },
    { path: 'legal-notices', component: LegalNoticesComponent },
    { path: 'cgu', component: CguComponent },
    { path: 'data-protection-charter', component: DataProtectionCharterComponent },
    { path: 'soon-available', component: SoonAvailableComponent },
    { path: 'empty-state', component: EmptyStateComponent },
    { path: 'footer', component: FooterComponent },
    { path: '**', redirectTo: 'landing' }
];

@NgModule({
    exports: [
        RouterModule
    ],
    imports: [
        RouterModule.forRoot(appRouteList)
    ]
})

export class AppRoutingModule { }
