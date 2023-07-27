const {normalizeURL}  =  require('./crawl.js')
const {test, expect } = require('@jest/globals')

test('normalizeURL strip protocol',() => {
    const input = 'https://blog.boot.dev/path'
    const actual = normalizeURL(input)
    console.log(`actual: ${actual}`)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})


test('normalizeURL strip trailing slash /',() => {
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    console.log(`actual: ${actual}`)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalize upper case url',() => {
    const input = 'https://Blog.boot.dev/path/'
    const actual = normalizeURL(input)
    console.log(`actual: ${actual}`)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeUrl strip http',() => {
    const input = 'http://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    console.log(`actual: ${actual}`)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})