from flask import Flask, jsonify
from project import app

# Fungsi untuk menangani error 404
@app.errorhandler(404)
def not_found_error(error):
    response = {'message': 'Not Found', 'status_code': 404}
    return jsonify(response), 404

@app.errorhandler(500)
def internal_error(error):
    response = {'message': 'Internal Server Error', 'status_code': 500}
    return jsonify(response), 500


