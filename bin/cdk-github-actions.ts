#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { CdkGithubActionsStack } from "../lib/cdk-github-actions-stack";

const app = new cdk.App();
new CdkGithubActionsStack(app, "cdk-github-actions-stack", {});
