

var createSongRow = function(songNumber, songName, songLength) {
     var template =
         '<tr class="album-view-song-item">'
     + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
     + '  <td class="song-item-title">' + songName + '</td>'
     + '  <td class="song-item-duration">' + songLength + '</td>'
     + '  </tr>'
     ;

     var $row = $(template);


     var onHover = function(event) {
         var songNumberCell = $(this).find('.song-item-number');
         var songNumber = songNumberCell.attr('data-song-number');

         if (songNumber !== currentlyPlayingSongNumber) {
             songNumberCell.html(playButtonTemplate);
         }
     };

    var clickHandler = function() {

    var songNumber = $(this).attr('data-song-number');

	  if (currentlyPlayingSongNumber !== null) {
		// Revert to song number for currently playing song because user started playing new song.
		var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
		  currentlyPlayingCell.html(currentlyPlayingSongNumber);
	  }
	  if (currentlyPlayingSongNumber !== songNumber) {
		// Switch from Play -> Pause button to indicate new song is playing.
		$(this).html(pauseButtonTemplate);
		currentlyPlayingSongNumber = songNumber;
    currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
  } else if (currentlyPlayingSongNumber === songNumber) {
		// Switch from Pause -> Play button to pause currently playing song.
		$(this).html(playButtonTemplate);
		currentlyPlayingSongNumber = null;
    currentSongFromAlbum = null;
	}
};

     var offHover = function(event) {
         var songNumberCell = $(this).find('.song-item-number');
         var songNumber = songNumberCell.attr('data-song-number');

         if (songNumber !== currentlyPlayingSongNumber) {
             songNumberCell.html(songNumber);
         }
     };

     $row.find('.song-item-number').click(clickHandler);
     $row.hover(onHover, offHover);
     return $row;
 };
// NEW CODE TO FIND PARENT
// added w/ mentor ***

// ***

var albumTitle = document.getElementsByClassName('album-view-title')[0];
var albumArtist = document.getElementsByClassName('album-view-artist')[0];
var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
var albumImage = document.getElementsByClassName('album-cover-art')[0];
var albumSongList = document.getElementsByClassName('album-view-song-list')[0]

var setCurrentAlbum = function(album) {
  currentAlbum = album;
    // gets elements needed to make the diaplay
  var $albumTitle = $('.album-view-title');
  var $albumArtist = $('.album-view-artist');
  var $albumReleaseInfo = $('.album-view-release-info');
  var $albumImage = $('.album-cover-art');
  var $albumSongList = $('.album-view-song-list');
    // /sets the albumTitles first child to the album.title value in the object
  $albumTitle.text(album.title);
  $albumArtist.text(album.artist);
  $albumReleaseInfo.text(album.year + ' ' + album.label);
  $albumImage.attr('src', album.albumArtUrl);

  $albumSongList.empty();
    // #4
    for (var i = 0; i < album.songs.length; i++) {
      var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
      $albumSongList.append($newRow);
    }
};





var playButtonTemplate =  '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
// store state od playing songs
var currentlyPlayingSong = null;
var currentlyPlayingSongNumber = null;

$(document).ready(function() {
    setCurrentAlbum(albumPicasso);

  });

    var albums = [albumPicasso, albumMarconi, albumNin];
    var index = 1;
    albumImage.addEventListener('click', function() {
        setCurrentAlbum(albums[index]);
        index++;
        if (index == albums.length) {
          index = 0;
        }
    });
