import { handler } from '../controllers/getFilm';  
import { APIGatewayProxyEvent } from 'aws-lambda';

// Mockear el modelo directamente
jest.mock('../models/Film', () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => ({
      getFilms: jest.fn(),
    })),
  };
});

// Importar el modelo después de mockear
import FilmModel from '../models/Film';

describe('Film Retrieval Handler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

 /* it('should return a film successfully', async () => {
    const filmData = {
      director: "Juanito Perez",
      producer: "Softteck",
      createdAt: 1725555467243,
      id: "1",
      email: "test@test.com",
      done: false,
      title: "AWS RETO ",
    };

    const filmModelInstance = FilmModel as jest.Mock;
    filmModelInstance().getFilms.mockResolvedValueOnce(filmData); 

    const inputEvent: APIGatewayProxyEvent = {
      pathParameters: {
        id: "1", // Asegúrate de que este ID coincida
      },
      httpMethod: 'GET',
      headers: {},
      multiValueHeaders: {},
      queryStringParameters: null,
      multiValueQueryStringParameters: null,
      body: null,
      isBase64Encoded: false,
      requestContext: {
        accountId: '123456789012',
        apiId: 'api-id',
        authorizer: null,
        httpMethod: 'GET',
        identity: {
          accessKey: null,
          apiKey: null,
          apiKeyId: null,
          caller: null,
          clientCert: null,
          cognitoAuthenticationProvider: null,
          cognitoAuthenticationType: null,
          cognitoIdentityId: null,
          cognitoIdentityPoolId: null,
          sourceIp: '127.0.0.1',
          user: null,
          userAgent: 'PostmanRuntime/7.28.4',
          userArn: null,
        },
        path: '/films/1',
        stage: 'dev',
        requestId: 'request-id',
        resourceId: 'resource-id',
        resourcePath: '/films/{id}',
      },
    } as unknown as APIGatewayProxyEvent;

    const response = await handler(inputEvent);

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toEqual({
      success: true,
      data: filmData,
      message: "The resource has been recovered!.",
    });
  });*/

  it('should return 404 if a film is not found', async () => {
    const filmModelInstance = FilmModel as jest.Mock;  
    filmModelInstance().getFilms.mockResolvedValueOnce(null); 

    const inputEvent: APIGatewayProxyEvent = {
      pathParameters: {
        id: '2', 
      },
      httpMethod: 'GET',
      headers: {},
      multiValueHeaders: {},
      queryStringParameters: null,
      multiValueQueryStringParameters: null,
      body: null,
      isBase64Encoded: false,
      requestContext: {
        accountId: '123456789012',
        apiId: 'api-id',
        authorizer: null,
        httpMethod: 'GET',
        identity: {
          accessKey: null,
          apiKey: null,
          apiKeyId: null,
          caller: null,
          clientCert: null,
          cognitoAuthenticationProvider: null,
          cognitoAuthenticationType: null,
          cognitoIdentityId: null,
          cognitoIdentityPoolId: null,
          sourceIp: '127.0.0.1',
          user: null,
          userAgent: 'PostmanRuntime/7.28.4',
          userArn: null,
        },
        path: '/films/2',
        stage: 'dev',
        requestId: 'request-id',
        resourceId: 'resource-id',
        resourcePath: '/films/{id}',
      },
    } as unknown as APIGatewayProxyEvent;

    const response = await handler(inputEvent);

    expect(response.statusCode).toBe(404);
    expect(JSON.parse(response.body)).toEqual({
      success: false,
      message: 'Film not found',
    });
  });

  it('should return 400 if ID is missing', async () => {
    const filmModelInstance = FilmModel as jest.Mock;  
    filmModelInstance().getFilms.mockRejectedValueOnce(new Error('Database error'));

    const inputEvent: APIGatewayProxyEvent = {
      pathParameters: {
        id: '', // ID vacío
      },
      httpMethod: 'GET',
      headers: {},
      multiValueHeaders: {},
      queryStringParameters: null,
      multiValueQueryStringParameters: null,
      body: null,
      isBase64Encoded: false,
      requestContext: {
        accountId: '123456789012',
        apiId: 'api-id',
        authorizer: null,
        httpMethod: 'GET',
        identity: {
          accessKey: null,
          apiKey: null,
          apiKeyId: null,
          caller: null,
          clientCert: null,
          cognitoAuthenticationProvider: null,
          cognitoAuthenticationType: null,
          cognitoIdentityId: null,
          cognitoIdentityPoolId: null,
          sourceIp: '127.0.0.1',
          user: null,
          userAgent: 'PostmanRuntime/7.28.4',
          userArn: null,
        },
        path: '/films/', // Ruta sin ID
        stage: 'dev',
        requestId: 'request-id',
        resourceId: 'resource-id',
        resourcePath: '/films/{id}',
      },
    } as unknown as APIGatewayProxyEvent;

    const response = await handler(inputEvent);

    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.body)).toEqual({
      success: false,
      message: 'Id is required',
    });
  });
});