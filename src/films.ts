import axios, { AxiosResponse } from 'axios'; 
import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda';
 
interface Films {
  titulo: string;
  director: string;
  productor: string;
  fecha_estreno: string;
}

   
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

    return {
      statusCode: 200,
      
      body: JSON.stringify({
        success:true,
        data:filmsList 
      }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success:false,
        data:films,
        message:'An error occurred!.',
      }),
    };
  }
};


export {
  films,  
};