var collectionItemTemplate =
    '<div class="collection-album-container column fourth">'
  + '  <img src="assets/images/album_covers/01.png"/>'
  + '  <div class="collection-album-info caption">'
  + '    <p>'
  + '      <a class="album-name" href="album.html"> The Colors </a>'
  + '      <br/>'
  + '      <a href="album.html"> Pablo Picasso </a>'
  + '      <br/>'
  + '      X songs'
  + '      <br/>'
  + '    </p>'
  + '  </div>'
  + '</div>'
  ;

  window.onload = function() {
      // /selects elements with class name album-covers and makes them an array
      var collectionContainer = document.getElementsByClassName('album-covers')[0];
      // sets the inner HTML of the collectionContainer to an empty string
      collectionContainer.innerHTML = '';

      // creates a loop to set the to set the innerHTML of all items in collectionContainer
      for (var i = 0; i < 12; i++) {
          collectionContainer.innerHTML += collectionItemTemplate;
      }
  }
