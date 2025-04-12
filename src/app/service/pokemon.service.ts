import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { PokemonDetails, PokemonListResponse } from "../interfaces/Pokemons/PokemonListResponse";



@Injectable({ providedIn: 'root' })
export class PokemonService {
  constructor(private http: HttpClient) {}
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  getPokemonPage(limit: number, offset: number): Observable<PokemonListResponse> {
    return this.http.get<PokemonListResponse>(
      `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`
    );
  }
  getPokemonById(id: string | number): Observable<PokemonDetails> {
    return this.http.get<PokemonDetails>(`${this.apiUrl}/${id}`);
  }
}