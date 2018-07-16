# px2scalability

> 中文文档[传送门](./README-zh.md)

This set of tools contains:

* a CLI tool(@todo)
* [Gulp plugin](https://www.npmjs.com/package/gulp-px3rem)(@todo)
* [Webpack loader](https://github.com/titancat/px2scalability-loader)
* [Postcss plugin](https://www.npmjs.com/package/postcss-px2rem)(@todo)

## Notice

If you don't intend to transform the original value, eg: 1px border, add `/*no*/` after the declaration

**Attention: Dealing with SASS or LESS, only `/*...*/` comment can be used, in order to have the comments persisted**

### API

```
const Px2scalability = require('px2scalability')
const px2scalabilityIns = new Px2scalability()
const originCssText = '...';
px2scalabilityIns.init(originCssText, 'px2vw')
```

### Example

#### Pre processing:

One raw stylesheet: `test.css`

```
.selector {
  width: 750px;
  height: 75px; 
  font-size: 15px;
  border: 1px solid #ddd; /*no*/
}
```

#### After processing:

vw version: `test.vw.css`

```
.selector {
  width: 100vw;
  height: 10vw; 
  font-size: 2vw;
  border: 1px solid #ddd; /*no*/
}
```

---
rem version: `test.rem.css`

```
.selector {
  width: 10rem;
  height: 1rem; 
  font-size: .2rem;
  border: 1px solid #ddd; /*no*/
}
```

# Options

```
px2scalabilityIns.init({
  pageWidth: 750, // {Number}
  precision: 6, // {Number}
  keepComment: 'no' // {String}
}, Type)
```

### Config

- pageWidth: 750 : Design draft width, default value: 750 
- precision: 6 : Precision, default value: 6
- keepComment: 'no' : The code won't convert if this flag in comments is detected

### Type

- 'px2vw' : Transform `px` unit to `vw` unit
- 'px2rem' : Transform `px` unit to `rem` unit
- 'vw2rem' : Transform `vw` unit to 'rem' unit
- 'rem2vw' : Transform `rem` unit to `vw` unit

# Change Log

[CHANGELOG](./CHANGELOG.md)

# License

[MIT](./LICENSE)