/*! (c) 2014 Andrea Buran [www.andreaburan.com] All rights reserved */

// @codekit-prepend "jquery-2.1.4.js"
// @codekit-prepend "jquery.easing.1.3.js"
// @codekit-prepend "jquery.scrollTo.js"
// @codekit-prepend "isInViewport.js"
// @codekit-prepend "pieces.js"

$(document).ready(function() {
  'use strict';

  var larg = $(window).width();
  var alt = $(window).height();
  var xpos = larg / 100 * 20;
  var ypos = alt / 100 * 20;

  function piece(pId, pFile, pWidth, pHeight, pX, pY) {
    $('.pieces').append('<video class="piece" id="l'+ pId +'" width="'+ pWidth +'" height="'+ pHeight +'" style="top: '+ pY +'px; left: '+ pX +'px;" preload="auto" poster="media/posters/'+ pFile +'.jpg" autoplay loop><source src="media/videos/'+ pFile +'.webm" type="video/webm"/><source src="media/videos/'+ pFile +'.mp4" type="video/mp4"/><source src="media/videos/'+ pFile +'.ogv" type="video/ogg"/></video>');
  }

  for (var i = 0; i < pieces.length; i++) {
    piece(pieces[i].pId, pieces[i].pFile, pieces[i].pWidth, pieces[i].pHeight, pieces[i].pX, pieces[i].pY);
  }

  $( '.piece' ).on( 'click', function() {
    $(window).scrollTo($(this), 750, {offset:{left: -xpos, top: -ypos }, easing:"easeOutCubic"});
    return false;
  });

  /*$(".piece:not(:in-viewport)").each(function() {
    this[0].pause();
  });*/
  /*$(".piece:in-viewport( 100 )").each(function() {
    this[0].play();
  });*/

  //$('.piece:in-viewport( 100 )')[0].play();

  /*$(".piece:in-viewport( 100 )").each(function() {
      this[0].play();
    });*/

  //$('.piece').get(0).pause();
  //$('.piece:in-viewport').get(0).play();
  /*$('.piece:in-viewport').each(function() {
    $this[0].play();
  });*/

  //console.log("banana");

  /*$(window).scroll(function() {
    $('.piece:not(:in-viewport)').get(0).pause();
    $('.piece:in-viewport').get(0).play();
  });*/

  //alert("banana");

  /*$('#playground').delegate('video', 'click', function() {
    //alert('banana');
    $(window).scrollTo($(this), 750, {offset:{left: -xpos, top: -ypos }, easing:"easeOutCubic"});
    return false;
  });

  $('.loop').click(function () {
    $(window).scrollTo($(this), 750, {offset:{left: -xpos, top: -ypos }, easing:"easeOutCubic"});
    
    return false;
  });

  $(".loop:not(:in-viewport)").each(function() {
    this.pause();
  });
  $(".loop:in-viewport").each(function() {
    this.play();
  });

  $(window).scroll(function() {
    $(".loop:not(:in-viewport)").each(function() {
      this.pause();
    });
    $(".loop:in-viewport").each(function() {
      this.play();
    });
  });*/

});