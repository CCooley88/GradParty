const canvas = document.getElementById('Matrix');
const context = canvas.getContext('2d');
// ctx.moveTo(0, 0);

// holds the height of the chars of each column
const rainDrops = [];
const lastLetter = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.background = "#000";

const alphabet = '01';
const fontSize = 16;
const columns = canvas.width/fontSize;

for( let x = 0; x < columns; x++ ) {
    // initiate the first pass at 1, all lines print down at the same time
    rainDrops[x] = 1;
}

// For resiging the canvas based on thenew window size, the arrays do not adjust automatically at this point and only half draw
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    for( let x = 0; x < columns; x++ ) {
        // initiate the first pass at 1, all lines print down at the same time
        rainDrops[x] = 1;
    }
  })

const draw = () => {
    context.fillStyle = 'rgba(0, 0, 0, 0.05)';
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = '#0F0';
    context.font = fontSize + 'px monospace';

    // this draws to the canvas horizontally
    for(let i = 0; i < rainDrops.length; i++)
    {
        let text = "";

        // let lastUsedLetter = lastLetter[i];
        switch (lastLetter[i]) {
            case 0: 
                text = "P";
                break;
            case 1: 
                text = "a";
                break;
            case 2: 
                text = "r";
                break;
            case 3: 
                text = "t";
                break;
            case 4: 
                text = "y";
                break;
            default: 
                text = alphabet.charAt(Math.floor(Math.random() * alphabet.length))
         }

        // write the text, to the appropriate horizontal (x) location, to the correct vertical location
        context.fillText(text, i*fontSize, rainDrops[i]*fontSize);

        if(lastLetter[i] >= 4){
            lastLetter[i] = 0;
        }
        else {
            lastLetter[i]++;
        }
        
        // if the colums length is greater than the max canvas height and 
        // a randomly selected value is achieved then restart writing the column
        if(rainDrops[i]*fontSize > canvas.height && Math.random() > .975){
            rainDrops[i] = 0;
            lastLetter[i] = 1;
        }
        rainDrops[i]++;
    }
};

setInterval(draw, 80);

