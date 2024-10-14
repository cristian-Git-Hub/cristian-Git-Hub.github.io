   // gobals, gather all of the DOM elements we will be working with.
const title = document.querySelector(".title");
const pictures = document.querySelectorAll(".pictures");
const stop = document.getElementById("stop");
const start = document.getElementById("start");
const statusbar = document.querySelector(".status");
var count = 0;
let interval = 6000;
let intervalId // important: used to trac the correct setInterval method. 

// create an h2 element for the titile
h2 = document.createElement("h2");
h2.innerText = "Next Chapter Fall/Winter '24 - Project";
title.appendChild(h2); // append title info



// FUNCTIONS

// start function. 
function startIntervalTime(curTime) {
  console.log(curTime)
  statusbar.innerText = "Changing pictures every " + curTime / 1000 + " seconds";
  return setInterval(myCycle, curTime) 
}

// stop funciton
function stopIntervalTime(curId) {
  statusbar.innerText = "Picture interval Paused";
  clearInterval(curId)
}

// reset function
function resetIntervalTime(curId,curTime) {
  console.log(curTime)
  stopIntervalTime(curId);
  statusbar.innerText = "Changing pictures every " + curTime / 1000 + " seconds";
  return setInterval(myCycle, curTime)
}

// main function
function myCycle() {
  // use the DOM objects to display the information.
  let initMax = 33;
  pictures.forEach(function(pic, index) {
    let eleWidth = pic.offsetWidth;
    let eleHeight = pic.offsetHeight;
    console.log("offsetWidth: " + eleWidth)
    console.log("offsetHeight: " + eleHeight)
    // create random number
    var rand = Math.floor(Math.random() * (initMax - (initMax - 32)) + (initMax - 32));
    //create url - width & height
    let imgURL = 'https://picsum.photos/'+eleWidth+'/'+eleHeight+'?random='+rand;
    pic.style.backgroundImage = "url(" + imgURL + ")";
    initMax += 33;
  });
}

// LISTENERS

// on page load listener
window.addEventListener("load",
  e => {
    myCycle(); // load page with pictures 
    intervalId = startIntervalTime(interval);
    console.log("on load intervalId: " + intervalId)
  },
);

// stop button listener.
stop.addEventListener("click", 
  e => {
    stopIntervalTime(intervalId)
  });

// start button listener
start.addEventListener("click", e => {
  intervalId = startIntervalTime(interval);
});

// select box listener.
document.getElementById("select-box").addEventListener("change", function() {
  let seconds = this.value // selection value from the select box.
  interval = seconds * 1000;
  intervalId = resetIntervalTime(intervalId, interval)
});
