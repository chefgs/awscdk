Best Practices for Managing AWS CDK - TypeScript Code
=====================================================

# Introduction
It's important to organize your codebase clearly when structuring an AWS CDK project for TypeScript in GitHub, and ensure you include all necessary files while excluding sensitive or unnecessary files. 

Here's a step-by-step guide to structuring your code in GitHub:

## Directory Structure

Your project directory should look something like this:

```
my-cdk-project/
|-- bin/
|   |-- my-cdk-project.ts        # Entry point of the CDK app
|-- lib/
|   |-- my-cdk-project-stack.ts  # Defines a stack
|   |-- environments/            # Custom folder for environment-specific configurations
|       |-- dev.ts
|       |-- prod.ts
|-- node_modules/                # Node.js modules (excluded from Git)
|-- test/
|   |-- my-cdk-project.test.ts   # Unit tests
|-- .gitignore                   # Git ignore file
|-- cdk.json                     # CDK configuration
|-- package.json                 # Node.js dependencies
|-- tsconfig.json                # TypeScript configuration
|-- README.md                    # Project documentation
```

## Files to Push to GitHub

1. **Source Code**:
    - `bin/`: Contains the entry point of your CDK application.
    - `lib/`: Contains your stack definitions and environment configurations.
    - `test/`: Contains your unit tests.

2. **Configuration Files**:
    - `cdk.json`: Configuration file for CDK.
    - `package.json`: Lists your Node.js dependencies.
    - `tsconfig.json`: TypeScript compiler configuration.
    - `README.md`: Documentation for your project.

3. **Hidden Files**:
    - `.gitignore`: Specifies files and directories to ignore in Git.

## Files to Exclude (Using .gitignore)

Your `.gitignore` file should include the following entries to exclude unnecessary files:

```
node_modules/
cdk.out/
.env
*.js
*.d.ts
*.js.map
.vscode/
.idea/
.DS_Store
*.log
```

## Step-by-Step Instructions

1. **Initialize a Git Repository**:
    ```bash
    cd my-cdk-project
    git init
    ```

2. **Create .gitignore File**:
    Create a `.gitignore` file in the root of your project directory and add the above entries.

3. **Add Files to Git**:
    ```bash
    git add .
    ```

---

## Add CDK Code 

Run `cdk init` command for typescipt code and start adding your files

---

4. **Commit Changes**:
    ```bash
    git commit -m "Initial commit of CDK project"
    ```

5. **Create a GitHub Repository**:
    Go to GitHub, create a new repository, and follow the instructions to push your local repository to GitHub.

6. **Push to GitHub**:
    ```bash
    git remote add origin https://github.com/your-username/my-cdk-project.git
    git branch -M main
    git push -u origin main
    ```

## Example .gitignore

Here is an example `.gitignore` file for your CDK project:

```
# Logs
*.log

# Runtime data
node_modules/
cdk.out/

# TypeScript compiled output
*.js
*.d.ts
*.js.map

# Environment variables
.env

# IDE specific files
.vscode/
.idea/
.DS_Store
```

### Best Practices

1. **Environment Variables**: Use environment variables to manage sensitive information like AWS credentials. Store these in a `.env` file and make sure to add this file to `.gitignore`.

2. **Documentation**: Keep your `README.md` file up-to-date with instructions on how to set up and deploy the project.

3. **Branching Strategy**: Use a branching strategy such as Git Flow or GitHub Flow to manage feature development and releases.

4. **CI/CD Integration**: Set up CI/CD pipelines using GitHub Actions or another CI/CD tool to automate testing and deployment.

5. **Code Reviews**: Implement a code review process to ensure code quality and consistency across the team.



## GitHub Separate Repo VS Mono-Repo

Certainly! Here's a detailed response to clarify your questions regarding Git repository structure, CDK stack organization, and grouping of resources in AWS CDK projects.

### Separate Git Repositories for Network and Application Components

#### 1. Separate Repositories vs. Monorepo

- **Separate Repositories**: If your organization prefers a clear separation of concerns and has distinct teams working on network infrastructure and application code, it might be beneficial to use separate repositories. This allows for independent versioning, deployment, and access control.

- **Monorepo**: Alternatively, a monorepo (single repository) can be used if you prefer to keep all related code together. This approach simplifies dependency management and ensures that changes across different layers of the stack are coordinated.

#### 2. Suggested Contents for Each Repository

- **Network Infrastructure Repository**:
    - VPC configuration
    - Subnets (public and private)
    - Route tables and routes
    - Internet Gateways and NAT Gateways
    - Network ACLs and Security Groups
    - Bastion hosts (if any)
    - Any other foundational network components

  Example Directory Structure:
  ```
  network-infrastructure/
  |-- bin/
  |   |-- network-infrastructure.ts
  |-- lib/
  |   |-- vpc-stack.ts
  |   |-- security-groups-stack.ts
  |-- node_modules/
  |-- test/
  |   |-- network-infrastructure.test.ts
  |-- .gitignore
  |-- cdk.json
  |-- package.json
  |-- tsconfig.json
  |-- README.md
  ```

- **Application Components Repository**:
    - Application EC2 instances
    - Load balancers
    - RDS instances and database setup
    - S3 buckets for storage
    - Application-specific IAM roles and policies
    - Application-specific Security Groups (if not managed in the network repo)
    - Application-specific Lambda functions, API Gateway configurations, etc.

  Example Directory Structure:
  ```
  application-components/
  |-- bin/
  |   |-- application-components.ts
  |-- lib/
  |   |-- ec2-stack.ts
  |   |-- rds-stack.ts
  |   |-- s3-stack.ts
  |-- node_modules/
  |-- test/
  |   |-- application-components.test.ts
  |-- .gitignore
  |-- cdk.json
  |-- package.json
  |-- tsconfig.json
  |-- README.md
  ```

### Grouping CDK Stacks

#### 1. Grouping Related Resources
When designing CDK stacks, group related resources together to promote modularity and reusability. A stack should represent a logical grouping of components that can be managed and deployed together.

- **Network Stack**: Contains foundational network resources like VPC, subnets, route tables, and gateways.
- **Security Stack**: Contains security-related resources like Security Groups, Network ACLs, and IAM roles/policies.
- **Compute Stack**: Contains EC2 instances, auto-scaling groups, and load balancers.
- **Storage Stack**: Contains S3 buckets, EFS, and other storage services.
- **Database Stack**: Contains RDS instances, database clusters, and related configuration.

#### 2. Including Security Groups

- **In Compute/Application Stack**: Security Groups that are specific to certain applications or EC2 instances can be included in the same stack as those EC2 instances. This ensures that the EC2 instances and their security configurations are managed together.
- **In Security Stack**: General-purpose Security Groups that are used across multiple applications or stacks can be grouped together in a separate Security Stack. This promotes reusability and centralized management of security configurations.

## Directory Purposes
In AWS CDK development, organizing files into logical directories is important for maintainability, clarity, and scalability. The bin and lib directories serve specific purposes in a project, especially in a complex infrastructure project using AWS CDK (Cloud Development Kit).

### Purpose of `bin` Directory

The bin directory is typically used to store executable files or scripts that serve as entry points to your application or project. In the context of an AWS CDK project, the bin directory contains the main entry point file that sets up and initializes your CDK application.

Entry Point: This is where the CDK app is instantiated and stacks are defined and initialized. When you run cdk deploy, the CDK toolkit looks for the entry point in this directory.

Context Management: You can manage different environments or contexts (like development, staging, production) by providing context variables and configurations in the entry point script.

### Purpose of `lib` Directory

The lib directory is used to store the main logic and implementation of your stacks and constructs. In an AWS CDK project, this directory contains the code for the infrastructure components you are defining and managing.

Stack Definitions: Each AWS resource stack is typically defined in its own file within the lib directory. This separation helps maintain modularity and clarity.
Constructs and Resources: Contains reusable constructs or resource definitions that can be used across multiple stacks.

### Benefits of Using `bin` and `lib` Directories

Separation of Concerns: Keeps the entry point and high-level application logic separate from the detailed implementation of stacks and constructs.
Modularity: Makes the codebase more modular and easier to maintain. Each stack or construct can be developed and tested independently.
Scalability: Facilitates scaling the project. As the project grows, more stacks and constructs can be added without cluttering the main entry point.
Clarity: Improves code readability and organization, making it easier for new developers to understand the project structure.

It is important to note that, when we run `cdk init app --language typescript`, this command creates the required files and directory scaffolding for developing AWS CDK. 

### Summary

- **Separate Git Repositories**: Use separate repositories if you have distinct teams managing network and application components, otherwise use a **monorepo**.
- Monorepo could be useful for most of the projects.

  - **Network Repo**: Contains VPC, subnets, route tables, gateways, and general security groups.
  - **Application Repo**: Contains EC2 instances, RDS instances, S3 buckets, application-specific IAM roles, and application-specific security groups.

- **CDK Stack Grouping**:
  - **Network Stack**: VPC, subnets, route tables, gateways.
  - **Security Stack**: Security groups, IAM roles/policies.
  - **Compute Stack**: EC2 instances, auto-scaling groups, load balancers.
  - **Storage Stack**: S3 buckets, EFS.
  - **Database Stack**: RDS instances, database clusters.

- **Security Groups**: Include security groups in the stack where they are most relevant. Application-specific security groups can be included with the compute resources, while reusable security groups can be in a separate security stack.

By following these steps and best practices, you can ensure that your AWS CDK project for TypeScript is well-structured, secure, and easy to manage in GitHub. 

This setup will facilitate collaboration, maintainability, and scalability of your project.

To create a Disaster Recovery (DR) environment using AWS CDK, you can template your stacks so they can be deployed to multiple regions with minimal changes. This involves parameterizing your stacks and organizing your project structure to support multiple environments. Here's a step-by-step guide on how to achieve this:

---

## Templatizing the AWS CDK code

### Step 1: Organize Your Project Structure

Organize your CDK project to separate configurations for different environments (e.g., primary and DR environments).

```
my-cdk-project/
|-- bin/
|   |-- my-cdk-project.ts       # Entry point for the CDK app
|-- lib/
|   |-- vpc-stack.ts            # VPC stack
|   |-- security-groups-stack.ts # Security groups stack
|   |-- ec2-stack.ts            # EC2 stack
|-- environments/
|   |-- primary.ts              # Configuration for the primary environment
|   |-- dr.ts                   # Configuration for the DR environment
|-- node_modules/
|-- test/
|   |-- my-cdk-project.test.ts
|-- .gitignore
|-- cdk.json
|-- package.json
|-- tsconfig.json
|-- README.md
```

### Step 2: Parameterize Your Stacks

Modify your stacks to accept parameters for different configurations, such as VPC IDs, subnet IDs, and other resources.


### Step 3: Define Environment Configurations

Create configuration files for the primary and DR environments.

#### Primary Environment Configuration (`environments/primary.ts`)

```typescript
export const primaryEnvironment = {
  region: 'us-west-2',
  vpcCidr: '10.0.0.0/16',
  maxAzs: 3,
  instanceType: 't2.micro',
  amiId: 'ami-0abcdef1234567890',
  keyName: 'your-key-pair-name',
};
```

#### DR Environment Configuration (`environments/dr.ts`)

```typescript
export const drEnvironment = {
  region: 'us-east-1',
  vpcCidr: '10.1.0.0/16',
  maxAzs: 2,
  instanceType: 't2.micro',
  amiId: 'ami-0abcdef1234567890',
  keyName: 'your-key-pair-name',
};
```

### Step 4: Configure the CDK App Entry Point

Modify the CDK app entry point to use the environment configurations.

#### CDK App Entry Point (`bin/my-cdk-project.ts`)

```typescript
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
    env: { region: envConfig.region },
    cidr: envConfig.vpcCidr,
    maxAzs: envConfig.maxAzs,
  });

  const securityGroupsStack = new SecurityGroupsStack(app, `${envName}SecurityGroupsStack`, {
    env: { region: envConfig.region },
    vpcId: vpcStack.vpcId,
  });

  new Ec2Stack(app, `${envName}Ec2Stack`, {
    env: { region: envConfig.region },
    vpcId: vpcStack.vpcId,
    securityGroupId: securityGroupsStack.securityGroupId,
    instanceType: envConfig.instanceType,
    amiId: envConfig.amiId,
    keyName: envConfig.keyName,
  });
}
```

### Step 5: Deploy Stacks

To deploy the stacks to the primary environment, run:

```bash
cdk deploy -c env=primary
```

To deploy the stacks to the DR environment, run:

```bash
cdk deploy -c env=dr
```

### Summary

1. **Organize Project Structure**: Separate environment configurations and stack definitions.

2. **Parameterize Stacks**: Allow stacks to accept parameters for environment-specific configurations.

3. **Define Environment Configurations**: Create configuration files for primary and DR environments.

4. **Configure CDK App Entry Point**: Modify the app entry point to deploy stacks based on the environment context.

### Best Practices

- **Version Control**: Use version control (e.g., Git) to manage changes to your CDK project.
- **Automation**: Integrate with CI/CD pipelines for automated deployments.
- **Environment Isolation**: Ensure that resources in the primary and DR environments are isolated and independently manageable.
- **Regular Testing**: Regularly test the DR deployment to ensure that it functions as expected in case of a primary site failure.

By following these steps, you can create a templatized AWS CDK project that supports deploying to both primary and DR environments efficiently.
