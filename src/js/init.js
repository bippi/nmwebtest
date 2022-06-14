import WebFont from 'webfontloader';

//load webfonts and prevent font glitch.
const WebFontConfig = {
  active: function() {
  //alert('active');
  },
   google: {
      families: [ 'Roboto:400,700,500,300:latin' ] 
    }
};
WebFont.load(WebFontConfig);