
// Standard LCD Chacacter Bitmaps
const cA = [0b01110, 0b10001, 0b10001, 0b10001, 0b11111, 0b10001, 0b10001]
const cB = [0b11110, 0b10001, 0b10001, 0b11110, 0b10001, 0b10001, 0b11110]
const cC = [0b01110, 0b10001, 0b10000, 0b10000, 0b10000, 0b10001, 0b01110]
const cD = [0b11100, 0b10010, 0b10001, 0b10001, 0b10001, 0b10010, 0b11100]
const cE = [0b11111, 0b10000, 0b10000, 0b11110, 0b10000, 0b10000, 0b11111]
const cF = [0b11111, 0b10000, 0b10000, 0b11110, 0b10000, 0b10000, 0b10000]
const cG = [0b01110, 0b10001, 0b10000, 0b10111, 0b10001, 0b10001, 0b01111]
const cH = [0b10001, 0b10001, 0b10001, 0b11111, 0b10001, 0b10001, 0b10001]
const cI = [0b11111, 0b00100, 0b00100, 0b00100, 0b00100, 0b00100, 0b11111]
const cJ = [0b00111, 0b00010, 0b00010, 0b00010, 0b00010, 0b10010, 0b01100]
const cK = [0b10001, 0b10010, 0b10100, 0b11000, 0b10100, 0b10010, 0b10001]
const cL = [0b10000, 0b10000, 0b10000, 0b10000, 0b10000, 0b10000, 0b11111]
const cM = [0b10001, 0b11011, 0b10101, 0b10101, 0b10001, 0b10001, 0b10001]
const cN = [0b10001, 0b10001, 0b11001, 0b10101, 0b10011, 0b10001, 0b10001]
const cO = [0b01110, 0b10001, 0b10001, 0b10001, 0b10001, 0b10001, 0b01110]
const cP = [0b11110, 0b10001, 0b10001, 0b11110, 0b10000, 0b10000, 0b10000]
const cQ = [0b01110, 0b10001, 0b10001, 0b10001, 0b10101, 0b10010, 0b01101]
const cR = [0b11110, 0b10001, 0b10001, 0b11110, 0b10100, 0b10010, 0b10001]
const cS = [0b01111, 0b10000, 0b10000, 0b01110, 0b00001, 0b00001, 0b11110]
const cT = [0b11111, 0b00100, 0b00100, 0b00100, 0b00100, 0b00100, 0b00100]
const cU = [0b10001, 0b10001, 0b10001, 0b10001, 0b10001, 0b10001, 0b01110]
const cV = [0b10001, 0b10001, 0b10001, 0b10001, 0b10001, 0b01010, 0b00100]
const cW = [0b10001, 0b10001, 0b10001, 0b10101, 0b10101, 0b01010, 0b01010]
const cX = [0b10001, 0b10001, 0b01010, 0b00100, 0b01010, 0b10001, 0b10001]
const cY = [0b10001, 0b10001, 0b10001, 0b01010, 0b00100, 0b00100, 0b00100]
const cZ = [0b11111, 0b00001, 0b00010, 0b00100, 0b01000, 0b10000, 0b11111]

const cFull = [31,31,31,31,31,31,31,31]
const cClear = [0,0,0,0,0,0,0,0]

const chars = {
    A: cA, B: cB, C: cC, D: cD, E: cE, F: cF, G: cG, H: cH,
    I: cI, J: cJ, K: cK, L: cL, M: cM, N: cN, O: cO, P: cP, Q: cQ, R: cR,
    S: cS, T: cT, U: cU, V: cV, W: cW, X: cX, Y: cY, Z: cZ 
}

chars[255] = cFull
chars[' '] = cClear
chars[254] = cClear


// render char
const w = 3.5
const g = 0.5

function constrain (val, min, max) {
    if (val > max) val = max
    else if (val < min) val = min
    return val
}

function LightenDarkenColor(col, amt) {
    var usePound = false;
    if ( col[0] == "#" ) {
        col = col.slice(1);
        usePound = true;
    }

    var num = parseInt(col,16);

    var r = (num >> 16) + amt;

    if ( r > 255 ) r = 255;
    else if  (r < 0) r = 0;

    var b = ((num >> 8) & 0x00FF) + amt;

    if ( b > 255 ) b = 255;
    else if  (b < 0) b = 0;

    var g = (num & 0x0000FF) + amt;

    if ( g > 255 ) g = 255;
    else if  ( g < 0 ) g = 0;

    console.log(r,g,b)

    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
}

class fxLiquidCrystalJS {

    constructor(id, lcd_cols=16, lcd_rows=2, config={}) {
        this.id = id
        this.width = lcd_cols
        this.height = lcd_rows
        this.contrast = 50
        this.x = 0
        this.y = 0

        this.GREEN = { back: "#ccee00", pixel: "#334400" }
        // this.BLUE =  { back: "#376df3", pixel: "#dde" }
        this.BLUEINVERT =  { back: "#0d06d2", pixel: "#83d0ec" }
        this.BLUE =  { back: "#83d0ec", pixel: "#0d06d2" }
        this.GREY =  { back: "#949a78", pixel: "#0f2324" }
    
        this.pixel = this.GREEN.pixel
        this.back = this.GREEN.back
        this.back_ = this.GREEN.back

        console.log("using canvas", this.id)
    }

    _renderChar(c, x,y) {
        for (let row=0; row<8; row++) {
            for (let col=0; col<5; col++) {
                // this.ctx.fillStyle = (c[row] & (0b10000>>col)) ? pixcol : pixdrk
                this.ctx.fillStyle = this.pixel
                let contrast = this.contrast / 100
                this.ctx.globalAlpha = (c[row] & (0b10000>>col)) ? constrain(contrast * 2, 0, 1) : constrain((contrast - 0.5)  * 2, 0, 1)
                this.ctx.fillRect(x+(w+g)*col, y+(w+g)*row, w, w)
            }
        }
    }

    setCursor(x, y) {
        this.x = constrain(x, 0, this.width)
        this.y = constrain(y, 0, this.height)
    }

    write(c) {
        if (this.x < this.width) {
            if (chars[c])
                this._renderChar(chars[c], 20+this.x*(w+g)*6, 20+this.y*(w+g)*9)
            else
                console.warn("Character %s not in charmap", c)
            this.x = constrain(this.x + 1, 0, this.width)
        } else {
            console.warn("trying to write outside display")
        }
    }

    print(text) {
        for (const c of text)
            this.write(c)
    }

    printByte(c) {
        this.write(c)
    }

    createChar(id, arr) {
        if (id >= 0 && id <= 8) {
            chars[id] = arr
        } else {
            console.warn("trying to redefine character " + id)
        }
    }

    clear() {
        const grd = this.ctx.createLinearGradient(0, 0, 300, 0)
        // yellow
        // grd.addColorStop(0, "#bbee00")
        // grd.addColorStop(0.5, "#ccee00")
        // grd.addColorStop(1.0, "#bbee00")
        
        grd.addColorStop(1.0, this.back)
        
        this.ctx.globalAlpha = 1
        this.ctx.fillStyle = grd
        this.ctx.fillRect(0, 0, 420, 100)

        for (let y=0;y<this.height;y++)
            for (let x=0;x<this.width;x++)
                this._renderChar(chars[254], 20+x*(w+g)*6, 20+y*(w+g)*9)

        this.home()
    }

    begin(cols, rows, charsize = 0x00) {}

    init() {
        const c = document.getElementById(this.id)
        this.ctx = c.getContext("2d")
        this.clear()
    }

    home() {
        this.setCursor(0, 0)
    }

    noDisplay() {}
    display() {}

    noBlink() {}
    blink() {}

    noCursor() {}
    cursor() {}

    scrollDisplayLeft() {}
    scrollDisplayRight() {}

    printLeft() {}
    printRight() {}

    leftToRight() {}
    rightToLeft() {}

    shiftIncrement() {}
    shiftDecrement() {}

    noBacklight() {
        // this.back = pSBC(-0.8, this.back_)
    }
    backlight() {
        this.back = this.back_
    }

    autoscroll() {}
    noAutoscroll() {}

    setContrast(val) {
        this.contrast = constrain(val, 0, 100)
    }

}

/*
// yellow
// const pixcol = '#334400'
// const pixdrk = "#aacc00"

// blue
const pixcol = '#fff'
const pixdrk = "#234eff"

// Fill with gradient
// ctx.fillStyle = grd;
// ctx.fillRect(0, 0, 420, 100);

// ctx.filter = 'blur(1px)'
*/