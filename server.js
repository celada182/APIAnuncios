// Set up
var express  = require('express');
var app      = express();
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
var POINTS_PER_WORD = 5;
var SEARCH_WORDS = ["luminoso", "nuevo", "céntrico", "reformado", "ático"];
var POINT_OF_DESCRIPTION = 30;
var POINTS_OF_PICTURES = 50;

app.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies
app.use(bodyParser.json()); // Send JSON responses
app.use(cors());

var adds = [
{
    "id": 1,
    "description": "Este piso es una ganga, compra, compra, COMPRA!!!!!",
    "pictures": []
},
{
    "id": 2,
    "description": "Nuevo ático céntrico recién reformado. No deje pasar la oportunidad y adquiera este ático de lujo",
    "pictures": ["http://www.idealista.com/pictures/2.jpg"]
},
{
    "id": 3,
    "description": "",
    "pictures": ["http://www.idealista.com/pictures/3.jpg"]
},
{
    "id": 4,
    "description": "Ático céntrico muy luminoso y recién reformado, parece nuevo",
    "pictures": ["http://www.idealista.com/pictures/5.jpg"]
},
{
    "id": 5,
    "description": "Pisazo",
    "pictures": [
        "http://www.idealista.com/pictures/3.jpg",
        "http://www.idealista.com/pictures/4.jpg"
    ]
}
]

function findUserAdds(adds) {
    return adds.filter((add) => {
        return add.score != "undefined" && add.score >= 40;
    })
    .sort((add1, add2) => {
        return add2.score - add1.score;
    });
}

function findIrrelevantAdds(adds) {
    return adds.filter((add) => {
        return add.score == "undefined" || add.score < 40;
    })
    .sort((add1, add2) => {
        return add2.score - add1.score;
    });
}

function calculateScore(add) {
    var score = 0;
    if (add.description != "undefined" && add.description != "") {
        score += 30;
        score += findDescriptionWords(add.description) * POINTS_PER_WORD;
    }
    if (add.pictures != "undefined" && add.pictures.length > 0) {
        score += 50
    }
    if (score < 40) {
        add.irrelevantSince = new Date();
    } else {
        delete add.irrelevantSince;
    }
    add.score = score;
}

function findDescriptionWords(description) {
    var wordsFound = 0;
    SEARCH_WORDS.forEach((word) => {
        var regex = new RegExp(word, 'g');
        wordsFound += (description.toLowerCase().match(regex) || []).length;
    });
    return wordsFound;
}

app.get('/api/adds', (req, res) => {
    res.send(findUserAdds(adds))
});

app.get('/api/adds/irrelevant', (req, res) => {
    res.send(findIrrelevantAdds(adds))
});

app.put('/api/adds', (req, res) => {
    adds.forEach((add) => {
        calculateScore(add);
    });
    res.send("Adds scored!")
});

// listen
app.listen(8080);
console.log("App listening on port 8080");