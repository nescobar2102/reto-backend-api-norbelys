"use strict";
import { APIGatewayProxyResult,APIGatewayProxyEvent } from './types/api-types'; 


const welcome = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Welcome API RETO NORBELYS!",
        input: event,
      },
      null,
      2
    ),
  };
};

export { welcome };