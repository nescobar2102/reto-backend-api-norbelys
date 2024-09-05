import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda';
import { FilmResponse } from '../types/api-types'; 
import FilmModel from '../models/Film'; 

const filmModel = new FilmModel(); 
  
const handler = async (event:any): Promise<APIGatewayProxyResult> => {
  try { 
    
    const id  = event.pathParameters?.id || event.id;
   
    if(!id){
      return response(400, { success: false, message: 'Id is required' });
    } 
    const filmResult = await filmModel.getFilms(id!);   
     if (!filmResult) {
      return response(404, { success: false, message: 'Film not found' });
    }
      
    return response(200, { success: true,data :filmResult,   message:'The resource has been recovered!.'  }) 
 
  } catch (error) {
    console.error(error);
    return response(500, { success: false, message: 'An error occurred!' });       
  }
};

const response = (statusCode: number, body: object): APIGatewayProxyResult => {
  return {
    statusCode,
    body: JSON.stringify(body),
  };
};
export { 
  handler
};