import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Instance, InstanceType, MachineImage, Vpc, SecurityGroup } from 'aws-cdk-lib/aws-ec2';

interface Ec2StackProps extends cdk.StackProps {
  vpcId: string;
  securityGroupId: string;
  instanceType: string;
  amiId: string;
  keyName: string;
}

export class Ec2Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: Ec2StackProps) {
    super(scope, id, {      
      env: {
      account: process.env.CDK_DEFAULT_ACCOUNT,
      region: process.env.CDK_DEFAULT_REGION,
    },
  });

    const vpc = Vpc.fromLookup(this, 'MyVpc', { vpcId: props.vpcId });
    const securityGroup = SecurityGroup.fromSecurityGroupId(this, 'WebSecurityGroup', props.securityGroupId);

    const instance = new Instance(this, 'WebServer', {
      vpc,
      instanceType: new InstanceType(props.instanceType),
      machineImage: MachineImage.genericLinux({ 'us-west-2': props.amiId }), // Adjust the region as necessary
      securityGroup: securityGroup,
      keyName: props.keyName,
    });

    new cdk.CfnOutput(this, 'WebServerInstanceId', { value: instance.instanceId });
  }
}
