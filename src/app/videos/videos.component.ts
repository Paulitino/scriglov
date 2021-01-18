import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public _exercices = [{
    name: "Relaxation de type Jacobson"
  },
  {
    name: "Pétrissage de balle"
  },
  {
    name: "Jeu du Pierre Feuille Ciseaux"
  }]

  single: any[];
  multi: any[];

  onSelect(event) {
    console.log(event);
  }
}
