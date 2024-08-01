import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Vpc, SubnetType } from 'aws-cdk-lib/aws-ec2';

interface VpcStackProps extends cdk.StackProps {
  cidr: string;
  maxAzs: number;
}

export class VpcStack extends cdk.Stack {
  public readonly vpcId: string;

  constructor(scope: Construct, id: string, props: VpcStackProps) {
    super(scope, id, {      
      env: {
      account: process.env.CDK_DEFAULT_ACCOUNT,
      region: process.env.CDK_DEFAULT_REGION,
    },
  });

    const vpc = new Vpc(this, 'MyVpc', {
      cidr: props.cidr,
      maxAzs: props.maxAzs,
      subnetConfiguration: [
        {
          cidrMask: 24,
          name: 'public',
          subnetType: SubnetType.PUBLIC,
        },
        {
          cidrMask: 24,
          name: 'private',
          subnetType: SubnetType.PRIVATE_WITH_NAT,
        },
      ],
    });

    this.vpcId = vpc.vpcId;

    new cdk.CfnOutput(this, 'VpcId', { value: this.vpcId });
  }
}
