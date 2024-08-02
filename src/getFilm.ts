import AWS from 'aws-sdk'; 
import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda';
import { FilmResponse } from './types/api-types';
 
 
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
    const resultItem = await dynamodb
    .get(params)
    .promise();
   
    const films = resultItem.Item;
    console.log("item de la BD",films)
    
    const result: FilmResponse = {
      success: true,
      data: films,
      message:'The resource has been recovered!.'
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
  getFilmsDB
};