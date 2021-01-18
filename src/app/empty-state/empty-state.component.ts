import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.css']
})
export class EmptyStateComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  redirectEmptyState() {
    //this.loggedConfirmation = this.authService.isLogged();
    //if (this.loggedConfirmation == false)
    //  console.log("logged confirmation = ", this.loggedConfirmation);
    //else if (this.loggedConfirmation == true)
      this._router.navigate(['contacts']);
  }

}
