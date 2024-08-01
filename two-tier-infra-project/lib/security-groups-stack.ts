import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { SecurityGroup, Vpc } from 'aws-cdk-lib/aws-ec2';

interface SecurityGroupsStackProps extends cdk.StackProps {
  vpcId: string;
}

export class SecurityGroupsStack extends cdk.Stack {
  public readonly securityGroupId: string;

  constructor(scope: Construct, id: string, props: SecurityGroupsStackProps) {
    super(scope, id, {      
      env: {
      account: process.env.CDK_DEFAULT_ACCOUNT,
      region: process.env.CDK_DEFAULT_REGION,
    }
  });

    const vpc = Vpc.fromLookup(this, 'MyVpc', { vpcId: props.vpcId });

    const webSg = new SecurityGroup(this, 'WebSecurityGroup', {
      vpc,
      allowAllOutbound: true,
      securityGroupName: 'web-sg',
    });

    webSg.addIngressRule(
      cdk.aws_ec2.Peer.anyIpv4(),
      cdk.aws_ec2.Port.tcp(80),
      'Allow HTTP traffic'
    );
    webSg.addIngressRule(
      cdk.aws_ec2.Peer.anyIpv4(),
      cdk.aws_ec2.Port.tcp(22),
      'Allow SSH traffic'
    );

    this.securityGroupId = webSg.securityGroupId;

    new cdk.CfnOutput(this, 'WebSecurityGroupId', { value: this.securityGroupId });
  }
}
