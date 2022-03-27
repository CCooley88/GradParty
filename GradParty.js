window.onload = init;

let guestListUi;
let guests = [];
// const addGuestsUri = "http://localhost:8080/add-guest";
const addGuestsUri = "http://ec2-18-224-71-44.us-east-2.compute.amazonaws.com:8080/add-guest";


function init() {
    document.getElementById("addGuest").onclick = addGuest;
    guestListUi = document.getElementById("guestList");
    // let proxyUser = getProxyUserFromUrl();
}

function getProxyUserFromUrl() {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    console.log(`url vars: ${sURLVariables}`)
    let userParam = sURLVariables[0].split('=')[0];
        if(userParam == "proxy-user"){
        console.log(`url vars 1: ${sURLVariables[0].split('=')[1]}`);
        return sURLVariables[0].split('=')[1];
    }
    return null;
}

async function checkPassword() {
    const input = document.getElementById("entryInput").value;
    // const loginUri = "http://localhost:8080/auth/login"
    const loginUri = "http://ec2-18-224-71-44.us-east-2.compute.amazonaws.com:8080/auth/login"
    var initDetails = {
        method: 'post',
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({
            "email": "ckulig88@gmail.com",
            "password": input
        })
    }
    try {
        const response = await fetch(loginUri, initDetails)
        if (response.status !== 200) {
            throw new Error("Failed to login");
        }
        transition();
        addGuest();
        let data = response.json();
        return data;
    } catch (error) {
    }
};

function addGuest() {
    const node = document.createElement("li");
    node.setAttribute("class", "li-margin");
    node.innerText = "Guest: ";
    const input = document.createElement("input");
    node.appendChild(input);
    guestListUi.appendChild(node);
}

function saveGuestList() {
    let guestArray = [];
    const proxyUser = getProxyUserFromUrl();

    if(proxyUser != null){
        const nodes = guestListUi.querySelectorAll('li');
        console.log(`nodes: ${nodes.length}`);
        nodes.forEach(e => {
            const inputElement = e.querySelectorAll('input');
            console.log(`element val ${inputElement[0].value}`);
            guestArray.push({ "guestName": inputElement[0].value });
        });
    
        guestArray = {
            "proxyGuestName": proxyUser,
            "guests": guestArray
        }
        console.log(`Guest list: ${guestArray}`)
    
        addGuestToDatabase(guestArray);
    }
}

function addGuestToDatabase(guestArray) {
    var initDetails = {
        method: 'post',
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({
            "guestArray": guestArray
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
    matrixCanvas.parentNode.removeChild(canvas);
    document.getElementById("cardContainer").style.visibility = "visible";
    document.getElementById("cardTitle").style.visibility = "visible";
    document.getElementById("cardTitle").style.visibility = "visible";
    document.getElementById("entryDiv").style.visibility = "hidden";
    document.getElementById("entryInput").style.visibility = "hidden";
    document.getElementById("enterPassword").style.visibility = "hidden";
}