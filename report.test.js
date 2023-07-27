const {sortPages}  =  require('./report.js')
const {test, expect } = require('@jest/globals')

test('sortPages',() => {
    const input ={
        'https://wagslane.dev/path':1,
        'https://wagslane.dev1/':2,
        'https://wagslane.dev2/':3,
        'https://wagslane.dev3/':4,
        'https://wagslane.dev4/':5
    } 
    const actual = sortPages(input)
    const expected = [
        ['https://wagslane.dev4/',5],
        ['https://wagslane.dev3/',4],
        ['https://wagslane.dev2/',3],
        ['https://wagslane.dev1/',2],
        ['https://wagslane.dev/path',1]
        
    ]
    expect(actual).toEqual(expected)
})