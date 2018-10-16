"use strict";

const average = document.querySelector(".average-order p:nth-of-type(2)");
const bars = document.querySelector(".bars");

function popularBeer(totalCustomerCount, totalOrder) {
  let totalBeerCount = totalOrder.length;
  // calculate average order size
  let averageOrdersize = totalBeerCount / totalCustomerCount;
  let averageOrdersizeCLeared = Math.floor(averageOrdersize * 10) / 10;
  average.innerHTML = `<span class="bold">${averageOrdersizeCLeared}</span> glass/customer`;
  // sort popularity of beers
  let eachBeerCountArray = [];
  beersOntap.forEach(groupByBeerTap);
  function groupByBeerTap(bT, bTi) {
    eachBeerCountArray = eachBeerCountArray.filter(a => a.name !== bT); // don't log duplicate tap
    eachBeerCountArray.push({
      name: bT,
      count: 0,
      percent: 0
    });
  }
  totalOrder.forEach(fillIn);
  function fillIn(eachOrder) {
    for (let i = 0; i < eachBeerCountArray.length; i++) {
      let beerN = eachBeerCountArray[i].name;
      let currentCount = eachBeerCountArray[i].count;
      if (eachOrder === beerN) {
        eachBeerCountArray[i].count = currentCount + 1;
        eachBeerCountArray[i].percent =
          eachBeerCountArray[i].count / totalBeerCount;
      }
    }
  }
  let sorted = eachBeerCountArray.sort(function compare(a, b) {
    return b.percent - a.percent;
  });
  bars.innerHTML = "";
  sorted.forEach(drawBar);
  function drawBar(s) {
    if (s.percent !== 0) {
      let n = document.createElement("p");
      n.className = "barLegend";
      n.textContent = s.name;
      let bar = document.createElement("div");
      bar.className = "bar";
      bar.style.width = `${s.percent * 100}%`;
      bars.appendChild(n);
      bars.appendChild(bar);
    }
  }
}
