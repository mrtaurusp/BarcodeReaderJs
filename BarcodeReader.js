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
    if( !this.listenChars ) return true;

    event.stopPropagation();

    if( key == 13 ) { //ENTER
      this.listenChars = false;
      this.callback.call( this, this.chars.join('') );
      this.chars = [];
    } else {
      this.chars.push( String.fromCharCode( key ) );
    }

    return false;
  }
};

if( module ) {
  module.exports = BarcodeReader;
}
