
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
        { title: 'Wrong phone number', duration: '2:15'},
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
        `<tr class="album-view-song-item">`
      +    `<td class="song-item-number">`+ songNumber + `</td>`
      +    `<td class="song-item-title">` + songName + `</td>`
      +    `<td class="song-item-duration">` + songLength + `</td>`
      +`</tr>`
      ;

      return template;
};

var setCurrentAlbum = function(album) {
    // gets elements needed to make the diaplay
    var albumTitle = document.getElementsByClassName('album-view-title')[0];
    var albumArtist = document.getElementsByClassName('album-view-artist')[0];
    var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
    var albumImage = document.getElementsByClassName('album-cover-art')[0];
    var albumSongList = document.getElementsByClassName('album-view-song-list')[0];

    // /sets the albumTitles first child to the album.title value in the object
    albumTitle.firstChild.nodeValue = album.title;
    albumArtist.firstChild.nodeValue = album.artist;
    albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
    albumImage.setAttribute('src', album.albumArtUrl);

    // clears the albumSongList HTML
    albumSongList.innerHTML = '';

    // #4
    for (var i = 0; i < album.songs.length; i++) {
        albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
    }
};

window.onload = function() {
    setCurrentAlbum(albumNin);
};

var images = document.getElementsByClassName('album-cover-art')[0];

images.addEventListener('click', function() {

  var albumArr = [albumPicasso, albumNin, albumMarconi]
  console.log(albumArr);
  var rando = Math.floor(Math.random() * 3 );
  console.log(rando);
  var randoAlbum = albumArr[rando];
  console.log(randoAlbum);
  setCurrentAlbum(randoAlbum);

});
//