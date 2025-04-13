export interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonBasicInfo[];
  }
  export interface PokemonComparador{
    name: string;
    url: string;
    results: PokemonBasicInfo[];
    stats: BaseStat[];
  }

  export interface PokemonBasicInfo {
    name: string;
    url: string;
  }
  export interface PokemonDetails {
    id: number;
    name: string;
    height: number;
    weight: number;
    base_experience: number;
    types: Type[];
    abilities: Ability[];
    moves: Move[];
    stats: BaseStat[];
    forms: Form[];
    sprites: Sprites;
  }
  
  export interface Type {
    type: {
      name: string;
    };
  }
  

  export interface Ability {
    ability: {
      name: string;
    };
  }
  

  export interface Move {
    move: {
      name: string;
    };
  }
  

  export interface BaseStat {
    base_stat: number;
    stat: {
      name: string;
    };
  }
  

  export interface Form {
    name: string;
  }
  export interface Sprites {
    front_default: string;
    front_shiny: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  }