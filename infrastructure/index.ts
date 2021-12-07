import * as sst from "@serverless-stack/resources";

import { BackendStack } from "./backend-stack";
import { FrontendStack } from "./frontend-stack";

export default function main(app: sst.App): void {
  app.setDefaultFunctionProps({
    runtime: "nodejs14.x",
  });

  const backend = new BackendStack(app, "backend-stack");

  new FrontendStack(app, "frontend-stack", { backend });
}
