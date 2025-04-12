import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../service/pokemon.service';
import { PokemonDetails } from '../../interfaces/Pokemons/PokemonListResponse';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent implements OnInit {
  user: PokemonDetails | null = null;
  totalStats: number = 0
  displayedColumns: string[] = [
    'name', 'id', 'totalStats', 'height', 'weight', 'types', 'abilities', 
    'base_experience', 'forms', 'moves',
  ];

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}
  calculateTotalStats(): number {
    if (this.user?.stats) {
      return this.totalStats = this.user.stats.reduce((sum: number, stat: any) => sum + stat.base_stat, 0);
    }
    return this.totalStats
  }
  

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    if (id) {
      this.pokemonService.getPokemonById(+id).subscribe((data :PokemonDetails ) => {
        this.user = data;
        this.calculateTotalStats();
      });
    }
  }
  
  }
