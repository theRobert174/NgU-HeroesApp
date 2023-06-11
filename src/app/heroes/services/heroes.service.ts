import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from 'src/environments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  public baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) { }

  getHeroes() : Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`);
  }
}
