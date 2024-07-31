import axios, { AxiosResponse } from 'axios';

interface Person {
  nombre: string;
  altura: string;
  peso: string;
  color_cabello: string;
  color_piel: string;
  color_ojos: string;
  ano_nacimiento: string;
  genero: string;
  planeta_origen: string;
  peliculas: string[];
  especies: string[];
  vehiculos: string[];
  naves_estelares: string[];
  url: string;
}

interface APIGatewayProxyResult {
  statusCode: number;
  body: string;
}

const people = async (): Promise<APIGatewayProxyResult> => {
  try {
    const url = 'https://swapi.py4e.com/api/people';
    const response: AxiosResponse = await axios.get(url);

    const peopleList: Person[] = response.data.results.map((resource: any) => ({
      nombre: resource.name,
      altura: resource.height,
      peso: resource.mass,
      color_cabello: resource.hair_color,
      color_piel: resource.skin_color,
      color_ojos: resource.eye_color,
      ano_nacimiento: resource.birth_year,
      genero: resource.gender,
      planeta_origen: resource.homeworld,
      peliculas: resource.films,
      especies: resource.species,
      vehiculos: resource.vehicles,
      naves_estelares: resource.starships,
      url: resource.url,
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(peopleList),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: 'Ocurrió un error.',
    };
  }
}; 

export {
   people, 
  };