(function (root, factory) {
  'use strict';

  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.BarcodeReader = factory();
  }
}(this, function() {

function BarcodeReader( prefix, callback ) {
  this.prefix = prefix.charCodeAt(0);
  this.callback = callback;
  this.chars = [];
  this.listenChars = false;
  this.handler = this.onKeyDownHander.bind(this);

  document.addEventListener('keydown', this.handler, true);
}

BarcodeReader.prototype.onKeyDownHander = function( event ) {
  var key = event.which;

  if( key === this.prefix ) {
    this.listenChars = true;
    event.preventDefault();
    event.stopPropagation();
    return false;
  } else {
    if( !this.listenChars ) return true;

    event.preventDefault();
    event.stopPropagation();

    if( key === 13 ) { //ENTER
      this.listenChars = false;
      this.callback.call( this, this.chars.join('') );
      this.chars = [];
    } else {
      this.chars.push( String.fromCharCode( key ) );
    }

    return false;
  }
};

BarcodeReader.prototype.remove = function( event ) {
  document.removeEventListener( 'keydown', this.handler, true );
};

return BarcodeReader;
}));
