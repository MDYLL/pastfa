const apiURL = "http://localhost:3003/api"; //='/api'
const downloadURL = "http://localhost:3003/public/download"; //='/download'

function getURL(){
    let postURL="http://localhost:3003/api?id=newUser&fio="+document.getElementById("fio");
    console.log(postURL);
    postForm=document.getElementById("form1");
    postForm.action=postURL;
}

/*function newUser() {
    let FIO = document.getElementById("FIO").value;
    if (FIO.length < 10) {
        return;
    }
    console.log(FIO);
    let url = `${apiURL}?id=newUser&fio=${FIO}`;
    fetch(url)
        .then((response) => {
            console.log("try download");
            responseFile = (filename, response) => {
                const filePath = "./output.pdf";
                fs.exists(filePath, function (exists) {
                    if (exists) {
                        response.writeHead(200, {
                            "Content-Type": "application/octet-stream",
                            "Content-Disposition": "attachment; filename=" + fileName
                        });
                        fs.createReadStream(filePath).pipe(response);
                    } else {
                        response.writeHead(400, {"Content-Type": "text/plain"});
                        response.end("ERROR File does not exist");
                    }
                })
            }

        })
}*/

function showAll() {
    let url = `${apiURL}?id=showUsers`;
    fetch(url)
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .then((data) => {
                console.log(data);
                let show = document.getElementById("allUsers");
                show.innerHTML = '';
                if (data.length === 0) {
                    return;
                }
                data.forEach((item, i) => {
                    let k = Object.keys(item);
                    let fio = item[k[0]];
                    let el = document.createElement('li');
                    el.innerText = k[0] + ": " + fio;
                    show.append(el);
                })


            }
        )
}