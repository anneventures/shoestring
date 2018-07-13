/* Background video clip */	
  var video = document.getElementById("myVideo");
  var btn = document.getElementById("pauseVideo");

  function myFunction() {
    if (video.paused) {
      video.play();
      btn.innerHTML = "Pause video";
    } else {
      video.pause();
      btn.innerHTML = "Play video";
    }
  }