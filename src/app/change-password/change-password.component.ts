import { Component, OnInit } from '@angular/core';

import { ChangePass } from '../user';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private profileService: ProfileService) { }

  //model = ;
  model = new ChangePass('', '', '');

  currentPassword = "";
  newPassword = "";
  confNewPassword = "";
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

  updatePassword() {
    const currentPassword = this.model.currentPassword;
    const newPassword = this.model.newPassword;
    const confNewPassword = this.model.confNewPassword;

    console.log("currentPassword = "+currentPassword);
    console.log("newPassword = "+newPassword);
    console.log("confNewPassword = "+confNewPassword);

    var id = JSON.parse(localStorage.getItem('id'));
    var id_token = JSON.parse(localStorage.getItem('id_token'));

    if (newPassword !== confNewPassword) {
      this.notSame = true;
    } else {
      this.profileService.updatePassword(currentPassword, newPassword, id, id_token, (worked) => {
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
