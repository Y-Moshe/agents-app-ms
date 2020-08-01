import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

export interface IAgents {
  name: string;
  imgURL: string;
}

export interface IAbility {
  name: string;
  description: string;
  image: string;
  videoURL: string;
}

export interface IAgent extends IAgents {
  role: string;
  biography: string;
  abilities: {
    abilityQ: IAbility
    abilityE: IAbility
    abilityC: IAbility
    abilityX: IAbility
  };
}

const api = environment.serviceAPI;

@Injectable({providedIn: 'root'})
export class AgentsService {
  constructor(
    private http: HttpClient
  ) { }

  getAll(): Promise<IAgents> {
    return this.http.get(api.concat('/agents')).toPromise<any>();
  }

  getOne(id: number): Promise<IAgent> {
    return this.http.get(api.concat('/', id.toString())).pipe(map(response => {
      // transfroming the abilities response object to the correct formData on agent-form component to be used.
      const form = {};
      // looping all response props ('name', 'imgURL'... etc)
      Object.keys(response).forEach(key => {
        // for abilities prop
        if (key === 'abilities') {
            const abilities = {};
            const decodedAbilities = JSON.parse(response[key]) as [];

            decodedAbilities.forEach((ability: IAbility, i) => {
              let ctrlName = 'ability';
              switch (i) {
                case 0:
                  ctrlName += 'Q';
                  break;
                case 1:
                  ctrlName += 'E';
                  break;
                case 2:
                  ctrlName += 'C';
                  break;
                default:
                  ctrlName += 'X';
                  break;
              }

              abilities[ctrlName] = ability;

            });

            form[key] = abilities;
            return;
          }

        form[key] = response[key];
      });

      return form;
    })).toPromise<any>();
  }

  add(data: any): Promise<string> {
    return this.http.post(api.concat('/agents'), data).toPromise<any>();
  }

  edit(id: number, data: any): Promise<string> {
    return this.http.patch(api.concat('/', id.toString()), data).toPromise<any>();
  }

  delete(id: number): Promise<string> {
    return this.http.delete(api.concat('/', id.toString())).toPromise<any>();
  }

  getRightErrMessage(error: HttpErrorResponse): string {
      let msg = error.message;
      if (error.error?.message) {
        msg = error.error?.message;
      }

      return msg;
  }
}
