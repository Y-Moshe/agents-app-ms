import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

const api = environment.serviceAPI;

@Injectable({providedIn: 'root'})
export class AgentsService {
  constructor(
    private http: HttpClient
  ) { }

  getAll(): Promise<any> {
    return this.http.get(api.concat('/agents')).toPromise();
  }

  getOne(id: number): Promise<any> {
    return this.http.get(api.concat('/agents/', id.toString())).toPromise();
  }

  add(data: any): Promise<any> {
    return this.http.post(api.concat('/agents'), data).toPromise();
  }

  edit(id: number, data: any): Promise<any> {
    return this.http.patch(api.concat('/agents/', id.toString()), data).toPromise();
  }

  delete(id: number): Promise<any> {
    return this.http.delete(api.concat('/agents/', id.toString())).toPromise();
  }
}
