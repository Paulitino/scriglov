import { Component, OnInit, Input } from '@angular/core';
import { RelaxationComponent } from '../relaxation.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ViewEncapsulation, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CountdownComponent } from 'ngx-countdown';
import { ExoService } from '../../exo.service';
import { ModalService } from '../../modal.service';

@Component({
  selector: 'app-jacobson',
  templateUrl: './jacobson.component.html',
  styleUrls: ['./jacobson.component.css']
})
export class JacobsonComponent implements OnInit {

  public _exoJacobson = [];
  validation: number;
  time: number;

  constructor(public http: HttpClient, private _router: Router, private exoService: ExoService, private modalService: ModalService) {
    this.getExoJacobson();
  }

  ngOnInit() {}

  /* Call API Jacobson exercice */
  
  getExoJacobson() {
    let name = "La relaxation de type Jacobson";
    var id_token = JSON.parse(localStorage.getItem('id_token'));

    this.exoService.getExoInfo(name, id_token, (exoInfo) => {
      if (exoInfo !== "error") {
        this._exoJacobson[0] = exoInfo;
      }
    });
  }

  /* Manage Timer/Countdown */

  status = 'start';
  @ViewChild('countdown') counter: CountdownComponent;

  finishTest() {
    this.status = 'finished';
    this.counter.restart();
  }

  resetTimer() {
    this.counter.restart();
    this.time = 120;
  }

  /* Manage modals */

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    //this.resetTimer();
    this.modalService.close(id);
    this.time = 120;
  }

  timerModal() {
    this.time = 120;
    this.openModal('custom-modal-timer');
  }
}
