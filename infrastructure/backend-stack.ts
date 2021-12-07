import { CorsHttpMethod } from "@aws-cdk/aws-apigatewayv2";
import { Duration } from "@aws-cdk/core";
import * as sst from "@serverless-stack/resources";

export class BackendStack extends sst.Stack {
  api: sst.Api;

  constructor(scope: sst.App, id: string, props?: sst.StackProps) {
    super(scope, id, props);

    this.api = new sst.Api(this, "Api", {
      defaultFunctionProps: {
        srcPath: "backend",
      },
      cors: {
        allowOrigins: ["http://localhost:3000"], // We will only run locally
        allowCredentials: true,
        allowHeaders: ["content-type"],
        allowMethods: [
          CorsHttpMethod.GET,
          CorsHttpMethod.POST,
          CorsHttpMethod.PUT,
          CorsHttpMethod.DELETE,
          CorsHttpMethod.OPTIONS,
          CorsHttpMethod.PATCH,
        ],
        maxAge: Duration.seconds(0),
      },
      routes: {
        "GET /cookie-creator": "lambdas/cookie-creator.handler",
        "GET /cookie-handler": "lambdas/cookie-handler.handler",
        "POST /cookie-handler": "lambdas/cookie-handler.handler",
        "PUT /cookie-handler": "lambdas/cookie-handler.handler",
        "DELETE /cookie-handler": "lambdas/cookie-handler.handler",
        "PATCH /cookie-handler": "lambdas/cookie-handler.handler",
      },
    });

    this.addOutputs({
      ApiEndpoint: this.api.url,
    });
  }
}
