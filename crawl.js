async function crawlPage(current_url){
    
    console.log(`crawling: ${current_url}`)
    try{
        const resp = await fetch(current_url)
        console.log(`status code: ${resp.status}`)
        if (resp.status > 399){
            console.log(`error in fetch status code: ${resp.status} on page: ${current_url}`)
            return 
        }

        const contentType = resp.headers.get("content-type")
        if (contentType !== "text/html"){
            console.log(`non html response, content type: ${contentType}`)
            return 
        }
        
        console.log( await resp.text())

    }
    catch(err){
        console.log(`error in url ${err.message} on page: ${current_url}`)
    }

}



function normalizeURL(urlString){
    const urlObj = new URL(urlString)
    const host_path = `${urlObj.hostname}${urlObj.pathname}`
    if (host_path.length > 0 && host_path.slice(-1) === '/'){
        return host_path.slice(0,-1)
    }
    return host_path
}

const { url } = require('inspector')
const {JSDOM} = require('jsdom')
const { URL } = require('url')
function getURLsFromHTML(htmlBody, baseURL) {
    const urls =[]
    const dom = new JSDOM(htmlBody)
    const link_elements = dom.window.document.querySelectorAll('a')
    for(const link_element of link_elements){
        
        if(link_element.href.slice(0,1) === '/'){
            try{
                const urlObj = new URL( `${baseURL}${link_element.href}`)
                urls.push(urlObj.href)
            }
            catch(err){
                console.log(`error with relative url: ${err.message}`)
            }

        }
        else {
            try{
                const urlObj = new URL( link_element.href)
                urls.push(urlObj.href)
            }
            catch(err){
                console.log(`error with absolute url: ${err.message}`)
            }
        }
    }
    return urls
}

module.exports ={
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}