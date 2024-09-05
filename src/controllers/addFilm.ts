import AWS from 'aws-sdk';
import { v4 } from 'uuid';
import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda'; 
import FilmModel from '../models/Film'; 

const filmModel = new FilmModel();
 

const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const { email, title, producer, director } = parseEventBody(event.body);
    
    const validationError = validateFilmInputs(email, title, producer);
    if (validationError) {
      return response(400, { success: false, message: validationError });
    }

    const createdAt = Date.now();
    const id = v4();
    
    const newFilm = createFilmObject(id, email, title, producer, director, createdAt);
    const filmCreationResult = await filmModel.createFilm(newFilm);

    
      return filmCreationResult.success 
        ? response(201, { success: true, data: newFilm, message: 'The film has been created successfully!' })
        : response(500, { success: false, message: 'An error occurred!' });
    

  } catch (error) {
    return response(500, { success: false, message: 'An error occurred!' });
  }
};

const parseEventBody = (body: string | null) => {
  return JSON.parse(body!);
};

const validateFilmInputs = (email: string, title: string, producer: string) => {
  if (!email || !title || !producer) {
    return 'email, title, producer are required.';
  }
  if (!validateEmail(email)) {
    return 'Invalid email format';
  }
  return null;
};

const createFilmObject = (id: string, email: string, title: string, producer: string, director: string, createdAt: number) => {
  return {
    id,
    email,
    title,
    producer,
    director,
    createdAt,
    done: false,
  };
};


const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const response = (statusCode: number, body: object): APIGatewayProxyResult => {
  return {
    statusCode,
    body: JSON.stringify(body),
  };
};

export { handler };