var should = require('should'),
    sinon  = require('sinon'),
    BarcodeReader = require( '../BarcodeReader.js' );

global.document = {
  addEventListener : function() { },
  removeEventListener: function() { }
};

beforeEach(function() {
  this.sinon = sinon.sandbox.create();
});

afterEach(function(){
  this.sinon.restore();
});

describe('BarcodeReader', function () {
  it('should exists',function () {
    (BarcodeReader).should.be.ok;
  });

  describe( 'ctor arguments', function () {
    it('should take initial character as prefix and callback function',function () {
      (BarcodeReader).length.should.equal(2);
    });
  });

  describe('event listeners', function () {
    it('should add global keydown event handler', function () {
      var spy = this.sinon.spy(document, 'addEventListener');

      var barcode = new BarcodeReader('~', this.sinon.spy());

      spy.calledOnce.should.be.true;
      var args = spy.args[0];
      args.length.should.equal(3);
      args[0].should.equal('keydown');
      args[2].should.be.true;
    });
    
    it('should remove global keydown handler', function() {
      var spy = this.sinon.spy(document, 'removeEventListener'),
          barcode = new BarcodeReader('~', this.sinon.spy());

      barcode.remove();

      spy.calledOnce.should.be.true;
      var args = spy.args[0];
      args.length.should.equal(3);
      args[0].should.equal('keydown');
      args[2].should.be.true;
    });

    describe('reader', function () {
      var makeEvent = function( which ) {
        return {
                  stopped: false,
                  prevented: false,
                  which: which,
                  stopPropagation: function() {
                    this.stopped = true;
                  },
                  isPropagationStopped: function() {
                    return this.stopped;
                  },
                  preventDefault: function () {
                    this.prevented = true;
                  },
                  isDefaultPrevented: function() {
                    return this.prevented;
                  },
                };
      };

      it('should allow event to bubble when character isn\'t prefix',function () {
        var event = { which: 66 },
            barcode = new BarcodeReader('~', this.sinon.spy());

        var result = barcode.onKeyDownHander.call( barcode, event );

        result.should.be.true;
      });

      it('should not allow event to bubble when character is prefix',function () {
        var spy = this.sinon.spy(),
            event = makeEvent( 126 ),
            barcode = new BarcodeReader('~', spy);

        var result = barcode.onKeyDownHander.call( barcode, event );

        result.should.be.false;
        event.isPropagationStopped().should.be.true;
        event.isDefaultPrevented().should.be.true;
      });

      it('should read keys until enter has been passed and run callback',function () {
        var spy = this.sinon.spy(),
            barcode = new BarcodeReader('~', spy);

        Array.prototype.forEach.call( '~12345', function( c ) {
          barcode.onKeyDownHander.call( barcode, makeEvent( c.charCodeAt(0) ) );
        } );

        barcode.onKeyDownHander.call( barcode, makeEvent( 13 ) );

        spy.calledOnce.should.be.true;
        spy.calledWith('12345').should.be.true;
      });

      it('should not capture enter when no prefix was given',function () {
        var spy = this.sinon.spy(),
            barcode = new BarcodeReader('~', spy);

        barcode.onKeyDownHander.call( barcode, makeEvent( 13 ) );

        spy.called.should.be.false; 
      });
    });

  });
});
