const {normalizeURL, getURLsFromHTML}  =  require('./crawl.js')
const {test, expect } = require('@jest/globals')

test('normalizeURL strip protocol',() => {
    const input = 'https://blog.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})


test('normalizeURL strip trailing slash /',() => {
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalize upper case url',() => {
    const input = 'https://Blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeUrl strip http',() => {
    const input = 'http://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML absolute',() => {
    const input_html_body = `
    <html>
        <body>
            <a href="https://blog.boot.dev">boot.dev Blog </a>
            
        </body>
    </html>`
    const input_base_url="https://blog.boot.dev"
    const actual = getURLsFromHTML(input_html_body,input_base_url)
    const expected = ["https://blog.boot.dev/"]
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML relative',() => {
    const input_html_body = `
    <html>
        <body>
            <a href="/path/">boot.dev Blog </a>
        </body>
    </html>`
    const input_base_url="https://blog.boot.dev"
    const actual = getURLsFromHTML(input_html_body,input_base_url)
    const expected = ["https://blog.boot.dev/path/"]
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML invalid',() => {
    const input_html_body = `
    <html>
        <body>
            <a href="invalid">boot.dev Blog </a>
            
        </body>
    </html>`
    const input_base_url="https://blog.boot.dev"
    const actual = getURLsFromHTML(input_html_body,input_base_url)
    const expected = []
    expect(actual).toEqual(expected)
})