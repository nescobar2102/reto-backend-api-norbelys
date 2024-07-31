"use strict";

interface APIGatewayProxyEvent {
  [key: string]: any;
}

interface APIGatewayProxyResult {
  statusCode: number;
  body: string;
}

const hello = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Welcome API!",
        input: event,
      },
      null,
      2
    ),
  };
};

export { hello };