import axios, { AxiosResponse } from 'axios'; 
import { APIGatewayProxyResult } from 'aws-lambda';
import { FilmResponse, Films } from './types/api-types'; 
   
const films = async (): Promise<APIGatewayProxyResult> => {
  try {
    const url = 'https://swapi.py4e.com/api/films';
    const response: AxiosResponse = await axios.get(url);

    const filmsList: Films[] = response.data.results.map((resource: any) => ({
      titulo: resource.title,
      director: resource.director,
      productor: resource.producer,
      fecha_estreno: resource.release_date
    }));


    const result: FilmResponse = {
      success: true,
      data: filmsList,
      message: '.',
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
        success:false,
        message:'An error occurred!.',
      }),
    };
  }
};


export {
  films,  
};