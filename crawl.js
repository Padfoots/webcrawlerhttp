async function crawlPage(base_url,current_url,pages){
    
   
    const base_url_obj = new URL(base_url)
    const current_url_obj = new URL(current_url)
    
    if (base_url_obj.hostname !== current_url_obj.hostname){
        return pages
    }

    const normalized_current_url = normalizeURL(current_url)
    
    if( pages[normalized_current_url] > 0){
        pages[normalized_current_url]++
        return pages
    }

    pages[normalized_current_url]= 1
    console.log(`crawling: ${current_url}`)

    let html_body = ''
    try{
        const resp = await fetch(current_url)
        console.log(`status code: ${resp.status}`)
        if (resp.status > 399){
            console.log(`error in fetch status code: ${resp.status} on page: ${current_url}`)
            return pages
        }

        const contentType = resp.headers.get("content-type")
        if (!contentType.includes("text/html")){
            console.log(`non html response, content type: ${contentType}`)
            return pages
        }

         html_body = await resp.text()
    }
    catch(err){
            console.log(`error in url ${err.message} on page: ${current_url}`)
        }
        const next_urls = getURLsFromHTML(html_body,base_url)

        for(const next_url of next_urls){
            pages = await crawlPage(base_url,next_url,pages)
        }

        return pages
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