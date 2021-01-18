import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jacobson-video-deux',
  templateUrl: './jacobson-video-deux.component.html',
  styleUrls: ['./jacobson-video-deux.component.css']
})
export class JacobsonVideoDeuxComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  redirectRelaxation() {
    this._router.navigate(['videos']);
  }
}
