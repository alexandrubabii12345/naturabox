from flask import Flask, request, jsonify
import google.generativeai as genai
import os

app = Flask(__name__)

# Setează cheia API Gemini
genai.configure(api_key="API_KEY_AICI")

# Inițializează modelul
model = genai.GenerativeModel('gemini-pro')

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json.get('message')
    if not user_input:
        return jsonify({'error': 'No message provided'}), 400

    response = model.generate_content(user_input)
    return jsonify({'reply': response.text})

if __name__ == '__main__':
    app.run(debug=True)
