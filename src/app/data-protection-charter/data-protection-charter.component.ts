import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-data-protection-charter',
  templateUrl: './data-protection-charter.component.html',
  styleUrls: ['./data-protection-charter.component.css']
})
export class DataProtectionCharterComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  redirectRelaxation() {
    this._router.navigate(['legal-notices']);
  }

}
