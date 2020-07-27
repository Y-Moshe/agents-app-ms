import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class AgentsService {
  constructor(
    private http: HttpClient
  ) { }

  getAll(): void {

  }

  getOne(id: string): void {

  }

  add(form: any): void {

  }

  edit(id: string, form: any): void {

  }

  delete(id: string): void {

  }
}
