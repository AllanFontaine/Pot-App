function scrollTo( target ) {
  if( target.length ) {
    $("html, body").stop().animate( { scrollTop: target.offset().top }, 1500);
  }
}
