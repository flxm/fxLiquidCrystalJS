# fxLiquidCrystalJS

**Software simulation of liquid crystal display for use in webpages**

![License: MIT](https://img.shields.io/github/license/flxm/fxLiquidCrystal)


## Purpose


## Simple Example

```html
<canvas id="myCanvas" width="420" height="100"></canvas>
```

```js
const lcd = new fxLiquidCrystalJS("myCanvas")
lcd.init()
lcd.print("HELLO WORLD")
```


## Screenshot

![](./images/demo.png)


## Features

- same API as famous Arduino Liquid Crystal API
- No dependency on Webfonts
- Support for custom characters

## Upcoming Features

- display contrast control
- cursor control
- display content shifting
- different backlight colors
- more characters

## Dependencies

None

## History

### 0.1.0
  - initial github commit, support for uppercase letters
