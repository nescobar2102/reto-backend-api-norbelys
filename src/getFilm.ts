import axios, { AxiosResponse } from 'axios';
import AWS from 'aws-sdk';
import { v4 } from 'uuid';
import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda';
 
interface Films {
  titulo: string;
  director: string;
  productor: string; 
}
 
const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = 'FilmTable';
  
const getFilmsDB = async (event:APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try { 
  
    const params = {
      TableName: tableName,
      Key: {
        id: event.pathParameters?.id
      },
    };
    const result = await dynamodb
    .get(params)
    .promise();
   
    const films = result.Item;
    console.log("item de la BD",films)

    return {
      statusCode: 200,
      body: JSON.stringify({
        success:true,
        data:films,
        message:'The resource has been recovered!.'
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
  getFilmsDB
};