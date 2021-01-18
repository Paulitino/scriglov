import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ExoService } from '../exo.service';
import { JacobsonComponent } from '../relaxation/jacobson/jacobson.component';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {

  loggedConfirmation;
  t1;
  t2 = false;

  _exoType;
  resp;
  h
  b;
  public _exoInfo = []
  parentMessage: string = 'Hello Angular 7';

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private _router: Router, private authService: AuthService, private exoService: ExoService) {
    this.loggedConfirmation = this.authService.isLogged();
    this.t1 = true;
    this._exoType = "Relaxation";
    this.getExoAll();
  }

  // getExoType() {
  //   let type = this._exoType;
  //   var id_token = JSON.parse(localStorage.getItem('id_token'));

  //   this.exoService.getExoType(type, id_token, (exoInfo) => {
  //     if (exoInfo !== "error") {
  //       this._exoInfo[0] = exoInfo;
  //     }
  //   });
  //   // console.log(exoService);
  // }

  getExoAll() {
    //let type = this._exoType;
    var id_token = JSON.parse(localStorage.getItem('id_token'));

    this.exoService.getExoAll(id_token, (exoInfo) => {
      console.log(exoInfo);
      if (exoInfo !== "error") {
        console.log (exoInfo[0])
        this._exoInfo[0] = exoInfo;
        console.log(this._exoInfo)
      }
    });
  }

  test() {
    this._router.navigate(['home']);
  }

  cont() {
    console.log("ttttt = ", this.loggedConfirmation);
    this.t1 = false;
    this._router.navigate(['home']);
  }

  /* "Présentation" section */
  redirectHome() {
    this.loggedConfirmation = this.authService.isLogged();
    if (this.loggedConfirmation == false)
      console.log("logged confirmation = ", this.loggedConfirmation);
    else if (this.loggedConfirmation == true)
      this._router.navigate(['home']);
  }

  /* ----------------------------------------------------------------------- */
  /* "Relaxation de type Jacobson" details page */
  redirectJacobson() {
    this.loggedConfirmation = this.authService.isLogged();
    if (this.loggedConfirmation == false)
      console.log("logged confirmation = ", this.loggedConfirmation);
    else if (this.loggedConfirmation == true)
      this._router.navigate(['jacobson']);
  }

  /* "Pétrissage de balle" details page */
  redirectPetrissageBalle() {
    this.loggedConfirmation = this.authService.isLogged();
    if (this.loggedConfirmation == false)
      console.log("logged confirmation = ", this.loggedConfirmation);
    else if (this.loggedConfirmation == true)
      this._router.navigate(['petrissage-balle']);
  }

  /* "Pierre Feuille Ciseau" details page */
  redirectPierreFeuilleCiseau() {
    this.loggedConfirmation = this.authService.isLogged();
    if (this.loggedConfirmation == false)
      console.log("logged confirmation = ", this.loggedConfirmation);
    else if (this.loggedConfirmation == true)
      this._router.navigate(['pierre-feuille-ciseau']);
  }

  /* ----------------------------------------------------------------------- */
  /* "Tutoriel" section */
  redirectTutorials() {
    this.loggedConfirmation = this.authService.isLogged();
    if (this.loggedConfirmation == false)
      console.log("logged confirmation = ", this.loggedConfirmation);
    else if (this.loggedConfirmation == true)
      this._router.navigate(['tutorials']);
  }

  /* "Vidéos" section */
  redirectVideos() {
    this.loggedConfirmation = this.authService.isLogged();
    if (this.loggedConfirmation == false)
      console.log("logged confirmation = ", this.loggedConfirmation);
    else if (this.loggedConfirmation == true)
      this._router.navigate(['videos']);
  }

  /* "Recommendations" section */
  redirectRecommandations() {
    this.loggedConfirmation = this.authService.isLogged();
    if (this.loggedConfirmation == false)
      console.log("logged confirmation = ", this.loggedConfirmation);
    else if (this.loggedConfirmation == true)
      this._router.navigate(['soon-available']);
  }

  /* ----------------------------------------------------------------------- */
  /* "Statistiques" section */
  redirectStatistics() {
    this.loggedConfirmation = this.authService.isLogged();
    if (this.loggedConfirmation == false)
      console.log("logged confirmation = ", this.loggedConfirmation);
    else if (this.loggedConfirmation == true)
      this._router.navigate(['statistics']);
  }

  /* ----------------------------------------------------------------------- */
  /* "Contacts" section */
  redirectContacts() {
    this.loggedConfirmation = this.authService.isLogged();
    if (this.loggedConfirmation == false)
      console.log("logged confirmation = ", this.loggedConfirmation);
    else if (this.loggedConfirmation == true)
      this._router.navigate(['contacts']);
  }

  /* "Profil" section */
  redirectProfile() {
    this.loggedConfirmation = this.authService.isLogged();
    if (this.loggedConfirmation == false)
      console.log("logged confirmation = ", this.loggedConfirmation);
    else if (this.loggedConfirmation == true)
      this._router.navigate(['profile']);
  }

  /* "Mentions legales" section */
  redirectLegalNotices() {
    this.loggedConfirmation = this.authService.isLogged();
    if (this.loggedConfirmation == false)
      console.log("ttttt = ", this.loggedConfirmation);
    else if (this.loggedConfirmation == true)
      this._router.navigate(['legal-notices']);
  }

  /* "CGU" section */
  redirectCGU() {
    this.loggedConfirmation = this.authService.isLogged();
    if (this.loggedConfirmation == false)
      console.log("ttttt = ", this.loggedConfirmation);
    else if (this.loggedConfirmation == true)
      this._router.navigate(['cgu']);
  }

  /* "Data protection charter" section */
  redirectDataProtectionCharter() {
    this.loggedConfirmation = this.authService.isLogged();
    if (this.loggedConfirmation == false)
      console.log("ttttt = ", this.loggedConfirmation);
    else if (this.loggedConfirmation == true)
      this._router.navigate(['data-protection-charter']);
  }

  /* "Empty State" */
  redirectEmptyState() {
    this.loggedConfirmation = this.authService.isLogged();
    if (this.loggedConfirmation == false)
      console.log("logged confirmation = ", this.loggedConfirmation);
    else if (this.loggedConfirmation == true)
      this._router.navigate(['empty-state']);
  }
}
