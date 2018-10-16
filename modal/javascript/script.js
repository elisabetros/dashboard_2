"use strict";

let Urlpassed = new URLSearchParams(window.location.search);
let beerIndexPassed = Urlpassed.get("index");
console.log(Number(beerIndexPassed));

let currentBeer;
let hops = document.querySelector(".hops");
let malt = document.querySelector(".malts");
let ester = document.querySelector(".ester");
let glass = document.querySelector(".glass");
let timeline = document.querySelector(".timeline");
let mouthfeel = document.querySelector(".mouthfeel");
let mainBeerDiv = document.querySelector(".mainBeerDiv");
let beerTypesdiv = document.querySelector(".allBeers");
let beerImg = document.querySelector(".img");
let beerDescription = document.querySelector(".beerText");
let similarDiv = document.querySelector(".similar");
let similarTitle = document.querySelector(".similarTitle");
let beerTitle = document.querySelector(".beerTitle");
let beerAlc = document.querySelector(".beerAlc");
let similarBeer = [];
let data = JSON.parse(FooBar.getData());
let beerData;

fetch("javascript/beerinfo.json")
  .then(e => e.json())
  .then(function(json) {
    beerData = json;
    let beerTypes = Array.from(data.beertypes);
    currentBeer = beerTypes[beerIndexPassed];
    showBeers(currentBeer);

    //createing div with all beers
    for (let i = 0; i < beerTypes.length; i++) {
      beerTypes[i].id = Math.floor(
        Math.random() * (9999999 - 1000000) + 1000000
      );
      let eachBeer = document.createElement("div");
      eachBeer.id = "" + beerTypes[i].id;
      let img = document.createElement("img");
      img.setAttribute("src", "imgs/beerLogos/" + beerTypes[i].label);
      img.classList.add("imgB");
      eachBeer.appendChild(img);
      beerTypesdiv.appendChild(eachBeer);

      eachBeer.addEventListener("click", () => {
        showDetails(beerTypes[i].id);
      });
    }

    function showBeers(currentBeer) {
      if (currentBeer) {
        for (let i = 0; i < beerData.length; i++) {
          if (currentBeer.name === beerData[i].name) {
            console.log('showBeers: currentBeer: ', currentBeer);
            beerImg.setAttribute("src", `imgs/beerLogos/${currentBeer.label}`);
            beerTitle.textContent = currentBeer.name;
            beerDescription.textContent =
              currentBeer.description.overallImpression;
            beerAlc.textContent = currentBeer.alc + "%";

            //find similar via category
            let cate = currentBeer.category;
            console.log(beerData);
            similarBeer = beerData.filter(a => a.category === cate);
            let count = similarBeer.length;
            console.log('showBeers: similarBeer: ', similarBeer);
            if (count > 1) {
              // if length ===1, it means only one of this category, no similar
              similarDiv.innerHTML = " ";
              similarTitle.innerHTML = "Similar beers";
              beerTypes.forEach(displaySimilar);

              function displaySimilar(b, i) {
                if (b.category === cate && currentBeer.name !== b.name) {
                  console.log('showBeers: b: ', b);
                  let similarBeer = document.createElement("div");
                  let similarImg = document.createElement("img");
                  similarImg.classList.add("imgB");
                  similarImg.setAttribute(
                    "src",
                    "imgs/beerLogos/" + beerTypes[i].label
                  );
                  similarBeer.appendChild(similarImg);
                  similarDiv.appendChild(similarBeer);
                  // similarImg.addEventListener("click", () => {
                  //   showDetails(similarBeer.id);
                  //   showBeers(currentBeer);
                  // });
                }
              }
            }

            buildBeer(beerData[i]);
            buildBars(hops, beerData[i].hoplevel);
            buildBars(malt, beerData[i].maltlevel);
            buildBars(ester, beerData[i].esterlevel);
            buildBars(mouthfeel, beerData[i].mouthfeel);
            buildTimeline(beerData[i]);
          }
          // if (currentBeer.name !== beerData[i].name) {
          //   console.log("defaultbeer");
          //   // buildDefaultBeer();
          // }
        }
      }
    }

    //function to eventlistener, shows details about beer
    function showDetails(id) {
      console.log("showDetails: called:", id);

      similarDiv.innerHTML = " ";
      id = Number(id);

      for (let i = 0; i < beerTypes.length; i++) {
        if (beerTypes[i].id === id) {
          currentBeer = beerTypes[i];
        }
      }
      beerTitle.textContent = currentBeer.name;
      beerAlc.textContent = currentBeer.alc + " " + "%";
      beerDescription.textContent = currentBeer.description.overallImpression;
      beerImg.setAttribute("src", "imgs/beerLogos/" + currentBeer.label);

      console.log("showDetails: currentBeer:", currentBeer);
      similarTitle.innerHTML = "";
      for (let i = 0; i < beerTypes.length; i++) {
        //shows similar beers
        if (
          currentBeer.category === beerTypes[i].category &&
          currentBeer.id !== beerTypes[i].id
        ) {
          console.log("showDetails: beer has a similar one, beerTypes[i].category: ", beerTypes[i].category);
          similarTitle.innerHTML = "Similar beers";
          let similarBeer = document.createElement("div");
          let similarImg = document.createElement("img");
          similarBeer.id = "" + beerTypes[i].id;
          similarImg.classList.add("imgB");
          similarImg.setAttribute(
            "src",
            "imgs/beerLogos/" + beerTypes[i].label
          );
          similarBeer.appendChild(similarImg);
          similarDiv.appendChild(similarBeer);
          similarImg.addEventListener("click", () => {
            showDetails(similarBeer.id);
            showBeers(currentBeer);
          });
        }
      }
      showBeers(currentBeer);
    }

    function buildBeer(b) {
      document.querySelector(".glass").style.backgroundImage =
        'url("img/' + b.glassImage + '")';
      document.querySelector(".foam").style.backgroundImage =
        'url("img/' + b.headImage + '")';
      document.querySelector(".color").style.backgroundColor = b.appearancetwo;
      if (b.specialTreatment) {
        document.querySelector(".foam").style.width = "110px";
        document.querySelector(".foam").style.left = "46px";
      } else {
        document.querySelector(".foam").style.left = "12px";
        document.querySelector(".foam").style.width = "177px";
      }
      if (b.carbonation[0] >= 1) {
        document.querySelectorAll(".carbonation").forEach(a => a.remove());
        for (let i = 0; i < b.carbonation[0]; i++) {
          makeCarbonation(i);
        }
      }
    }

    function makeCarbonation(i) {
      let carbonationImg = document.createElement("img");
      carbonationImg.setAttribute("src", "img/carbonation.png");
      carbonationImg.classList.add("carbonation");
      carbonationImg.style.top = 150 + i * 20 + "px";

      mainBeerDiv.appendChild(carbonationImg);
    }

    function buildBars(bar, level) {
      bar.classList.remove("hidden");
      bar.previousElementSibling.classList.remove("hidden");
      for (let i = 0; i < bar.children.length; i++) {
        bar.children[i].style.backgroundColor = "inherit";
      }
      if (level) {
        if (level.length > 1) {
          bar.children[level[0] - 1].style.backgroundColor = "black";
          bar.children[level[1] - 1].style.backgroundColor = "black";
          for (let i = level[0]; i < level[1]; i++) {
            bar.children[[i] - 1].style.backgroundColor = "black";
          }
        } else {
          bar.children[level].style.backgroundColor = "black";
        }
      } else {
        bar.previousElementSibling.classList.add("hidden");
        bar.classList.add("hidden");
      }
    }

    function buildTimeline(b) {
      timeline.classList.remove("hidden");
      timeline.previousElementSibling.classList.remove("hidden");
      if (b.timeline) {
        timeline.children[0].textContent = b.timeline[0];
        timeline.children[4].textContent = b.timeline[1];
      } else {
        timeline.classList.add("hidden");
        timeline.previousElementSibling.classList.add("hidden");
      }
    }
  });

// function buildDefaultBeer() {
//   beerImg.setAttribute("src", `/materials/default-label.png`);
//   document.querySelector(".glass").style.backgroundImage =
//     'url("img/cali-stout.png")';
//   document.querySelector(".foam").style.backgroundImage =
//     'url("/img/large-brown.png")';
//   document.querySelector(".color").style.backgroundColor = "#dc8300";
//   console.warn("contact developer!");
// }
