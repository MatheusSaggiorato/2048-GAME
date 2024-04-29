function KeyboardInputManager() {
  this.events = {},
  window.navigator.msPointerEnabled ? (this.eventTouchstart = "MSPointerDown",
  this.eventTouchmove = "MSPointerMove",
  this.eventTouchend = "MSPointerUp") : (this.eventTouchstart = "touchstart",
  this.eventTouchmove = "touchmove",
  this.eventTouchend = "touchend"),
  this.listen()
}
function HTMLActuator() {
  this.tileContainer = document.querySelector(".tile-container"),
  this.scoreContainer = document.querySelector(".score-container"),
  this.bestContainer = document.querySelector(".best-container"),
  this.messageContainer = document.querySelector(".game-message"),
  this.score = 0
}
function Grid(e, t) {
  this.size = e,
  this.cells = t ? this.fromState(t) : this.empty()
}
function Tile(e, t) {
  this.x = e.x,
  this.y = e.y,
  this.value = t || 2,
  this.previousPosition = null,
  this.mergedFrom = null
}
function LocalStorageManager() {
  this.bestScoreKey = "bestScore",
  this.gameStateKey = "gameState",
  this.noticeClosedKey = "noticeClosed",
  this.cookieNoticeClosedKey = "cookieNoticeClosed",
  this.newsletterClosedKey = "newsletterClosed";
  var e = this.localStorageSupported();
  this.storage = e ? window.localStorage : window.fakeStorage
}
function GameManager(e, t, n, o) {
  this.size = e,
  this.inputManager = new t,
  this.storageManager = new o,
  this.actuator = new n,
  this.startTiles = 2,
  this.inputManager.on("move", this.move.bind(this)),
  this.inputManager.on("restart", this.restart.bind(this)),
  this.inputManager.on("keepPlaying", this.keepPlaying.bind(this)),
  this.setup()
}
function runApplication() {
  new GameManager(4,KeyboardInputManager,HTMLActuator,LocalStorageManager);
  var e = new LocalStorageManager
    , t = document.querySelector(".cookie-notice")
    , n = document.querySelector(".cookie-notice-dismiss-button");
  e.getCookieNoticeClosed() ? t.parentNode.removeChild(t) : n.addEventListener("click", (function() {
      t.parentNode.removeChild(t),
      e.setCookieNoticeClosed(!0),
      void 0 !== typeof gtag && gtag("event", "closed", {
          event_category: "cookie-notice"
      })
  }
  ));
  var o = document.querySelector(".how-to-play-link")
    , i = document.querySelector(".game-explanation");
  o && i && o.addEventListener("click", (function() {
      i.scrollIntoView({
          behavior: "smooth",
          block: "center"
      }),
      i.addEventListener("animationend", (function() {
          i.classList.remove("game-explanation-highlighted")
      }
      )),
      i.classList.add("game-explanation-highlighted")
  }
  ));
  var r = document.querySelector(".start-playing-link")
    , a = document.querySelector(".game-container");
  r && a && r.addEventListener("click", (function() {
      a.scrollIntoView({
          behavior: "smooth",
          block: "center"
      })
  }
  ));
  try {
      setupNewsletter()
  } catch (e) {}
}
Function.prototype.bind = Function.prototype.bind || function(e) {
  var t = this;
  return function(n) {
      n instanceof Array || (n = [n]),
      t.apply(e, n)
  }
}
,
function() {
  if (void 0 !== window.Element && !("classList"in document.documentElement)) {
      var e, t, n, o = Array.prototype, i = o.push, r = o.splice, a = o.join;
      s.prototype = {
          add: function(e) {
              this.contains(e) || (i.call(this, e),
              this.el.className = this.toString())
          },
          contains: function(e) {
              return -1 != this.el.className.indexOf(e)
          },
          item: function(e) {
              return this[e] || null
          },
          remove: function(e) {
              if (this.contains(e)) {
                  for (var t = 0; t < this.length && this[t] != e; t++)
                      ;
                  r.call(this, t, 1),
                  this.el.className = this.toString()
              }
          },
          toString: function() {
              return a.call(this, " ")
          },
          toggle: function(e) {
              return this.contains(e) ? this.remove(e) : this.add(e),
              this.contains(e)
          }
      },
      window.DOMTokenList = s,
      e = HTMLElement.prototype,
      t = "classList",
      n = function() {
          return new s(this)
      }
      ,
      Object.defineProperty ? Object.defineProperty(e, t, {
          get: n
      }) : e.__defineGetter__(t, n)
  }
  function s(e) {
      this.el = e;
      for (var t = e.className.replace(/^\s+|\s+$/g, "").split(/\s+/), n = 0; n < t.length; n++)
          i.call(this, t[n])
  }
}(),
function() {
  for (var e = 0, t = ["webkit", "moz"], n = 0; n < t.length && !window.requestAnimationFrame; ++n)
      window.requestAnimationFrame = window[t[n] + "RequestAnimationFrame"],
      window.cancelAnimationFrame = window[t[n] + "CancelAnimationFrame"] || window[t[n] + "CancelRequestAnimationFrame"];
  window.requestAnimationFrame || (window.requestAnimationFrame = function(t) {
      var n = (new Date).getTime()
        , o = Math.max(0, 16 - (n - e))
        , i = window.setTimeout((function() {
          t(n + o)
      }
      ), o);
      return e = n + o,
      i
  }
  ),
  window.cancelAnimationFrame || (window.cancelAnimationFrame = function(e) {
      clearTimeout(e)
  }
  )
}(),
KeyboardInputManager.prototype.on = function(e, t) {
  this.events[e] || (this.events[e] = []),
  this.events[e].push(t)
}
,
KeyboardInputManager.prototype.emit = function(e, t) {
  var n = this.events[e];
  n && n.forEach((function(e) {
      e(t)
  }
  ))
}
,
KeyboardInputManager.prototype.listen = function() {
  var e, t, n = this, o = {
      38: 0,
      39: 1,
      40: 2,
      37: 3,
      75: 0,
      76: 1,
      74: 2,
      72: 3,
      87: 0,
      68: 1,
      83: 2,
      65: 3
  };
  document.addEventListener("keydown", (function(e) {
      var t = e.altKey || e.ctrlKey || e.metaKey || e.shiftKey
        , i = o[e.which];
      n.targetIsInput(e) || (t || void 0 !== i && (e.preventDefault(),
      n.emit("move", i)),
      t || 82 !== e.which || n.restart.call(n, e))
  }
  )),
  this.bindButtonPress(".retry-button", this.restart),
  this.bindButtonPress(".restart-button", this.restart),
  this.bindButtonPress(".keep-playing-button", this.keepPlaying);
  var i = document.getElementsByClassName("game-container")[0];
  i.addEventListener(this.eventTouchstart, (function(o) {
      !window.navigator.msPointerEnabled && o.touches.length > 1 || o.targetTouches.length > 1 || n.targetIsInput(o) || (window.navigator.msPointerEnabled ? (e = o.pageX,
      t = o.pageY) : (e = o.touches[0].clientX,
      t = o.touches[0].clientY),
      o.preventDefault())
  }
  ), {
      passive: !0
  }),
  i.addEventListener(this.eventTouchmove, (function(e) {
      e.preventDefault()
  }
  ), {
      passive: !0
  }),
  i.addEventListener(this.eventTouchend, (function(o) {
      if (!(!window.navigator.msPointerEnabled && o.touches.length > 0 || o.targetTouches.length > 0 || n.targetIsInput(o))) {
          var i, r;
          window.navigator.msPointerEnabled ? (i = o.pageX,
          r = o.pageY) : (i = o.changedTouches[0].clientX,
          r = o.changedTouches[0].clientY);
          var a = i - e
            , s = Math.abs(a)
            , l = r - t
            , c = Math.abs(l);
          Math.max(s, c) > 10 && n.emit("move", s > c ? a > 0 ? 1 : 3 : l > 0 ? 2 : 0)
      }
  }
  ))
}
,
KeyboardInputManager.prototype.restart = function(e) {
  e.preventDefault(),
  this.emit("restart")
}
,
KeyboardInputManager.prototype.keepPlaying = function(e) {
  e.preventDefault(),
  this.emit("keepPlaying")
}
,
KeyboardInputManager.prototype.bindButtonPress = function(e, t) {
  var n = document.querySelector(e);
  n.addEventListener("click", t.bind(this)),
  n.addEventListener(this.eventTouchend, t.bind(this))
}
,
KeyboardInputManager.prototype.targetIsInput = function(e) {
  return "input" === e.target.tagName.toLowerCase()
}
,
HTMLActuator.prototype.actuate = function(e, t) {
  var n = this;
  window.requestAnimationFrame((function() {
      n.clearContainer(n.tileContainer),
      e.cells.forEach((function(e) {
          e.forEach((function(e) {
              e && n.addTile(e)
          }
          ))
      }
      )),
      n.updateScore(t.score),
      n.updateBestScore(t.bestScore),
      t.terminated && (t.over ? n.message(!1) : t.won && n.message(!0))
  }
  ))
}
,
HTMLActuator.prototype.continueGame = function() {
  "undefined" != typeof gtag && gtag("event", "restart", {
      event_category: "game"
  }),
  this.clearMessage()
}
,
HTMLActuator.prototype.clearContainer = function(e) {
  for (; e.firstChild; )
      e.removeChild(e.firstChild)
}
,
HTMLActuator.prototype.addTile = function(e) {
  var t = this
    , n = document.createElement("div")
    , o = document.createElement("div")
    , i = e.previousPosition || {
      x: e.x,
      y: e.y
  }
    , r = this.positionClass(i)
    , a = ["tile", "tile-" + e.value, r];
  e.value > 2048 && a.push("tile-super"),
  this.applyClasses(n, a),
  o.classList.add("tile-inner"),
  o.textContent = e.value,
  e.previousPosition ? window.requestAnimationFrame((function() {
      a[2] = t.positionClass({
          x: e.x,
          y: e.y
      }),
      t.applyClasses(n, a)
  }
  )) : e.mergedFrom ? (a.push("tile-merged"),
  this.applyClasses(n, a),
  e.mergedFrom.forEach((function(e) {
      t.addTile(e)
  }
  ))) : (a.push("tile-new"),
  this.applyClasses(n, a)),
  n.appendChild(o),
  this.tileContainer.appendChild(n)
}
,
HTMLActuator.prototype.applyClasses = function(e, t) {
  e.setAttribute("class", t.join(" "))
}
,
HTMLActuator.prototype.normalizePosition = function(e) {
  return {
      x: e.x + 1,
      y: e.y + 1
  }
}
,
HTMLActuator.prototype.positionClass = function(e) {
  return "tile-position-" + (e = this.normalizePosition(e)).x + "-" + e.y
}
,
HTMLActuator.prototype.updateScore = function(e) {
  this.clearContainer(this.scoreContainer);
  var t = e - this.score;
  if (this.score = e,
  this.scoreContainer.textContent = this.score,
  t > 0) {
      var n = document.createElement("div");
      n.classList.add("score-addition"),
      n.textContent = "+" + t,
      this.scoreContainer.appendChild(n)
  }
}
,
HTMLActuator.prototype.updateBestScore = function(e) {
  this.bestContainer.textContent = e
}
,
HTMLActuator.prototype.message = function(e) {
  var t = e ? "game-won" : "game-over"
    , n = e ? "You win!" : "Game over!";
  "undefined" != typeof gtag && gtag("event", "end", {
      event_category: "game",
      event_label: t,
      value: this.score
  }),
  this.messageContainer.classList.add(t),
  this.messageContainer.getElementsByTagName("p")[0].textContent = n
}
,
HTMLActuator.prototype.clearMessage = function() {
  this.messageContainer.classList.remove("game-won"),
  this.messageContainer.classList.remove("game-over")
}
,
Grid.prototype.empty = function() {
  for (var e = [], t = 0; t < this.size; t++)
      for (var n = e[t] = [], o = 0; o < this.size; o++)
          n.push(null);
  return e
}
,
Grid.prototype.fromState = function(e) {
  for (var t = [], n = 0; n < this.size; n++)
      for (var o = t[n] = [], i = 0; i < this.size; i++) {
          var r = e[n][i];
          o.push(r ? new Tile(r.position,r.value) : null)
      }
  return t
}
,
Grid.prototype.randomAvailableCell = function() {
  var e = this.availableCells();
  if (e.length)
      return e[Math.floor(Math.random() * e.length)]
}
,
Grid.prototype.availableCells = function() {
  var e = [];
  return this.eachCell((function(t, n, o) {
      o || e.push({
          x: t,
          y: n
      })
  }
  )),
  e
}
,
Grid.prototype.eachCell = function(e) {
  for (var t = 0; t < this.size; t++)
      for (var n = 0; n < this.size; n++)
          e(t, n, this.cells[t][n])
}
,
Grid.prototype.cellsAvailable = function() {
  return !!this.availableCells().length
}
,
Grid.prototype.cellAvailable = function(e) {
  return !this.cellOccupied(e)
}
,
Grid.prototype.cellOccupied = function(e) {
  return !!this.cellContent(e)
}
,
Grid.prototype.cellContent = function(e) {
  return this.withinBounds(e) ? this.cells[e.x][e.y] : null
}
,
Grid.prototype.insertTile = function(e) {
  this.cells[e.x][e.y] = e
}
,
Grid.prototype.removeTile = function(e) {
  this.cells[e.x][e.y] = null
}
,
Grid.prototype.withinBounds = function(e) {
  return e.x >= 0 && e.x < this.size && e.y >= 0 && e.y < this.size
}
,
Grid.prototype.serialize = function() {
  for (var e = [], t = 0; t < this.size; t++)
      for (var n = e[t] = [], o = 0; o < this.size; o++)
          n.push(this.cells[t][o] ? this.cells[t][o].serialize() : null);
  return {
      size: this.size,
      cells: e
  }
}
,
Tile.prototype.savePosition = function() {
  this.previousPosition = {
      x: this.x,
      y: this.y
  }
}
,
Tile.prototype.updatePosition = function(e) {
  this.x = e.x,
  this.y = e.y
}
,
Tile.prototype.serialize = function() {
  return {
      position: {
          x: this.x,
          y: this.y
      },
      value: this.value
  }
}
,
window.fakeStorage = {
  _data: {},
  setItem: function(e, t) {
      return this._data[e] = String(t)
  },
  getItem: function(e) {
      return this._data.hasOwnProperty(e) ? this._data[e] : void 0
  },
  removeItem: function(e) {
      return delete this._data[e]
  },
  clear: function() {
      return this._data = {}
  }
},
LocalStorageManager.prototype.localStorageSupported = function() {
  var e = "test";
  try {
      var t = window.localStorage;
      return t.setItem(e, "1"),
      t.removeItem(e),
      !0
  } catch (e) {
      return !1
  }
}
,
LocalStorageManager.prototype.getBestScore = function() {
  return this.storage.getItem(this.bestScoreKey) || 0
}
,
LocalStorageManager.prototype.setBestScore = function(e) {
  this.storage.setItem(this.bestScoreKey, e)
}
,
LocalStorageManager.prototype.getGameState = function() {
  var e = this.storage.getItem(this.gameStateKey);
  return e ? JSON.parse(e) : null
}
,
LocalStorageManager.prototype.setGameState = function(e) {
  this.storage.setItem(this.gameStateKey, JSON.stringify(e))
}
,
LocalStorageManager.prototype.clearGameState = function() {
  this.storage.removeItem(this.gameStateKey)
}
,
LocalStorageManager.prototype.setNoticeClosed = function(e) {
  this.storage.setItem(this.noticeClosedKey, JSON.stringify(e))
}
,
LocalStorageManager.prototype.getNoticeClosed = function() {
  return JSON.parse(this.storage.getItem(this.noticeClosedKey) || "false")
}
,
LocalStorageManager.prototype.setCookieNoticeClosed = function(e) {
  this.storage.setItem(this.cookieNoticeClosedKey, JSON.stringify(e))
}
,
LocalStorageManager.prototype.getCookieNoticeClosed = function() {
  return JSON.parse(this.storage.getItem(this.cookieNoticeClosedKey) || "false")
}
,
LocalStorageManager.prototype.setNewsletterClosed = function(e) {
  this.storage.setItem(this.newsletterClosedKey, JSON.stringify(e))
}
,
LocalStorageManager.prototype.getNewsletterClosed = function() {
  return JSON.parse(this.storage.getItem(this.newsletterClosedKey) || "false")
}
,
GameManager.prototype.restart = function() {
  (this.isGameTerminated() && this.over || confirm("Are you sure you want to start a new game? All progress will be lost.")) && (this.storageManager.clearGameState(),
  this.actuator.continueGame(),
  this.setup())
}
,
GameManager.prototype.keepPlaying = function() {
  this.keepPlaying = !0,
  this.actuator.continueGame()
}
,
GameManager.prototype.isGameTerminated = function() {
  return this.over || this.won && !this.keepPlaying
}
,
GameManager.prototype.setup = function() {
  var e = this.storageManager.getGameState();
  e ? (this.grid = new Grid(e.grid.size,e.grid.cells),
  this.score = e.score,
  this.over = e.over,
  this.won = e.won,
  this.keepPlaying = e.keepPlaying) : (this.grid = new Grid(this.size),
  this.score = 0,
  this.over = !1,
  this.won = !1,
  this.keepPlaying = !1,
  this.addStartTiles()),
  this.actuate()
}
,
GameManager.prototype.addStartTiles = function() {
  for (var e = 0; e < this.startTiles; e++)
      this.addRandomTile()
}
,
GameManager.prototype.addRandomTile = function() {
  if (this.grid.cellsAvailable()) {
      var e = Math.random() < .9 ? 2 : 4
        , t = new Tile(this.grid.randomAvailableCell(),e);
      this.grid.insertTile(t)
  }
}
,
GameManager.prototype.actuate = function() {
  this.storageManager.getBestScore() < this.score && this.storageManager.setBestScore(this.score),
  this.over ? this.storageManager.clearGameState() : this.storageManager.setGameState(this.serialize()),
  this.actuator.actuate(this.grid, {
      score: this.score,
      over: this.over,
      won: this.won,
      bestScore: this.storageManager.getBestScore(),
      terminated: this.isGameTerminated()
  })
}
,
GameManager.prototype.serialize = function() {
  return {
      grid: this.grid.serialize(),
      score: this.score,
      over: this.over,
      won: this.won,
      keepPlaying: this.keepPlaying
  }
}
,
GameManager.prototype.prepareTiles = function() {
  this.grid.eachCell((function(e, t, n) {
      n && (n.mergedFrom = null,
      n.savePosition())
  }
  ))
}
,
GameManager.prototype.moveTile = function(e, t) {
  this.grid.cells[e.x][e.y] = null,
  this.grid.cells[t.x][t.y] = e,
  e.updatePosition(t)
}
,
GameManager.prototype.move = function(e) {
  var t = this;
  if (!this.isGameTerminated()) {
      var n, o, i = this.getVector(e), r = this.buildTraversals(i), a = !1;
      this.prepareTiles(),
      r.x.forEach((function(e) {
          r.y.forEach((function(r) {
              if (n = {
                  x: e,
                  y: r
              },
              o = t.grid.cellContent(n)) {
                  var s = t.findFarthestPosition(n, i)
                    , l = t.grid.cellContent(s.next);
                  if (l && l.value === o.value && !l.mergedFrom) {
                      var c = new Tile(s.next,2 * o.value);
                      c.mergedFrom = [o, l],
                      t.grid.insertTile(c),
                      t.grid.removeTile(o),
                      o.updatePosition(s.next),
                      t.score += c.value,
                      2048 === c.value && (t.won = !0)
                  } else
                      t.moveTile(o, s.farthest);
                  t.positionsEqual(n, o) || (a = !0)
              }
          }
          ))
      }
      )),
      a && (this.addRandomTile(),
      this.movesAvailable() || (this.over = !0),
      this.actuate())
  }
}
,
GameManager.prototype.getVector = function(e) {
  return {
      0: {
          x: 0,
          y: -1
      },
      1: {
          x: 1,
          y: 0
      },
      2: {
          x: 0,
          y: 1
      },
      3: {
          x: -1,
          y: 0
      }
  }[e]
}
,
GameManager.prototype.buildTraversals = function(e) {
  for (var t = {
      x: [],
      y: []
  }, n = 0; n < this.size; n++)
      t.x.push(n),
      t.y.push(n);
  return 1 === e.x && (t.x = t.x.reverse()),
  1 === e.y && (t.y = t.y.reverse()),
  t
}
,
GameManager.prototype.findFarthestPosition = function(e, t) {
  var n;
  do {
      e = {
          x: (n = e).x + t.x,
          y: n.y + t.y
      }
  } while (this.grid.withinBounds(e) && this.grid.cellAvailable(e));
  return {
      farthest: n,
      next: e
  }
}
,
GameManager.prototype.movesAvailable = function() {
  return this.grid.cellsAvailable() || this.tileMatchesAvailable()
}
,
GameManager.prototype.tileMatchesAvailable = function() {
  for (var e, t = 0; t < this.size; t++)
      for (var n = 0; n < this.size; n++)
          if (e = this.grid.cellContent({
              x: t,
              y: n
          }))
              for (var o = 0; o < 4; o++) {
                  var i = this.getVector(o)
                    , r = {
                      x: t + i.x,
                      y: n + i.y
                  }
                    , a = this.grid.cellContent(r);
                  if (a && a.value === e.value)
                      return !0
              }
  return !1
}
,
GameManager.prototype.positionsEqual = function(e, t) {
  return e.x === t.x && e.y === t.y
}
,
window.requestAnimationFrame((function() {
  void 0 !== window.PokiSDK ? PokiSDK.init().then((function() {
      PokiSDK.gameLoadingStart(),
      PokiSDK.gameLoadingProgress({
          percentageDone: 1
      }),
      PokiSDK.gameLoadingFinished(),
      runApplication()
  }
  )).catch((()=>{
      runApplication()
  }
  )) : runApplication()
}
));
var MONITORING_PAUSE_DURATION = 3e3
, cb = "function" == typeof requestIdleCallback ? function(e) {
  return requestIdleCallback(e)
}
: function(e) {
  return setTimeout(e, 100)
}
, loop = function(e) {
  cb((function() {
      try {
          e()
      } catch (e) {
          console.error(e)
      }
      loop(e)
  }
  ))
};
monitorAndRestoreFocus();
var now = "undefined" != typeof performance && performance.now ? performance.now.bind(performance) : Date.now.bind(Date);
function buildFocusableElementSet() {
  if ("function" == typeof WeakSet)
      return new WeakSet;
  var e = []
    , t = void 0;
  function n() {
      e = e.filter((function(e) {
          return document.body.contains(e)
      }
      ))
  }
  function o() {
      clearTimeout(t),
      t = setTimeout(n, 1e3)
  }
  return {
      add: function(t) {
          o(),
          this.has(t) || e.push(t)
      },
      has: function(t) {
          return o(),
          -1 !== e.indexOf(t)
      }
  }
}
var knownFocusableElements = buildFocusableElementSet();
function isFocusable(e) {
  if (!(e instanceof HTMLElement))
      return !1;
  if (knownFocusableElements.has(e))
      return !0;
  var t = e.nodeName.toLowerCase()
    , n = !1;
  parseInt(e.getAttribute("tabindex") || "", 10) > -1 && (n = !0);
  var o = function() {
      return !("disabled"in e && e.disabled || !(e.offsetWidth || e.offsetHeight || e.getClientRects().length))
  };
  switch (t) {
  case "area":
      n = !0;
      break;
  case "input":
  case "select":
  case "textarea":
  case "button":
  case "object":
      n = o();
      break;
  case "a":
      n = e.hasAttribute("href") && o()
  }
  return n && knownFocusableElements.add(e),
  n
}
function monitorAndRestoreFocus() {
  var e = null
    , t = null;
  document.addEventListener("keydown", (function(e) {
      "Tab" !== e.key && 9 !== e.keyCode || (t = now())
  }
  ), !0),
  console.log("m start"),
  loop((function() {
      var n = t && now() - t < MONITORING_PAUSE_DURATION;
      n || (t = null);
      var o = document.activeElement;
      if ("iframe" === (null == o ? void 0 : o.tagName.toLowerCase())) {
          if (n)
              return;
          e ? e.focus() : o.blur()
      } else
          e = o && isFocusable(o) ? o : null
  }
  ))
}
function setupNewsletter() {
  const e = new LocalStorageManager
    , t = document.querySelector(".newsletter-form-container");
  if (!t || e.getNewsletterClosed())
      return;
  const n = t.querySelector("form.newsletter-form")
    , o = t.querySelector(".newsletter-form-intro")
    , i = t.querySelector(".newsletter-form-outcome")
    , r = t.querySelector(".newsletter-form-show-button")
    , a = t.querySelector(".close");
  fetch("https://assets.mailerlite.com/jsonp/909869/forms/118843917336577470/takel"),
  t.style.display = "block";
  const s = n.getBoundingClientRect()
    , l = o.getBoundingClientRect()
    , c = a.getBoundingClientRect();
  function u(e) {
      e ? i.querySelector(".error").style.display = "none" : i.querySelector(".success").style.display = "none",
      i.style.display = "",
      i.style.transform = `translateY(${s.height + 15}px)`,
      i.style.opacity = 0,
      a.style.transform = "",
      requestAnimationFrame((function() {
          const e = i.getBoundingClientRect();
          i.style.transform = "translateY(0px)",
          n.style.transform = `translateY(-${s.height + 15}px)`,
          t.style.height = e.height + "px",
          n.style.opacity = 0,
          i.style.opacity = 1,
          n.addEventListener("transitionend", (function() {
              n.style.display = "none"
          }
          ))
      }
      ))
  }
  t.style.height = l.height + "px",
  n.style.display = "none",
  i.style.display = "none",
  r.addEventListener("click", (function() {
      const e = n.querySelector("input");
      n.style.display = "",
      n.style.transform = `translateY(${l.height + 15}px)`,
      n.style.opacity = 0,
      a.style.transform = `translateY(-${c.height + 15}px)`,
      e.focus({
          preventScroll: !0
      }),
      requestAnimationFrame((function() {
          n.style.transform = "translateY(0px)",
          o.style.transform = `translateY(-${l.height + 15}px)`,
          t.style.height = s.height + "px",
          o.style.opacity = 0,
          n.style.opacity = 1,
          o.addEventListener("transitionend", (function() {
              e.focus(),
              t.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                  inline: "center"
              })
          }
          ))
      }
      ))
  }
  )),
  n.addEventListener("submit", (function(t) {
      t.preventDefault();
      const o = new FormData(n);
      fetch(n.action, {
          method: "POST",
          body: o,
          mode: "cors"
      }).then((e=>{
          if (e.ok)
              return e.json();
          throw new Error("Network response was not ok.")
      }
      )).then((t=>{
          if (!0 !== t.success)
              throw new Error("Network response was not ok.");
          u(!0),
          e.setNewsletterClosed(!0)
      }
      )).catch((()=>{
          u(!1)
      }
      ))
  }
  )),
  a.addEventListener("click", (function(n) {
      n.preventDefault(),
      t.remove(),
      e.setNewsletterClosed(!0)
  }
  ))
}
