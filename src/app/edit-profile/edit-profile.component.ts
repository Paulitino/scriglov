import { Component, OnInit } from '@angular/core';

import { UserSubscribe } from '../user';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor(private profileService: ProfileService) { }

  model = new UserSubscribe('', '', '', '', '', '');
  submitted = false;
  fail = false;
  notSame = false;
  ok = false;
  public userInfo;

  onSubmit() {
    this.submitted = true;
  }

  ngOnInit() {
    this.userInfo = this.profileService.getUserInfoEdit();
    this.model = new UserSubscribe(this.userInfo.firstName, this.userInfo.surname, '', '', '', this.userInfo.doctor);
  }

  updateUser() {
    let first = this.model.firstName;
    let last = this.model.lastName;
    let doc = this.model.doctor;

    var id = JSON.parse(localStorage.getItem('id'));
    var id_token = JSON.parse(localStorage.getItem('id_token'));
    this.profileService.updateUserInfo(first, last, id, id_token, doc, (worked) => {
      if (worked == true) {
        console.log("true")
        this.model = new UserSubscribe(first, last, '', '', '', doc);
        this.ok = true;
      } else {
        console.log("false")
        this.model = new UserSubscribe(first, last, '', '', '', doc);
        this.fail = true;
      }
    });
  }
}
