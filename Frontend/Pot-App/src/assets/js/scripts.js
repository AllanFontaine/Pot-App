$(window).scroll(function(){$('nav').toggleClass('scrolled', $(this).scrollTop() > 1080);})
console.log("script chargé")

function scrollTo( target ) {
  if( target.length ) {
    $("html, body").stop().animate( { scrollTop: target.offset().top }, 1500);
  }
}

