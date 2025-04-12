import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PokemonBasicInfo } from '../../interfaces/Pokemons/PokemonListResponse';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {

  @Input() userList: PokemonBasicInfo[] = [];
  @Output() pageChanged = new EventEmitter<PageEvent>();

  @Input() limit!: number;
  @Input() totalCount!: number;
  

  displayedColumns: string[] = ['number', 'name', 'details'];

  currentPage: number = 0;

  onPageChange(event: PageEvent): void {
    this.pageChanged.emit(event);
    this.currentPage = event.pageIndex
  }


  getIdFromUrl(url: string): string {
    return url.split('/').slice(-2, -1)[0]; 
  }

  // Método para pegar o número do Pokémon
  getPokemonNumber(index: number): number {
    return (this.currentPage * this.limit) + index + 1;
  }
}