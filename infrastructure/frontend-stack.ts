import * as sst from "@serverless-stack/resources";

import { BackendStack } from "./backend-stack";

type FrontendStackProps = {
  backend: BackendStack;
} & sst.StackProps;

export class FrontendStack extends sst.Stack {
  constructor(scope: sst.App, id: string, props: FrontendStackProps) {
    super(scope, id, props);

    const reactSite = new sst.ReactStaticSite(this, "ReactSite", {
      path: "frontend",
      environment: {
        REACT_APP_API_URL: props.backend.api.url,
      },
    });

    this.addOutputs({
      FrontendEndpoint: reactSite.url,
    });
  }
}
