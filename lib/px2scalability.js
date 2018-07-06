'use strict'
const fs = require('fs')
const css = require('css')

const defaultConfig = {
    pageWidth: 750, // design draft width
    precision: 6, // 精度，默认是6位
    keepComment: 'no',
    env: 'dev',
    outputPath: './output',
    fileName: 'style'
}

const pxRegExp = /\b(\d+(\.\d+)?)px\b/

class Px2scalability {
    constructor(options) {
        this.config = {}
        Object.assign(this.config, defaultConfig, options)
    } 

    init (cssText) {
        if (this.config.env === 'dev') {
            return this.px2vw(cssText)
        } else {
            this.createFile(this.px2vw(cssText, 'vw'), 'vw')
            this.createFile(this.px2vw(cssText, 'rem'), 'rem')
        }
    }

    px2vw (cssText, type = 'vw') {
        const AST = css.parse(cssText)
        const rules = AST.stylesheet.rules
        const config = this.config

        let processRules = (rules) => {
            for (let i = 0, len = rules.length; i < len; i++) {
                let rule = rules[i]
                if (rule.type === 'media') {
                    processRules(rule.rules)
                    continue
                } else if (rule.type === 'keyframes') {
                    processRules(rule.keyframes)
                    continue
                } else if (rule.type !== 'rule' && rule.type !== 'keyframe'){
                    continue
                }

                let declarations = rule.declarations
                for (let j = 0, dlen = declarations.length; j < dlen; j ++ ) {
                    let declaration = declarations[j]
                    if (declaration.type === 'declaration' && pxRegExp.test(declaration.value)) {
                        let nextDeclaration = rule.declarations[j+1]
                        if (nextDeclaration && nextDeclaration.type === 'comment') {
                            let pureComment = nextDeclaration.comment.trim()
                            if (pureComment === config.keepComment) {
                                declarations.slice(j+1, 1)
                                continue
                            }
                        }
                    }
                    declaration.value = this.unitConversion(type, declaration.value)
                }
            }
        }

        processRules(rules)

        return css.stringify(AST)
    }

    unitConversion (type, value) {
        if (!value) {
            return ""
        }
        let config = this.config
        let pxGlobalRegExp = new RegExp(pxRegExp.source, 'g')

        function computeValue (value) {
            value = parseFloat(value.toFixed(config.precision))
            return value == 0 ? value : value + type
        }

        return value.replace(pxGlobalRegExp, ($0, $1) => {
            return type === 'vw' ? computeValue($1 * 100 / config.pageWidth) : computeValue($1 * 10 / config.pageWidth)
        })
    }

    createFile (cssString, type) {
        let fileName = this.config.fileName
        let outputPath = this.config.outputPath

        if (!fs.existsSync(outputPath)) {
            fs.mkdirSync(outputPath)
        }
        
        fs.writeFile(`${outputPath}/${fileName}.${type}.css`, cssString, (err) => {
            if (err) {
                console.error(`${fileName}.${type}.css 失败`)
            } else {
                console.log(`px2scalability create ${fileName}.${type}.css 成功`)
            }
        })
    }
}

module.exports = Px2scalability