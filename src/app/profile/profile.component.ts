import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { ProfileService } from '../profile.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private profileService: ProfileService, private auth: AuthService, private _router: Router) { }

  public _userInfo;
  
  ngOnInit() {
    var id_token = JSON.parse(localStorage.getItem('id_token'));
    var id = JSON.parse(localStorage.getItem('id'));

    this.profileService.getUserInfo(id, id_token, (userInfo) => {
      if (userInfo !== "error") {
        this._userInfo = userInfo;
      }
    });
  }

  logOut() {
    this.auth.logout();
    this._router.navigate(['login']);
  }
}
