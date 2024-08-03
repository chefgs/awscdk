import aws_cdk as core
import aws_cdk.assertions as assertions

from demo_python.demo_python_stack import DemoPythonStack

# example tests. To run these tests, uncomment this file along with the example
# resource in demo_python/demo_python_stack.py
def test_sqs_queue_created():
    app = core.App()
    stack = DemoPythonStack(app, "demo-python")
    template = assertions.Template.from_stack(stack)

#     template.has_resource_properties("AWS::SQS::Queue", {
#         "VisibilityTimeout": 300
#     })
