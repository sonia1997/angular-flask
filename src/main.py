from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS, cross_origin
from flask import jsonify
from google.cloud import storage

import os, json
path="C:\\Users\\Sonia Pandita\\Downloads\\vag-project-9cd2e5aa113e.json"
os.environ['GOOGLE_APPLICATION_CREDENTIALS']=path

app = Flask(__name__)
CORS(app)

storage_client = storage.Client()
bucket_name = 'invoice-templates-bucket'
bucket = storage_client.get_bucket(bucket_name)



@app.route('/add', methods=['GET', 'POST'])
def getData():
    if request.method=='POST':
        print(request.json)
        data=request.json
        getRequiredFormat(data)
        return '{"resp": "Success!!!"}'
    return "Fail to receive the data."
    
              
def getRequiredFormat(data):
        print("From angular\n")
        print(data)
        print("\n")
        
        processData=[]
        content={}
        content['filename']=data['templatename']
        
        filename=content['filename']+'.json'
        content_type='application/json'
        
        for i in range(0, len(data)-1):
            formatData={}
            formatData['field']=data[str(i)][0]            
            formatData['type']=data[str(i)][1]
            formatData['synonyms']=(data[str(i)][2]).split(',')
            processData.append(formatData)
            
        content['fields']=processData
        
        upload_file(filename, json.dumps(content), content_type)
        
        '''with open(data['templatename']+'.json', 'w') as fp:
            json.dump(content, fp)'''
            
            
        #print("required")
        #print(content)
        return "Success!!!"
        
        
def upload_file(filename, content, content_type):
        storage_client = storage.Client(project='vag-project')
        bucket = storage_client.get_bucket('invoice-templates-bucket')
        blob = bucket.blob(filename)
        blob.upload_from_string(content, content_type)

    
@app.route('/templates', methods=['GET'])
def ListData():
    if request.method=='GET':
        templates=[]
        for blob in bucket.list_blobs():
            template_name = str(blob.name).split('.json')[0]
            templates.append(template_name)
            
        return jsonify(templates)
    return jsonify({"resp": "No"})
   
   
@app.route('/import', methods=['GET', 'POST'])
def importData():
    if request.method=='POST':
        data=request.json
        print(data)
        content_type='application/json'
        filename='mytemplate.json'
        
        upload_file(filename, json.dumps(data), content_type)
        return '{"resp": "Success!!!"}'
    return "Fail to receive the data."


if __name__ == '__main__':
     app.run(port=5000)