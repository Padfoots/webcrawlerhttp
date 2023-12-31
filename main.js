const {crawlPage} = require('./crawl.js')
const {printReport,write2Json} = require('./report.js')

async function main(){
    if(process.argv.length != 3 ){
        console.log("arguments less than or bigger than 3!")
        process.exit(1)
    }


    console.log("starting crawling...")
    const base_url = process.argv[2]
    const pages = await crawlPage(base_url,base_url,{})
    printReport(pages)
    write2Json(pages)
}
main()