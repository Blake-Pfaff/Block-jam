
var albumPicasso = {
    title: 'The Colors',
    artist: 'Pablo Picasso',
    label: 'Cubism',
    year: '1881',
     albumArtUrl: 'assets/images/album_covers/01.png',
     songs: [
        { title: 'Blue', duration: '4:26'},
        { title: 'Green', duration: '3:14'},
        { title: 'Red', duration: '5:01'},
        { title: 'Pink', duration: '3:21'},
        { title: 'Magenta', duration: '2:15'},
    ]
};

var albumMarconi = {
    title: 'The Telephone',
    artist: 'Guglielmo Marconi',
    label: 'EM',
    year: '1909',
    albumArtUrl: 'assets/images/album_covers/20.png',
    songs: [
        { title: 'Hello, Operator?', duration: '1:01' },
        { title: 'Ring, ring, ring', duration: '5:01' },
        { title: 'Fits in your pocket', duration: '3:21'},
        { title: 'Can you hear me now?', duration: '3:14' },
        { title: 'Wrong phone number', duration: '2:15'}
    ]
};

var albumNin = {
     title: 'broken',
     artist: 'Nine Inch Nails',
     label: 'Interscope and Nothing',
     year: '1993',
     albumArtUrl: 'assets/images/album_covers/nin.jpg',
     songs: [
         { title: 'Pinion', duration: '1:02' },
         { title: 'Wish', duration: '3:46' },
         { title: 'Help Me I Am In Hell', duration: '1:56'},
         { title: 'Happiness In Slavery', duration: '5:21' },
         { title: 'Gave Up', duration: '4:08'},
         { title: 'Physical', duration: '5:29'},
        { title: 'Suck', duration: '5:07'}
      ]
};
var createSongRow = function(songNumber, songName, songLength) {
     var template =
         '<tr class="album-view-song-item">'
     + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
     + '  <td class="song-item-title">' + songName + '</td>'
     + '  <td class="song-item-duration">' + songLength + '</td>'
     + '  </tr>'
     ;

     return $(template);
 };
// NEW CODE TO FIND PARENT
// added w/ mentor ***
var findParentByClassName = function(element, targetClass) {
    if (element) {
        var currentParent = element.parentElement;

      if (element.parentElement === null) {
          console.log("No parent found");
        } else {
            var foundMatch = true;
            while (currentParent.className !== targetClass && currentParent.className !== null) {
              if(currentParent.parentElement == null) {
                  foundMatch = false;
                  break;
              }
              currentParent = currentParent.parentElement;
            }
            if(foundMatch) {
                console.log('found parent');
                return currentParent;
            } else {
            console.log("No parent found with that class name");
            }
        }

    } else {
      console.log('element is null');
    }
};
// ***

var albumTitle = document.getElementsByClassName('album-view-title')[0];
var albumArtist = document.getElementsByClassName('album-view-artist')[0];
var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
var albumImage = document.getElementsByClassName('album-cover-art')[0];
var albumSongList = document.getElementsByClassName('album-view-song-list')[0]

var setCurrentAlbum = function(album) {
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

var getSongItem = function(element) {
    switch (element.className) {
        case 'album-song-button':
        case 'ion-play':
        case 'ion-pause':
            return findParentByClassName(element, 'song-item-number');
        case 'album-view-song-item':
            return element.querySelector('.song-item-number');
        case 'song-item-title':
        case 'song-item-duration':
            return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
        case 'song-item-number':
            return element;
        default:
            return;
    }
};

var clickHandler = function(targetElement) {
    var songItem = getSongItem(targetElement);
    if (currentlyPlayingSong === null) {
    songItem.innerHTML = pauseButtonTemplate;
    currentlyPlayingSong = songItem.getAttribute('data-song-number');
    } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
       songItem.innerHTML = playButtonTemplate;
       currentlyPlayingSong = null;
     } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
         var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
         currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
         songItem.innerHTML = pauseButtonTemplate;
         currentlyPlayingSong = songItem.getAttribute('data-song-number');
     }

};

var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');

var playButtonTemplate =  '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
// store state od playing songs
var currentlyPlayingSong = null;

window.onload = function() {

    setCurrentAlbum(albumPicasso);

    songListContainer.addEventListener('mouseover', function(event){

        if (event.target.parentElement.className == 'album-view-song-item') {

            var songItem = getSongItem(event.target);

                if (songItem.getAttribute('data-song-number') !== currentlyPlayingSong) {
                    songItem.innerHTML = playButtonTemplate;
                }
        }
    });

    for (var i = 0; i < songRows.length; i++) {
        // change content from play icon back to num
        songRows[i].addEventListener('mouseleave', function(event) {
        // selects first child element, song-item-number element
        var songItem = getSongItem(event.target);
        var songItemNumber = songItem.getAttribute('data-song-number');

        if (songItemNumber !== currentlyPlayingSong) {
           songItem.innerHTML = songItemNumber;
       }
        });
            songRows[i].addEventListener('click', function(event){
            clickHandler(event.target);
        });
    }

    var albums = [albumPicasso, albumMarconi, albumNin];
    var index = 1;
    albumImage.addEventListener('click', function() {
        setCurrentAlbum(albums[index]);
        index++;
        if (index == albums.length) {
          index = 0;
        }
    });

};
