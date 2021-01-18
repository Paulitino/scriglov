import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cgu',
  templateUrl: './cgu.component.html',
  styleUrls: ['./cgu.component.css']
})
export class CguComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  redirectRelaxation() {
    this._router.navigate(['legal-notices']);
  }

}
