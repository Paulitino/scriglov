import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ModalService } from '../../modal.service';
import { ExoService } from '../../exo.service';

@Component({
  selector: 'app-pierre-feuille-ciseau',
  templateUrl: './pierre-feuille-ciseau.component.html',
  styleUrls: ['./pierre-feuille-ciseau.component.css']
})
export class PierreFeuilleCiseauComponent implements OnInit {

  _exoPierreFeuilleCiseau = [];
  bodyText: string;
  validation: number;

  constructor(public http: HttpClient, private _router: Router, private exoService: ExoService, private modalService: ModalService) {
    this.getExoPierreFeuilleCiseau();
  }

  ngOnInit() {
    this.bodyText = 'This text can be updated in modal 1';
  }

  /* Call API Petrissage de balle exercice */

  getExoPierreFeuilleCiseau() {
    let name = "Pierre feuille ciseaux";
    var id_token = JSON.parse(localStorage.getItem('id_token'));

    this.exoService.getExoInfo(name, id_token, (exoInfo) => {
      if (exoInfo !== "error") {
        this._exoPierreFeuilleCiseau[0] = exoInfo;
      }
    });
  }

  /* Manage Success or Fail of an exercice */

  checkSuccessOrFail() {
    this.validation = this.getRandomInt(2);
    if (this.validation == 0) {
      // this.closeModal('custom-modal-success');
      this.openModal('custom-modal-success');
      //williamFunction(./file.txt);
    }
    else if (this.validation == 1) {
      //this.closeModal('custom-modal-fail');
      this.openModal('custom-modal-fail');
    }
  }

  /* Manage modals */

  openModal(id: string) {
    console.log("openModal");
    this.modalService.open(id);
  }

  closeModal(id: string) {
    console.log("close modal");
    this.modalService.close(id);
  }

  /* Random number function */
  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

}
