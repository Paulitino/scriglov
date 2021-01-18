import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jacobson-video',
  templateUrl: './jacobson-video.component.html',
  styleUrls: ['./jacobson-video.component.css']
})
export class JacobsonVideoComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  redirectRelaxation() {
    this._router.navigate(['videos']);
  }
}
