from flask import  jsonify

class GeneralResponse:
    def __init__(self, success=True, message="", data=None):
        self.success = success
        self.message = message
        self.data = data

    def to_json(self):
        return jsonify({
            "success": self.success,
            "message": self.message,
            "data": self.data
        })
