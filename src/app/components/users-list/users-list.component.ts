import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PokemonBasicInfo, PokemonComparador, PokemonDetails } from '../../interfaces/Pokemons/PokemonListResponse';
import { PageEvent } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {
  constructor(private http: HttpClient) { }

  selectedPokemons: PokemonDetails[] = [];


isPokemonSelected(pokemon: PokemonDetails): boolean {
  return this.selectedPokemons.some(p => p.name === pokemon.name);
  }

async onSelectPokemon(pokemon: PokemonBasicInfo) {
  if (this.selectedPokemons.find(p => p.name === pokemon.name)) return;

  if (this.selectedPokemons.length === 2) {
    this.selectedPokemons = [];
}
const id = this.getIdFromUrl(pokemon.url);
const details = await firstValueFrom(this.http.get<PokemonDetails>(`https://pokeapi.co/api/v2/pokemon/${id}`));
this.selectedPokemons.push(details);
}
getComparisonResult(): string {
  const [p1, p2] = this.selectedPokemons;
  const total1 = this.getTotalStats(p1);
  const total2 = this.getTotalStats(p2);

  if (total1 > total2) return `${p1.name} é mais forte (${total1} > ${total2})`;
  if (total2 > total1) return `${p2.name} é mais forte (${total2} > ${total1})`;
  return `${p1.name} e ${p2.name} têm a mesma força (${total1})`;
}

getTotalStats(pokemon: PokemonDetails): number {
  return pokemon.stats.reduce((acc: number, stat: any) => acc + stat.base_stat, 0);
}


  @Input() userList: PokemonBasicInfo[] = [];
  @Output() pageChanged = new EventEmitter<PageEvent>();

  @Input() limit!: number;
  @Input() totalCount!: number;
  

  displayedColumns: string[] = ['number', 'name', 'details','select'];

  currentPage: number = 0;

  onPageChange(event: PageEvent): void {
    this.pageChanged.emit(event);
    this.currentPage = event.pageIndex
  }


  getIdFromUrl(url: string): string {
    return url.split('/').slice(-2, -1)[0]; 
  }


  getPokemonNumber(index: number): number {
    return (this.currentPage * this.limit) + index + 1;
  }
}