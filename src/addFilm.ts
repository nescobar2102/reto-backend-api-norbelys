import AWS from 'aws-sdk';
import { v4 } from 'uuid';
import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda';
import { FilmResponse } from './types/api-types'; 

const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = 'FilmTable';
 
const addFilm = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {

    const { title, producer, director } = JSON.parse(event.body!); 
    const createdAt = new Date().getTime();
    const id = v4();
 
    const newFilm = {
      id,
      title,
      producer,
      director,
      createdAt,
      done: false,
    };
    const params = {
      TableName: tableName,
      Item: newFilm,
    };

    await dynamodb.put(params).promise();
    
    const result: FilmResponse = {
      success: true,
      data: newFilm,
      message: 'The resource has been created successfully!.',
    };
    return {
      statusCode: 201,
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
  addFilm
};