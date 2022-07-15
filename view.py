import json
from flask import Flask, jsonify, render_template
import urllib
import os
import requests
import csv
import pprint
app=Flask(__name__, template_folder="template_folder")

#This function will take in the unprocessed data, convert it into a dictionary, before appending that informaiton into an array 
#containing all the processed points, and then finally returning that array of dictionaries to be used later
def analyzeArray(data): 
   json_array = []
   #convert the data into an object where each row corresponds to the information of one of the points
   csv_data = csv.DictReader(data)
   #loop through the rows and append them to an array
   for row in csv_data:
      json_array.append(row)
   #return the array of dictionaries
   return json_array

@app.route('/data')
def root():
   #This will get the API Gateway Key from the launch.json file, call it, and read in the response
   #apiKey = os.environ.get("AWS_API_GATEWAY_KEY")
   apiKey = os.environ.get("AWS_API_GATEWAY_KEY")
   with urllib.request.urlopen(apiKey) as response:
      body = response.read().decode("utf-8")
   #This will take the response, convert it into a string and then use the requests library to call the url 
   jsonDict = json.loads(body)
   response = requests.get(jsonDict["body"])
   #do some light processing of the data before passing it into the analyze array function
   data = response.text.split('\n')
   body = analyzeArray(data)
   markers=[
   {
   'lat':0,
   'lon':0,
   'popup':'This is the middle of the map.'
    }
   ]
   #send the information to the frontend
   return json.dumps(body)
   #return render_template('testIndex.html', markers = markers, jsonDict = body)
if __name__ == '__main__':
   app.run(host="0.0.0.0", debug=True)



