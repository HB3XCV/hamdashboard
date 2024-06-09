var largeShow = 0;
var aIdx = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
var help = "Double click on an image to expand to full screen.\n";
help += "Double click again to close full screen view.\n";
help += "Right click on an image to display the next one.\n";
help += "The content refreshes automatically every 5 minutes.\n";
help += "Images rotates every 30 seconds.\n";

// This function shows the embedded websites
function MenuOpt(num) {
  // Stop refreshes
  window.stop();
  clearTimeout(getSlideId);
  //
  document.getElementById("FullScreen").style.display = "block";
  document.getElementById("iFrameContainer").style.zIndex = 1;
  document.getElementById("FullScreen").src = aURL[num][2];
  document.getElementById("FullScreen").style.transform =
    "scale(" + aURL[num][3] + ")";

  if (aURL[num][1].toLowerCase() == "back") {
    // Start refreshes
    window.location.reload(true);
    getSlideId = setInterval(() => slide(), 5000);
    //
    wheelzoom(document.querySelectorAll("img"));
  } else if (aURL[num][1].toLowerCase() == "refresh") {
    // Start refreshes
    window.location.reload(true);
    getSlideId = setInterval(() => slide(), 5000);
    //
  } else if (aURL[num][1].toLowerCase() == "help") {
    alert(help);
  }
}

// This function shows the larger images when double click to enlarge
function larger(event) {
  var targetElement = event.target || event.srcElement;
  if (largeShow == 1) {
    // Start refreshes
    window.location.reload(true);
    getSlideId = setInterval(() => slide(), 5000);
    //
    largeShow = 0;
    document.getElementById("imgZoom").style.display = "none";
    document.getElementById("imgZoom").style.zIndex = -2;
  } else {
    // Stop refreshes
    window.stop();
    clearTimeout(getSlideId);
    //
    largeShow = 1;
    document.getElementById("imgZoom").style.display = "block";
    document.getElementById("imgZoom").style.zIndex = 3;
    document.getElementById("ImageLarge").src =
      targetElement.style.backgroundImage
        .replace(/^url\(["']?/, "")
        .replace(/["']?\)$/, "");
  }
}

// Check if the image URL already include parameters, then avoid the random timestamp
function imgURL(url) {
  if (url.includes("?")) {
    return url;
  }
  return url + "?_=" + Date.now();
}

// Manually rotate images
function rotate(event) {
  event.preventDefault();
  var targetElement = event.target || event.srcElement;
  i = +targetElement.id.match(/\d+/)[0];
  if (aIMG[i].length > 2) {
    ++aIdx[i];
    if (aIdx[i] > aIMG[i].length - 1) {
      aIdx[i] = 1;
    }
    document.getElementById(targetElement.id).src = imgURL(
      aIMG[i][aIdx[i]]
    );
  }
}

// Automatically rotate images
function slide() {
  // get the locations with multiple images
  aIMG.forEach(function (innerArray, i) {
    if (aIMG[i].length > 2) {
      ++aIdx[i];
      if (aIdx[i] > aIMG[i].length - 1) {
        aIdx[i] = 1;
      }
      // console.log("Image" + i, " ", aIMG[i][aIdx[i]]);
      img = document.getElementById("Image" + i);
      img.src = imgURL(aIMG[i][aIdx[i]]);
      // img.style.opacity = 0;
      // img.style.transform = "translateX(-100%)";
    }
  });
  // setTimeout(() => {
  //   aIMG.forEach(function (innerArray, i) {
  //     if (aIMG[i].length > 2) {
  //       console.log("Image" + i);
  //       img = document.getElementById("Image" + i);
  //       // img.style.opacity = 1;
  //       // img.style.transform = "translateX(0)";
  //       img.src = imgURL(aIMG[i][aIdx[i]]);
  //     }
  //   });
  // }, 1000);
}

function start() {
  // Get the parent div for Menu container
  var parentDiv = document.getElementById("myMenu");
  var parentDivR = document.getElementById("myMenuR");
  // Append the new div to the parent div
  aURL.forEach(function (innerArray, index) {
    // Create a new div element
    var newDiv = document.createElement("div");
    newDiv.innerHTML = `<a href="#" style="background-color:#${innerArray[0]};" onclick="MenuOpt(${index})">${innerArray[1]}</a>`;
    if (innerArray[4] == "R") {
      // Set some properties for the new div
      newDiv.id = "mySidenavR";
      newDiv.className = "sidenavR";
      parentDivR.appendChild(newDiv);
    } else {
      // Set some properties for the new div
      newDiv.id = "mySidenav";
      newDiv.className = "sidenav";
      parentDiv.appendChild(newDiv);
    }
  });

  // Get the parent div for Dashboard container
  var parentDiv = document.getElementById("dash");
  // Append the new div to the parent div
  aIMG.forEach(function (innerArray, index) {
    // Create a new div element
    var newDiv = document.createElement("div");
    // Set some properties for the new div
    newDiv.className = "image-container";
    // Create a new img element
    var newImg = document.createElement("img");
    newImg.id = `Image${index}`;
    newImg.src = imgURL(innerArray[1]);
    newImg.oncontextmenu = rotate;
    newImg.ondblclick = larger;
    parentDiv.appendChild(newDiv);
    newImg.onerror = function () {
      text = "Failed to load image";
      console.log(text, this.src);
      if (this.src.includes("?")){
        // Retry without passing variables first to see if fixes the error
        console.log("Trying without caching prevention");
        newImg.src = this.src.split("?")[0];
      } else {
        el = `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="330">
              <g>
                <text style="font-size:34px; line-height:1.25; white-space:pre; fill:#ffaa00; fill-opacity:1; stroke:#ffaa00; stroke-opacity:1;">
                  <tspan x="100" y="150">${text}</tspan>
                    </text>
              </g>
            </svg>`;
        newImg.src = "data:image/svg+xml;base64," + window.btoa(el);
      }
    };
    newDiv.appendChild(newImg);
    // Create a new div element for img title
    var newTtl = document.createElement("div");
    newTtl.className = "image-title";
    newTtl.innerHTML = innerArray[0];
    newDiv.appendChild(newTtl);
  });

  // assign wheelzoom functionality to all 12 images
  wheelzoom(document.querySelectorAll("img"));

  window.addEventListener("resize", function () {
    "use strict";
    window.location.reload();
  });

  getSlideId = setInterval(() => slide(), 30000);
}

// This function update the time on the top bar
function updateTopBar() {
  const now = new Date();
  const localDate = now.toLocaleDateString("de-CH", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  const localTime = now.toLocaleTimeString("de-CH", {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  });

  const utcDate = now.toISOString().slice(0, 10);
  const utcTime = now.toISOString().slice(11, 19) + " UTC";

  const topBarLeft = document.getElementById("topBarLeft");
  topBarLeft.textContent = `${localDate} - ${localTime}`;
  const topBarCenter = document.getElementById("topBarCenter");
  topBarCenter.textContent = topBarCenterText;
  const topBarRight = document.getElementById("topBarRight");
  topBarRight.textContent = `${utcDate} ${utcTime}`;
}

// Update every second
setInterval(updateTopBar, 1000);
