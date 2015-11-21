/*! (c) 2014 Andrea Buran [www.andreaburan.com] All rights reserved */

// @codekit-prepend "jquery-2.1.4.js"
// @codekit-prepend "jquery.easing.1.3.js"
// @codekit-prepend "jquery.scrollTo.js"
// @codekit-prepend "isInViewport.js"
// @codekit-prepend "jquery.scrollstop.js"
// @codekit-prepend "pieces.js"

$(document).ready(function() {
  'use strict';

  var larg = $(window).width();
  var alt = $(window).height();
  var xpos = larg / 100 * 20;
  var ypos = alt / 100 * 20;

  function piece(pId, pFile, pWidth, pHeight, pX, pY) {
    $('.pieces').append('<video class="piece" id="l'+ pId +'" width="'+ pWidth +'" height="'+ pHeight +'" style="top: '+ pY +'px; left: '+ pX +'px;" preload="auto" poster="media/posters/'+ pFile +'.jpg" loop><source src="media/videos/'+ pFile +'.webm" type="video/webm"/><source src="media/videos/'+ pFile +'.mp4" type="video/mp4"/><source src="media/videos/'+ pFile +'.ogv" type="video/ogg"/></video>').hide().fadeIn(250);
  };

  function createPiece(pId, pFile, pWidth, pHeight, pX, pY) {
    return (
      $('<video class="piece" id="l'+ pId +'" width="'+ pWidth +'" height="'+ pHeight +'" style="top: '+ pY +'px; left: '+ pX +'px;" preload="auto" poster="media/posters/'+ pFile +'.jpg" loop><source src="media/videos/'+ pFile +'.webm" type="video/webm"/><source src="media/videos/'+ pFile +'.mp4" type="video/mp4"/><source src="media/videos/'+ pFile +'.ogv" type="video/ogg"/></video>')
    );
  };

  var jPieces = [];

  for (var i = 0, j = pieces.length; i < j; i += 1) {
    jPieces.push(createPiece(pieces[i].pId, pieces[i].pFile, pieces[i].pWidth, pieces[i].pHeight, pieces[i].pX, pieces[i].pY));
  }

  //alert(jPieces.length);

  //$('.pieces').append(jPieces).delay(500).hide().fadeIn(400);

  (function($){
    $.fn.onPlayground = function() {

      return this.each(function() {
        var $piece = $(this);

        // Set the status of the play button icon
        if($piece.is(':in-viewport')) {
          $piece[0].play();
          console.log('play');
        } else {
          $piece[0].pause();
          console.log('pause');
        }

        return this;
      });
    };
  })(jQuery);

  (function($){
    $.fn.onPlayg = function() {

      // Set the status of the play button icon
      if($(this).is(':in-viewport')) {
        $(this)[0].play();
        console.log('play');
      } else {
        $(this)[0].pause();
        console.log('pause');
      }

      return this;
    };
  })(jQuery);

  $(jPieces).each(function(i, element) {
    console.log(i);
    $(element).appendTo( ".pieces" ).hide().delay((i+=1) * 50).fadeIn(400, function() {
      $(element).onPlayg();
    });
    //$(element).onPlayg();
  });

  /*$('.pieces').append(jPieces.hide());

  $( "<p>Test</p>" ).appendTo( ".inner" );*/

  //$('.pieces').append(jPieces);

  /*$(function() {
    jPieces.each(function(i) {
      $(this).delay((i++) * 200).fadeIn(400);
    });
  });*/

  /*for (var i = 0, j = pieces.length; i < j; i += 1) {
    (function(i){

        window.setTimeout(function(){
          piece(pieces[i].pId, pieces[i].pFile, pieces[i].pWidth, pieces[i].pHeight, pieces[i].pX, pieces[i].pY);
        }, i * 100);

    }(i));
    piece(pieces[i].pId, pieces[i].pFile, pieces[i].pWidth, pieces[i].pHeight, pieces[i].pX, pieces[i].pY);
  }*/

  /*
  $(".faded").each(function(i) {
    $(this).delay(i * 400).fadeIn();
  });
  */

  $('.piece').on( 'click', function() {
    $(window).scrollTo($(this), 750, {offset:{left: -xpos, top: -ypos }, easing:"easeOutCubic"});
    return false;
  });

  

  //setTimeout(function(){ $(".piece").onPlayground(); }, (pieces.length*50)+1);

  $(window).on('scrollstop', function() {
    console.log('End of scrolling')
    $(".piece").onPlayground();
  });

});