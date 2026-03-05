
export interface PokemonListResponse {
    count:    number; next:     string | null; previous: string | null; results:  PokemonItem[];}
export interface PokemonItem {name: string;url:  string;}

export interface Pokemon { id:      number;name:    string; height:  number;weight:  number; sprites: Sprites;types:   TypeSlot[]; stats:   StatSlot[];}

export interface Sprites { front_default: string;  back_default:  string;}

export interface TypeSlot { slot: number; type: {  name: string; url:  string;  };}
export interface StatSlot { base_stat: number; effort:    number; stat: {  name: string;  url:  string;};}