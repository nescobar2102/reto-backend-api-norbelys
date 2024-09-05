import { handler } from '../controllers/addFilm';  
import { APIGatewayProxyEvent } from 'aws-lambda';
import FilmModel from '../models/Film'; // Asegúrate de que la ruta sea correcta

// Mockear el modelo directamente
jest.mock('../models/Film', () => {
  return jest.fn().mockImplementation(() => ({
    createFilm: jest.fn(),
  }));
});

const filmModelInstance = FilmModel as jest.Mock;

describe('Film Creation Handler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  /*it('should create a film successfully', async () => {
    const newFilmData = {
      email: "test@test.com",
      title: "AWS RETO 22",
      producer: "Softteck",
      director: "Juanito Perez"
    };

    const inputEvent: APIGatewayProxyEvent = {
      body: JSON.stringify(newFilmData),
      httpMethod: 'POST',
      pathParameters: null,
      headers: {},
      multiValueHeaders: {},
      queryStringParameters: null,
      multiValueQueryStringParameters: null,
      isBase64Encoded: false,
      requestContext: {
        accountId: '123456789012',
        apiId: 'api-id',
        authorizer: null,
        httpMethod: 'POST',
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
        path: '/films',
        stage: 'dev',
        requestId: 'request-id',
        resourceId: 'resource-id',
        resourcePath: '/films',
      },
    } as unknown as APIGatewayProxyEvent;

    filmModelInstance().createFilm.mockResolvedValueOnce({ success: true }); // Mock exitoso

    const response = await handler(inputEvent);

    expect(response.statusCode).toBe(201);
    expect(JSON.parse(response.body)).toEqual({
      success: true,
      data: expect.objectContaining({
        email: newFilmData.email,
        title: newFilmData.title,
        producer: newFilmData.producer,
        director: newFilmData.director,
      }),
      message: 'The film has been created successfully!',
    });
  });
*/
  it('should return 400 if validation fails', async () => {
    const invalidFilmData = {
      email: "", // Email vacío
      title: "AWS RETO 22",
      producer: "Softteck",
      director: "Juanito Perez"
    };

    const inputEvent: APIGatewayProxyEvent = {
      body: JSON.stringify(invalidFilmData),
      httpMethod: 'POST',
      pathParameters: null,
      headers: {},
      multiValueHeaders: {},
      queryStringParameters: null,
      multiValueQueryStringParameters: null,
      isBase64Encoded: false,
      requestContext: {
        accountId: '123456789012',
        apiId: 'api-id',
        authorizer: null,
        httpMethod: 'POST',
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
        path: '/films',
        stage: 'dev',
        requestId: 'request-id',
        resourceId: 'resource-id',
        resourcePath: '/films',
      },
    } as unknown as APIGatewayProxyEvent;

    const response = await handler(inputEvent);

    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.body)).toEqual({
      success: false,
      message: 'email, title, producer are required.',
    });
  });

  it('should return 500 if an error occurs during film creation', async () => {
    const newFilmData = {
      email: "test@test.com",
      title: "AWS RETO 22",
      producer: "Softteck",
      director: "Juanito Perez"
    };

    const inputEvent: APIGatewayProxyEvent = {
      body: JSON.stringify(newFilmData),
      httpMethod: 'POST',
      pathParameters: null,
      headers: {},
      multiValueHeaders: {},
      queryStringParameters: null,
      multiValueQueryStringParameters: null,
      isBase64Encoded: false,
      requestContext: {
        accountId: '123456789012',
        apiId: 'api-id',
        authorizer: null,
        httpMethod: 'POST',
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
        path: '/films',
        stage: 'dev',
        requestId: 'request-id',
        resourceId: 'resource-id',
        resourcePath: '/films',
      },
    } as unknown as APIGatewayProxyEvent;

    filmModelInstance().createFilm.mockResolvedValueOnce({ success: false }); // Simula un error

    const response = await handler(inputEvent);

    expect(response.statusCode).toBe(500);
    expect(JSON.parse(response.body)).toEqual({
      success: false,
      message: 'An error occurred!',
    });
  });
});