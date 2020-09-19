const express=require('express')
const puppeteer=require('puppeteer')
const cors=require('cors')
//
require('dotenv').config({path:'./env/dev.env'})
const port=process.env.PORT 

const app=express()
app.use(express.json())
app.use(cors())

// THE Crawler//
let weatherCrawler= async (name)=>{
    const browser=await puppeteer.launch({ args: ['--no-sandbox'] })
    const page=await browser.newPage()
    await page.goto(`https://www.google.com/search?q=${name}+weather&rlz=1C1AWFC_enIL869IL869&oq=weater&aqs=chrome.1.69i57j0l2j46j0l4.3485j0j4&sourceid=chrome&ie=UTF-8`)

    // The data from Google Search
    
    const [location]=await page.$x('//*[@id="wob_loc"]') 
    const [temp]=await page.$x('//*[@id="wob_tm"]')
    const [humidity]=await page.$x('//*[@id="wob_hm"]')
    const [wind]=await page.$x('//*[@id="wob_ws"]')
    const [img]=await page.$x('//*[@id="wob_tci"]')
    
    if(![location] || ![temp] || ![humidity] || ![wind] || ![img]){
        return 'No Location Has Found'
    }
    //

    // The property 
    const location1=await location.getProperty('textContent')
    const temp1=await temp.getProperty('textContent')
    const humidity1=await humidity.getProperty('textContent')
    const wind1=await wind.getProperty('textContent')
    const img1=await img.getProperty('src')
    //

    //To Json 
    const locationTxt=await location1.jsonValue()
    const tempTxt=await temp1.jsonValue()
    const humidityTxt=await humidity1.jsonValue()
    const windTxt=await wind1.jsonValue()
    const imgSrc=await img1.jsonValue()
    //

    // Into Object
    const obj=await{
        locationTxt,
        tempTxt,
        humidityTxt,
        windTxt,
        imgSrc
    }
    console.log(obj)
    browser.close()
    return await obj
}
/////////////////////////////////

var arr=[weatherCrawler('london'),weatherCrawler('haifa')]


app.get('/',async(req,res)=>{
  try{
    let data=[]
    for(var i=0;i<arr.length;i++){
      await data.push(await arr[i])
    }
    await res.send(data)
  }
  catch{
      res.send(e)
  }
})

app.post('/name',async(req,res)=>{
    console.log(req.body.name)
    let name=req.body.name
    try{
        const locationNew=await weatherCrawler(name)
        await res.send(locationNew)
    }
    catch(e){
        await res.send(e)
    }
})

app.listen(port,()=>{
    console.log("Listen to " + port)
})
