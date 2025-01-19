function Player(id) {
  var self = this;

  self.settings = {
    defaultVolume: 0.5
  };

  self.el = document.getElementById(id);

  self.audio = new Audio();
  self.audio.preload = 'auto';

  self.playing = false;

  self.trackLength = 0;

  self.init = function(userConfig) {

    for (var key in userConfig.settings) {
      if (key in self.settings) {
        self.settings[key] = userConfig.settings[key];
      }
    }

    // init submodules
    self.soundcloud.init();
    self.playlist.init(userConfig.playlist);
    self.audioState.init();
    self.scrubber.init();
    self.volumeHandler.init();
    self.playButton.init();
    self.nextButton.init();
    self.prevButton.init();
    self.shortkeys.init();
    self.focusCapability.init();

    self.load.firstTrack();
  };

  self.volumeHandler = (function() {

    var volumeThumb = document.querySelector('.volume__thumb.' + id);
    var volumeSlider = document.querySelector('.volume__slider.' + id);
    var volumeButton = document.querySelector('.control--volume.' + id);
    var volumeTrack = document.querySelector('.volume__track.' + id);
    var volumeTrackLevel = document.querySelector('.volume__track-level.' + id);
    var volumeTrackPosY = volumeTrack.getBoundingClientRect().top;
    var volumeTrackHeight = volumeTrack.offsetHeight;
    var dragging;

    // Required because IE ignores the css transform on volume slider when calculating .getBoundingClientRect()
    var volumeTrackHeightTransformed = volumeTrack.getBoundingClientRect().height;
    var positionFix = volumeTrackHeight - volumeTrackHeightTransformed;
    if (volumeTrackHeight !== volumeTrackHeightTransformed) {
      positionFix += volumeTrack.offsetTop;
    }

    function init() {
      utilities.initLocalStorageItem('audioselfVolume', self.settings.defaultVolume, function(value) {
        self.audio.volume = parseFloat(value);
      });

      self.audio.addEventListener('volumechange', moveVolumeSlider, false);
      volumeButton.addEventListener('click', handleVolumeButton, false);
      volumeSlider.addEventListener('mousedown', handleVolumeDrag, false);
      window.addEventListener('resize', updateTrackPosition, false);

      moveVolumeSlider();
    }

    function moveVolumeSlider() {
      var volume = self.audio.volume;
      var posY = (volume * volumeTrackHeight);
      var trackLevelScale = posY / volumeTrackHeight;

      volumeThumb.style.cssText = '-webkit-transform: translateY(-' + posY + 'px); transform: translateY(-' + posY + 'px)';
      volumeTrackLevel.style.cssText = '-webkit-transform: scaleY(' + trackLevelScale + '); transform: scaleY(' + trackLevelScale + ')';

      if (volume === 1.0) {
        volumeButton.setAttribute('data-volume', 'max');
        if (!dragging) {
          localStorage.setItem('audioselfVolume', volume);
        }
      } else if (volume >= 0.3) {
        volumeButton.setAttribute('data-volume', 'med');
      } else if (volume === 0.0) {
        volumeButton.setAttribute('data-volume', 'off');
      } else {
        volumeButton.setAttribute('data-volume', 'low');
        if (!dragging) {
          localStorage.setItem('audioselfVolume', volume);
        }
      }
    }

    function handleVolumeButton() {
      if (self.audio.volume > 0.0) {
        self.audio.volume = 0.0;
      } else {
        self.audio.volume = parseFloat(localStorage.getItem('audioselfVolume'));
      }
    }

    function handleVolumeDrag(e) {
      dragging = true;
      volumeDragging(e);
      self.el.classList.add('is-dragging');
      volumeSlider.classList.add('is-dragging');
      document.addEventListener('mousemove', volumeDragging, false);
      document.addEventListener('mouseup', volumeDraggingFinished, false);
    }

    function volumeDragging(e) {
      var mouseY = e.clientY;
      var posY = Math.min(Math.max((mouseY - volumeTrackPosY + positionFix), 0), volumeTrackHeight);
      self.audio.volume = posY / volumeTrackHeight * -1 + 1;
    }

    function volumeDraggingFinished() {
      this.removeEventListener('mousemove', volumeDragging, false);
      this.removeEventListener('mouseup', volumeDraggingFinished, false);
      dragging = false;
      moveVolumeSlider();
      self.el.classList.remove('is-dragging');
      volumeSlider.classList.remove('is-dragging');
    }

    function updateTrackPosition() {
      volumeTrackPosY = volumeTrack.getBoundingClientRect().top;
    }

    return {
      init: init
    }

  })();

  self.soundcloud = (function() {

    var id = '6d5344beaff71abea9bd3d89c4a38ada'

    function init() {
      SC.initialize({
        client_id: id
      });
    }

    return {
      init: init,
      id: id
    }

  })();

  self.shortkeys = (function() {

    var space = 32;
    var arrowLeft = 37;
    var arrowUp = 38;
    var arrowRight = 39;
    var arrowDown = 40;

    function init() {
      document.addEventListener('keydown', keyboardFunctionality, false);
    }

    function keyboardFunctionality(e) {

      var key = e.which || e.keyCode;
      var volume = self.audio.volume;

      if (key === space && !self.focusCapability.on) {
        e.preventDefault();
        self.playButton.handleClick();
      } else if (key === arrowLeft) {
        self.prevButton.handleClick();
      } else if (key === arrowRight) {
        self.load.nextTrack();
      } else if (key === arrowUp) {
        if (volume > 0.9) {
          self.audio.volume = 1.0;
        } else {
          self.audio.volume = volume + 0.1;
        }
      } else if (key === arrowDown) {
        if (volume < 0.1) {
          self.audio.volume = 0.0;
        } else {
          self.audio.volume = volume - 0.1;
        }
      }
    }

    return {
      init: init
    };
  })();

  self.scrubber = (function() {

    var timeHandler = document.querySelector('.player__timeline.' + id);
    var timeHandlerTouch = document.querySelector('.player__duration.' + id);
    var timeLine = document.querySelector('.player__timeline-inner.' + id);
    var timePlayed = document.querySelector('.player__time--current.' + id);
    var timeTotal = document.querySelector('.player__time--total.' + id);
    var timeLinePosX = timeLine.getBoundingClientRect().left;
    var dragging;

    function init() {
      self.audio.addEventListener('timeupdate', renderTimePlayed, false);
      timeHandlerTouch.addEventListener('touchstart', handleScrubbing, false);
      timeHandler.addEventListener('mousedown', handleScrubbing, false);
      window.addEventListener('resize', updateTimeLinePosition, false);
    }

    function renderTimePlayed() {
      timePlayed.innerHTML = formatTime(self.audio.currentTime);
    }

    function renderTimeTotal() {
      timeTotal.innerHTML = formatTime(self.trackLength);
    }

    function goToTime(e) {
      var eventX = e.changedTouches ? e.changedTouches[0].pageX : e.clientX;
      var x = (eventX < timeLinePosX) ? 0 : eventX - timeLinePosX;

      self.audio.currentTime = Math.min(Math.floor(x / timeHandler.offsetWidth * self.trackLength), self.trackLength);
      triggerEvents();
    }

    function handleScrubbing(e) {
      self.scrubber.dragging = true;

      if (self.playing) {
        self.audio.pause();
      }

      goToTime(e);
      self.el.classList.add('is-dragging');
      timeHandler.classList.add('is-dragging');

      if (e.type === 'touchstart') {
        document.addEventListener('touchmove', goToTime, false);
        document.addEventListener('touchend', scrubbingFinished, false);
        document.addEventListener('touchcancel', scrubbingFinished, false);
      } else {
        document.addEventListener('mousemove', goToTime, false);
        document.addEventListener('mouseup', scrubbingFinished, false);
      }
    }

    function scrubbingFinished(e) {
      e.preventDefault();

      if (self.playing) {
        if (self.audio.ended) {
          self.load.nextTrack();
        } else {
          self.audio.play();
        }
      }

      self.scrubber.dragging = false;
      self.el.classList.remove('is-dragging');
      timeHandler.classList.remove('is-dragging');
      this.removeEventListener('mousemove', goToTime, false);
      this.removeEventListener('mouseup', scrubbingFinished, false);
      this.removeEventListener('touchmove', goToTime, false);
      this.removeEventListener('touchend', scrubbingFinished, false);
      this.removeEventListener('touchcancel', scrubbingFinished, false);
    }

    function updateTimeLinePosition() {
      timeLinePosX = timeLine.getBoundingClientRect().left;
    }

    function triggerEvents() {
      renderTimePlayed();
      moveTimeline();
    }

    function formatTime(s) {
      var s = Math.floor(s) || 0;
      var m = 0;

      if (s >= 60) {
        for (; s >= 60; s = s - 60) {
          m++;
        }
      }

      if (s < 10) {
        s = '0' + s;
      }

      return m + ':' + s;
    }

    function moveTimeline() {
      var currentPosition = self.audio.currentTime / self.trackLength;
      timeLine.style.cssText = '-webkit-transform: scaleX(' + currentPosition + '); transform: scaleX(' + currentPosition + ')';
    }

    return {
      init: init,
      triggerEvents: triggerEvents,
      formatTime: formatTime,
      moveTimeline: moveTimeline,
      renderTimeTotal: renderTimeTotal,
      dragging: dragging
    };

  })();

  self.prevButton = (function() {

    var prevButton = document.querySelector('.control--previous.' + id);

    function init() {
      prevButton.addEventListener('click', handleClick, false);
    }

    function handleClick() {
      if (self.audio.currentTime > 4) {
        self.audio.currentTime = 0;
        self.scrubber.triggerEvents();
      } else {
        self.load.prevTrack();
      }
    }

    return {
      init: init,
      handleClick: handleClick
    };
  })();

  self.playlist = (function() {

    var index;
    var playlist;
    var playlistLength;

    function init(playlist) {
      load(playlist);

      utilities.initLocalStorageItem('audioselfIndex', index, function(value) {
        var localStorageIndex = parseInt(value);
        localStorageIndex > playlistLength ? index = playlistLength : index = localStorageIndex;
      });
    }

    function load(playlistData) {
      playlist = playlistData;
      playlistLength = playlist.length - 1;
      index = 0;
    }

    function nextIndex() {
      var tempIndex = index;
      tempIndex === playlistLength ? tempIndex = 0 : tempIndex++;
      return tempIndex;
    }

    function prevIndex() {
      var tempIndex = index;
      tempIndex === 0 ? tempIndex = playlistLength : tempIndex--;
      return tempIndex;
    }

    function next() {
      return playlist[nextIndex()];
    }

    function prev() {
      return playlist[prevIndex()];
    }

    function current() {
      return playlist[index];
    }

    function setNext() {
      index = nextIndex();
      localStorage.setItem('audioselfIndex', index);
      return playlist[index];
    }

    function setPrev() {
      index = prevIndex();
      localStorage.setItem('audioselfIndex', index);
      return playlist[index];
    }

    return {
      init: init,
      load: load,
      next: next,
      prev: prev,
      setNext: setNext,
      setPrev: setPrev,
      current: current
    };

  })();

  self.playButton = (function() {

    var playButton = document.querySelector('.control--play.' + id);

    function init() {
      playButton.addEventListener('click', handleClick, false);
    }

    function handleClick() {
      if (self.audio.ended) {
        self.playing = true;
        self.load.nextTrack();
      } else if (self.audio.paused) {
        self.audio.play();
      } else {
        self.audio.pause();
        self.playing = false;
      }
    }

    return {
      init: init,
      handleClick: handleClick,
      el: playButton
    };
  })();

  self.nextButton = (function() {

    var nextButton = document.querySelector('.control--next.' + id);

    function init() {
      nextButton.addEventListener('click', self.load.nextTrack, false);
    }

    return {
      init: init
    };
  })();

  self.load = (function() {

    var trackName = document.querySelector('.player__info--track.' + id);
    var trackArtist = document.querySelector('.player__info--artist.' + id);
    var trackImageWrap = document.querySelector('.player__hero-wrap.' + id);
    var trackImage = document.querySelector('.player__hero.' + id);

    function loadTrack(data, animationClass) {
      self.audio.pause();

      if (typeof data.trackSource === 'string') {
        var trackUrl = "/resolve.json?url=" + encodeURIComponent(data.trackSource) + "&client_id=" + self.soundcloud.id;

        SC.get(trackUrl, function(SC_data) {
          renderSC(data, SC_data, animationClass);
          handleReadyState();
        });

      } else {
        render(data, animationClass);
        handleReadyState();
      }
    }

    function firstTrack() {
      loadTrack(self.playlist.current());
      preloadPlaylistImg(self.playlist.next());
      preloadPlaylistImg(self.playlist.prev());
    }

    function nextTrack() {
      loadTrack(self.playlist.setNext(), 'is-next');
      preloadPlaylistImg(self.playlist.next());
    }

    function prevTrack() {
      loadTrack(self.playlist.setPrev(), 'is-previous');
      preloadPlaylistImg(self.playlist.prev());
    }

    function preloadPlaylistImg(data) {
      if (data.image) {
        preloadImg(data.image);
      } else if (typeof data.trackSource === 'number') {
        var trackUrl = '/tracks/' + data.trackSource;

        SC.get(trackUrl, function(SC_data) {
          var imageSource = data.image || replaceArtworkString(SC_data.artwork_url, 'large', 't500x500');
          preloadImg(imageSource);
        });

      }
    }

    function preloadImg(source, callback) {
      var tempImg = new Image;

      tempImg.onload = function() {
        if (callback) {
          callback();
        }
        tempImg = null;
      };

      tempImg.src = source;
    }

    function renderHeroImg(source, animationClass) {
      var oldImgEl = document.querySelectorAll('.player__hero.' + id);
      var oldimgElLen = oldImgEl.length;

      function handleAnimationEnd() {
        if (oldimgElLen) {
          trackImageWrap.removeChild(oldImgEl[oldimgElLen - 1]);
        }
        newImgEl.classList.remove(animationClass);
        newImgEl.removeEventListener('animationend', handleAnimationEnd, false);
      }

      if (animationClass) {
        var newImgEl = document.createElement('div');
        newImgEl.className = 'player__hero ' + animationClass;

        preloadImg(source, function() {
          newImgEl.style.backgroundImage = 'url(' + source + ')';
          newImgEl.className += ' is-loaded';
        });

        trackImageWrap.appendChild(newImgEl);
        newImgEl.addEventListener('animationend', handleAnimationEnd, false);
      } else {
        if (oldimgElLen) {
          oldImgEl[oldimgElLen - 1].style.backgroundImage = 'url(' + source + ')';
        } else {
          var newImgEl = document.createElement('div');
          newImgEl.className = 'player__hero';

          preloadImg(source, function() {
            newImgEl.style.backgroundImage = 'url(' + source + ')';
            newImgEl.className += ' is-loaded';
          });

          trackImageWrap.appendChild(newImgEl);
        }
      }
    }

    function decideHeroRenderMethod(heroImageSrc, animationClass) {
      if (Modernizr.cssanimations && animationClass) {
        renderHeroImg(heroImageSrc, animationClass);
      } else {
        renderHeroImg(heroImageSrc);
      }
    }

    function renderSC(data, SC_data, animationClass) {
      var title = data.trackName || SC_data.title.slice(SC_data.title.indexOf('-') + 1).trim();
      var heroImageSrc = data.image || replaceArtworkString(SC_data.artwork_url, 'large', 't500x500');

      decideHeroRenderMethod(heroImageSrc, animationClass);
      self.audio.src = SC_data.uri + '/stream?client_id=' + self.soundcloud.id;
      trackArtist.innerHTML = data.artist || SC_data.user.username;
      trackName.innerHTML = '<a href="' + SC_data.permalink_url + '">' + title + '</a>';
      self.trackLength = SC_data.duration / 1000;
      self.scrubber.renderTimeTotal();
      self.scrubber.triggerEvents();
    }

    function render(data, animationClass) {
      var heroImageSrc = data.image;

      decideHeroRenderMethod(heroImageSrc, animationClass);
      self.audio.src = data.trackSource;
      trackArtist.innerHTML = data.artist || 'Various Artists';
      trackName.innerHTML = data.trackName || 'Various Songs';
      self.trackLength = 0;
      self.scrubber.renderTimeTotal();
      self.scrubber.triggerEvents();
    }

    function handleReadyState() {
      if (self.audio.readyState >= 1) {
        trackMetaLoaded();
      } else {
        self.audio.addEventListener('loadedmetadata', trackMetaLoaded, false);
      }
    }

    function trackMetaLoaded() {
      self.trackLength = self.audio.duration;
      self.scrubber.renderTimeTotal();

      if (self.playing) {
        self.audio.play();
      }
    }

    function replaceArtworkString(string, partToReplace, replacement) {
      var index = string.lastIndexOf(partToReplace);
      var strEnd = string.slice(index + partToReplace.length);
      var strStart = string.slice(0, index);
      var newString = strStart + replacement + strEnd;

      return newString;
    }

    return {
      track: loadTrack,
      firstTrack: firstTrack,
      nextTrack: nextTrack,
      prevTrack: prevTrack
    };

  })();

  self.focusCapability = (function() {

    var on = false;
    var tab = 9;

    function init() {
      document.addEventListener('keydown', addVisualFocus, false);
    }

    function addVisualFocus(e) {
      var key = e.which || e.keyCode;

      if (key === tab) {
        self.focusCapability.on = true;
        self.el.classList.add('is-focusable');
        document.addEventListener('mousedown', removeVisualFocus, false);
      }
    }

    function removeVisualFocus() {
      self.focusCapability.on = false;
      self.el.classList.remove('is-focusable');
      this.removeEventListener('click', removeVisualFocus, false);
    }

    return {
      init: init,
      on: on
    };
  })();

  self.audioState = (function() {

    var triggerDuringPlay;

    function init() {
      self.audio.addEventListener('play', playing, false);
      self.audio.addEventListener('pause', paused, false);
      self.audio.addEventListener('ended', ended, false);
    }

    function moveTimeline() {
      self.scrubber.moveTimeline();
      triggerDuringPlay = requestAnimationFrame(moveTimeline);
    }

    function playing() {
      self.playing = true;
      self.playButton.el.classList.add('is-playing');
      triggerDuringPlay = requestAnimationFrame(moveTimeline);
    }

    function paused() {
      cancelAnimationFrame(triggerDuringPlay);

      if (!self.playing) {
        self.playButton.el.classList.remove('is-playing');
      }
    }

    function ended() {
      cancelAnimationFrame(triggerDuringPlay);

      if (self.playing && !self.scrubber.dragging) {
        self.load.nextTrack();
      }
    }

    return {
      init: init
    };
  })();

  return self;
};

var utilities = (function() {
  'use strict';

  function initLocalStorageItem(property, defaultValue, callback) {
    var returnedValue = localStorage.getItem(property);

    if (!returnedValue) {
      localStorage.setItem(property, defaultValue);
      callback(defaultValue);
    } else {
      callback(returnedValue);
    }
  }

  return {
    initLocalStorageItem: initLocalStorageItem
  };
})();
window.onload = function() {

    debugger
  first = new Player('first');

  first.init({
    playlist: [{
      trackSource: "https://soundcloud.com/chancetherapper/angels-feat-saba"
    }, {
     trackSource: "https://soundcloud.com/sangobeats/agorinha"
    }, {
      trackSource: "https://soundcloud.com/noirsound/segohotline",      image: "http://i63.tinypic.com/3025s9x.png"
    }]
  });

  second = new Player('second'); //Invoke the object (function assigned to the object) and assign to myCalc
  second.init({
    playlist: [{
      trackSource: "https://soundcloud.com/soulection/soulection-radio-show-244"
    }, {
      trackSource: "https://soundcloud.com/stwosc/haunted-ft-sevdaliza"
    }]
  });

};
