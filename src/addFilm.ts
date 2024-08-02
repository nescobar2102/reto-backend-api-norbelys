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
 
const addFilm = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {

    const { title, producer, director } = JSON.parse(event.body!);
    const createdAt = new Date();
    const id = v4();

    console.log("created id Film: ", id);
    console.log("created id title: ", title);
    console.log("created id producer: ", producer);
    console.log("created id director: ", director);
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

    return {
      statusCode: 201,
      body: JSON.stringify({
        success:true,
        data:newFilm,
        message:'The resource has been created successfully!.'
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
  addFilm
};