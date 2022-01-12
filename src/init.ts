export interface Superhero {
  id: number;
  name: string;
  biography: {
    fullName: string;
    alterEgos: string;
    aliases: string[];
  };
}

export interface State {
  errors: boolean;
  heroSearch: string;
  loading: boolean;
  pointer: number;
  superheros: Superhero[];
}
