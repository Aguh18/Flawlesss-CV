from flask import  jsonify

class llm_response:
    message = None
    status_code = None
    data = None

    def to_json(self):
        return jsonify({
            "status_code": self.status_code,
            "message": self.message,
            "data": self.data
        })
