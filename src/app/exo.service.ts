import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { UserSubscribe } from './user'

@Injectable({
  providedIn: 'root'
})
export class ExoService {

  constructor(private http: HttpClient) { }

  private _exoInfo;
  private _exoType;


  getExoInfo(name: string, id_token: string, response: Function) {
    return this.http.post('https://api.scriglov.fr/exo_get', {name: name, token: id_token})
    .subscribe(body => {
      let exoInfo = body;
      const resp = JSON.stringify(body);
      const b = JSON.parse(resp);

      this._exoInfo = exoInfo;
      response(exoInfo);
    }, error => {
      if (error)
        response("error");
    });
  }

  getExoType(type: string, id_token: string, response: Function) {
    return this.http.post('https://api.scriglov.fr/exo_get_type', {type: type, token: id_token})
    .subscribe(body => {
      let exoType = body;
      const resp = JSON.stringify(body);
      const b = JSON.parse(resp);

      this._exoType = exoType;
      response(exoType);
    }, error => {
      if (error)
        response("error");
    });
  }

  getExoAll(id_token: string, response: Function) {
    return this.http.post('https://api.scriglov.fr/exo_get_all', {token: id_token})
    .subscribe(body => {
      let exoType = body;
      const resp = JSON.stringify(body);
      const b = JSON.parse(resp);

      this._exoType = exoType;
      response(exoType);
    }, error => {
      if (error)
        response("error");
    });
  }
}
