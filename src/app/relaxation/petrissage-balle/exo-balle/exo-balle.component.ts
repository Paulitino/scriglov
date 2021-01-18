import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { RelaxationComponent } from '../../relaxation.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ViewEncapsulation, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CountdownComponent } from 'ngx-countdown';
import { ExoService } from '../../../exo.service';
import { ModalService } from '../../../modal.service';
import { MainNavComponent } from '../../../main-nav/main-nav.component';
import { GloveService } from '../../../glove.service';
import { interval, Subscription} from 'rxjs';

@Component({
  selector: 'app-exo-balle',
  templateUrl: './exo-balle.component.html',
  styleUrls: ['./exo-balle.component.css']
})
export class ExoBalleComponent implements OnInit {


  public data = {thumb: undefined, index: undefined, major: undefined, annular: undefined, pinky: undefined, gyro: undefined};
  public range_petri = {petrissage: {  thumb: [0, 105, 140, 180], index: [0, 105, 140, 180], major: [0, 110, 140, 180], annular: [0, 105, 129, 180], pinky: [0, 90, 132, 180], gyro: [-100, -85, -65, 100]},
  relax: {thumb: [180, 165, 140, 0], index: [180, 170, 150, 0], major: [180, 170, 150, 0], annular: [180, 170, 150, 0], pinky: [180, 170, 150, 0], gyro: [-100, -85, -65, 100]}};
  public exo_type = "relax";
  public fingers = {thumb: undefined, index: undefined, major: undefined, annular: undefined, pinky: undefined, gyro: undefined};
  public good_pos = [];
  score = 0;
  public total = 0;
  public redpath = "./assets/img/red.png"
  public greenpath = "./assets/img/green.png"
  public orangepath = "./assets/img/orange.png"
  public handpath = "./assets/img/hand.jpg"
  public pressedpath = "./assets/img/ball-pressed.png"
  public relaxpath = "./assets/img/ball.png"


  feedback = ""
  init = true;
  thumbimage = this.redpath;
  indeximage = this.redpath;
  majorimage = this.redpath;
  annularimage = this.redpath;
  pinkyimage = this.redpath;

  current = this.relaxpath;

  mySubscription: Subscription;

  /* API call exo */
  _exoPetrissageBalle = [];
  
  /* Timer methods */
  validation : boolean;
  time : number;

  constructor(public http: HttpClient, private _router: Router, private exoService: ExoService, private modalService: ModalService, private cdRef: ChangeDetectorRef, private gloveService: GloveService)  {
    this.getExoPetrissageBalle();
    // console.log("A : ", this._exoPetrissageBalle[0].time);
    // this.time = this._exoPetrissageBalle[0].time;
    this.time = 5 * 60;
    console.log("B : ", this.time);
  }

  loop(){
    this.gloveService.getGloveResponse((worked) => {
      this.data = worked;
      }
    );
    this.exoDataTreatment();
    if (this.init === false && this.good_pos.length > 0) {
      if (this.good_pos[this.good_pos.length - 1] >= 66) {
        if (this.exo_type == "relax")
        {
          this.current = this.pressedpath;
          this.exo_type = "petrissage";
        }
        else
        {
          this.exo_type = "relax";
          this.current = this.relaxpath;
        }
        this.score += 1;
      }
    }
    else {
      this.init = false;
      this.exo_type = "relax"
      this.current = this.relaxpath;
      this.exoDataTreatment();
    }
    console.log(this.exo_type)
    console.log(this.fingers)
    this.cdRef.detectChanges()
}

ngOnInit() {
  this.mySubscription= interval(500).subscribe((x =>{
    this.loop();
}));
}
  /* Call API Jacobson exercice */
  
  getExoPetrissageBalle() {
    let name = "Le petrissage de balle";
    var id_token = JSON.parse(localStorage.getItem('id_token'));

    this.exoService.getExoInfo(name, id_token, (exoInfo) => {
      if (exoInfo !== "error") {
        this._exoPetrissageBalle[0] = exoInfo;
        // console.log("EXO : ", this._exoPetrissageBalle[0])
        //console.log("EXO ttt : ", this._exoPetrissageBalle[0].time)
      }
      console.log("out if");
    });
  }


  exoDataTreatment() {
    switch (this.exo_type){
      case "petrissage": {
        this.treatmentPetrissage();
        break;
      }
      case "relax": {
        this.treatmentRelax();
        break;
      }
      default: {
        console.log("ERROR: exo_type empty or wrong, please fill it with petrissage, relax\n");
        break;
      }
    }
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
  }

  /* Manage modals */

  openModal(id: string) {
    console.log("openModal");
    this.modalService.open(id);
  }

  closeModal(id: string) {
    console.log("close modal");
    this.modalService.close(id);
    this._router.navigate(['petrissage-balle']);
  }

  timerModal() {
    console.log("timer open modal");
    this.openModal('custom-modal-timer');
    // this.time = this._exoPetrissageBalle[0].time;
    // this.time = 10;
    // console.log("TIME API call : ", this._exoPetrissageBalle[0].time);
    this.openModal('custom-modal-timer');
  }

  /* Manage Success or Fail of an exercice */

  checkSuccessOrFail() {
    this.endExo()
    if (this.validation == true) {
      this.openModal('custom-modal-success');
    }
    else if (this.validation == false) {
      this.openModal('custom-modal-fail');
    }
  }

  redirectDetailsPetrissageBalle() {
    this.checkSuccessOrFail();
    this._router.navigate(['petrissage-balle']);
  }

  treatmentPetrissage() {
    switch (true) {
      case (this.data.thumb >= this.range_petri.petrissage.thumb[0] && this.data.thumb < this.range_petri.petrissage.thumb[1]) :
        this.fingers.thumb = "correct";
        this.thumbimage = this.greenpath;
        break;
      case (this.data.thumb >= this.range_petri.petrissage.thumb[1] && this.data.thumb < this.range_petri.petrissage.thumb[2]) :
        this.fingers.thumb = "ok";
        this.thumbimage = this.orangepath
        break;
      case (this.data.thumb >= this.range_petri.petrissage.thumb[2] && this.data.thumb <= this.range_petri.petrissage.thumb[3]) :
        this.fingers.thumb = "bad";
        this.thumbimage = this.redpath;
        break;
    }
    switch (true) {
      case (this.data.index >= this.range_petri.petrissage.index[0] && this.data.index < this.range_petri.petrissage.index[1]) :
        this.fingers.index = "correct";
        this.indeximage = this.greenpath;
        break;
      case (this.data.index >= this.range_petri.petrissage.index[1] && this.data.index < this.range_petri.petrissage.index[2]) :
        this.fingers.index = "ok";
        this.indeximage = this.orangepath;
        break;
      case (this.data.index >= this.range_petri.petrissage.index[2] && this.data.index <= this.range_petri.petrissage.index[3]) :
        this.fingers.index = "bad";
        this.indeximage = this.redpath;
        break;
    }
    switch (true) {
      case (this.data.major >= this.range_petri.petrissage.major[0] && this.data.major < this.range_petri.petrissage.major[1]) :
        this.fingers.major = "correct";
        this.majorimage = this.greenpath;
        break;
      case (this.data.major >= this.range_petri.petrissage.major[1] && this.data.major < this.range_petri.petrissage.major[2]) :
        this.fingers.major = "ok";
        this.majorimage = this.orangepath;
        break;
      case (this.data.major >= this.range_petri.petrissage.major[2] && this.data.major <= this.range_petri.petrissage.major[3]) :
        this.fingers.major = "bad";
        this.majorimage = this.redpath;
        break;
    }
    switch (true) {
      case (this.data.annular >= this.range_petri.petrissage.annular[0] && this.data.annular < this.range_petri.petrissage.annular[1]) :
        this.fingers.annular = "correct";
        this.annularimage = this.greenpath;
        break;
      case (this.data.annular >= this.range_petri.petrissage.annular[1] && this.data.annular < this.range_petri.petrissage.annular[2]) :
        this.fingers.annular = "ok";
        this.annularimage = this.orangepath;
        break;
      case (this.data.annular >= this.range_petri.petrissage.annular[2] && this.data.annular <= this.range_petri.petrissage.annular[3]) :
        this.fingers.annular = "bad";
        this.annularimage = this.redpath;
        break;
    }
    switch (true) {
      case (this.data.pinky >= this.range_petri.petrissage.pinky[0] && this.data.pinky < this.range_petri.petrissage.pinky[1]) :
        this.fingers.pinky = "correct";
        this.pinkyimage = this.greenpath;
        break;
      case (this.data.pinky >= this.range_petri.petrissage.pinky[1] && this.data.pinky < this.range_petri.petrissage.pinky[2]) :
        this.fingers.pinky = "ok";
        this.pinkyimage = this.orangepath;
        break;
      case (this.data.pinky >= this.range_petri.petrissage.pinky[2] && this.data.pinky <= this.range_petri.petrissage.pinky[3]) :
        this.fingers.pinky = "bad";
        this.pinkyimage = this.redpath
        break;
    }
    switch (true) {
      case (this.data.gyro >= this.range_petri.petrissage.gyro[0] && this.data.gyro < this.range_petri.petrissage.gyro[1]) :
        this.fingers.gyro = "correct";
        //this.gyroimage = this.greenpath;
        break;
      case (this.data.gyro >= this.range_petri.petrissage.gyro[1] && this.data.gyro < this.range_petri.petrissage.gyro[2]) :
        this.fingers.gyro = "ok";
       // this.gyroimage = this.orangepath;
        break;
      case (this.data.gyro >= this.range_petri.petrissage.gyro[2] && this.data.gyro <= this.range_petri.petrissage.gyro[3]) :
        this.fingers.gyro = "bad";
       // this.gyroimage = this.redpath;
        break;
    }
    switch (true) {
      case (this.fingers.thumb == "bad" || this.fingers.index == "bad" || this.fingers.major == "bad" || this.fingers.annular == "bad" || this.fingers.pinky == "bad" || this.fingers.gyro == "bad") :
        this.good_pos.push(33);
        break;
      case (this.fingers.thumb == "ok" || this.fingers.index == "ok" || this.fingers.major == "ok" || this.fingers.annular == "ok" || this.fingers.pinky == "ok" || this.fingers.gyro == "ok") :
        this.good_pos.push(66);
        break;
      default :
        this.good_pos.push(100);
        this.exo_type = "relax";
    }
  }

  treatmentRelax() {
    switch (true) {
      case (this.data.thumb <= this.range_petri.relax.thumb[0] && this.data.thumb > this.range_petri.relax.thumb[1]) :
        this.fingers.thumb = "correct";
        this.thumbimage = this.greenpath;
        break;
      case (this.data.thumb <= this.range_petri.relax.thumb[1] && this.data.thumb > this.range_petri.relax.thumb[2]) :
        this.fingers.thumb = "ok";
        this.thumbimage = this.orangepath;
        break;
      case (this.data.thumb <= this.range_petri.relax.thumb[2] && this.data.thumb >= this.range_petri.relax.thumb[3]) :
        this.fingers.thumb = "bad";
        this.thumbimage = this.redpath;
        break;
    }
    switch (true) {
      case (this.data.index <= this.range_petri.relax.index[0] && this.data.index > this.range_petri.relax.index[1]) :
        this.fingers.index = "correct";
        this.indeximage = this.greenpath;
        break;
      case (this.data.index <= this.range_petri.relax.index[1] && this.data.index > this.range_petri.relax.index[2]) :
        this.fingers.index = "ok";
        this.indeximage = this.orangepath;
        break;
      case (this.data.index <= this.range_petri.relax.index[2] && this.data.index >= this.range_petri.relax.index[3]) :
        this.fingers.index = "bad";
        this.indeximage = this.redpath;
        break;
    }
    switch (true) {
      case (this.data.major <= this.range_petri.relax.major[0] && this.data.major > this.range_petri.relax.major[1]) :
        this.fingers.major = "correct";
        this.majorimage = this.greenpath;
        break;
      case (this.data.major <= this.range_petri.relax.major[1] && this.data.major > this.range_petri.relax.major[2]) :
        this.fingers.major = "ok";
        this.majorimage = this.orangepath;
        break;
      case (this.data.major <= this.range_petri.relax.major[2] && this.data.major >= this.range_petri.relax.major[3]) :
        this.fingers.major = "bad";
        this.majorimage = this.redpath;
        break;
    }
    switch (true) {
      case (this.data.annular <= this.range_petri.relax.annular[0] && this.data.annular > this.range_petri.relax.annular[1]) :
        this.fingers.annular = "correct";
        this.annularimage = this.greenpath;
        break;
      case (this.data.annular <= this.range_petri.relax.annular[1] && this.data.annular > this.range_petri.relax.annular[2]) :
        this.fingers.annular = "ok";
        this.annularimage = this.orangepath;
        break;
      case (this.data.annular <= this.range_petri.relax.annular[2] && this.data.annular >= this.range_petri.relax.annular[3]) :
        this.fingers.annular = "bad";
        this.annularimage = this.redpath;
        break;
    }
    switch (true) {
      case (this.data.pinky <= this.range_petri.relax.pinky[0] && this.data.pinky > this.range_petri.relax.pinky[1]) :
        this.fingers.pinky = "correct";
        this.pinkyimage = this.greenpath;
        break;
      case (this.data.pinky <= this.range_petri.relax.pinky[1] && this.data.pinky > this.range_petri.relax.pinky[2]) :
        this.fingers.pinky = "ok";
        this.pinkyimage = this.orangepath;
        break;
      case (this.data.pinky <= this.range_petri.relax.pinky[2] && this.data.pinky >= this.range_petri.relax.pinky[3]) :
        this.fingers.pinky = "bad";
        this.pinkyimage = this.redpath;
        break;
    }
    switch (true) {
      case (this.data.gyro >= this.range_petri.relax.gyro[0] && this.data.gyro < this.range_petri.relax.gyro[1]) :
        this.fingers.gyro = "correct";
        break;
      case (this.data.gyro >= this.range_petri.relax.gyro[1] && this.data.gyro < this.range_petri.relax.gyro[2]) :
        this.fingers.gyro = "ok";
        break;
      case (this.data.gyro >= this.range_petri.relax.gyro[2] && this.data.gyro <= this.range_petri.relax.gyro[3]) :
        this.fingers.gyro = "bad";
        break;
    }
    switch (true) {
      case (this.fingers.thumb == "bad" || this.fingers.index == "bad" || this.fingers.major == "bad" || this.fingers.annular == "bad" || this.fingers.pinky == "bad") :
        this.good_pos.push(33);
        break;
      case (this.fingers.thumb == "ok" || this.fingers.index == "ok" || this.fingers.major == "ok" || this.fingers.annular == "ok" || this.fingers.pinky == "ok") :
        this.good_pos.push(66);
        break;
      default :
        this.good_pos.push(100);
        this.exo_type = "petrissage";
    }
    if (this.fingers.gyro === "correct")
      {
        this.feedback = "Votre main est dans la bonne position."
      }
      else if (this.fingers.gyro === "ok")
      {
        this.feedback = "Votre main est presque dans la bonne position."
      }
      else
      {
        this.feedback = "Orientez votre main : paume vers le haut."
      }
  }


  endExo() {
    var token = JSON.parse(localStorage.getItem('id_token'));
    var users_id = JSON.parse(localStorage.getItem('id'));
    var average = 0;
    for (var i = 0; i < this.good_pos.length; i++) {
      average = average + this.good_pos[i];
    }
    average = average / this.good_pos.length;
    this.http.post('https://api.scriglov.fr/exo_result_up', {users_id: users_id, token: token, exo_name: "Le petrissage de balle", score: this.score, good_pos: average})
    .subscribe( response => {
      const res = JSON.stringify(response);
      const b = JSON.parse(res);
      if (b.error == true)
        console.log("error with the post request");
    });
    this.good_pos.length = 0;
    this.score = 0;
    this.fingers.thumb = undefined;
    this.fingers.index = undefined;
    this.fingers.major = undefined;
    this.fingers.annular = undefined;
    this.fingers.pinky = undefined;
    this.fingers.gyro = undefined;
    this.exo_type = "petrissage";
    this.validation = average >= 40 ? true : false
    this.mySubscription.unsubscribe();
  }
}

