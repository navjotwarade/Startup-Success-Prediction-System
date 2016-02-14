# window-popup [![Build Status](http://img.shields.io/travis/danielhusar/window-popup.svg?style=flat-square)](https://travis-ci.org/danielhusar/window-popup)
> Open window popup centered in the current browser window

## Install

```sh
$ npm install --save window-popup
```


## Usage

### node.js

```js
var popup = require('window-popup').windowPopup;
popup(500, 500, 'http://www.google.sk');
popup(500, 500, 'http://www.google.com', 'Google');
popup(500, 500, 'http://www.google.com', 'Google', gui.Window.get()); //node webkit custom window object
```

### Browser with jQuery

```js
$.windowPopup(500, 500, 'http://www.google.sk');

```

### Browser

```js
window.windowPopup(500, 500, 'http://www.google.sk');

```

## API

#### width (required)

Type: `Number`  
Default: `undefined`

Width of the popup.

#### height (required)

Type: `Number`  
Default: `undefined`

Height of the popup.

#### url (required)

Type: `String`  
Default: `undefined`

Url to open in popup.

#### title

Type: `String`  
Default: ``

Title of the popup.

#### window

Type: `object`  
Default: `window`

Custom window object. Usefull in environments like node webkit.


## License

MIT © [Daniel Husar](https://github.com/danielhusar)
