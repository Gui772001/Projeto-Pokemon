import { Component, OnInit } from '@angular/core';
import { PokemonBasicInfo } from '../../interfaces/Pokemons/PokemonListResponse';
import { PokemonService } from '../../service/pokemon.service';
import { PageEvent } from '@angular/material/paginator';
import { IfilterOption } from '../../interfaces/Pokemons/filter-optinons.interface';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss'
})
export class UsersPageComponent implements OnInit{
constructor(private pokemonService: PokemonService) {}

  userList: PokemonBasicInfo[] = [];
  PokemonFilter:PokemonBasicInfo[] = []
  limit: number = 20;
  offset: number = 0;
  totalCount: number = 0;
  
  onPageChange(event: PageEvent): void {
    this.limit = event.pageSize;
    this.offset = event.pageIndex * event.pageSize;
    this.fetchPokemons();
  }
  ngOnInit() {
    this.fetchPokemons();
  }

  onFilter(event:IfilterOption){
    this.PokemonFilter = this.filterPokemonList(event,this.userList)
  }
  filterPokemonList(event: IfilterOption, userList: PokemonBasicInfo[]): PokemonBasicInfo[] {
    let PokemonList:PokemonBasicInfo[] = [];
    PokemonList= this.FilterPokemonByName(event.name,userList)
    return PokemonList

  }
  FilterPokemonByName(nome: string | undefined, userList: PokemonBasicInfo[]):any{
    if(!nome){
      return userList
    }
    const FilteredPokemon = userList.filter((pokemon) => pokemon.name.toLocaleLowerCase().includes(nome.toLocaleLowerCase()))

    return FilteredPokemon;
  }
 
  fetchPokemons(): void {
    this.pokemonService.getPokemonPage(this.limit, this.offset).subscribe(response => {
      this.userList = response.results;
      this.PokemonFilter= response.results
      this.totalCount = response.count;
    });
  }
 
 
}
