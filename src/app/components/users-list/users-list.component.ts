import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PokemonBasicInfo, PokemonDetails } from '../../interfaces/Pokemons/PokemonListResponse';
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
  
  @Input() userList: PokemonBasicInfo[] = [];
  @Output() pageChanged = new EventEmitter<PageEvent>();
  @Input() limit!: number;
  @Input() totalCount!: number;
  
  displayedColumns: string[] = ['number', 'name', 'details', 'select'];
  currentPage: number = 0;
  selectedPokemons: PokemonDetails[] = [];
  isPokemonSelected(pokemon: PokemonDetails): boolean {
    return this.selectedPokemons.some(p => p.name === pokemon.name);
  }
  

  PokemonSelection(pokemon: PokemonBasicInfo): void {
    const index = this.selectedPokemons.findIndex(p => p.name === pokemon.name);
    if (index !== -1) {
      this.selectedPokemons.splice(index, 1);
    } 
    else if (this.selectedPokemons.length < 2) {
    
      this.fetchPokemonDetails(pokemon);
    }
  }


   async fetchPokemonDetails(pokemon: PokemonBasicInfo) {
    const id = this.getIdFromUrl(pokemon.url);
    try {
      const details = await firstValueFrom(this.http.get<PokemonDetails>(`https://pokeapi.co/api/v2/pokemon/${id}`));
      if (details && details.stats) {
        this.selectedPokemons.push(details);
      } else {
        console.error('Dados incompletos para o Pokémon', pokemon);
      }
    } catch (error) {
      console.error('Erro ao buscar detalhes do Pokémon:', error);
    }
  }


  getTotalStats(pokemon: PokemonDetails): number {
    return pokemon.stats.reduce((acc: number, stat: any) => acc + stat.base_stat, 0);
  }

  getComparisonResult(): string {
    if (this.selectedPokemons.length < 2) {
      return 'Selecione dois Pokémons para comparar.';
    }
    
    const [p1, p2] = this.selectedPokemons;
    const total1 = this.getTotalStats(p1);
    const total2 = this.getTotalStats(p2);

    if (total1 > total2) return `${p1.name} é mais forte que ${p2.name}`;
    if (total2 > total1) return `${p2.name} é mais forte que ${p1.name}`;
    return `${p1.name} e ${p2.name} têm a mesma força (${total1})`;
  }


  onPageChange(event: PageEvent): void {
    this.pageChanged.emit(event);
    this.currentPage = event.pageIndex;
  }

 
  getIdFromUrl(url: string): string {
    return url.split('/').slice(-2, -1)[0]; 
  }


  getPokemonNumber(index: number): number {
    return (this.currentPage * this.limit) + index + 1;
  }
}