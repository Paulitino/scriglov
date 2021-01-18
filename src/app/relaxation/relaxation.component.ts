import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../user';
import { Router } from '@angular/router';

import { ExoService } from '../exo.service';

@Component({
  selector: 'app-relaxation',
  templateUrl: './relaxation.component.html',
  styleUrls: ['./relaxation.component.css']
})
export class RelaxationComponent implements OnInit {

  _exoType;
  resp;
  h
  b;
  public _exoInfo = []

  constructor(public http: HttpClient, private _router: Router, private exoService: ExoService) {
    this._exoType = "Relaxation";
    this.getExoType();
  }

  ngOnInit() {
  }

  getExoType() {
    let type = this._exoType;
    var id_token = JSON.parse(localStorage.getItem('id_token'));

    this.exoService.getExoType(type, id_token, (exoInfo) => {
      if (exoInfo !== "error") {
        this._exoInfo[0] = exoInfo;
      }
    });
  }

}
