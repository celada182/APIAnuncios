# API anuncios test IDEALISTA

## Node.js & express

To run this project you will need to install node.js and npm (you can select it in the node.js install process).<br> 

First you need to download the project dependencies using the command form the project folder:
````
	npm install
````
Then to run de server you can use both commands:
````
	npm start
	node server.js
````
The server is running on port 8080 by default.

### PUT /api/adds
Calculate the score of all the adds.

### GET /api/adds
Return only relevant adds sorted by score. 
If the score has not been calculated the response is an empty array.

### GET /api/adds/irrelevant
Return only irrelevnat adds sorted by score.
