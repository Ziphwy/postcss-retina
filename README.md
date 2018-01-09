# PostCSS Retina 
[![Build Status][ci-img]][ci]  [![Coverage Status][cover-img]][cover]  [![npm](https://img.shields.io/npm/dt/postcss-retina.svg)](https://www.npmjs.com/package/postcss-retina)

[PostCSS] plugin for transform retina border by scale-box on mobile.

* Automatically transform your border in retina without change anything.  
* support border-radius and color.
* it's easy to remove it to use other way such as [lib-flexible](https://github.com/amfe/lib-flexible)

## How It Works
use a **```::before```** element to create a scale border and replace the origin.


## Example
[a simple page to show the document structure](https://rawgit.com/Ziphwy/postcss-retina/master/example/index.html)  

![](./example/example.png)  

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/Ziphwy/postcss-retina.svg
[ci]:      https://travis-ci.org/Ziphwy/postcss-retina

[cover-img]: https://coveralls.io/repos/github/Ziphwy/postcss-retina/badge.svg?branch=master
[cover]:     https://coveralls.io/github/Ziphwy/postcss-retina?branch=master

before:

```css
.foo {
  color: white;
  border: 1px solid red;
}
```  

after:

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

## Install
```
npm install --save-dev postcss-retina
```

## Usage

```js
postcss([ require('postcss-retina') ])
```

* make sure your box is not a pseudo-class.
* make sure your **```border```** and **```border-radius```** use **```px```** unit.
* **```border-radius```** will not to be transformed without border in same brace.  
> In v1.1.0 you can comment **```/*retina*/```** to mark it need to be transformed.
```css
.foo {
  border: 1px solid red;
}
.bar1 {
  border-radius: 2px; /*retina*/
}
.bar2 {
  border-radius: 4px; /*retina*/
}
```
* if your don't need transform any border, try to do like: 

```css
.foo {  
  border: 1px solid red; /*no*/ 
}
```

See [PostCSS] docs for examples for your environment.
