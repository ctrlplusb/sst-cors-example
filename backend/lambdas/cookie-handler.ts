import "source-map-support/register";

import { APIGatewayProxyHandlerV2 } from "aws-lambda";

import { cookie } from "~/lib/cookie";

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const token = cookie(event, "token");

  if (token) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        token,
      }),
    };
  } else {
    return {
      statusCode: 401,
    };
  }
};
