
from project import app
from project.service import llm_service
from flask import jsonify, make_response, request
from project.models.request.llm_request import llm_request
from pydantic import  ValidationError
from pypdf import PdfReader
from dotenv import load_dotenv
from project.models.response.llm_response import llm_response
import os
import requests
import jwt
import project.utils.llm as llm
import project.utils.jwt as jwt

# Load environment variables from a `.env` file



# class CreateForm(FlaskForm):
#     text = StringField('name', validators=[DataRequired()])

@app.route('/', methods=[ 'GET'])
def test_health():
    return jsonify({"message":"success"}), 200


@app.route('/get-cv', methods=[ 'POST'])
@jwt.token_required
def get_llm_response(payload):
    
    
    load_dotenv()
    api_key = os.environ['groq_key']
    base_promt = os.environ['promt']
    
    try:
        
        body_request = llm_request()
       
        
        body_request.resume = request.files['file']
        body_request.destination = request.form["destination"]
        reader = PdfReader(body_request.resume)
        text = ""
        for page in reader.pages:
            text += page.extract_text()
        
       
        url = "https://api.groq.com/openai/v1/chat/completions"
        headers = {
        "Authorization":"Bearer "+ api_key,
        "Content-Type": "application/json"}
        data = {
        "messages": [
            {"role": "user", "content": base_promt +" tambahan informasi bahwa pemilik dari resume ini akan melamar sebagai  "+ body_request.destination+ " apakah pengalaman tersebut cocok dengan posisi yang dilamar? jika tidak tolong arahkan ke hal yang semestinya kemudian jika resume dibawah tidak menyerupai resume tolong tolak untuk mereview hal tersebut  \n"+ text}
        ],
        "model": "llama3-8b-8192"
    }
            
        # response = llm_response()
        
        # llmresponse = llm.get_bedrock_response( base_promt +" tambahan informasi bahwa pemilik dari resume ini akan melamar sebagai  "+ body_request.destination+ " apakah pengalaman tersebut cocok dengan posisi yang dilamar? jika tidak tolong arahkan ke hal yang semestinya. kemudian jika resume dibawah tidak menyerupai resume tolong tolak untuk mereview hal tersebut  \n"+ text)
        
        # response.message = "success get data"
        # response.status_code = 200
        # response.data = llmresponse
        

        api_response = requests.post(url, headers=headers, json=data)
        
        response = llm_response()
        
        response.message = "success get data"
        response.status_code = api_response.status_code
        response.data = api_response.json()["choices"][0]["message"]["content"]
        return make_response(response.to_json(), 200)
    except Exception as e:
        return  jsonify({"message": str(e)}), 400

