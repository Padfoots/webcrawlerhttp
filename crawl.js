function normalizeURL(urlString){
    const urlObj = new URL(urlString)
    const host_path = `${urlObj.hostname}${urlObj.pathname}`
    if (host_path.length > 0 && host_path.slice(-1) === '/'){
        return host_path.slice(0,-1)
    }
    return host_path
}

module.exports ={
    normalizeURL
}