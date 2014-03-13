BarcodeReaderJs
===============

Simple javascript code that helps with barcode scanners.  

## Installation ##

    bower install BarcodeReaderJs

or simple include **BarcodeReader.js** in your page.

## Usage ##

Usage is super simple:

    var barcodeReader = new BarcodeReader( prefix, function( scannedText ) {
	     											 console.log( scannedText );
    											   } );

Prefix is one-character lenght string, usually **'~'** or **'`'**.

If you want to remove listener, just use method  

    barcodeReader.remove();


## Testing ##

Tests are written in **mocha**. To run them just install following modules:  

    npm install should sinon

## License ##

BarcodeReaderJs is licensed under [MIT License](https://github.com/soneta/BarcodeReaderJs/blob/master/LICENSE).  