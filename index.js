const express = require('express');
const ZoneTelechargement = require('zone-telechargement');
const bodyParser = require('body-parser');
// const Q = require("q");

const app = express();

// prends en charge les requetes du type ("Content-type", "application/x-www-form-urlencoded")
app.use(bodyParser.urlencoded({
    extended: true
}));
// prends en charge les requetes du type ("Content-type", "application/json")
app.use(bodyParser.json());


app.use('/static', express.static('client/static'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/client/index.html')
})

app.post('/search/', function(req, res) {
	// var def = Q.defer();
	var recherche = req.body.recherche;
	var w = null
    ZoneTelechargement.search(recherche)
        .then(results => {
            console.log(results);
            // def.resolve(results);
            // w = results;
            res.send(results)
        });

        // console.log(w);
        // console.log(def.promise);
    
});


app.post('/detail/', function(req, res) {
	var detail = req.body.detail;
    ZoneTelechargement.getDetails(detail)
    .then(result => {
        console.log(result);
        res.send(result);
    });

})

app.listen(3000, function() {
    console.log('Example app listening on port 3000!')
})
