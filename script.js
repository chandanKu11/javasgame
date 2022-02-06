//alert("this is me");
let x = true;
let y = true;
let boll = document.querySelector(".boll");
let bord = document.querySelector(".bord");
let paddleleft = document.querySelector(".left");
let paddleright = document.querySelector(".right");
let bordBound = bord.getBoundingClientRect();
let leftPlayerLive = 3;
let rightPlayerLive = 3;
//user input to contporal paddle movement
document.addEventListener("keydown", function (e) {
    console.log("key is press");
    console.log(e);
    if (e.key == "w") {
        movePaddle(paddleleft, -window.innerHeight * 0.1);
    } else if (e.key == "s") {
        movePaddle(paddleleft, window.innerHeight * 0.1);
    } else if (e.key == "o") {
        movePaddle(paddleright, -window.innerHeight * 0.1);
    } else if (e.key == "l") {
        movePaddle(paddleright, window.innerHeight * 0.1);
    }

});
//for moving paddle function
function movePaddle(cPaddle, change) {
    let cPaddleBound = cPaddle.getBoundingClientRect();
    if (cPaddleBound.top + change >= bordBound.top && cPaddleBound.bottom + change <= bordBound.bottom) {
        cPaddle.style.top = cPaddleBound.top + change + "px";
    }
}
// boll moving function
function moveBoll() {
    let bollCord = boll.getBoundingClientRect()
    let bollTop = bollCord.top;
    let bollLeft = bollCord.left;
    let bollBottam = bollCord.bottom;
    let bollRight = bollCord.right;
    //condition for life
    let hasTouchLeft = bollLeft < bordBound.left;
    let hasTouchRight = bollRight > bordBound.right;
    if (hasTouchLeft || hasTouchRight) {
        if (hasTouchLeft) {
            leftPlayerLive--;
            if (leftPlayerLive == 0) {
                alert("player one win");
            } else {
                return resetGame();
            }
        } else {
            rightPlayerLive--;
            if (rightPlayerLive == 0) {
                alert("player two win");
            } else {
                return resetGame();
            }
        }
    }
    //to reset game function
    function resetGame() {
        boll.style.top = window.innerHeight * 0.45+"px";
        boll.style.left = window.innerWidth * 0.45+"px";
        requestAnimationFrame(moveBoll);
    }
//boll moving in x and y direction
    if (bollTop <= bordBound.top || bollBottam >= bordBound.bottom) {

        y = !y;
    }
    if (bollLeft <= bordBound.left || bollRight >= bordBound.right) {

        x = !x;
    }
    //boll and paddle collision codition
    let leftPaddleBound = paddleleft.getBoundingClientRect();
    let rightPaddleBound = paddleright.getBoundingClientRect();
    if (bollLeft <= leftPaddleBound.right && bollRight >= leftPaddleBound.left && bollTop + 28 >= leftPaddleBound.top && bollBottam - 28 <= leftPaddleBound.bottom) {
        x = !x;
    }
    if (bollLeft <= rightPaddleBound.right && bollRight >= rightPaddleBound.left && bollTop + 28 >= rightPaddleBound.top && bollBottam - 28 <= rightPaddleBound.bottom) {
        x = !x;
    }
    boll.style.top = y == true ? bollTop + 4 + "px" : bollTop - 4 + "px";
    boll.style.left = x == true ? bollLeft + 4 + "px" : bollLeft - 4 + "px";

    requestAnimationFrame(moveBoll);
}
requestAnimationFrame(moveBoll);