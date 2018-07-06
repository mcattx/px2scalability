# px2scalability


这套工具包含:

* a CLI tool
* [Gulp plugin](https://www.npmjs.com/package/gulp-px3rem)
* [Webpack loader](https://www.npmjs.com/package/px2rem-loader)
* [Postcss plugin](https://www.npmjs.com/package/postcss-px2rem)

## 注意

如果您不打算转换原始值，例如：1px border，请在声明后添加`/ * no * /`

**注意：处理SASS或LESS，只能使用`/*...*/`注释，以便持续留下注释**

### API

```
var Px2rem = require('px2rem');
var px2remIns = new Px2rem([config]);
var originCssText = '...';
var dpr = 2;
var newCssText = px2remIns.generateRem(originCssText); // generate rem version stylesheet
var newCssText = px2remIns.generateThree(originCssText, dpr); // generate @1x, @2x and @3x version stylesheet
```

### 示例

#### 处理前:

One raw stylesheet: `test.css`

```
.selector {
  width: 150px;
  height: 64px; /*px*/
  font-size: 28px; /*px*/
  border: 1px solid #ddd; /*no*/
}
```

#### 处理后:

vw 版本: `test.vw.css`

```
.selector {
  width: 150px;
  height: 64px; /*px*/
  font-size: 28px; /*px*/
  border: 1px solid #ddd; /*no*/
}
```

rem 版本: `test.rem.css`

```
.selector {
  width: 150px;
  height: 64px; /*px*/
  font-size: 28px; /*px*/
  border: 1px solid #ddd; /*no*/
}
```

# 更新日志

[CHANGELOG](./CHANGELOG.md)

# 开源许可

[MIT](./LICENSE)