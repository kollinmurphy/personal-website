(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity)
      fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy)
      fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const scriptRel = "modulepreload";
const assetsURL = function (dep, importerUrl) {
  return new URL(dep, importerUrl).href;
};
const seen = {};
const __vitePreload = function preload(baseModule, deps, importerUrl) {
  if (!deps || deps.length === 0) {
    return baseModule();
  }
  const links = document.getElementsByTagName("link");
  return Promise.all(deps.map((dep) => {
    dep = assetsURL(dep, importerUrl);
    if (dep in seen)
      return;
    seen[dep] = true;
    const isCss = dep.endsWith(".css");
    const cssSelector = isCss ? '[rel="stylesheet"]' : "";
    const isBaseRelative = !!importerUrl;
    if (isBaseRelative) {
      for (let i = links.length - 1; i >= 0; i--) {
        const link2 = links[i];
        if (link2.href === dep && (!isCss || link2.rel === "stylesheet")) {
          return;
        }
      }
    } else if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
      return;
    }
    const link = document.createElement("link");
    link.rel = isCss ? "stylesheet" : scriptRel;
    if (!isCss) {
      link.as = "script";
      link.crossOrigin = "";
    }
    link.href = dep;
    document.head.appendChild(link);
    if (isCss) {
      return new Promise((res, rej) => {
        link.addEventListener("load", res);
        link.addEventListener("error", () => rej(new Error(`Unable to preload CSS for ${dep}`)));
      });
    }
  })).then(() => baseModule());
};
const initializeScripts = async () => {
  const [
    canvasTxt,
    color,
    creditsScreen,
    highScoresScreen,
    controlsScreen,
    gameplayScreen,
    attractScreen
  ] = await Promise.all([
    __vitePreload(() => import("./index-f7bd3e0a.js").then((n) => n.i), true ? [] : void 0, import.meta.url),
    __vitePreload(() => import("./index-5f742df1.js").then((n) => n.i), true ? [] : void 0, import.meta.url),
    __vitePreload(() => import("./index-c10b9321.js"), true ? [] : void 0, import.meta.url),
    __vitePreload(() => import("./index-0f37a71a.js"), true ? ["./index-0f37a71a.js", "./scoring-e97370d4.js"] : void 0, import.meta.url),
    __vitePreload(() => import("./index-242bf206.js"), true ? [] : void 0, import.meta.url),
    __vitePreload(() => import("./index-778bd7ae.js"), true ? ["./index-778bd7ae.js", "./sound-23b6522c.js", "./scoring-e97370d4.js"] : void 0, import.meta.url),
    __vitePreload(() => import("./index-85081b49.js"), true ? ["./index-85081b49.js", "./sound-23b6522c.js", "./scoring-e97370d4.js"] : void 0, import.meta.url)
  ]).catch((error) => {
    console.error(error);
    throw new Error("Could not load scripts");
  });
  scripts = {
    canvasTxt: canvasTxt.default,
    color: color.default,
    screens: {
      credits: creditsScreen.creditsScreen,
      highScores: highScoresScreen.highScoresScreen,
      controls: controlsScreen.controlsScreen,
      gameplay: gameplayScreen.gameplayScreen,
      attract: attractScreen.attractScreen
    }
  };
};
let scripts;
const Scripts = () => scripts;
const createCallbackId$2 = (num) => num;
const createEventSystem = () => {
  let nextId = 1;
  const subscriptions = /* @__PURE__ */ new Map();
  const unsubscribe = (unsubscribeOptions) => {
    const currentSubscriptions = subscriptions.get(unsubscribeOptions.type);
    if (!currentSubscriptions)
      return;
    subscriptions.set(
      unsubscribeOptions.type,
      currentSubscriptions.filter(
        (subscription) => subscription.id !== unsubscribeOptions.id
      )
    );
  };
  return {
    subscribe: (subscribeOptions) => {
      const id = createCallbackId$2(nextId++);
      subscriptions.set(subscribeOptions.type, [
        ...subscriptions.get(subscribeOptions.type) || [],
        {
          id,
          callback: subscribeOptions.callback
        }
      ]);
      return () => {
        unsubscribe({
          type: subscribeOptions.type,
          id
        });
      };
    },
    publish: (event) => {
      const currentSubscriptions = subscriptions.get(event.type);
      if (!currentSubscriptions)
        return;
      currentSubscriptions.forEach(
        (subscription) => subscription.callback(event)
      );
    }
  };
};
const STAR_COUNT = 250;
const MAX_STAR_SIZE = 10;
const createStarBackground = ({
  canvas,
  context
}) => {
  let flickers = [];
  const particles = Array.from({ length: STAR_COUNT }, () => {
    const distance = Math.random() * 30 + 1;
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.ceil(MAX_STAR_SIZE / distance),
      speed: 0.25 / distance,
      opacity: Math.random() * 0.3 + 0.1
    };
  });
  return {
    render: () => {
      context.fillStyle = "black";
      context.fillRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        context.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        context.beginPath();
        context.fillRect(particle.x, particle.y, particle.size, particle.size);
        context.closePath();
      }
    },
    update: (deltaTime) => {
      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        particle.y += particle.speed * deltaTime;
        if (particle.y > canvas.height) {
          particle.x = Math.random() * canvas.width;
          particle.y = -particle.size;
        }
        if (Math.random() < 0.01) {
          flickers.push({
            index: i,
            opacity: particle.opacity,
            ms: 100
          });
          particle.opacity = Math.random() * 0.3 + 0.1;
        }
      }
      for (let i = 0; i < flickers.length; i++) {
        const flicker = flickers[i];
        flicker.ms -= deltaTime;
        if (flicker.ms <= 0)
          particles[flicker.index].opacity = flicker.opacity;
      }
      flickers = flickers.filter((flicker) => flicker.ms > 0);
    }
  };
};
const loadAudio = (filename) => {
  const element = document.createElement("audio");
  element.src = `/galaga/assets/audio/${filename}`;
  element.preload = "auto";
  return new Promise((resolve, reject) => {
    element.oncanplaythrough = () => {
      resolve(element);
    };
    element.onerror = () => {
      reject(`Could not load audio ${filename}`);
    };
  });
};
const soundFiles = [
  { key: "input", filename: "input.wav" },
  { key: "enemy-die", filename: "enemy-die.wav" },
  { key: "player-die", filename: "player-die.wav" },
  { key: "fire", filename: "fire.wav" },
  { key: "coin-credit", filename: "coin-credit.wav" },
  { key: "background", filename: "background.mp3" }
];
const initializeAudio = async () => {
  const sounds = await Promise.all(
    soundFiles.map(async ({ filename, key }) => {
      const sound = await loadAudio(filename);
      return [key, sound];
    })
  );
  const map = new Map(sounds);
  const api = {
    stopAll: () => {
      map.forEach((audio2) => {
        audio2.pause();
        audio2.currentTime = 0;
      });
    },
    play: async ({
      key,
      loop = false,
      volume = 0.5,
      stopAll = false
    }) => {
      if (stopAll)
        map.forEach((audio3, thisKey) => {
          if (thisKey === key)
            return;
          audio3.pause();
          audio3.currentTime = 0;
        });
      const audio2 = map.get(key);
      if (!audio2)
        throw new Error(`Could not find audio ${key}`);
      if (audio2.currentTime > 0 && !loop)
        audio2.currentTime = 0;
      audio2.loop = loop;
      audio2.volume = volume;
      try {
        await audio2.play();
        return true;
      } catch (err) {
        return false;
      }
    }
  };
  audio = api;
};
let audio;
const Audio = () => audio || {
  play: () => Promise.resolve(false), stopAll: () => {
  }
};
const getFromStorage = ({
  key,
  defaultValue
}) => {
  const value = localStorage.getItem(key);
  if (value === null)
    return defaultValue;
  return JSON.parse(value);
};
const saveToStorage = ({ key, value }) => {
  localStorage.setItem(key, JSON.stringify(value));
};
const removeFromStorage = ({ key }) => {
  localStorage.removeItem(key);
};
const createAnimatedSprite = ({
  texture,
  frames,
  frameDuration
}) => {
  let currentFrame = 0;
  let frameCounter = 0;
  const textureWidth = texture.width / frames;
  const textureHeight = texture.height;
  return {
    update: (deltaTime) => {
      frameCounter += deltaTime;
      if (frameCounter >= frameDuration) {
        frameCounter -= frameDuration;
        currentFrame = (currentFrame + 1) % frames;
      }
    },
    render: ({
      context,
      x,
      y,
      width,
      height,
      rotation
    }) => {
      context.save();
      context.translate(x + width / 2, y + height / 2);
      context.rotate(rotation + Math.PI / 2);
      context.drawImage(
        texture,
        textureWidth * currentFrame,
        0,
        textureWidth,
        textureHeight,
        -width / 2,
        -height / 2,
        width,
        height
      );
      context.restore();
    }
  };
};
const createCallbackId$1 = (num) => num;
const checkMatches = (key, expected) => {
  if (expected === "*")
    return true;
  if (expected === "Space" && key === " ")
    return true;
  return key === expected;
};
const mapKey = (key, map) => {
  if (checkMatches(key, map.left))
    return "left";
  if (checkMatches(key, map.right))
    return "right";
  if (checkMatches(key, map.fire))
    return "fire";
  if (checkMatches(key, map.exit))
    return "exit";
  if (checkMatches(key, map.up))
    return "up";
  if (checkMatches(key, map.down))
    return "down";
  if (checkMatches(key, map.select))
    return "select";
  return null;
};
const mapStarKey = (key) => {
  if (key === " ")
    return "Space";
  return key;
};
const defaultKeyMapping = {
  left: "ArrowLeft",
  right: "ArrowRight",
  fire: "Space",
  exit: "Escape",
  up: "ArrowUp",
  down: "ArrowDown",
  select: "Enter"
};
const STORAGE_KEY = "galaga-input-key-mapping";
const updateKeyMapping = (newMapping) => {
  const keyMapping = getFromStorage({
    key: STORAGE_KEY,
    defaultValue: defaultKeyMapping
  });
  const combinedMapping = { ...keyMapping, ...newMapping };
  saveToStorage({
    key: STORAGE_KEY,
    value: combinedMapping
  });
  return combinedMapping;
};
const createKeyboardSystem = () => {
  let keyMapping = getFromStorage({
    key: STORAGE_KEY,
    defaultValue: defaultKeyMapping
  });
  const keyCallbacks = /* @__PURE__ */ new Map();
  const keydownKeys = /* @__PURE__ */ new Set();
  const repeatKeys = /* @__PURE__ */ new Set();
  const keyupKeys = /* @__PURE__ */ new Set();
  let nextId = 1;
  const keydownListener = (event) => {
    if (event.repeat)
      return;
    keydownKeys.add(event.key);
  };
  const keyupListener = (event) => {
    keydownKeys.delete(event.key);
    repeatKeys.delete(event.key);
    keyupKeys.add(event.key);
  };
  window.addEventListener("keydown", keydownListener);
  window.addEventListener("keyup", keyupListener);
  return {
    update: (deltaTime) => {
      const downKeysArray = [...keydownKeys.keys()];
      for (let i = 0; i < downKeysArray.length; i++) {
        const key = downKeysArray[i];
        const mappedKey = mapKey(key, keyMapping);
        const callbacks = mappedKey ? keyCallbacks.get(mappedKey) || [] : [];
        const starCallbacks = keyCallbacks.get("*") || [];
        for (let j = 0; j < callbacks.length; j++)
          if (callbacks[j].type !== "keyup")
            callbacks[j].callback(mappedKey, deltaTime);
        for (let j = 0; j < starCallbacks.length; j++)
          if (starCallbacks[j].type !== "keyup")
            starCallbacks[j].callback(mapStarKey(key), deltaTime);
        keydownKeys.delete(key);
        repeatKeys.add(key);
      }
      const releasedKeysArray = [...keyupKeys.keys()];
      for (let i = 0; i < releasedKeysArray.length; i++) {
        const key = releasedKeysArray[i];
        const mappedKey = mapKey(key, keyMapping);
        const callbacks = mappedKey ? keyCallbacks.get(mappedKey) || [] : [];
        const starCallbacks = keyCallbacks.get("*") || [];
        for (let j = 0; j < callbacks.length; j++)
          if (callbacks[j].type === "keyup")
            callbacks[j].callback(mappedKey, deltaTime);
        for (let j = 0; j < starCallbacks.length; j++)
          if (starCallbacks[j].type === "keyup")
            starCallbacks[j].callback(mapStarKey(key), deltaTime);
        repeatKeys.delete(key);
        keyupKeys.delete(key);
      }
      const repeatKeysArray = [...repeatKeys.keys()];
      for (let i = 0; i < repeatKeysArray.length; i++) {
        const key = repeatKeysArray[i];
        const mappedKey = mapKey(key, keyMapping);
        const callbacks = mappedKey ? keyCallbacks.get(mappedKey) || [] : [];
        const starCallbacks = keyCallbacks.get("*") || [];
        for (let j = 0; j < callbacks.length; j++)
          if (callbacks[j].type === "repeat")
            callbacks[j].callback(mappedKey, deltaTime);
        for (let j = 0; j < starCallbacks.length; j++)
          if (starCallbacks[j].type === "repeat")
            starCallbacks[j].callback(mapStarKey(key), deltaTime);
      }
    },
    subscribe: ({
      key,
      type,
      callback
    }) => {
      const id = createCallbackId$1(nextId++);
      const currentCallbacks = keyCallbacks.get(key) || [];
      keyCallbacks.set(key, [...currentCallbacks, { key: id, type, callback }]);
      return id;
    },
    unsubscribe: (key, id) => {
      const currentCallbacks = keyCallbacks.get(key) || [];
      keyCallbacks.set(
        key,
        currentCallbacks.filter((entry) => entry.key !== id)
      );
    },
    dispose: () => {
      window.removeEventListener("keydown", keydownListener);
      window.removeEventListener("keyup", keyupListener);
    },
    getMapping: () => keyMapping,
    setMapping: (newMapping) => {
      keyMapping = updateKeyMapping(newMapping);
    }
  };
};
const createCallbackId = (num) => num;
const createMouseSystem = ({
  canvas
}) => {
  const hoverIn = [];
  const hoverOut = [];
  const click = [];
  const move = [];
  let backlog = [];
  let lastMove = null;
  const hovering = /* @__PURE__ */ new Set();
  let nextId = 1;
  const convertScreenToCanvasCoordinates = (x, y) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: (x - rect.left) / (rect.right - rect.left) * canvas.width,
      y: (y - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
  };
  const mouseMoveHandler = (e) => {
    const { x, y } = convertScreenToCanvasCoordinates(e.clientX, e.clientY);
    lastMove = { x, y };
  };
  const clickHandler = (e) => {
    const { x, y } = convertScreenToCanvasCoordinates(e.clientX, e.clientY);
    for (let i = 0; i < click.length; i++) {
      const { area: box, callback } = click[i];
      if (box.type === "box") {
        if (x >= box.x && x <= box.x + box.width && y >= box.y && y <= box.y + box.height)
          backlog.push(() => callback(x, y));
      } else {
        if (Math.sqrt(Math.pow(box.x - x, 2) + Math.pow(box.y - y, 2)) <= box.radius) {
          backlog.push(() => callback(x, y));
        }
      }
    }
  };
  window.addEventListener("mousemove", mouseMoveHandler);
  window.addEventListener("click", clickHandler);
  return {
    update: () => {
      if (lastMove) {
        for (let i = 0; i < move.length; i++)
          move[i].callback(lastMove.x, lastMove.y);
        for (const id of hovering) {
          const { area: box } = hoverIn.find((h) => h.key === id);
          if (box.type === "box") {
            if (lastMove.x < box.x || lastMove.x > box.x + box.width || lastMove.y < box.y || lastMove.y > box.y + box.height) {
              hovering.delete(id);
              const callback = hoverOut.find((h) => h.key === id).callback;
              backlog.push(callback);
            }
          } else {
            if (Math.sqrt(
              Math.pow(box.x - lastMove.x, 2) + Math.pow(box.y - lastMove.y, 2)
            ) > box.radius) {
              hovering.delete(id);
              const callback = hoverOut.find((h) => h.key === id).callback;
              backlog.push(callback);
            }
          }
        }
        for (let i = 0; i < hoverIn.length; i++) {
          const { area: box, callback } = hoverIn[i];
          if (hovering.has(hoverIn[i].key))
            continue;
          if (box.type === "box") {
            if (lastMove.x >= box.x && lastMove.x <= box.x + box.width && lastMove.y >= box.y && lastMove.y <= box.y + box.height) {
              backlog.push(callback);
              hovering.add(hoverIn[i].key);
            }
          } else {
            if (Math.sqrt(
              Math.pow(box.x - lastMove.x, 2) + Math.pow(box.y - lastMove.y, 2)
            ) <= box.radius) {
              backlog.push(callback);
              hovering.add(hoverIn[i].key);
            }
          }
        }
        lastMove = null;
      }
      for (let i = 0; i < backlog.length; i++)
        backlog[i]();
      backlog = [];
    },
    onHover: (props) => {
      const id = createCallbackId(nextId++);
      hoverIn.push({
        key: id,
        area: props.area,
        callback: props.in
      });
      hoverOut.push({
        key: id,
        area: props.area,
        callback: props.out
      });
    },
    onMove: (props) => {
      const id = createCallbackId(nextId++);
      move.push({
        key: id,
        callback: props.callback
      });
    },
    onClick: (props) => {
      const id = createCallbackId(nextId++);
      const listener = {
        key: id,
        type: "click",
        area: props.area,
        callback: props.callback
      };
      click.push(listener);
      return id;
    },
    unsubscribe: (type, id) => {
      const array = type === "move" ? move : type === "click" ? click : type === "hover-in" ? hoverIn : hoverOut;
      const index = array.findIndex((listener) => listener.key === id);
      if (index !== -1)
        array.splice(index, 1);
    },
    dispose: () => {
      window.removeEventListener("mousemove", mouseMoveHandler);
      window.removeEventListener("click", clickHandler);
    }
  };
};
const menuItems = [
  { label: "New Game", value: "game" },
  { label: "High Scores", value: "high-scores" },
  { label: "Controls", value: "options" },
  { label: "Credits", value: "credits" }
];
const renderTitle = ({
  canvas,
  context,
  text,
  fontSize = 96
}) => {
  context.save();
  context.textBaseline = "top";
  context.textAlign = "center";
  context.fillStyle = "white";
  context.font = `${fontSize}px Emulogic, monospace`;
  context.fillText(text, canvas.width / 2, Math.floor(canvas.height * 0.1));
  context.restore();
};
const SELECTION_COLOR = "#007700";
const SPRITE_SIZE = 48;
const getMenuItemPosition = (i, canvas) => {
  const textStart = canvas.height * 0.3;
  const textEnd = canvas.height * 0.8;
  const lineHeight = (textEnd - textStart) / (menuItems.length + 2);
  return {
    x: canvas.width / 4,
    y: textStart + (i + 1) * lineHeight,
    width: canvas.width / 2,
    height: lineHeight,
    type: "box"
  };
};
const renderMenu = ({
  canvas,
  context,
  currentSelection,
  selectionSprite
}) => {
  context.save();
  renderTitle({ canvas, context, text: "Galaga" });
  context.font = `32px Emulogic, monospace`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.save();
  for (let i = 0; i < menuItems.length; i++) {
    const { label, value } = menuItems[i];
    const box = getMenuItemPosition(i, canvas);
    context.fillStyle = value === currentSelection ? SELECTION_COLOR : "white";
    if (value === currentSelection) {
      selectionSprite.render({
        context,
        x: box.x - SPRITE_SIZE,
        y: box.y + box.height / 2 - SPRITE_SIZE / 2,
        width: SPRITE_SIZE,
        height: SPRITE_SIZE,
        rotation: 3 * Math.PI / 2
      });
      selectionSprite.render({
        context,
        x: box.x + box.width + SPRITE_SIZE,
        y: box.y + box.height / 2 - SPRITE_SIZE / 2,
        width: SPRITE_SIZE,
        height: SPRITE_SIZE,
        rotation: 3 * Math.PI / 2
      });
    }
    context.fillText(label, box.x + box.width / 2, box.y + box.height / 2);
  }
  context.restore();
  context.textAlign = "center";
  context.font = `32px Emulogic, monospace`;
  context.fillStyle = "white";
  context.textBaseline = "bottom";
  context.fillText(
    "© 2023 Caden Harris",
    canvas.width / 2,
    canvas.height - 100
  );
  context.fillText("& Kollin Murphy", canvas.width / 2, canvas.height - 50);
  context.restore();
};
const setupMenuInput = (events, canvas) => {
  const keyboard = createKeyboardSystem();
  const mouse = createMouseSystem({ canvas });
  let currentMenuItem;
  for (let i = 0; i < menuItems.length; i++) {
    const item = menuItems[i];
    const box = getMenuItemPosition(i, canvas);
    mouse.onHover({
      area: box,
      in: () => {
        events.publish({
          type: "MENU_SELECTION_CHANGED",
          payload: {
            selection: item.value
          }
        });
      },
      out: () => {
      }
    });
    mouse.onClick({
      area: box,
      callback: () => {
        events.publish({
          type: "GAME_SCREEN_CHANGED",
          payload: {
            screen: item.value
          }
        });
      }
    });
  }
  const disposeSelectionChanged = events.subscribe({
    type: "MENU_SELECTION_CHANGED",
    callback: (event) => {
      currentMenuItem = event.payload.selection;
    }
  });
  keyboard.subscribe({
    key: "up",
    type: "keydown",
    callback: () => {
      const index = menuItems.findIndex((m) => m.value === currentMenuItem);
      const nextIndex = index === 0 ? menuItems.length - 1 : index - 1;
      events.publish({
        type: "MENU_SELECTION_CHANGED",
        payload: {
          selection: menuItems[nextIndex].value
        }
      });
    }
  });
  keyboard.subscribe({
    key: "down",
    type: "keydown",
    callback: () => {
      const index = menuItems.findIndex((m) => m.value === currentMenuItem);
      const nextIndex = index === menuItems.length - 1 ? 0 : index + 1;
      events.publish({
        type: "MENU_SELECTION_CHANGED",
        payload: {
          selection: menuItems[nextIndex].value
        }
      });
    }
  });
  keyboard.subscribe({
    key: "select",
    type: "keydown",
    callback: () => {
      events.publish({
        type: "GAME_SCREEN_CHANGED",
        payload: {
          screen: currentMenuItem
        }
      });
    }
  });
  return {
    keyboard,
    mouse,
    dispose: disposeSelectionChanged
  };
};
const loadTexture$1 = (src) => {
  const texture = new Image();
  texture.src = src;
  return new Promise((resolve, reject) => {
    texture.onload = () => {
      resolve(texture);
    };
    texture.onerror = () => {
      reject(`Could not load texture ${src}`);
    };
  });
};
const initializeMenuTextures = async () => {
  const [enemy4] = await Promise.all(
    ["4.png"].map((src) => loadTexture$1(`/galaga/assets/img/${src}`))
  ).catch((error) => {
    console.error(error);
    throw new Error("Could not load textures");
  });
  const map = {
    enemies: {
      4: enemy4
    }
  };
  textures$1 = map;
};
let textures$1;
const MenuTextures = () => textures$1;
const INITIAL_STATE_KEY = "galaga-menu-initial-state";
const TIME_TO_SHOW_ATTRACT_SCREEN = 1e4;
const menuScreen = ({
  canvas,
  context,
  events
}) => {
  const state = {
    currentSelection: getFromStorage({
      key: INITIAL_STATE_KEY,
      defaultValue: "game"
    }),
    selectionConfirmed: false,
    selectionSprite: createAnimatedSprite({
      texture: MenuTextures().enemies[4],
      frames: 2,
      frameDuration: 500
    }),
    inactiveTime: 0
  };
  const {
    keyboard,
    mouse,
    dispose: disposeInput
  } = setupMenuInput(events, canvas);
  const audio2 = Audio();
  events.publish({
    type: "MENU_SELECTION_CHANGED",
    payload: {
      selection: state.currentSelection
    }
  });
  const disposeSelectionChanged = events.subscribe({
    type: "MENU_SELECTION_CHANGED",
    callback: (event) => {
      state.currentSelection = event.payload.selection;
    }
  });
  const disposeScreenChanged = events.subscribe({
    type: "GAME_SCREEN_CHANGED",
    callback: () => {
      if (state.inactiveTime < TIME_TO_SHOW_ATTRACT_SCREEN)
        audio2.play({ key: "input" });
    }
  });
  mouse.onMove({
    callback: () => {
      state.inactiveTime = 0;
    }
  });
  keyboard.subscribe({
    key: "*",
    type: "keydown",
    callback: () => {
      state.inactiveTime = 0;
    }
  });
  return {
    dispose: () => {
      disposeInput();
      keyboard.dispose();
      mouse.dispose();
      disposeScreenChanged();
      disposeSelectionChanged();
    },
    processInput: (deltaTime) => {
      keyboard.update(deltaTime);
      mouse.update();
    },
    update: (deltaTime) => {
      state.inactiveTime += deltaTime;
      state.selectionSprite.update(deltaTime);
      if (state.inactiveTime >= TIME_TO_SHOW_ATTRACT_SCREEN) {
        events.publish({
          type: "GAME_SCREEN_CHANGED",
          payload: {
            screen: "attract"
          }
        });
      }
    },
    render: () => {
      renderMenu({
        canvas,
        context,
        currentSelection: state.currentSelection,
        selectionSprite: state.selectionSprite
      });
    }
  };
};
const pathMakerScreen = ({
  canvas,
  context,
  events
}) => {
  const keyboard = createKeyboardSystem();
  keyboard.subscribe({
    key: "exit",
    type: "keydown",
    callback: () => {
      Audio().play({ key: "input" });
      events.publish({
        type: "GAME_SCREEN_CHANGED",
        payload: {
          screen: "menu"
        }
      });
    }
  });
  let coordinates = [];
  keyboard.subscribe({
    key: "fire",
    type: "keydown",
    callback: () => {
      coordinates = [];
      console.log(JSON.stringify(coordinates));
    }
  });
  keyboard.subscribe({
    key: "left",
    type: "keydown",
    callback: () => {
      coordinates = coordinates.slice(0, coordinates.length - 1);
      console.log(JSON.stringify(coordinates));
    }
  });
  const mouse = createMouseSystem({ canvas });
  mouse.onClick({
    area: {
      type: "box",
      x: 0,
      y: 0,
      width: canvas.width,
      height: canvas.height
    },
    callback: (x, y) => {
      coordinates.push({ x, y });
      console.log(JSON.stringify(coordinates));
    }
  });
  return {
    dispose: () => {
      keyboard.dispose();
      mouse.dispose();
    },
    update: () => {
    },
    processInput: (deltaTime) => {
      keyboard.update(deltaTime);
      mouse.update();
    },
    render: () => {
      context.fillStyle = "red";
      if (coordinates.length === 0)
        return;
      for (const { x, y } of coordinates)
        context.fillRect(x - 5, y - 5, 10, 10);
      context.strokeStyle = "red";
      context.beginPath();
      context.moveTo(coordinates[0].x, coordinates[0].y);
      for (let i = 1; i < coordinates.length; i++) {
        context.lineTo(coordinates[i].x, coordinates[i].y);
      }
      context.stroke();
      context.closePath();
    }
  };
};
const createGame = ({ canvas }) => {
  const context = canvas.getContext("2d");
  if (!context)
    throw new Error("Could not get canvas context");
  const events = createEventSystem();
  const screenOptions = {
    canvas,
    context,
    events
  };
  let view = menuScreen(screenOptions);
  const starBackground = createStarBackground({ canvas, context });
  events.subscribe({
    type: "GAME_SCREEN_CHANGED",
    callback: (event) => {
      var _a;
      (_a = view.dispose) == null ? void 0 : _a.call(view);
      switch (event.payload.screen) {
        case "menu":
          view = menuScreen(screenOptions);
          break;
        case "game":
          view = Scripts().screens.gameplay(screenOptions);
          break;
        case "credits":
          view = Scripts().screens.credits(screenOptions);
          break;
        case "high-scores":
          view = Scripts().screens.highScores(screenOptions);
          break;
        case "options":
          view = Scripts().screens.controls(screenOptions);
          break;
        case "attract":
          view = Scripts().screens.attract(screenOptions);
          break;
        case "path-maker":
          view = pathMakerScreen(screenOptions);
          break;
      }
    }
  });
  return {
    processInput: (deltaTime) => {
      view.processInput(deltaTime);
    },
    update: (deltaTime) => {
      starBackground.update(deltaTime);
      view.update(deltaTime);
    },
    render: () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.imageSmoothingEnabled = false;
      starBackground.render();
      view.render();
    }
  };
};
const loadTexture = (src) => {
  const texture = new Image();
  texture.src = src;
  return new Promise((resolve, reject) => {
    texture.onload = () => {
      resolve(texture);
    };
    texture.onerror = () => {
      reject(`Could not load texture ${src}`);
    };
  });
};
const initializeTextures = async () => {
  const [
    enemy1,
    enemy2,
    enemy3,
    enemy4,
    myProjectile,
    myShip,
    theirProjectile
  ] = await Promise.all(
    [
      "1.png",
      "2.png",
      "3.png",
      "4.png",
      "my-projectile.png",
      "ship.png",
      "their-projectile.png"
    ].map((src) => loadTexture(`/galaga/assets/img/${src}`))
  ).catch((error) => {
    console.error(error);
    throw new Error("Could not load textures");
  });
  const map = {
    enemies: {
      1: enemy1,
      2: enemy2,
      3: enemy3,
      4: enemy4
    },
    projectiles: {
      mine: myProjectile,
      theirs: theirProjectile
    },
    ship: myShip
  };
  textures = map;
};
let textures;
const Textures = () => textures;
let initialized = false;
const initializeDynamicImports = async () => {
  if (initialized)
    return;
  initialized = true;
  await Promise.all([
    initializeTextures(),
    initializeAudio(),
    initializeScripts()
  ]);
};
const style = "";
(async () => {
  await initializeMenuTextures();
  const startTime = performance.now();
  let previousTime = startTime;
  const game = createGame({
    canvas: document.querySelector("#canvas-game")
  });
  const gameLoop = (currentTime) => {
    const deltaTime = currentTime - previousTime;
    previousTime = currentTime;
    game.processInput(deltaTime);
    game.update(deltaTime);
    game.render();
    requestAnimationFrame(gameLoop);
  };
  requestAnimationFrame(gameLoop);
  initializeDynamicImports();
})();
export {
  Audio as A,
  Scripts as S,
  Textures as T,
  createMouseSystem as a,
  createAnimatedSprite as b,
  createKeyboardSystem as c,
  defaultKeyMapping as d,
  removeFromStorage as e,
  getFromStorage as g,
  renderTitle as r,
  saveToStorage as s
};
