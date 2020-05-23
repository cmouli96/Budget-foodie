const puppeteer = require('puppeteer');

let browser = null;
let page = null;

/* Constants */
const BASE_URL = 'https://zomato.com/';

const zomato = {

    initialize: async () => {
        console.log('Starting the scraper..');

        browser = await puppeteer.launch({
            headless: false
        })
        
        page = await browser.newPage();
        page.on('console', message => {
            console.log(`Message from puppeteer: ${message.text()}`);
        })


        await page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 0 });

        console.log('Initialization completed..');
    },

    getProductDetails: async (link) => {

        console.log(`Going to the Product Page.. ( ${link} )`);

        await page.goto(link, { waitUntil: 'networkidle2' ,timeout:0 });
        // let webcontent=await page.content();
        // return webcontent;

        let details = await page.evaluate(() => {
            
            // let title = document.querySelector('#productTitle').innerText;
            // let manufacturer = document.querySelector('#bylineInfo').innerText;
            // let currentPrice = document.querySelector('#priceblock_ourprice,#priceblock_dealprice').innerText;
            // let rating = document.querySelector('#acrPopover').getAttribute('title');
            // let totalRatings = document.querySelector('#acrCustomerReviewText').innerText;
            
           // let restname=document.getElementsByClassName('sc-7kepeu-0 sc-cCbXAZ jVrsaq').innerText;

        //    let din=document.getElementsByClassName("sc-1s0saks-7 fIgnDe");
        //    let dins=[];
        //    let  n1=din.length;
        //    for(var i=0;i<n1;i++)
        //    {
        //        dins.push(din[i].innerText);
        //    }
        //    //return dins[0].innerText.innerText;
        //    return{
        //        dins
        //    }




            let restname=document.querySelector('h1').innerText;
            //let restnames=[];
            // let tag1=document.getElementsByClassName("sc-hdPSEv gYwhMC");
            // let tag=tag1[0].innerText;
            let tags=document.getElementsByClassName("sc-gleUXh bWIcur");
            let tag1=tags[0].innerText;
            let tag2=tag1.split("\n");
            let tag=tag2[0];
            let address=tag2[1];
            let r=document.getElementsByClassName("sc-elNKlv jlVypF");
            let r1=r[0].innerText;
            let r2=r1.split("\n");
            let rating=r2[0];
            let peopleRated=r2[2];

            let rates=[];
            let rate=document.getElementsByClassName('sc-17hyc2s-1 fnhnBd');
            let dishname=document.getElementsByClassName("sc-1s0saks-11 cDXzZl");
            let dishes=[];
            let n=dishname.length;
            let items=[];
            for(var i=0;i<n;i++)
            {
               let item={};
               item["itemName"]=dishname[i].innerText;
               item["description"]="---";
               item["ztoPrice"]=rate[i].innerText;
               items.push(item);
              //  dishes.push(dishname[i].innerText);
            }

            //   //  sc-RmnOB jZgfXT

            //let n=rate.length;
            for(var i=0;i<n;i++)
            {
                rates.push(rate[i].innerHTML);
            }
            return{
                restname,
                tag,
                address,
                rating,
                peopleRated,
                items
            }

            //<span class="sc-17hyc2s-1 fnhnBd">₹99</span>

            // <h1 class="sc-7kepeu-0 sc-cCbXAZ jVrsaq">Sri Anjaneya Restaurant</h1>
            // sc-7kepeu-0 sc-cCbXAZ jVrsaq
            //  console.log(restnames);
            //  //console.log('another test message');
           

            // return {
            //     // title,
            //     // manufacturer,
            //     // currentPrice,
            //     // rating,
            //     // totalRatings,
            //     restnames
            // }

        });

        return details;
    },

    end: async () => {
        console.log('Stopping the scraper..');
        
        await browser.close();
    }

}

module.exports = zomato;