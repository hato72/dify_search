from flask import Flask, request, jsonify
from flask_cors import CORS  # 追加
import requests
import json
import os
app = Flask(__name__)
CORS(app)  # CORSを有効にする

API_KEY = os.getenv("NEXT_PUBLIC_DIFY_API_KEY")
BASE_URL = "https://api.dify.ai/v1"

def run_workflow(inputs, response_mode, user):
    url = f"{BASE_URL}/workflows/run"
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }
    data = {
        "inputs": inputs,
        "response_mode": response_mode,
        "user": user
    }
    response = requests.post(url, headers=headers, data=json.dumps(data))
    
    if response.status_code == 200:
        result = response.json()
        if "data" in result and "outputs" in result["data"] and "text" in result["data"]["outputs"]:
            return result["data"]["outputs"]["text"]
        else:
            return "Error: 'text' not found in the API response."
    else:
        return f"Request failed with status code {response.status_code}"

@app.route('/search', methods=['POST'])
def search():
    data = request.json
    query = data.get('query')
    
    if not query:
        return jsonify({"error": "No query provided"}), 400

    inputs = {"input": query}
    response_mode = "blocking"
    user = "example_user"

    result = run_workflow(inputs, response_mode, user)
    return jsonify({"result": result})

if __name__ == '__main__':
    app.run(debug=True)
