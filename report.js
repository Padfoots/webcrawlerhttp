const fs = require("fs")
function sortPages(pages){
    const pagesArr = Object.entries(pages)
    pagesArr.sort((a,b) => {
        aHits = a[1]
        bHits = b[1]
        return b[1] - a[1]
    })
    return pagesArr
}

function printReport(pages){
    console.log("============================REPORT==============================")
    const sortedPages = sortPages(pages)
    for(const sortedPage of sortedPages){
        const url = sortedPage[0]
        const hits = sortedPage[1]
        console.log(`Found ${hits} links to page: ${url}`)

    }
    console.log("================================================================")
}

module.exports = {
    sortPages,
    printReport,
    write2Json
}

function write2Json(pages){
    const json = JSON.stringify(pages,null,2)
    const file_path = "report.json"
    fs.writeFile(file_path,json, (err)=>{
        if (err) {
            console.error("Error writing to the file:", err);
          } else {
            console.log(`Data written to ${file_path} successfully.`);
          }
    })
}