const fs = require('fs')
const path = require('path')
const pxPath = path.join(__dirname, './cases/style.px.css')
const vwPath = path.join(__dirname, './cases/style.vw.css')
const remPath = path.join(__dirname, './cases/style.rem.css')
const pxCaseText = fs.readFileSync(pxPath, { encoding: 'utf8' })
const vwCaseText = fs.readFileSync(vwPath, { encoding: 'utf8' })
const remCaseText = fs.readFileSync(remPath, { encoding: 'utf8' })

const Px2scalability = require('../lib/px2scalability')

const px2scalability = new Px2scalability({
    'precision': 5
})

let remIns = px2scalability.init(pxCaseText, 'px2rem')
let vwIns = px2scalability.init(pxCaseText, 'px2vw')
let vwTestIns = px2scalability.init(vwCaseText, 'vw2rem')
let remTestIns = px2scalability.init(remCaseText, 'rem2vw')


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

createFile(remIns, 'px2rem')
createFile(vwIns, 'px2vw')

createFile(vwTestIns, 'vw2rem')
createFile(remTestIns, 'rem2vw')
