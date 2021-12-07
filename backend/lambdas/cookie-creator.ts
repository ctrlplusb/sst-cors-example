import "source-map-support/register";

import { APIGatewayProxyHandlerV2 } from "aws-lambda";

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  return {
    statusCode: 200,
    headers: {
      "Set-Cookie": `token=the-token-value; Domain=${event.requestContext.domainName}; Secure; SameSite=none; HttpOnly`,
    },
  };
};
