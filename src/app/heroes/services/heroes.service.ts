import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
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

  getSuggestions(query : string) : Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes?q=${query}&limit=6`);
  }

  addHero(hero: Hero) : Observable<Hero> {
    return this.http.post<Hero>(`${this.baseUrl}/heroes`,hero);
  }

  updateHero(hero: Hero) : Observable<Hero> {
    if(!hero.id) throw Error('Hero id is required');
    return this.http.patch<Hero>(`${this.baseUrl}/heroes/${hero.id}`,hero);
  }

  deleteHero(hero: Hero) : Observable<boolean> {
    if(!hero.id) throw Error('Hero id is required');
    return this.http.delete(`${this.baseUrl}/heroes/${hero.id}`)
    .pipe(
      map(resp => true),
      catchError(e => of(false))
    );
  }
}
