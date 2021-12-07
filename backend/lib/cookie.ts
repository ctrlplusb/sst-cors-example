import { APIGatewayProxyEventV2 } from "aws-lambda";

/**
 * Gets the value of the cookie with the given name from the API Gateway Proxy
 * Event. If no cookie with the given name is found, returns undefined.
 *
 * @param event The event to parse
 * @param name The name of the cookie to get
 * @returns The cookie value, or undefined if no cookie with the given name was
 * found
 */
export const cookie = (event: APIGatewayProxyEventV2, name: string) => {
  const cookies = event.cookies ?? [];
  const cookie = cookies.find((c) => c.startsWith(name));
  return cookie ? cookie.split("=")[1] : undefined;
};
