import os
from PIL import Image
from geopy.geocoders import Nominatim
import folium
from folium.plugins import MarkerCluster
from GPSPhoto import gpsphoto
from tqdm import tqdm
import csv
from math import radians, sin, cos, sqrt, atan2
import time
from collections import defaultdict
from sklearn.cluster import DBSCAN
import numpy as np
from qdrant_client import QdrantClient, models
from config import qdrant_config



def get_location_name(latitude, longitude):
    location = geolocator.reverse(f"{latitude}, {longitude}", exactly_one=True)
    return location

def extract_location_from_image(image_path):
    gps_data = gpsphoto.getGPSData(image_path)
    if gps_data:
        latitude = gps_data.get('Latitude')
        longitude = gps_data.get('Longitude')
        if latitude is not None and longitude is not None:
            location = get_location_name(latitude, longitude)
            if location:
                return {
                    'latitude': latitude,
                    'longitude': longitude,
                    'location_name': location.address,
                    'image_path': image_path
                }
    return None

def process_images():
    image_files = [filename for filename in os.listdir(data_path) if filename.endswith(('.jpg', '.jpeg', '.png'))]

    for filename in tqdm(image_files, desc="Processing Images", unit="image"):
        image_path = os.path.join(data_path, filename)
        location_data = extract_location_from_image(image_path)
        if location_data:
            image_locations.append(location_data)

def convert_location_to_coordinates(location_name):
    geolocator = Nominatim(user_agent="image_location_extractor")
    location = geolocator.geocode(location_name)
    if location:
        return location.latitude, location.longitude
    else:
        return None

def create_markers_for_locations(map, image_locations): 
    for location_data in image_locations:
        latitude = location_data['latitude']
        longitude = location_data['longitude']
        # location_name = location_data['location_name']
        image_path = location_data['image_path']
        popup = f'<img src="{image_path}" width="100">' #<br>{location_name}

        folium.Marker(
            location=[latitude, longitude],
            popup=folium.Popup(popup, max_width=300),
            tooltip=(latitude, longitude) 
        ).add_to(map)

def cluster_and_visualize(map, image_locations):
    marker_cluster = MarkerCluster().add_to(map)
    create_markers_for_locations(marker_cluster, image_locations)
        

def create_cluster_map(gps_data, cluster_column, map): 
    for _, row in gps_data.iterrows():
        if row[cluster_column] == -1:
            cluster_colour = '#000000'
        else:
            cluster_colour = cols[row[cluster_column]]

        folium.CircleMarker(
            location= [row['latitude'], row['longitude']],
            radius=5,
            popup= row[cluster_column],
            color=cluster_colour,
            fill=True,
            fill_color=cluster_colour
        ).add_to(map)
    #     for cluster_label in np.unique(gps_data[cluster_column]):
    #         cluster_data = gps_data[gps_data[cluster_column] == cluster_label]
    #         cluster_coordinates = [(row['latitude'], row['longitude']) for index, row in cluster_data.iterrows()]
    #         heat_map = HeatMap(cluster_coordinates)
    #         heat_map.add_to(m)
    return map 
            
def print_centroids(centroids):
    geolocator = Nominatim(user_agent="cluster_centroids")

    for i, centroid in centroids.items():
        latitude = centroids[i][0]
        longitude = centroids[i][1]
        location_name = get_location_name(latitude, longitude)
        print(f"Centroid {i+1} '{location_name}': \n[Latitude={latitude} | Longitude={longitude}]\n")

def cluster_centroids(coordinates, labels, cluster_centroids={}):
    for i in range(len(set(labels)) - (1 if -1 in labels else 0)):
        cluster_points = coordinates[labels == i]
        cluster_centroid = np.mean(cluster_points, axis=0)
        cluster_centroids[i] = cluster_centroid   
    return cluster_centroids

def haversine_distance(latitude_1, longitude_1, latitude_2, longitude_2):
    latitude_1 = radians(latitude_1)
    longitude_1 = radians(longitude_1)
    latitude_2 = radians(latitude_2)
    longitude_2 = radians(longitude_2)

    radius = 6371.0

    dlon = longitude_2 - longitude_1
    dlat = latitude_2 - latitude_1
    a = sin(dlat / 2)**2 + cos(latitude_1) * cos(latitude_2) * sin(dlon / 2)**2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))
    distance = radius * c

    return distance

def create_centroid_markers(map, data):
    for i, centroid in data.items():
        latitude = data[i][0]
        longitude = data[i][1]
        location_name = get_location_name(latitude, longitude)

        folium.Marker(
            location=[latitude, longitude],
            tooltip = f"CENTROID {i+1} : '{location_name}'",
            symbol='square'
        ).add_to(map)
        
def display_map(map, centroids):
    while True:
        print('-'*70)
        print('INPUT PLACE:', end=' ')
        place = input()
        place_gps = convert_location_to_coordinates(place)

        if place_gps:
            place_name = get_location_name(place_gps[0], place_gps[1])

            place_gps = np.array([place_gps[0],
                                  place_gps[1]])

            print(f'\n => Latitude: {place_gps[0]} | Longitude: {place_gps[1]}')


            min_lat = None
            min_lon = None
            min_distance = float('inf') 

            for key, centroid in centroids.items():
                distance = haversine_distance(place_gps[0], place_gps[1], centroid[0], centroid[1])
                if distance < min_distance:
                    min_distance = distance
                    min_lat = centroid[0]
                    min_lon = centroid[1]

            SEARCH_RADIUS = qdrant_config.SEARCH_RADIUS
            if haversine_distance(place_gps[0], place_gps[1], min_lat, min_lon) < SEARCH_RADIUS:

                place_gps = (min_lat,min_lon)
                closet_loc = get_location_name(min_lat, min_lon)

                print(f"\n FOUND NEAREST LOCATION: {closet_loc} | \n MINIMUM DISTANCE: {round(min_distance, 2)} kms | LATITUDE: {min_lat} | LONGITUDE: {min_lon}")
                print(f'\n RE-ROUTING TO : {closet_loc}')

                map.location = place_gps
                return map
                break

            else: 
                print(f'Minimum Distance: {round(min_distance, 2)} kms')
                print('Not found any picture in this location!')
        else:
            print('Location Not found, try again!')
            
            
def show_single_map(uuid, data):
    for res in data: 
        if dict(res)['id'] == uuid:
            map = folium.Map(location=[dict(res)['payload']['locations']['lat'],dict(res)['payload']['locations']['lon']], zoom_start=9)

            latitude = dict(res)['payload']['locations']['lat']
            longitude = dict(res)['payload']['locations']['lon']
            location_name = get_location_name(latitude, longitude)
            image_path = dict(res)['payload']['url']
            popup = f'<img src="{image_path}" width="100">' #<br>{location_name}

            folium.Marker(
                location=[latitude, longitude],
                popup=folium.Popup(popup, max_width=300),
                tooltip=location_name 
            ).add_to(map)

            return map
            break
        else:
            pass

def data_scroll(qdrant_client):
    init_offset = None
    all_result = []

    while True:
        results = qdrant_client.scroll(
            collection_name=qdrant_config.collection_name, 
            offset = init_offset,
            scroll_filter=models.Filter(
                must=[
                    models.FieldCondition(
                        key="filetype",
                        match=models.MatchAny(
                            any=['image', 'video'])
                    ),
                ]
            ),
            limit=100,
            with_payload=True,
            with_vectors=False,
        )
        all_result.extend(results[0])

        init_offset = results[1]

        if results[1] == None:
            break
    
    return all_result

def save_image_locations(all_result):
    for res in all_result:
            if (dict(res)['payload']['locations']):
                location = get_location_name(dict(res)['payload']['locations']['lat'], 
                                                           dict(res)['payload']['locations']['lon'])
                image_locations.append({
                        'id': dict(res)['id'],
                        'latitude': dict(res)['payload']['locations']['lat'],
                        'longitude': dict(res)['payload']['locations']['lon'],
                        'location_name': location.address,
                        'image_path': dict(res)['payload']['url']
                    })
            else:
                pass
    return image_locations
            
def save_image_locations_without_locname(all_result):
    for res in all_result:
        if (dict(res)['payload']['locations']):
            image_locations.append({
                'id': dict(res)['id'],
                'latitude': dict(res)['payload']['locations']['lat'],
                'longitude': dict(res)['payload']['locations']['lon'],
                'image_path': dict(res)['payload']['url']
            })
    return image_locations

def cluster_db(image_locations):
    coordinates = np.array([[loc['latitude'], loc['longitude']] for loc in image_locations])

    dbscan = DBSCAN(eps=0.5, min_samples=3)
    labels = dbscan.fit_predict(coordinates)

    for i, loc in enumerate(image_locations):
        loc['cluster_label'] = labels[i]
    print('cluster succesfully!')
    return coordinates, labels


global image_locations
global coordinates
global labels
image_locations = []        
geolocator = Nominatim(user_agent="photo_location_extractor")
