const fs = require('fs')
const path = require('path')
const cssPath = path.join(__dirname, './cases/style.css')
const caseText = fs.readFileSync(cssPath, {
    encoding: 'utf8'
})

const Px2scalability = require('../lib/px2scalability')

const px2scalability = new Px2scalability({
    'precision': 5
})

let remins = px2scalability.init(caseText, 'px2rem')
let vwins = px2scalability.init(caseText, 'px2vw')


function createFile (cssString, suffix) {
    let fileName = 'new'
    let outputPath = './output'
    suffix = suffix || 'vw'

    if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath)
    }

    fs.writeFile(`${outputPath}/${fileName}.${suffix}.css`, cssString, (err) => {
        if (err) {
            console.error(`px2scalability create ${fileName}.${suffix}.css failed.`)
        } else {
            console.log(`px2scalability create ${fileName}.${suffix}.css successfully.`)
        }
    })
}

createFile(remins, 'rem')
createFile(vwins)
