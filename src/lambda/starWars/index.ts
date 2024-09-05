import axios, { AxiosResponse } from 'axios';
import { APIGatewayProxyResult } from 'aws-lambda';
import { FilmResponse, Films } from '../../types/api-types';

const handler = async (event: any): Promise<APIGatewayProxyResult> => {
  const filmId = event.pathParameters?.id; // Obtén el ID de la película desde los parámetros de la ruta
  
  try {
    const url = `https://swapi.py4e.com/api/films/${filmId}`;
    const starWarsResponse: AxiosResponse = await axios.get(url);

    const resource: any = starWarsResponse.data;

    const film: Films = {
      titulo: resource.title,
      director: resource.director,
      productor: resource.producer,
      fecha_estreno: resource.release_date,
    };

    const result: FilmResponse = {
      success: true,
      data: film,
      message: '',
    };

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: 'An error occurred!',
      }),
    };
  }
};

export {
  handler,
};