import { Stack, StackProps } from "aws-cdk-lib";
import {
  FederatedPrincipal,
  OpenIdConnectProvider,
  Role,
} from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";

export class CdkGithubActionsStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const repository = this.node.tryGetContext("repository");
    if (!repository) {
      throw new Error(`repository cannot be null`);
    }

    const oidConnectProvider = new OpenIdConnectProvider(
      this,
      "github-actions",
      {
        url: "https://token.actions.githubusercontent.com",
        clientIds: ["sts.amazonaws.com"],
        thumbprints: ["6938fd4d98bab03faadb97b34396831e3780aea1"],
      }
    );

    const githubActionsRole = new Role(this, "github-actions-role", {
      assumedBy: new FederatedPrincipal(
        oidConnectProvider.openIdConnectProviderArn,
        {
          StringLike: {
            "token.actions.githubusercontent.com:sub": `repo:${repository}:*`,
          },
        },
        "sts:AssumeRoleWithWebIdentity"
      ),
    });
    Role.fromRoleArn(
      this,
      "cdk-toolkit-role",
      "arn:aws:iam::*:role/cdk-*"
    ).grantAssumeRole(githubActionsRole);
  }
}
