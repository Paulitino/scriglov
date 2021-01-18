import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ModalService } from '../../modal.service';
import { ExoService } from '../../exo.service';

@Component({
  selector: 'app-petrissage-balle',
  templateUrl: './petrissage-balle.component.html',
  styleUrls: ['./petrissage-balle.component.css']
})
export class PetrissageBalleComponent implements OnInit {

  public _exoPetrissageBalle = []
  bodyText: string;
  validation: number;
  textBody : string;
  public _userInfo;

  constructor(public http: HttpClient, private _router: Router, private exoService: ExoService, private modalService: ModalService) {
    //this.exoType = "Relaxation";
    this.getExoPetrissageBalle();
    this.textBody = "Bonjour<br>, mon ami";
  }

  ngOnInit() {}

  /* Call API Petrissage de balle exercice */

  getExoPetrissageBalle() {
    let name = "Le petrissage de balle";
    var id_token = JSON.parse(localStorage.getItem('id_token'));

    this.exoService.getExoInfo(name, id_token, (exoInfo) => {
      if (exoInfo !== "error") {
        console.log(exoInfo);
        //document.querySelector('#formatted').innerText = 'Lorem\nIpsum';
        this._exoPetrissageBalle[0] = exoInfo;
        //console.log(this._exoPetrissageBalle[0])
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
