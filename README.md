# Glimpse Album Retrieval System Overview
In the rapidly advancing technological landscape, where the ubiquity of smartphones has revolutionized the capture of photos and videos, we find ourselves awash in a deluge of multimedia data. While this accessibility empowers individuals to document their lives, the subsequent management and retrieval of specific media for various purposes present formidable challenges. The need for efficient and precise media search tools has never been more pressing.
In response to this burgeoning need, we introduce Glimpse, an innovative Artificial Intelligence (AI)-powered system designed to alleviate the burdens of media management and retrieval. Glimpse leverages cutting-edge AI technologies to analyze, extract, and store meaningful features from images and videos, ultimately enhancing the performance of the search engine.
Key functions of Glimpse include the generation of embeddings from images, enabling subsequent text-based queries to yield more accurate and contextually relevant results. Furthermore, the system optimizes geolocation data for media, facilitating the swift and accurate retrieval of content associated with specific locations or events. Glimpse also excels at detecting and categorizing individuals' faces within albums, making it a powerful tool for organizing and retrieving photos and videos based on people.
In an era marked by the proliferation of multimedia data, Glimpse emerges as a pioneering solution to simplify the process of media management and retrieval. By harnessing the potential of AI, Glimpse empowers users to navigate their vast collections of photos and videos effortlessly, offering a glimpse into the future of efficient and intelligent media organization.


There are two branches in this repository:

1. **frontend:** This branch contains the front-end code for the project.
2. **backend:** This branch contains the back-end code for the project.

## Frontend

To run the front-end of the project, follow these steps:

1. Navigate to the `frontend` directory.
2. Run the following commands to install dependencies and start the development server:

```bash
npm i
npm run dev
```

## Backend
To run the back-end of the project, follow these steps:

1. Navigate to the backend directory.
2. Run the following commands to set up the Python environment and start the server:

```bash
pip install -r requirements.txt
python server.py
```
Additionally, if you need to expose your server to the internet using a tool like serveo.net, you can use the following SSH command:
```bash
ssh -R glimpse:80:127.0.0.1:5000 serveo.net
```
This will allow external access to your backend server at http://glimpse.serveo.net.

# Authors
- Ho Huu Tuong
- Le Duc Anh Phuong
- Pham Minh Tien
- Tran Quang Duong
- Pham Quang Huy

# 


https://github.com/tunneee/Glimpse-Album-Retrieval-System/assets/95611334/0a32abe2-0c82-45cf-af53-b41e6e9ae986



