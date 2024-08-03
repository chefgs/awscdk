# AWS CDK Project

This project contains examples for AWS CDK demo in both Python and TypeScript. It demonstrates how to create and manage AWS infrastructure using AWS Cloud Development Kit (CDK).

## Project Structure

The project is organized into two main directories:

- `cdk-python/`: Contains AWS CDK examples written in Python.
- `cdk-typescript/`: Contains AWS CDK examples written in TypeScript.

## Prerequisites

- AWS CLI configured with your credentials.
- Node.js (for TypeScript examples).
- Python 3.6+ (for Python examples).
- AWS CDK installed globally.

### Install AWS CDK

```sh
npm install -g aws-cdk
```

## Getting Started

### TypeScript

1. **Navigate to the TypeScript directory:**

    ```sh
    cd typescript
    ```

2. **Install dependencies:**

    ```sh
    npm install
    ```

3. **Synthesize the CloudFormation template:**

    ```sh
    cdk synth
    ```

4. **Deploy the stack:**

    ```sh
    cdk deploy
    ```

### Python

1. **Navigate to the Python directory:**

    ```sh
    cd python
    ```

2. **Create a virtual environment:**

    ```sh
    python3 -m venv .env
    source .env/bin/activate
    ```

3. **Install dependencies:**

    ```sh
    pip install -r requirements.txt
    ```

4. **Synthesize the CloudFormation template:**

    ```sh
    cdk synth
    ```

5. **Deploy the stack:**

    ```sh
    cdk deploy
    ```

## Cleanup

To delete the resources created by the CDK stacks, run the following command in the respective directories:

```sh
cdk destroy
```

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss any changes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
