import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent implements OnInit{

  public publishers = [
    {id: 'DC Comics', desc: 'DC - Comics'},
    {id: 'Marvel Comics', desc: 'Marvel - Comics'}
  ]

  public heroForm = new FormGroup({
    id :                new FormControl<string>(''),
    superhero :         new FormControl<string>('', { nonNullable: true }),
    publisher :         new FormControl<Publisher>(Publisher.DCComics),
    alter_ego :         new FormControl<string>(''),
    first_appearance :  new FormControl<string>(''),
    characters :        new FormControl<string>(''),
    alt_img :           new FormControl<string>(''),
  });

  constructor( private heroService : HeroesService, private activatedRoute : ActivatedRoute, private router : Router, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    if(!this.router.url.includes('edit')) return;

    this.activatedRoute.params.pipe( switchMap(({id}) => this.heroService.getHeroById(id) ) ).subscribe(h => {
      if(!h) return this.router.navigateByUrl('/');
      this.heroForm.reset(h);
      return;
    });
  }

  get currentHero () : Hero {
    return this.heroForm.value as Hero;
  }

  onSubmit() : void {
    if(this.heroForm.invalid) return;
    if(this.currentHero.id) {
      this.heroService.updateHero(this.currentHero).subscribe(h => {
        this.showSnackbar(`${h.superhero} updated!`);
      });
      return;
    }
    this.heroService.addHero(this.currentHero).subscribe(h => {
      this.router.navigate(['/heroes/edit', h.id]);
      this.showSnackbar(`${h.superhero} created!`);
    });
  }

  showSnackbar(message : string): void {
    this.snackbar.open( message, 'done', {
      duration: 2500
    });
  }

}
