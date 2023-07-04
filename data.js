let data = [
  {
    "name": "Masamune-kun Revenge R",
    "link": "https://onelineplayer.com/player.html?autoplay=false&autopause=true&muted=false&loop=false&url=https%3A%2F%2Fwww.dropbox.com%2Fs%2F8192gd3w8qr3j2e%2FMasamune.mp4%3Fraw%3D1&poster=https%3A%2F%2Fi0.wp.com%2Fanitrendz.net%2Fnews%2Fwp-content%2Fuploads%2F2022%2F11%2Fmasamunekunsrevenger_pv1screenshot.png&time=true&progressBar=true&overlay=true&muteButton=true&fullscreenButton=true&style=light&quality=1080p&playButton=true"
  }
];

let ul = $(".list-group");
for(let x = 0; x <= data.length; x++){
  let string = data[x].link;
  let stringTitle = data[x].name;
  let htmlData = "<li class='list-group-item'><div class='vid-container'><iframe frameborder='0' allowfullscreen='' scrolling='no' allow='autoplay;fullscreen' class='video-player' src='" +string+ "'></iframe></div><h4 class='title'>"+stringTitle+"</h4></li>";
  ul.append(htmlData);
  console.log(ul);
}