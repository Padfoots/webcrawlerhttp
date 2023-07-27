const {crawlPage} = require('./crawl.js')
function main(){
    if(process.argv.length != 3 ){
        console.log("arguments less than or bigger than 3!")
        process.exit(1)
    }


    console.log("starting crawling...")
    crawlPage(process.argv[2])

}
main()