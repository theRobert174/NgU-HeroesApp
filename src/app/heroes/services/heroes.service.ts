import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
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

  getHeroById(id: string) : Observable<Hero | undefined> {
    return this.http.get<Hero>(`${this.baseUrl}/heroes/${id}`).pipe(catchError(e => of(undefined)));
  }
}
