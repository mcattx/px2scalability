const fs = require('fs')
const path = require('path')
const cssPath = path.join(__dirname, './cases/style.css')
const caseText = fs.readFileSync(cssPath, { encoding: 'utf8' })

const Px2scalability = require('../lib/px2scalability')

const px2scalability = new Px2scalability({
    'env': 'prod',
    'outputPath': './output',
    'fileName': 'test'
})

px2scalability.init(caseText)