'use strict'
const fs = require('fs')
const css = require('css')

const defaultConfig = {
    pageWidth: 750, // design draft width
    precision: 6, // 精度，默认是6位
    keepComment: 'no'
}

const TYPE_PX2REM = 'px2rem'
const TYPE_PX2VW = 'px2vw'
const TYPE_VW2REM = 'vw2rem'
const TYPE_REM2VW = 'rem2vw'

const UNIT_VW = 'vw'
const UNIT_REM = 'rem'

const pxRegExp = /\b(\d+(\.\d+)?)px\b/
const remRegExp = /\b(\d+(\.\d+)?)rem\b/
const vwRegExp = /\b(\d+(\.\d+)?)vw\b/

class Px2scalability {
    constructor(options) {
        this.config = {}
        Object.assign(this.config, defaultConfig, options)
    } 

    init (cssText, type) {
        switch (type) {
            case TYPE_PX2VW:
                return this.px2vw(cssText)

            case TYPE_PX2REM:
                return this.px2rem(cssText)

            case TYPE_VW2REM:
                return this.vw2rem(cssText)

            case TYPE_REM2VW:
                return this.rem2vw(cssText)
        
            default:
                console.error(`Unknown type: ${type}`)
                break
        }
    }

    processRules (rules, type) {
        const config = this.config
        for (let i = 0, len = rules.length; i < len; i++) {
            let rule = rules[i]
            if (rule.type === 'media') {
                this.processRules(rule.rules, type)
                continue
            } else if (rule.type === 'keyframes') {
                this.processRules(rule.keyframes, type)
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

    px2vw (cssText) {
        const AST = css.parse(cssText)
        const rules = AST.stylesheet.rules
        
        this.processRules(rules, TYPE_PX2VW)
        return css.stringify(AST)
    }

    px2rem (cssText) {
        const AST = css.parse(cssText)
        const rules = AST.stylesheet.rules
        
        this.processRules(rules, TYPE_PX2REM)
        return css.stringify(AST)
    }

    vw2rem (cssText) {
        const AST = css.parse(cssText)
        const rules = AST.stylesheet.rules
        
        this.processRules(rules, TYPE_VW2REM)
        return css.stringify(AST)
    }

    rem2vw (cssText) {
        const AST = css.parse(cssText)
        const rules = AST.stylesheet.rules
        
        this.processRules(rules, TYPE_REM2VW)
        return css.stringify(AST)
    }

    unitConversion (type, value) {
        if (!value) {
            return ""
        }
        const config = this.config
        const pxGlobalRegExp = new RegExp(pxRegExp.source, 'g')
        const vwGlobalRegExp = new RegExp(vwRegExp.source, 'g')
        const remGlobalRegExp = new RegExp(remRegExp.source, 'g')
        let fitGlobalRegExp = pxGlobalRegExp
        if (type === TYPE_VW2REM) {
            fitGlobalRegExp = vwGlobalRegExp
        } else if (type === TYPE_REM2VW) {
            fitGlobalRegExp = remGlobalRegExp
        }

        function computeValue (value, unit) {
            value = parseFloat(value.toFixed(config.precision))
            return value == 0 ? value : value + unit
        }

        return value.replace(fitGlobalRegExp, ($0, $1) => {
            switch (type) {
                case TYPE_PX2VW:
                    return computeValue($1 * 100 / config.pageWidth, UNIT_VW)

                case TYPE_PX2REM:
                    return computeValue($1 * 10 / config.pageWidth, UNIT_REM)

                case TYPE_VW2REM:
                    return computeValue($1 / 10, UNIT_REM)

                case TYPE_REM2VW:
                    return computeValue($1 * 10, UNIT_VW)
            
                default:
                    console.error(`Unknown type: ${type}`)
                    break
            }
        })
    }
}

module.exports = Px2scalability
