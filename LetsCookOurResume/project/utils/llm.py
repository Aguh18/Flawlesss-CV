import boto3
import json

from botocore.exceptions import ClientError

def get_bedrock_response(prompt):
   # Use the native inference API to send a text message to Meta Llama 3.


    # Create a Bedrock Runtime client in the AWS Region of your choice.
    client = boto3.client(
        service_name="bedrock-runtime",
        region_name="us-east-1",
        aws_access_key_id="AKIA5FCD6LFNT57DBE3T",      # optional - set this value if you haven't run `aws configure` 
        aws_secret_access_key="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",  # optional - set this value if you haven't run `aws configure`
        # aws_session_token=SESSION_TOKEN,   # optional - set this value if you haven't run `aws configure`
    )

    # Set the model ID, e.g., Llama 3 70b Instruct.
    model_id = "meta.llama3-8b-instruct-v1:0"

    # Define the prompt for the model.
    # prompt = "Describe the purpose of a 'hello world' program in one line."

    # Embed the prompt in Llama 3's instruction format.
    formatted_prompt = f"""
    <|begin_of_text|><|start_header_id|>user<|end_header_id|>
    {prompt}
    <|eot_id|>
    <|start_header_id|>assistant<|end_header_id|>
    """

    # Format the request payload using the model's native structure.
    native_request = {
        "prompt": formatted_prompt,
        "max_gen_len": 1112,
        "temperature": 0.5,
    }

    # Convert the native request to JSON.
    request = json.dumps(native_request)

    try:
        # Invoke the model with the request.
        response = client.invoke_model(modelId=model_id, body=request)

    except (ClientError, Exception) as e:
        print(f"ERROR: Can't invoke '{model_id}'. Reason: {e}")
        exit(1)

    # Decode the response body.
    model_response = json.loads(response["body"].read())

    # Extract and print the response text.
    response_text = model_response["generation"]
    return response_text



