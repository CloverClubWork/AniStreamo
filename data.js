let data = [
  {
    "name": "Masamune-kun Revenge R",
    "link": "https://onelineplayer.com/player.html?autoplay=false&autopause=true&muted=false&loop=false&url=https%3A%2F%2Fwww.dropbox.com%2Fs%2F8192gd3w8qr3j2e%2FMasamune.mp4%3Fraw%3D1&poster=https%3A%2F%2Fi0.wp.com%2Fanitrendz.net%2Fnews%2Fwp-content%2Fuploads%2F2022%2F11%2Fmasamunekunsrevenger_pv1screenshot.png&time=true&progressBar=true&overlay=true&muteButton=true&fullscreenButton=true&style=light&quality=1080p&playButton=true"
  },
  {
    "name": "Masamune-kun Revenge R",
    "link": "https://onelineplayer.com/player.html?autoplay=false&autopause=true&muted=false&loop=false&url=https%3A%2F%2Fwww.dropbox.com%2Fs%2F8192gd3w8qr3j2e%2FMasamune.mp4%3Fraw%3D1&poster=https%3A%2F%2Fi0.wp.com%2Fanitrendz.net%2Fnews%2Fwp-content%2Fuploads%2F2022%2F11%2Fmasamunekunsrevenger_pv1screenshot.png&time=true&progressBar=true&overlay=true&muteButton=true&fullscreenButton=true&style=light&quality=1080p&playButton=true"
  }
];

let ul = $("#ul");
for(let x = 0; x < data.length; x++){
  let li = document.createElement("li");
  li.setAttribute("class","list-group-item");
  let div = document.createElement("div");
  div.setAttribute("class", "vid-container");
  let iframe = document.createElement("iframe");
  iframe.setAttribute("class","video-player");
  iframe.setAttribute("allowfullscreen","");
  iframe.setAttribute("frameborder","0");
  iframe.setAttribute("scrolling","no");
  iframe.setAttribute("allow","autoplay;fullscreen");
  iframe.setAttribute("src","");
  let h4 = document.createElement("h4");
  h4.setAttribute("class","title");
  
  h4.innerHTML = data[x].name;
  iframe.src = data[x].link;
  
  div.append(iframe);
  li.append(div);
  li.append(h4);
  ul.append(li);
 
}