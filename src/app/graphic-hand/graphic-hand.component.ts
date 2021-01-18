import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GloveService } from '../glove.service';
import { CountdownComponent } from 'ngx-countdown';
import { ModalService } from '../modal.service';
import { ExoService } from '../exo.service';
import { Router } from '@angular/router';
import { ViewEncapsulation, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-graphic-hand',
  templateUrl: './graphic-hand.component.html',
  styleUrls: ['./graphic-hand.component.css']
})

export class GraphicHandComponent implements OnInit {
  public data = { thumb: undefined, index: undefined, major: undefined, annular: undefined, pinky: undefined, gyro: undefined };
  public range_rps = {
    rock: { thumb: [0, 105, 140, 180], index: [0, 105, 140, 180], major: [0, 110, 140, 180], annular: [0, 105, 129, 180], pinky: [0, 90, 132, 180] },
    paper: { thumb: [180, 165, 140, 0], index: [180, 170, 150, 0], major: [180, 170, 150, 0], annular: [180, 170, 150, 0], pinky: [180, 170, 150, 0] },
    scissor: { thumb: [0, 120, 130, 180], index: [180, 170, 150, 0], major: [180, 170, 150, 0], annular: [0, 100, 123, 180], pinky: [0, 95, 125, 180] }
  };
  public exo_type = undefined;
  public fingers = { thumb: undefined, index: undefined, major: undefined, annular: undefined, pinky: undefined };
  public good_pos = [];
  score = 0;
  public total = 0;
  public redpath = "./assets/img/red.png"
  public greenpath = "./assets/img/green.png"
  public orangepath = "./assets/img/orange.png"
  public rockpath = "./assets/img/rock.png"
  public paperpath = "./assets/img/paper.png"
  public scissorpath = "./assets/img/scissor.png"
  public handpath = "./assets/img/hand.jpg"

  
  public prev = undefined;

  init = true;
  thumbimage = this.redpath;
  indeximage = this.redpath;
  majorimage = this.redpath;
  annularimage = this.redpath;
  pinkyimage = this.redpath;

  mySubscription: Subscription

  /* Timer methods */
  validation: boolean;
  time: number;

  /* API call exo */
  _exoPierreFeuilleCiseau = [];

  random_figure() {
    const rd = Math.floor((Math.random() * 100) + 1);
      this.prev = this.exo_type;
    if (rd < 34 )
      this.exo_type = "scissor"
    else if (rd > 33 && rd < 65 && this.prev != "rock")
      this.exo_type = "rock"
    else
      this.exo_type = "paper"
    if (this.exo_type == this.prev && this.exo_type == "paper")
      this.exo_type == "scissor"
    else if (this.exo_type == this.prev && this.exo_type == "scissor")
      this.exo_type == "rock"
    else if (this.exo_type == "scissor")
      this.exo_type == "paper"
  }

  current = this.rockpath;

  constructor(private cdRef: ChangeDetectorRef,
    private gloveService: GloveService,
    private _router: Router,
    private modalService: ModalService,
    private exoService: ExoService,
    private http: HttpClient) {
    this.getExoPierreFeuilleCiseau();
    this.time = 120;
  }

  loop() {
    if (this.exo_type == "scissor")
      this.current = this.scissorpath;
    if (this.exo_type == "rock")
      this.current = this.rockpath;
    if (this.exo_type == "paper")
      this.current = this.paperpath;
    this.gloveService.getGloveResponse((worked) => {
      this.data = worked;
    }
    );
    if (this.init === false && this.good_pos.length > 0) {
      if (this.good_pos[this.good_pos.length - 1] >= 66) {
        this.random_figure();
        this.score += 1;
      }
      this.exoDataTreatment();
    }
    else {
      this.init = false;
      this.random_figure();
      this.exoDataTreatment();
    }
    this.cdRef.detectChanges()
  }
  ngOnInit() {
    this.mySubscription = interval(500).subscribe((x => {
      this.loop();
    }));
  }


  exoDataTreatment() {
    switch (this.exo_type) {
      case "scissor": {
        this.treatmentRock();
        break;
      }
      case "rock": {
        this.treatmentPaper();
        break;
      }
      case "paper": {
        this.treatmentScissor();
        break;
      }
      default: {
        console.log("ERROR: exo_type empty or wrong, please fill it with scissor, rock, paper, press or relax\n");
        break;
      }
    }
  }

  treatmentScissor() {
    switch (true) {
      case (this.data.thumb >= this.range_rps.scissor.thumb[0] && this.data.thumb < this.range_rps.scissor.thumb[1]):
        this.fingers.thumb = "correct";
        this.thumbimage = this.greenpath;
        break;
      case (this.data.thumb >= this.range_rps.scissor.thumb[1] && this.data.thumb < this.range_rps.scissor.thumb[2]):
        this.fingers.thumb = "ok";
        this.thumbimage = this.orangepath;
        break;
      case (this.data.thumb >= this.range_rps.scissor.thumb[2] && this.data.thumb <= this.range_rps.scissor.thumb[3]):
        this.fingers.thumb = "bad";
        this.thumbimage = this.redpath;
        break;
    }
    switch (true) {
      case (this.data.index <= this.range_rps.scissor.index[0] && this.data.index > this.range_rps.scissor.index[1]):
        this.fingers.index = "correct";
        this.indeximage = this.greenpath;
        break;
      case (this.data.index <= this.range_rps.scissor.index[1] && this.data.index > this.range_rps.scissor.index[2]):
        this.fingers.index = "ok";
        this.indeximage = this.orangepath;
        break;
      case (this.data.index <= this.range_rps.scissor.index[2] && this.data.index >= this.range_rps.scissor.index[3]):
        this.fingers.index = "bad";
        this.indeximage = this.redpath;
        break;
    }
    switch (true) {
      case (this.data.major <= this.range_rps.scissor.major[0] && this.data.major > this.range_rps.scissor.major[1]):
        this.fingers.major = "correct";
        this.majorimage = this.greenpath;
        break;
      case (this.data.major <= this.range_rps.scissor.major[1] && this.data.major > this.range_rps.scissor.major[2]):
        this.fingers.major = "ok";
        this.majorimage = this.orangepath;
        break;
      case (this.data.major <= this.range_rps.scissor.major[2] && this.data.major >= this.range_rps.scissor.major[3]):
        this.fingers.major = "bad";
        this.majorimage = this.redpath;
        break;
    }
    switch (true) {
      case (this.data.annular >= this.range_rps.scissor.annular[0] && this.data.annular < this.range_rps.scissor.annular[1]):
        this.fingers.annular = "correct";
        this.annularimage = this.greenpath;
        break;
      case (this.data.annular >= this.range_rps.scissor.annular[1] && this.data.annular < this.range_rps.scissor.annular[2]):
        this.fingers.annular = "ok";
        this.annularimage = this.orangepath;
        break;
      case (this.data.annular >= this.range_rps.scissor.annular[2] && this.data.annular <= this.range_rps.scissor.annular[3]):
        this.fingers.annular = "bad";
        this.annularimage = this.redpath;
        break;
    }
    switch (true) {
      case (this.data.pinky >= this.range_rps.scissor.pinky[0] && this.data.pinky < this.range_rps.scissor.pinky[1]):
        this.fingers.pinky = "correct";
        this.pinkyimage = this.greenpath;
        break;
      case (this.data.pinky >= this.range_rps.scissor.pinky[1] && this.data.pinky < this.range_rps.scissor.pinky[2]):
        this.fingers.pinky = "ok";
        this.pinkyimage = this.orangepath;
        break;
      case (this.data.pinky >= this.range_rps.scissor.pinky[2] && this.data.pinky <= this.range_rps.scissor.pinky[3]):
        this.fingers.pinky = "bad";
        this.pinkyimage = this.redpath;
        break;
    }
    switch (true) {
      case (this.fingers.thumb == "bad" || this.fingers.index == "bad" || this.fingers.major == "bad" || this.fingers.annular == "bad" || this.fingers.pinky == "bad"):
        this.good_pos.push(33);
        break;
      case (this.fingers.thumb == "ok" || this.fingers.index == "ok" || this.fingers.major == "ok" || this.fingers.annular == "ok" || this.fingers.pinky == "ok"):
        this.good_pos.push(66);
        break;
      default:
        this.good_pos.push(100);
    }
  }

  treatmentRock() {
    switch (true) {
      case (this.data.thumb >= this.range_rps.rock.thumb[0] && this.data.thumb < this.range_rps.rock.thumb[1]):
        this.fingers.thumb = "correct";
        this.thumbimage = this.greenpath;
        break;
      case (this.data.thumb >= this.range_rps.rock.thumb[1] && this.data.thumb < this.range_rps.rock.thumb[2]):
        this.fingers.thumb = "ok";
        this.thumbimage = this.orangepath
        break;
      case (this.data.thumb >= this.range_rps.rock.thumb[2] && this.data.thumb <= this.range_rps.rock.thumb[3]):
        this.fingers.thumb = "bad";
        this.thumbimage = this.redpath;
        break;
    }
    switch (true) {
      case (this.data.index >= this.range_rps.rock.index[0] && this.data.index < this.range_rps.rock.index[1]):
        this.fingers.index = "correct";
        this.indeximage = this.greenpath;
        break;
      case (this.data.index >= this.range_rps.rock.index[1] && this.data.index < this.range_rps.rock.index[2]):
        this.fingers.index = "ok";
        this.indeximage = this.orangepath;
        break;
      case (this.data.index >= this.range_rps.rock.index[2] && this.data.index <= this.range_rps.rock.index[3]):
        this.fingers.index = "bad";
        this.indeximage = this.redpath;
        break;
    }
    switch (true) {
      case (this.data.major >= this.range_rps.rock.major[0] && this.data.major < this.range_rps.rock.major[1]):
        this.fingers.major = "correct";
        this.majorimage = this.greenpath;
        break;
      case (this.data.major >= this.range_rps.rock.major[1] && this.data.major < this.range_rps.rock.major[2]):
        this.fingers.major = "ok";
        this.majorimage = this.orangepath;
        break;
      case (this.data.major >= this.range_rps.rock.major[2] && this.data.major <= this.range_rps.rock.major[3]):
        this.fingers.major = "bad";
        this.majorimage = this.redpath;
        break;
    }
    switch (true) {
      case (this.data.annular >= this.range_rps.rock.annular[0] && this.data.annular < this.range_rps.rock.annular[1]):
        this.fingers.annular = "correct";
        this.annularimage = this.greenpath;
        break;
      case (this.data.annular >= this.range_rps.rock.annular[1] && this.data.annular < this.range_rps.rock.annular[2]):
        this.fingers.annular = "ok";
        this.annularimage = this.orangepath;
        break;
      case (this.data.annular >= this.range_rps.rock.annular[2] && this.data.annular <= this.range_rps.rock.annular[3]):
        this.fingers.annular = "bad";
        this.annularimage = this.redpath;
        break;
    }
    switch (true) {
      case (this.data.pinky >= this.range_rps.rock.pinky[0] && this.data.pinky < this.range_rps.rock.pinky[1]):
        this.fingers.pinky = "correct";
        this.pinkyimage = this.greenpath;
        break;
      case (this.data.pinky >= this.range_rps.rock.pinky[1] && this.data.pinky < this.range_rps.rock.pinky[2]):
        this.fingers.pinky = "ok";
        this.pinkyimage = this.orangepath;
        break;
      case (this.data.pinky >= this.range_rps.rock.pinky[2] && this.data.pinky <= this.range_rps.rock.pinky[3]):
        this.fingers.pinky = "bad";
        this.pinkyimage = this.redpath
        break;
    }
    switch (true) {
      case (this.fingers.thumb == "bad" || this.fingers.index == "bad" || this.fingers.major == "bad" || this.fingers.annular == "bad" || this.fingers.pinky == "bad"):
        this.good_pos.push(33);
        break;
      case (this.fingers.thumb == "ok" || this.fingers.index == "ok" || this.fingers.major == "ok" || this.fingers.annular == "ok" || this.fingers.pinky == "ok"):
        this.good_pos.push(66);
        break;
      default:
        this.good_pos.push(100);
    }
  }

  treatmentPaper() {
    switch (true) {
      case (this.data.thumb <= this.range_rps.paper.thumb[0] && this.data.thumb > this.range_rps.paper.thumb[1]):
        this.fingers.thumb = "correct";
        this.thumbimage = this.greenpath;
        break;
      case (this.data.thumb <= this.range_rps.paper.thumb[1] && this.data.thumb > this.range_rps.paper.thumb[2]):
        this.fingers.thumb = "ok";
        this.thumbimage = this.orangepath;
        break;
      case (this.data.thumb <= this.range_rps.paper.thumb[2] && this.data.thumb >= this.range_rps.paper.thumb[3]):
        this.fingers.thumb = "bad";
        this.thumbimage = this.redpath;
        break;
    }
    switch (true) {
      case (this.data.index <= this.range_rps.paper.index[0] && this.data.index > this.range_rps.paper.index[1]):
        this.fingers.index = "correct";
        this.indeximage = this.greenpath;
        break;
      case (this.data.index <= this.range_rps.paper.index[1] && this.data.index > this.range_rps.paper.index[2]):
        this.fingers.index = "ok";
        this.indeximage = this.orangepath;
        break;
      case (this.data.index <= this.range_rps.paper.index[2] && this.data.index >= this.range_rps.paper.index[3]):
        this.fingers.index = "bad";
        this.indeximage = this.redpath;
        break;
    }
    switch (true) {
      case (this.data.major <= this.range_rps.paper.major[0] && this.data.major > this.range_rps.paper.major[1]):
        this.fingers.major = "correct";
        this.majorimage = this.greenpath;
        break;
      case (this.data.major <= this.range_rps.paper.major[1] && this.data.major > this.range_rps.paper.major[2]):
        this.fingers.major = "ok";
        this.majorimage = this.orangepath;
        break;
      case (this.data.major <= this.range_rps.paper.major[2] && this.data.major >= this.range_rps.paper.major[3]):
        this.fingers.major = "bad";
        this.majorimage = this.redpath;
        break;
    }
    switch (true) {
      case (this.data.annular <= this.range_rps.paper.annular[0] && this.data.annular > this.range_rps.paper.annular[1]):
        this.fingers.annular = "correct";
        this.annularimage = this.greenpath;
        break;
      case (this.data.annular <= this.range_rps.paper.annular[1] && this.data.annular > this.range_rps.paper.annular[2]):
        this.fingers.annular = "ok";
        this.annularimage = this.orangepath;
        break;
      case (this.data.annular <= this.range_rps.paper.annular[2] && this.data.annular >= this.range_rps.paper.annular[3]):
        this.fingers.annular = "bad";
        this.annularimage = this.redpath;
        break;
    }
    switch (true) {
      case (this.data.pinky <= this.range_rps.paper.pinky[0] && this.data.pinky > this.range_rps.paper.pinky[1]):
        this.fingers.pinky = "correct";
        this.pinkyimage = this.greenpath;
        break;
      case (this.data.pinky <= this.range_rps.paper.pinky[1] && this.data.pinky > this.range_rps.paper.pinky[2]):
        this.fingers.pinky = "ok";
        this.pinkyimage = this.orangepath;
        break;
      case (this.data.pinky <= this.range_rps.paper.pinky[2] && this.data.pinky >= this.range_rps.paper.pinky[3]):
        this.fingers.pinky = "bad";
        this.pinkyimage = this.redpath;
        break;
    }
    switch (true) {
      case (this.fingers.index == "bad" || this.fingers.major == "bad" || this.fingers.annular == "bad"):
        this.good_pos.push(33);
        break;
      case (this.fingers.thumb == "ok" || this.fingers.index == "ok" || this.fingers.major == "ok" || this.fingers.annular == "ok" || this.fingers.pinky == "ok"):
        this.good_pos.push(66);
        break;
      default:
        this.good_pos.push(100);
    }
  }

  /* Call API Petrissage de balle exercice */

  getExoPierreFeuilleCiseau() {
    let name = "Pierre feuille ciseaux";
    var id_token = JSON.parse(localStorage.getItem('id_token'));

    this.exoService.getExoInfo(name, id_token, (exoInfo) => {
      if (exoInfo !== "error") {
        this._exoPierreFeuilleCiseau[0] = exoInfo;
        console.log("EXO INFO : ", exoInfo)
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
  }

  /* Manage modals */

  openModal(id: string) {
    console.log("openModal");
    this.modalService.open(id);
  }

  closeModal(id: string) {
    console.log("close modal");
    this.modalService.close(id);
    this.redirectDetailsPierreFeuilleCiseau();
  }

  timerModal() {
    this.time = this._exoPierreFeuilleCiseau[0].time;
    console.log("TIME API call : ", this._exoPierreFeuilleCiseau[0].time);
    this.openModal('custom-modal-timer');
  }

  /* Manage Success or Fail of an exercice */

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  checkSuccessOrFail() {
    this.endExo();
    if (this.validation === true) {
      this.openModal('custom-modal-success');
    }
    else if (this.validation === false) {
      this.openModal('custom-modal-fail');
    }
    this.redirectDetailsPierreFeuilleCiseau();
  }

  /* Redirection and END of the exercice */

  redirectDetailsPierreFeuilleCiseau() {
    this.endExo()
    this._router.navigate(['pierre-feuille-ciseau']); // On peut le laisser ici ou mettre la redirection directement dans la fonction endExo()
  }

  endExo() {
    console.log("Exo end");
    var token = JSON.parse(localStorage.getItem('id_token'));
    var users_id = JSON.parse(localStorage.getItem('id'));
    var average = 0;
    for (var i = 0; i < this.good_pos.length; i++) {
      average = average + this.good_pos[i];
    }
    average = average / this.good_pos.length;

    console.log("uid", users_id, "token", token, "score", this.score, "good_pos", average, this.good_pos)
    this.http.post('https://api.scriglov.fr/exo_result_up', { users_id: users_id, token: token, exo_name: "Pierre feuille ciseaux", score: this.score, good_pos: average })
      .subscribe(response => {
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
    this.validation = average >= 40 ? true : false
    this.mySubscription.unsubscribe();
  }
}
