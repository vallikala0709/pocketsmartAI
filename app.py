from flask import Flask, render_template, request, jsonify
import google.generativeai as genai
import os

app = Flask(__name__)

# Configure Gemini API
genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))
model = genai.GenerativeModel('gemini-1.5-flash')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/generate-home', methods=['POST'])
def generate_home():
    data = request.json
    # Logic for home interior planning using Gemini API
    prompt = f"Create a home interior plan for rooms: {data.get('rooms')} with budget: {data.get('budget')}."
    response = model.generate_content(prompt)
    return jsonify({"result": response.text})

@app.route('/generate-party', methods=['POST'])
def generate_party():
    data = request.json
    # Logic for party planning using Gemini API
    prompt = f"Plan a party for {data.get('guests')} guests with event type {data.get('event_type')} and budget: {data.get('budget')}."
    response = model.generate_content(prompt)
    return jsonify({"result": response.text})

@app.route('/generate-jewelry', methods=['POST'])
def generate_jewelry():
    data = request.json
    # Logic for jewelry selection using Gemini API
    prompt = f"Suggest jewelry for occasion: {data.get('occasion')} within budget: {data.get('budget')}."
    response = model.generate_content(prompt)
    return jsonify({"result": response.text})

if __name__ == '__main__':
    app.run(debug=True)
