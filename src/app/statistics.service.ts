import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private http: HttpClient) { }

  goodPos(pos) {
    var l = 0;
    var add = 0;
    var mean = 0;
    var gut = [];

    while (l < pos.good_pos.length) {
      add = add + pos.good_pos[l];
      l++;
    }

    mean = add / l;
    var tmp2 =
    {
      "name": "Main dans la bonne position",
      "value": mean
    };

    var tmp21 =
    {
      "name": "Main dans la mauvaise position",
      "value": 100 - mean
    };

    gut.push(tmp2);
    gut.push(tmp21);


    return (gut);
  }

  barreCal(barre) {
    var i = 0;
    var tab = [];

    while (i < barre.date.length) {

      var tmp = {
        "name": barre.date[i],
        "value": barre.score[i]
      };

      tab.push(tmp);
      i++;
    }

    return (tab);
  }

  getStatistics(id: string, id_token: string, response: Function) {
    return this.http.post('https://api.scriglov.fr/exo_result_get', { users_id: id, token: id_token })
      .subscribe(body => {
        const res = JSON.stringify(body);
        const b = JSON.parse(res);

        var bestScores = [];
        var exercices = [];

        if (b.jacob.done == true) {

          var jacob_barre = this.barreCal(b.jacob);
          var jacob_good_pos = this.goodPos(b.jacob);

          bestScores.push(b.jacob.best_score);

          exercices.push({
            "name": "Relaxation de type Jacobson",
            "barre_stat": jacob_barre,
            "hand": jacob_good_pos,
          });


        } if (b.balle.done == true) {

          var balle_barre = this.barreCal(b.balle);
          var balle_good_pos = this.goodPos(b.balle);

          bestScores.push(b.balle.best_score);

          exercices.push({
            "name": "Pétrissage de balle",
            "barre_stat": balle_barre,
            "hand": balle_good_pos,
          });

        } if (b.pfc.done == true) {

          var pfc_barre = this.barreCal(b.pfc);
          var pfc_good_pos = this.goodPos(b.pfc);

          bestScores.push(b.pfc.best_score);

          exercices.push({
            "name": "Jeu du Pierre Feuille Ciseaux",
            "barre_stat": pfc_barre,
            "hand": pfc_good_pos,
          });

        }
        response({
          exercices,
          bestScores
        });
      }, error => {
        if (error)
          response("error");
      });
  }
}
