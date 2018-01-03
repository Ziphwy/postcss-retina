# PostCSS Retina [![Build Status][ci-img]][ci]

[PostCSS] plugin for create 1px border by scale-box on mobile.

It's compatible for all type of border.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/ziphwy/postcss-retina.svg
[ci]:      https://travis-ci.org/ziphwy/postcss-retina

```css
.foo {
  color: white;
  border: 1px solid red;
}
```

```css
.foo {
  color: white;
}

.foo::before {
  border: 1px solid red;
}

.foo::before {
  position: relative;
}

.foo::before {
  content: ' ';
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  box-sizing: border-box;
  font-size: 100px;
}

/* dpr is 2 */

@media only screen and (-webkit-min-device-pixel-ratio: 2), 
only screen and (min-device-pixel-ratio: 2) {
  .foo::before {
    transform: scale(0.5);
    transform-origin: 0 0;
    width: 200%;
    height: 200%;
    font-size: 200px;
  }
}

/* dpr is 3 */

@media only screen and (-webkit-min-device-pixel-ratio: 3), 
only screen and (min-device-pixel-ratio: 3) {
  .foo::before {
    transform: scale(0.333333);
    transform-origin: 0 0;
    width: 300%;
    height: 300%;
    font-size: 300px;
  }
}
```

## Usage

```js
postcss([ require('postcss-retina') ])
```

* make sure your box is not a pseudo-class
* make sure your box use **px** unit
* border-radius will be not to transform without border in same brace
* if your don't need transform any border, try to do like: 

  ```css
  .foo {  
    border: 1px solid red; /*no*/ 
  }
  ```

See [PostCSS] docs for examples for your environment.
