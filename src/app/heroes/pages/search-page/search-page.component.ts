import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: [
  ]
})
export class SearchPageComponent implements OnInit{

  public searchInput = new FormControl('');
  public heroes : Hero[] = [];
  public selectedHero? : Hero;

  constructor( private heroesService : HeroesService) { }

  ngOnInit(): void {

  }

  searchHero(){
    const value: string = this.searchInput.value || '';
    this.heroesService.getSuggestions(value).subscribe(h => this.heroes = h);
  }

  onSelectedOption(e : MatAutocompleteSelectedEvent){
    if(!e.option.value) { this.selectedHero = undefined; return; }

    const hero : Hero = e.option.value;
    this.searchInput.setValue(hero.superhero);
    this.selectedHero = hero;
  }
}
