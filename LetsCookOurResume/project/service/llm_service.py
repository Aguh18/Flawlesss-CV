

from flask import  request
from project.models.response import general_response

def get_llm_response():
    if request.method == 'POST' :
    
        
        return general_response.GeneralResponse(success=False, message="Printed successfully").to_json()
    