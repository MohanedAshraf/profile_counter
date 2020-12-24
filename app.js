const express = require('express')
const moment = require('moment')
const app = express()

const PLACES = 3;


function getCountImage(count) {
  
  const countArray = count.toString().padStart(PLACES, '0').split('');
  

  const parts = countArray.reduce((acc, next, index) =>  `
        ${acc}
        <rect id="Rectangle" fill="#f0f6fc" x="${index * 32}" y="0.5" width="29" height="29" rx="15" ></rect>
        <text id="0" font-family="sans-serif" font-size="24" font-weight="bold" fill="#0d1117">
            <tspan x="${index * 32 + 7}" y="24">${next}</tspan>
        </text>
    `, '');

  
    return `
    <svg width="${PLACES * 32}px" height="30px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <title>Count</title>
        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        ${parts}
        </g>
        </svg>
        `
}


app.get('/', (req, res) => {
    
const counter = moment("2021-12-01").diff(moment(), "days")
    res.set({
    'content-type': 'image/svg+xml',
    'cache-control': 'max-age=0, no-cache, no-store, must-revalidate'
    })
    
    res.send(getCountImage(counter));
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})