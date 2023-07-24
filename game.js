
//variables 
let btnref = document.querySelectorAll(".btn");
let firstmsgref = document.querySelector(".firstmsg");
let newgameref = document.getElementById("newgame");
let restartref = document.querySelector(".Restart");
let msgref = document.querySelector(".demo");

//winning pattern
let winningPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

//for player X 
let xturn = true;
let count = 0;//for counting total number of clicking upto 9 

//disable all buttons when player wins
const disableButtons = () => {
    btnref.forEach((element) => (element.disabled = true));
    firstmsgref.classList.remove("hide");
};

//enable all buttons when new game starts or restart button pressed
const enableButtons = () => {
    btnref.forEach((element) => {
        element.innerText = "";
        element.disabled = false;
    });
    //adding hide class 
    firstmsgref.classList.add("hide");
};
//function to be executed when player wins
const winFunction = (letter) => {
    disableButtons();
    if (letter == "X") {
        msgref.innerHTML = "🎉 'X' winner";
    }
    else {
        msgref.innerHTML = "🎉 'O' winner";
    }
};

//draw function
const drawFunction = () => {
    disableButtons();
    msgref.innerHTML = "😑 Match is draw"
};


//for new game 
newgameref.addEventListener("click", () => {
    count = 0;
    enableButtons();
});

//for restart the game 
restartref.addEventListener("click", () => {
    count = 0;
    enableButtons();
});

//Win logic
const winCheck = () => {
    for (let i of winningPattern) {
        let [element1, element2, element3] = [
            btnref[i[0]].innerText,
            btnref[i[1]].innerText,
            btnref[i[2]].innerText,
        ];
        //checking the three input value should be same but not empty  
        if (element1 != "" && (element2 != "") & (element3 != "")) {
            //three input values should be same for winning
            if (element1 == element2 && element2 == element3) {
                winFunction(element1);//function when player wins
            }
        }
    }
};
//On click blank PART this will show O AND X
btnref.forEach((element) => {
    element.addEventListener("click", () => {
        if (xturn) {
            // Shows X on the board 
            xturn = false;
            element.innerText = "X";
            element.disabled = true;
        }
        else {
            // Shows O on the board 
            xturn = true;
            element.innerText = "O";
            element.disabled = true;
        }
        count += 1;
        if (count == 9) {
            drawFunction();
        }

        //Checking for winner on every click
        winCheck();
    });
});

Window.onload = enableButtons;
