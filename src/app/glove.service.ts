import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GloveService {

  constructor(private http: HttpClient) { }


  getGloveResponse(response: Function) {
    return this.http.get('http://localhost:3000/')
    .subscribe(body => {
      let exoInfo = body;
      response(body);

    }, error => {
      if (error)
        response("error");
    });
  }
}
