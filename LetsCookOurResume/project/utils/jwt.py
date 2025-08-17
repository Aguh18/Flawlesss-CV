
import jwt
import os
from flask import request
from functools import wraps


def token_required(func):
    @wraps(func)
    def decorated_function(*args, **kwargs):
        secret = os.getenv('JWT_KEY')
        token = request.headers.get('Authorization')
        token = token[7:]
       
        if not token:
            return 'Token is missing.', 403
        try:
            payload = jwt.decode(token, secret, algorithms=['HS256'])
            return func(payload, *args, **kwargs)
        except jwt.ExpiredSignatureError:
            return 'Signature expired. Please log in again.'
        except jwt.InvalidTokenError:
            return 'Invalid token. Please log in again.'
    return decorated_function
