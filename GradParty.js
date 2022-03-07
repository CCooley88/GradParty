window.onload = init;

let guestListUi;
let guests = [];
const addGuestsUri = "http://localhost:3000/post";

function init(){
    document.getElementById("addGuest").onclick = addGuest;
    guestListUi = document.getElementById("guestList");
    document.getElementById("saveGuestsButton").onclick = saveGuestList;

    setTimeout(function(){
        transition();
        addGuest();
    }, 3000);    
    
    
}

function addGuest() {
    const node = document.createElement("li");
    node.setAttribute("class", "li-margin");
    node.innerText ="Guest: ";
    const input = document.createElement("input");
    node.appendChild(input);
    guestListUi.appendChild(node);
}

function saveGuestList() {
    let guestArray = [];

    const nodes = guestListUi.querySelectorAll('li');
    console.log(`nodes: ${nodes.length}`);
    nodes.forEach(e => {
        const inputElement = e.querySelectorAll('input');
        console.log(`element val ${inputElement[0].value}`);
        guestArray.push(inputElement[0].value);
    });

    addGuestToDatabase(guestArray);
}

function addGuestToDatabase(guestArray) {
    var initDetails = {
        method: 'post',
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({
            "name": guestArray
        })
    }
    fetch(addGuestsUri, initDetails)
        .then(response => {
            if (response.status !== 200) {
                console.log('Error - Status Code: ' +
                    response.status);
                response.text().then(text =>
                    output.innerHTML += text
                );
                return;
            }
        })
        .catch(err => {
            console.log('Fetch Error: ' + err);
        });
}

function transition() {
    let matrixCanvas = document.getElementById("Matrix");
    matrixCanvas.parentNode.removeChild(canvas) 
}