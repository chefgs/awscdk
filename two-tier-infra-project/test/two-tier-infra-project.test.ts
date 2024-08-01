import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { Ec2Stack } from '../lib/ec2-stack';

test('EC2 Instance Created', () => {
  const app = new cdk.App();
  
  // Create the stack
  const stack = new Ec2Stack(app, 'MyTestStack', {
	vpcId: 'vpc-12345678',
	securityGroupId: 'sg-12345678',
	instanceType: 't2.micro',
	amiId: 'ami-12345678',
	keyName: 'my-key-pair'
  });

  // Prepare the stack for assertions
  const template = Template.fromStack(stack);

  // Assert that an EC2 instance is created
  template.hasResourceProperties('AWS::EC2::Instance', {
	InstanceType: 't2.micro',
	KeyName: 'my-key-pair'
  });
});