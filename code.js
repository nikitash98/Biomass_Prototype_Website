var stopPoints = [1.65]; // stop at 10 seconds, 20 seconds, and 30 seconds
var cur_index = -1

var forward = true;
HTMLVideoElement.prototype.playBackwards = function() {
    this.pause();
    var video = this;

    var fps = 25;
    var intervalRewind = setInterval(function() {
        if(video.currentTime == 0){
           clearInterval(intervalRewind);
           video.pause();
           $("#right").show()
           $("#left").hide()

        }
        else {
            video.currentTime += -(1/fps);
        }
    }, 1000 / fps);
};


var current = 0
  $(document).ready(function() {
    var video = $("#myVideo")
    console.log(video)
    video.trigger('play')
    $("#right").click(function() {
        console.log(cur_index)
        video.trigger('play')
        $("#right").hide()
        $("#left").hide()
        forward = true
        cur_index += 1;

    })
    $("#left").click(function() {
        video[0].playBackwards()
        $("#left").hide()
        $("#right").hide()
        console.log(cur_index)
        forward = false
        cur_index -= 1;

    })

    video[0].addEventListener("timeupdate", function() {
        change = 1
        if(!forward) {
            change = -1
        }

        var to_stop = false
        if (forward) {
            if(video[0].currentTime > stopPoints[cur_index ]) {
                to_stop = true

            }

        } else {
            if(video[0].currentTime < stopPoints[cur_index]) {
                to_stop = true
                cur_index -= 1;

            }
        }
        if(to_stop) {
            video.trigger('pause');
            console.log(cur_index)
            $("#right").show();
            $("#left").show();
        }
      });
    video.on('ended',function(){
        console.log('Video has ended!');
        $("#left").show();
        $("#right").hide();

    });
  
  })
    /*

  var video = document.getElementById("myVideo");
  console.log(video)
  video.addEventListener("click", function() {
    alert('OK')
    if (stopPoints.includes(Math.floor(video.currentTime))) {
      video.play();
    }
  });
    */  

/*
  video.addEventListener("timeupdate", function() {
    if (stopPoints.includes(Math.floor(video.currentTime))) {
      video.pause();
    }
  });
  
  video.addEventListener("click", function() {
    alert('OK')
    if (stopPoints.includes(Math.floor(video.currentTime))) {
      video.play();
    }
  });
*/
