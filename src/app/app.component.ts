import { Component } from '@angular/core';
import { User } from 'src/app/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Scriglov';
  model = new User('', '');
  submitted = false;
  
  newUser() {
    this.model = new User('', '');
  }
}
