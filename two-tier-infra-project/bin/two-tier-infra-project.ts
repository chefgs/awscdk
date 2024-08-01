#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { VpcStack } from '../lib/vpc-stack';
import { SecurityGroupsStack } from '../lib/security-groups-stack';
import { Ec2Stack } from '../lib/ec2-stack';
import { primaryEnvironment } from '../environments/primary';
import { drEnvironment } from '../environments/dr';

const app = new cdk.App();

// Determine the environment
const environment = app.node.tryGetContext('env');

if (environment === 'primary') {
  deployEnvironment(app, 'Primary', primaryEnvironment);
} else if (environment === 'dr') {
  deployEnvironment(app, 'DR', drEnvironment);
} else {
  console.error('Environment not specified. Use "cdk deploy -c env=primary" or "cdk deploy -c env=dr"');
}

function deployEnvironment(app: cdk.App, envName: string, envConfig: any) {
  const vpcStack = new VpcStack(app, `${envName}VpcStack`, {
    //env: { region: envConfig.region },
    cidr: envConfig.vpcCidr,
    maxAzs: envConfig.maxAzs,
  });

  const securityGroupsStack = new SecurityGroupsStack(app, `${envName}SecurityGroupsStack`, {
    //env: { region: envConfig.region },
    vpcId: vpcStack.vpcId,
  });

  new Ec2Stack(app, `${envName}Ec2Stack`, {
    //env: { region: envConfig.region },
    vpcId: vpcStack.vpcId,
    securityGroupId: securityGroupsStack.securityGroupId,
    instanceType: envConfig.instanceType,
    amiId: envConfig.amiId,
    keyName: envConfig.keyName,
  });
}

app.synth();