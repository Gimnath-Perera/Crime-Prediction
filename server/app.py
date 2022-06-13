from flask import Flask, request, jsonify
import os
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd 


APP_ROOT = os.path.abspath(os.path.dirname(__file__))
loaded_model = joblib.load("crime_model.joblib")

# Predict the crime type
def predict_data(data):
    prediction = loaded_model.predict(data)

    return jsonify({"crime": prediction[0], "status": True})


# Init app
app = Flask(__name__)
CORS(app)


# Predict the crime
@app.route('/api/crime/predict', methods=['POST'])
def handle_predict_heart_failure():
    day_of_week = request.json['day_of_week']
    pd_district = request.json['pd_district']
    address = request.json['address']
    x = request.json['x']
    y = request.json['y']
    year = request.json['year']
    month = request.json['month']
    day = request.json['day']
    hour = request.json['hour']

    lst = [[day_of_week, pd_district, address, x, y, year, month, day, hour]]
    payload = pd.DataFrame(lst, columns =['DayOfWeek', 'PdDistrict', 'Address','X', 'Y', 'YEAR', 'MONTH', 'DAY', 'HOUR']) 


    result = predict_data(payload)

    return result


# Run Server
if __name__ == '__main__':
    app.run(host="192.168.1.101", port=5000)  # Replace with your own IP address
