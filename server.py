from utils.utils import *
from utils.geo_utils.map_gen import *

from flask import Flask, render_template

import json
from flask_cors import CORS, cross_origin

app = Flask(__name__, template_folder='./templates')
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
        point = point.dict()
        point['payload']['url'] = return_thumbnail_url(
                                    url=point['payload']['url'],
                                    filetype=point['payload']['filetype'],
                                    url_endpoints=ENDPOINT,
                                    img_size=IMAGE_SIZE
                                )
        # if point['payload']['filetype'] == 'keyframe':
        #     point['payload']['video_url'] = return_thumbnail_url(
        #                             url=point['payload']['video_url'],
        #                             filetype='video',
        #                             url_endpoints=ENDPOINT,
        #                             img_size=IMAGE_SIZE
        #                         )
        points.append(point)
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
                limit=1000,
                with_payload=True,
                with_vectors=False,
            )
    for point in results[0]:
        point = point.model_dump()
        point['payload']['url'] = return_thumbnail_url(
                                    url=point['payload']['url'],
                                    filetype=point['payload']['filetype'],
                                    url_endpoints=ENDPOINT,
                                    img_size=IMAGE_SIZE
                                )
        if point['payload']['filetype'] == 'video':
            keyframes_url = point['payload']['keyframes_url']
            for idx, url in enumerate(keyframes_url):
                keyframes_url[idx] = return_thumbnail_url(
                                    url=url,
                                    filetype='keyframe',
                                    url_endpoints=ENDPOINT,
                                    img_size=IMAGE_SIZE
                                )
            point['payload']['keyframes_url'] = keyframes_url
        points.append(point)    
    return json.dumps({'points': points, "next_page_offset": results[1]})
# @app.route('/map')

@app.route('/map/<uuid>')
def return_single_point_map(uuid):
    res = show_single_map(uuid, './templates/single_map.html')
    if res == -1:
        return "No location data found for this image"
    return render_template('single_map.html')
    
if __name__ == "__main__":
    app.run(debug=True)