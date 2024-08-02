export interface Film {
  id: string;
  title: string;
  director: string;
  producer: string;
}

export interface Films {
  titulo: string;
  director: string;
  productor: string;
  fecha_estreno: string;
}


export interface FilmResponse {
  success: boolean;
  data: äny;
  message: string;
}
export interface GetFilmResponse {
  film: Film;
}

export interface GetFilmsResponse {
  films: Film[];
}

export interface CreateFilmRequest {
  film: Film;
}

export interface CreateFilmResponse {
  film: Film;
}