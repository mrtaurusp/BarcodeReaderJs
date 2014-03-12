function BarcodeReader( prefix, callback ) {
  this.prefix = prefix.charCodeAt(0);
  this.callback = callback;
  this.chars = [];
  this.listenChars = false;

  document.addEventListener('keyup', this.onKeyUpHander.bind(this), true);
}

BarcodeReader.prototype.onKeyUpHander = function( event ) {
  var key = event.which;

  if( key === this.prefix ) {
    this.listenChars = true;
    event.stopPropagation();
    return false;
  } else {
    if( key == 13 ) {
      this.listenChars = false;
      this.callback.call( this, this.chars.join('') );
      this.chars = [];
      event.stopPropagation();
      return false;
    }

    if( this.listenChars ) {
      this.chars.push( String.fromCharCode( key ) );
      event.stopPropagation();
      return false;
    }

    return true;
  }
};

if( module ) {
  module.exports = BarcodeReader;
}
