import axios, { AxiosResponse } from 'axios';

interface Films {
  titulo: string;
  director: string;
  productor: string;
  fecha_estreno: string; 
}

interface APIGatewayProxyResult {
  statusCode: number;
  body: string;
}

const films = async (): Promise<APIGatewayProxyResult> => {
  try {
    const url ='https://swapi.py4e.com/api/films';
    const response: AxiosResponse = await axios.get(url);

    const filmsList: Films[] = response.data.results.map((resource: any) => ({
      titulo: resource.title,
      director: resource.director,
      productor: resource.producer,
      fecha_estreno: resource.release_date
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(filmsList),
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
  films, 
  };