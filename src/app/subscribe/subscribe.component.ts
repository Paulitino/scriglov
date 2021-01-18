import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { UserSubscribe } from '../user';

import { Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  checkcgu: string;
  name: string;
}

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent {

  checkcgu: boolean;
  name: boolean;

  constructor(public http: HttpClient, public dialog: MatDialog) {
    this.checkcgu = false;
  }

  ngOnInit() {
    return this.http.get('https://api.scriglov.fr/doctors')
      .subscribe(body => {
        const resp = JSON.stringify(body);
        const b = JSON.parse(resp);
        console.log(b);

        var doctorz = b.response;
        let count = 0;
        console.log(doctorz)
        console.log(doctorz[0].name)
        while (count < doctorz.length) {
          var doc = doctorz[count].name.concat(" " + doctorz[count].surname);
          this.doctors.push(doc);
          count++;
        }
        console.log("doctorz" + doctorz);
        console.log("doctors" + this.doctors);
      });
  }

  test() {
    this.checkcgu = true;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '950px',
      height: '900px',
      data: { checkcgu: this.checkcgu }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  httpOptions = {
    headers: new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  }

  model = new UserSubscribe('', '', '', '', '', '');
  doctors = [];
  submitted = false;
  fail = false;
  notSame = false;
  ok = false;

  onSubmit() {
    this.submitted = true;
  }

  newUser() {
    console.log("NewUser function");
    let firstName = this.model.firstName;
    const lastName = this.model.lastName;
    const mail = this.model.mail;
    const passw = this.model.pass;
    const confpassw = this.model.confirmPass;
    const doctor = this.doctors[0];

    let sub_doc;

    if (passw !== confpassw) {
      console.log("emaila = " + mail);

      this.model = new UserSubscribe(firstName, lastName, mail, '', '', doctor);
      console.log("doctor = " + this.model.doctor);
      console.log("first = " + this.model.firstName);
      sub_doc = this.model.doctor;
      this.notSame = true;
    }
    else {
      // var docname = doctor.split(" ", 1);
      // console.log(docname);
      sub_doc = this.model.doctor;

      console.log(sub_doc, "sub_doc");
      this.subscribeRequest(firstName, lastName, mail, passw, sub_doc);
    }
  }

  subscribeRequest(first: string, last: string, email: string, passw: string, doc: string) {
    console.log("SUBSCRIBE REQUEST,", doc);
    return this.http.post('https://api.scriglov.fr/sign_up', { mail: email, pass: passw, doc: doc, name: first, surname: last})
      .subscribe(body => {
        const resp = JSON.stringify(body);
        const b = JSON.parse(resp);
        console.log("b = " + b);
        if (b.response.error == false) {
          this.model = new UserSubscribe(first, last, email, '', '', doc);
          this.fail = true;
        } else {
          this.notSame = false;
          this.fail = false;
          this.ok = true;
        }
      }, error => {
        const resp = JSON.stringify(error);
        const res = JSON.parse(resp);

        if (res.status == 200) {
          this.fail = false;
          this.ok = true;
          this.notSame = false;
        } else {
          this.model = new UserSubscribe(first, last, email, '', '', doc);
          this.fail = true;
        }
      });
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
  styleUrls: ['./subscribe.component.css']
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
