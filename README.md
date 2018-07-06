# px2scalability


This set of tools contains:

* a CLI tool
* [Gulp plugin](https://www.npmjs.com/package/gulp-px3rem)
* [Webpack loader](https://www.npmjs.com/package/px2rem-loader)
* [Postcss plugin](https://www.npmjs.com/package/postcss-px2rem)

## Notice

If you don't intend to transform the original value, eg: 1px border, add `/*no*/` after the declaration

**Attention: Dealing with SASS or LESS, only `/*...*/` comment can be used, in order to have the comments persisted**

### API

```
var Px2rem = require('px2rem');
var px2remIns = new Px2rem([config]);
var originCssText = '...';
var dpr = 2;
var newCssText = px2remIns.generateRem(originCssText); // generate rem version stylesheet
var newCssText = px2remIns.generateThree(originCssText, dpr); // generate @1x, @2x and @3x version stylesheet
```

### Example

#### Pre processing:

One raw stylesheet: `test.css`

```
.selector {
  width: 150px;
  height: 64px; /*px*/
  font-size: 28px; /*px*/
  border: 1px solid #ddd; /*no*/
}
```

#### After processing:

Rem version: `test.debug.css`

```
.selector {
  width: 2rem;
  border: 1px solid #ddd;
}
[data-dpr="1"] .selector {
  height: 32px;
  font-size: 14px;
}
[data-dpr="2"] .selector {
  height: 64px;
  font-size: 28px;
}
[data-dpr="3"] .selector {
  height: 96px;
  font-size: 42px;
}
```

# Change Log

[CHANGELOG](./CHANGELOG.md)

# License

[MIT](./LICENSE)