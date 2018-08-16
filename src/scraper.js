const scrapeIt = require("scrape-it")
var fs = require('fs');

const links = ['https://itunes.apple.com/in/story/id1286988230','https://itunes.apple.com/in/story/id1278619470','https://itunes.apple.com/in/story/id1353737320','https://itunes.apple.com/in/story/id1296536229','https://itunes.apple.com/in/story/id1337185897','https://itunes.apple.com/in/story/id1301964484','https://itunes.apple.com/in/story/id1314402775','https://itunes.apple.com/in/story/id1299409355'];

console.log("Something is happening!")

var obj = {
    appList: []
 };

function getTitles() {
    const titles = links.map(function(links) {
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
          console.log(`Status Code: ${response.statusCode}`)
          console.log(data)
          obj.appList.push(data);
          var json = JSON.stringify(obj);
          fs.writeFile('scraped.json', json, 'utf8');
      });
    })
  }

getTitles();

