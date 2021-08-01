var http = require('http');
var fs = require('fs');
const {matchValueToHeader, sortByParam, cleanDataNBs} = require('./helpers');

const PORT = process.env.PORT || 3000;

http.createServer(function (request, response) {
    var data = fs.readFileSync("data.csv", "utf8");

    const normalizedData = normalizeData(data)
    const sortedData = sortByParam(normalizedData, 'Road deaths per Million Inhabitants', 'desc')

    generateNormalizedCSV(sortedData)

    response.write("Normalized CSV data file of Road Safety Facts and Figures in the EU generated at ./output.csv"); 
    response.end(); //end the response


}).listen(PORT);
console.log(`Running app on port ${ PORT }`);


//used to generate the CSV from the normalized data
const generateNormalizedCSV = (normalizedData) =>{

    let data = Object.keys(normalizedData[0]).toString() //gets the headings

    normalizedData.map((row)=>{
       let rowValues = Object.values(row).toString()
       data =  data +"\n"+ rowValues
    })

    fs.writeFile('./output.csv', data, 'utf8', (err) =>{
        if (err) {
          console.log('writing error');
        } else{
          console.log('success');
        }
      });
}

// used to normalize the data and clean it up
const normalizeData = (data) =>{
    const formatedData = []
    
    data = data.split("\r\n"); 
    const headers = data[0].split(",")

    //replacer function for formating comma separated numbers in double quotes
    const replacer=(match, p1, p2, p3,  offset, string)=>{
         let val = p2.replace(/([,]*)/g,"")
        return val;
      }
   
    for (let i = 1; i < data.length-1; i++) { //exclude header and last row which represents the total
        let cleandata = cleanDataNBs(data[i]) // remove †a, †b, †c, †d, †e
        cleandata = cleandata.replace(/(["])([0-9]+(,[0-9]+)*)(["])/g, replacer); // clean format comma separated numbers in double quotes eg. "30,000" to 30000
        let splitArr = cleandata.split(",");
        const row = matchValueToHeader(headers, splitArr, [6,9,10])
        row['year'] = '2018'
        formatedData[i] = row;
    }

    return formatedData
}