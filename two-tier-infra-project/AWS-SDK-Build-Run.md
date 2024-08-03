# Step-by-step guide to compile and run TypeScript code, especially in the context of an AWS CDK project. 

This guide will cover setting up your environment, writing TypeScript code, compiling it, and then running it.

### Step-by-Step Procedure

#### Step 1: Set Up Your Environment

1. **Install Node.js and npm**
   - If you haven't installed Node.js and npm, download and install them from [nodejs.org](https://nodejs.org/).
   - Verify the installation by running:
     ```bash
     node -v
     npm -v
     ```

2. **Install TypeScript**
   - Install TypeScript globally using npm:
     ```bash
     npm install -g typescript
     ```
   - Verify the installation by running:
     ```bash
     tsc -v
     ```

3. **Install AWS CDK**
   - Install the AWS CDK CLI globally using npm:
     ```bash
     npm install aws-cdk-lib
     ```
   - Use the latest LTS node version.
   ```
     nvm use --lts
   ```
   - Verify the installation by running:
     ```bash
     cdk --version
     ```

#### Step 2: Initialize Your CDK Project

1. **Create a New CDK Project Directory**
   - Navigate to the directory where you want to create your project and run:
     ```bash
     mkdir two-tier-infra-project
     cd two-tier-infra-project
     ```

2. **Initialize the CDK Project**
   - Initialize the CDK project with TypeScript as the language:
     ```bash
     cdk init app --language typescript
     ```

   This will set up a basic CDK project structure.

#### Step 3: Add the Required Project Files

1. **Create AWS CDK Files**

2. **Update the `package.json` (Optional)**
Ensure your `package.json` includes dependencies for AWS CDK libraries you need. You can add these manually or install them using npm.


#### Step 4: Write Your TypeScript Code

1. **Update `bin/two-tier-infra-project.ts`**

2. **Create Your Stack Files**

   **lib/vpc-stack.ts**

   **lib/security-groups-stack.ts**

   **lib/ec2-stack.ts**
 

3. **Create Your Environment Configuration Files**

   **environments/primary.ts**
   ```typescript
   export const primaryEnvironment = {
     region: 'us-west-2',
     vpcCidr: '10.0.0.0/16',
     maxAzs: 3,
     instanceType: 't2.micro',
     amiId: 'ami-0abcdef1234567890', // Replace with a valid AMI ID for your region
     keyName: 'your-key-pair-name',   // Replace with your key pair name
   };
   ```

   **environments/dr.ts**
   ```typescript
   export const drEnvironment = {
     region: 'us-east-1',
     vpcCidr: '10.1.0.0/16',
     maxAzs: 2,
     instanceType: 't2.micro',
     amiId: 'ami-0abcdef1234567890', // Replace with a valid AMI ID for your region
     keyName: 'your-key-pair-name',   // Replace with your key pair name
   };
   ```

#### Step 5: Compile Your TypeScript Code

1. **Compile TypeScript**
   - Run the TypeScript compiler to compile the code:
     ```bash
     npm install
     npm run build
     ```

#### Step 6: Deploy Your CDK App

1. **Bootstrap CDK (if necessary)**
   - Before deploying, you might need to bootstrap the CDK environment. Run:
     ```bash
     cdk bootstrap
     ```

2. **Deploy to the Primary Environment**
   - Deploy the stacks to the primary environment:
     ```bash
     cdk deploy -c env=primary
     ```

3. **Deploy to the DR Environment**
   - Deploy the stacks to the DR environment:
     ```bash
     cdk deploy -c env=dr
     ```

#### Additional Steps

- **Testing**: Use Jest or another testing framework to write and run tests for your CDK stacks.

By following these steps, you can set up, compile, and run your TypeScript-based AWS CDK project efficiently.