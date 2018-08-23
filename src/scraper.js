const scrapeIt = require("scrape-it")
var fs = require('fs');

var GoogleSpreadsheet = require('google-spreadsheet');
var async = require('async');
 
var doc = new GoogleSpreadsheet('1aD1Hvg3kvDm4lApbTJIelEgBbIxJIfM-U4jabniJCjw');
var sheet;

const linksFromSheet = [];

var obj = {
  appList: []
};

async.series([
  function setAuth(step) {

    var creds = require('./creds.json');
 
    doc.useServiceAccountAuth(creds, step);
  },
  function getInfoAndWorksheets(step) {
    doc.getInfo(function(err, info) {
      console.log('Loaded doc: '+info.title+' by '+info.author.email);
      sheet = info.worksheets[0];
      console.log('sheet 1: '+sheet.title+' '+sheet.rowCount+'x'+sheet.colCount);
      step();
    });
  },
  function workingWithCells(step) {
    sheet.getCells({
      'min-row': 1,
      'max-row': 300,
      'return-empty': false
    }, function(err, cells) {
      cells.map((val) => console.log(val.value));
      cells.map((val) => linksFromSheet.push(val.value));
      step();
    });
  },
  function getTitles() {
    const titles = linksFromSheet.map(function(links) {
        scrapeIt(links, {
        title: ".story-header__headline",
        subtitle: ".story-header__subhead",
        heroimage: {
          selector: ".story__thumbnail img",
          attr: "src"
        }
      , apps: {
          listItem: ".we-product-collection__item",
          data: {
            title: ".we-product-collection__item__product-name",
            category: ".we-product-collection__item__category a",
            avatar: {
              selector: ".we-artwork__image",
              attr: "src"
            },
            link: {
              selector: ".we-product-collection__item__button",
              attr: "href"
            },
            picture: {
              selector: ".we-artwork--ios-app-icon source",
              attr: "srcset"
            }
          }
      }
      }).then(({ data, response }) => {
          // console.log(`Status Code: ${response.statusCode}`)
          // console.log(data)
          var storyLinks = links;
          data = { ...data,storyLinks};
          obj.appList.push(data);
          var json = JSON.stringify(obj);
          fs.writeFile('scraped.json', json, 'utf8');
      });
    })
  }
], function(err){
    if( err ) {
      console.log('Error: '+err);
    }
});

const links = ['https://itunes.apple.com/in/story/id1314351295','https://itunes.apple.com/in/story/id1286988230','https://itunes.apple.com/in/story/id1278619470','https://itunes.apple.com/in/story/id1353737320','https://itunes.apple.com/in/story/id1296536229','https://itunes.apple.com/in/story/id1337185897','https://itunes.apple.com/in/story/id1301964484','https://itunes.apple.com/in/story/id1314402775','https://itunes.apple.com/in/story/id1299409355'];

console.log("Something is happening!")
