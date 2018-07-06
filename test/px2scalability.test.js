const fs = require('fs')
const Px2scalability = require('../lib/px2scalability')
const caseFile = require('./cases/style.css')
const caseText = fs.readFileSync(caseFile, { encoding: 'utf8' })
const px2s = new Px2scalability()

describe('Px2scalability', () => {
    test('basic test', () => {

    })
})