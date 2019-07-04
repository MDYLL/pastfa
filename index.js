let createError = require('http-errors');
let express = require('express');
let bodyParser = require('body-parser');
let router = express.Router();
let path = require('path');
let app = express();
const cors = require('cors');
app.use(cors());
app.use(express.static('public'));
app.use('/static', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
let fs = require('fs');
const jsonfile = require('jsonfile');
const HummusRecipe = require('hummus-recipe');
const pdfDoc = new HummusRecipe('input.pdf', 'output.pdf');
let numberOfPeople = 0;

async function makePDF(fio) {
    return new Promise((resolve, reject) => {
        pdfDoc
            .editPage(1)
            .text(fio, 170, 310, {
                color: '000000',
                fontSize: 20,
                font: 'Courier New',
            })
            .endPage()
            .endPDF();
        resolve(fio);
    })
}

app.post('/api', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    if (req.query.id === "newUser") {

        let post_data = req.body.fio;
        console.log(post_data);
        let fio = post_data;
        //console.log(fio);
        console.log("start");
        makePDF(fio)
            .then(r => {
                console.log("end");
                jsonfile.readFile('person.json', (err, obj) => {
                    //console.log(obj);
                    if (obj === undefined) {
                        obj = [];
                    } else {
                        numberOfPeople = obj.length;
                    }
                    // console.log(numberOfPeople);
                    let objToAppend = {};
                    objToAppend[numberOfPeople] = fio;
                    obj.push(objToAppend);
                    jsonfile.writeFile('person.json', obj, (err) => {
                        if (err) throw err;
                        console.log('fine');
                    })
                })
                console.log("try download");
                res.download("output.pdf");
            })

    }
});
app.get('/api', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    if (req.query.id === "showUsers") {
        console.log("showUsers");
        jsonfile.readFile('person.json', (err, obj) => {
            res.json(obj);
            console.log(obj);
        })
    }
});

app.listen(3003);
