'use strict';
const path = require('path');
const fs = require('fs');
const expect = require('chai').expect;
const inlineImage = require('../');
const cheerio = require('cheerio');

describe('#html-inline-image-processor', function() {
  it('should convert img src to data uri', function() {
    var result = inlineImage(path.resolve(__dirname,'imgtest.html'),path.resolve(__dirname));
    let src = cheerio.load(result.toString())('img').attr('src');
    expect(src)
      .to.equal('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=');
  });
  it('should convert style background url to data uri', function() {
    var html = fs.readFileSync(path.resolve(__dirname,'divtest.html'));
    var result = inlineImage(html,path.resolve(__dirname));
    console.log(result.toString())
    let src = cheerio.load(result.toString())('div').attr('style');
    expect(src)
      .to.equal("background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=');");
  });
  it('should read file content and convert style background url to data uri', function() {
    var result = inlineImage(path.resolve(__dirname,'divtest.html'),path.resolve(__dirname));
    console.log(result.toString())
    let src = cheerio.load(result.toString())('div').attr('style');
    expect(src)
      .to.equal("background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=');");
  });

  describe('#lqip feature test success cases',() => {
    it('should append div element as child for high resolution image',() => {
      var html = fs.readFileSync(path.resolve(__dirname,'divtest-lqip.html'));
      var result = inlineImage(html,path.resolve(__dirname));
      console.log(result.toString());
      let childrenDiv = cheerio.load(result.toString())('div').children('.aspectRatioPlaceholder-fill');
      expect(childrenDiv.length).to.equal(1);
    });
  })

  describe('#lqip feature test negative cases',() => {
    it('should append div element as child for high resolution image fail',() => {
      var html = fs.readFileSync(path.resolve(__dirname,'divtest-lqip-failed.html'));
      var result = inlineImage(html,path.resolve(__dirname));
      console.log(result.toString());
      let childrenDiv = cheerio.load(result.toString())('div').children('.aspectRatioPlaceholder-fill');
      expect(childrenDiv.length).to.equal(0);
    });
  })
  
});
