import { Component, OnInit } from '@angular/core';

import { ChangeMail } from '../user';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-change-mail',
  templateUrl: './change-mail.component.html',
  styleUrls: ['./change-mail.component.css']
})
export class ChangeMailComponent implements OnInit {

  constructor(private profileService: ProfileService) { }

  //model = ;
  model = new ChangeMail('', '', '');

  currentMail = "";
  newMail = "";
  confNewMail = "";
  submitted = false;
  fail = false;
  notSame = false;
  ok = false;
  public userInfo;

  onSubmit() {
    this.submitted = true;
  }

  ngOnInit() {
  }

  updateMail() {
    const currentMail = this.model.currentMail;
    const newMail = this.model.newMail;
    const confNewMail = this.model.confNewMail;

    console.log("currentMail = "+currentMail);
    console.log("newMail = "+newMail);
    console.log("confNewMail = "+confNewMail);

    var mail = JSON.parse(localStorage.getItem('email'));
    var id_token = JSON.parse(localStorage.getItem('id_token'));
    var id = JSON.parse(localStorage.getItem('id'));

    if (newMail !== confNewMail) {
      this.notSame = true;
    } else if(mail !== currentMail) {
        this.fail = true;
    } else {
      this.profileService.updateMail(id, newMail, id_token, (worked) => {
        if (worked == true) {
          console.log("true")
          this.ok = true;
          console.log("fail = "+this.fail)

        } else {
          console.log("false")

          this.fail = true;
          console.log("fail = "+this.fail)

        }
      });
    }
  }
}
