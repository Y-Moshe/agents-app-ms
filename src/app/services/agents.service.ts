import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

export interface IAgents {
  id: number;
  name: string;
  imgURL: string;
}

export interface IAbility {
  name: string;
  description: string;
  image: string;
  videoURL: string;
}

export interface IAgent {
  name: string;
  imgURL: string;
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

  /**
   * Get all agents
   * @returns Promise with all agents as array[]
   */
  getAll(): Promise<IAgents[]> {
    return this.http.get(api.concat('/agents')).toPromise<any>();
  }

  /**
   * Fetch a specific agent from Database.
   * @param id id of the agent
   * @returns Promise with the agent object
   */
  getOne(id: number): Promise<IAgent> {
    return this.http.get(api.concat('/', id.toString())).pipe(map(response => {
      // transfroming the abilities response object to the correct formData on agent-form component to be used.
      const form = {};
      // looping all response props ('name', 'imgURL'... etc)
      Object.keys(response).forEach(key => {
        // for abilities prop
        if (key === 'abilities') {
            const abilities = {};
            // this is required
            const decodedAbilities = JSON.parse(response[key]) as [];

            decodedAbilities.forEach((ability: IAbility, i) => {
              // the formControlName used for the agent-form.
              // will be concat with one of Character
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

  /**
   * Adding new agent to the database
   * @param data agent data
   * @returns Promise with a success message
   */
  add(data: any): Promise<string> {
    return this.http.post(api.concat('/agents'), data).toPromise<any>();
  }

  /**
   * Edits the data of the agent
   * @param id id of the agent
   * @param data agent data
   * @returns Promise with a success message
   */
  edit(id: number, data: any): Promise<string> {
    return this.http.patch(api.concat('/', id.toString()), data).toPromise<any>();
  }

  /**
   * Will delete agent from the database for the given agent "id"
   * @returns Promise with a success message
   */
  delete(id: number): Promise<string> {
    return this.http.delete(api.concat('/', id.toString())).toPromise<any>();
  }

  /**
   * Will try to get a meaningful text message from that object.
   * if meaningful message was not found, will return the default
   * from the error object.
   * @returns the message as string
   * @param error the error response object
   */
  getRightErrMessage(error: HttpErrorResponse): string {
      let msg = error.message;
      if (error.error?.message) {
        msg = error.error?.message;
      }

      return msg;
  }
}
