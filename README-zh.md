# px2scalability


这套工具包含:

* a CLI tool(@todo)
* [Gulp plugin]()(@todo)
* [Webpack loader](https://github.com/titancat/px2scalability-loader)
* [Postcss plugin]()(@todo)

## 注意

如果您不打算转换原始值，例如：1px border，请在声明后添加`/ * no * /`

**注意：处理SASS或LESS，只能使用`/*...*/`注释，以便持续留下注释**

### API

```
const Px2scalability = require('px2scalability')
const px2scalabilityIns = new Px2scalability()
const originCssText = '...';
px2scalabilityIns.init(originCssText, 'px2vw')
```

### 示例

#### 处理前:

One raw stylesheet: `test.css`

```
.selector {
  width: 750px;
  height: 75px; 
  font-size: 15px;
  border: 1px solid #ddd; /*no*/
}
```

#### 处理后:

vw 版本: `test.vw.css`

```
.selector {
  width: 100vw;
  height: 10vw; 
  font-size: 2vw;
  border: 1px solid #ddd; /*no*/
}
```

rem 版本: `test.rem.css`

```
.selector {
  width: 10rem;
  height: 1rem; 
  font-size: .2rem;
  border: 1px solid #ddd; /*no*/
}
```

# 可选项

```
px2scalabilityIns.init({
  pageWidth: 750, // {Number}类型
  precision: 6, // {Number}类型
  keepComment: 'no' // {String}类型
}, Type)
```

### 配置

- pageWidth: 750 : 设计稿宽度，默认值是 750
- precision: 6 : 精度，默认是 6 位
- keepComment: `no` : 代码检测到注释里包含 `'no'` 的时候不会对这行进行单位转换

### Type

- 'px2vw' : 把 `px` 单位转为 `vw` 单位
- 'px2rem' : 把 `px` 单位转为 `rem` 单位
- 'vw2rem' : 把 `vw` 单位转为 `rem` 单位
- 'rem2vw' : 把 `rem` 单位转为 `vw` 单位

# 更新日志

[CHANGELOG](./CHANGELOG.md)

# 开源许可

[MIT](./LICENSE)
