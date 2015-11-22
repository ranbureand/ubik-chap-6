/*! (c) 2014 Andrea Buran [www.andreaburan.com] All rights reserved */

// @codekit-prepend "jquery-2.1.4.js"
// @codekit-prepend "jquery.easing.1.3.js"
// @codekit-prepend "jquery.scrollTo.js"
// @codekit-prepend "isInViewport.js"
// @codekit-prepend "during-scroll.js"
// @codekit-prepend "pieces.js"

$(document).ready(function() {
  'use strict';

  var larg = $(window).width(),
  alt = $(window).height(),
  xpos = larg / 100 * 20,
  ypos = alt / 100 * 20,
  piecesLength = pieces.length;

  // Function to create a piece
  function createPiece(pId, pFile, pWidth, pHeight, pX, pY) {
    return (
      $('<video class="piece" id="p'+ pId +'" width="'+ pWidth +'" height="'+ pHeight +'" style="top: '+ pY +'px; left: '+ pX +'px;" preload="auto" poster="media/posters/'+ pFile +'.jpg" loop><source src="media/videos/'+ pFile +'.webm" type="video/webm"/><source src="media/videos/'+ pFile +'.mp4" type="video/mp4"/><source src="media/videos/'+ pFile +'.ogv" type="video/ogg"/></video>')
    );
  };

  // Create a jQuery object array
  var jPieces = [];

  // Assign jQuery objects/pieces to it
  for (var i = 0, j = piecesLength; i < j; i += 1) {
    jPieces.push(createPiece(pieces[i].pId, pieces[i].pFile, pieces[i].pWidth, pieces[i].pHeight, pieces[i].pX, pieces[i].pY));
  }

  // Function to toggle the piece playing statuses:
  // in-viewport > play
  // not-in-viewport > pause
  /*(function($){
    $.fn.togglePieces = function() {
      return this.each(function() {
        var $piece = $(this);

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
  })(jQuery);*/

  // Function to toggle the piece playing status:
  // in-viewport > play
  // not-in-viewport > pause
  (function($){
    $.fn.togglePiece = function() {

      if($(this).is(':in-viewport')) {
        $(this)[0].play();
        //console.log('play');
        //console.log('play ' + $(this)[0].getAttribute('id'));
      } else {
        $(this)[0].pause();
        //console.log('pause');
        //console.log('pause ' + $(this)[0].getAttribute('id'));
      }

      return this;
    };
  })(jQuery);

  // Append all pieces to .pieces
  $(jPieces).each(function(index, element) {
    //console.log(index + ' pieces');
    $(element).appendTo( '.pieces' ).hide().delay((index+=1) * 100).fadeIn(400, function() {
      // Call back function: toggle the piece playing status
      $(element).togglePiece();
    });
  });

  // Append soundtrack
  $( '<audio class="audio" id="soundtrack" style="display: none;" preload="auto" loop><source src="media/audios/soundtrack_00.mp3" type="audio/mpeg"/><source src="media/audios/soundtrack_00.ogg" type="audio/ogg"/></audio>' ).appendTo( '.pieces' );

  // Fade in soundtrack
  $('#soundtrack')[0].volume = 0.0;
  $('#soundtrack')[0].play();
  $('#soundtrack').animate({volume: 0.4}, piecesLength*100+8000);

  // Scroll to a clicked piece
  $('.piece').on( 'click', function() {
    $(window).scrollTo($(this), 750, {offset:{left: -xpos, top: -ypos }, easing:"easeOutCubic"});
    return false;
  });

  // Toggle the piece playing statuses on scrolling
  $.duringScroll({
    interval: 60,
    always: function() {},
    scrollStart: function() {},
    duringScroll: function() {
      $(jPieces).each(function(index, element) {
        $(element).togglePiece();
      });
      //console.log('during scroll')
    },
    afterScroll: function() {
      $(jPieces).each(function(index, element) {
        $(element).togglePiece();
      });
      //console.log('after scroll')
    }
  });

});