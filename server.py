from utils.utils import *

from flask import Flask

import json
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/")
def home():
    return "Welcome to Glipmse API v1.0"

@app.route("/search/<query>")
def search(query):
    points = []
    results = search_with_query(query)
    for point in results:
        points.append(point.dict())
    return json.dumps({'points': points})

@app.route("/scroll")
@app.route("/scroll/<offset>")
def scroll(offset=None):
    points = []
    results = client.scroll(
                offset = offset, 
                collection_name=collection_name, 
                scroll_filter=models.Filter(
                    must=[
                        models.FieldCondition(
                            key="filetype", 
                            match=models.MatchAny(any=['image', 'video'])
                        ),
                    ]
                ),
                limit=10,
                with_payload=True,
                with_vectors=False,
            )
    for point in results[0]:
        points.append(point.dict())
    
    return json.dumps({'points': points, "next_page_offset": results[1]})


    
if __name__ == "__main__":
    app.run(debug=True)