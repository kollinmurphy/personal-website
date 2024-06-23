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
  function getFetchOpts(script) {
    const fetchOpts = {};
    if (script.integrity)
      fetchOpts.integrity = script.integrity;
    if (script.referrerpolicy)
      fetchOpts.referrerPolicy = script.referrerpolicy;
    if (script.crossorigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (script.crossorigin === "anonymous")
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
const createBloonId = (num) => num;
const getBloonChildren = (type) => {
  switch (type) {
    case "red":
      return [];
    case "blue":
      return ["red"];
    case "green":
      return ["blue"];
    case "yellow":
      return ["green"];
    case "white":
    case "black":
      return ["yellow", "yellow"];
  }
};
const rounds = [
  {
    num: 1,
    message: "",
    bloons: [
      {
        type: "red",
        count: 12
      }
    ]
  },
  {
    num: 2,
    message: "",
    bloons: [
      {
        type: "red",
        count: 25
      }
    ]
  },
  {
    num: 3,
    message: "",
    bloons: [
      {
        type: "red",
        count: 12
      },
      {
        type: "blue",
        count: 2
      },
      {
        type: "red",
        count: 12
      },
      {
        type: "blue",
        count: 3
      }
    ]
  },
  {
    num: 4,
    message: "",
    bloons: [
      {
        type: "red",
        count: 5
      },
      {
        type: "blue",
        count: 12
      },
      {
        type: "red",
        count: 5
      },
      {
        type: "blue",
        count: 12
      }
    ]
  },
  {
    num: 5,
    message: "",
    bloons: [
      {
        type: "red",
        count: 15
      },
      {
        type: "blue",
        count: 10
      },
      {
        type: "red",
        count: 15
      },
      {
        type: "blue",
        count: 15
      }
    ]
  },
  {
    num: 6,
    message: "",
    bloons: [
      {
        type: "green",
        count: 10
      },
      {
        type: "green",
        count: 5
      }
    ]
  },
  {
    num: 7,
    message: "",
    bloons: [
      {
        type: "blue",
        count: 75
      }
    ]
  },
  {
    num: 8,
    message: "",
    bloons: [
      {
        type: "red",
        count: 20
      },
      {
        type: "blue",
        count: 30
      },
      {
        type: "red",
        count: 30
      },
      {
        type: "blue",
        count: 20
      },
      {
        type: "red",
        count: 20
      },
      {
        type: "blue",
        count: 20
      }
    ]
  },
  {
    num: 9,
    message: "",
    bloons: [
      {
        type: "blue",
        count: 25
      },
      {
        type: "green",
        count: 15
      },
      {
        type: "blue",
        count: 25
      }
    ]
  },
  {
    num: 10,
    message: "",
    bloons: [
      {
        type: "green",
        count: 35
      }
    ]
  },
  {
    num: 11,
    message: "",
    bloons: [
      {
        type: "yellow",
        count: 15
      }
    ]
  },
  {
    num: 12,
    message: "",
    bloons: [
      {
        type: "blue",
        count: 25
      },
      {
        type: "green",
        count: 25
      },
      {
        type: "yellow",
        count: 3
      }
    ]
  },
  {
    num: 13,
    message: "",
    bloons: [
      {
        type: "blue",
        count: 40
      },
      {
        type: "red",
        count: 40
      },
      {
        type: "green",
        count: 28
      },
      {
        type: "blue",
        count: 35
      }
    ]
  },
  {
    num: 14,
    message: "",
    bloons: [
      {
        type: "yellow",
        count: 28
      }
    ]
  },
  {
    num: 15,
    message: "",
    bloons: [
      {
        type: "green",
        count: 30
      },
      {
        type: "blue",
        count: 30
      },
      {
        type: "green",
        count: 30
      }
    ]
  },
  {
    num: 16,
    message: "",
    bloons: [
      {
        type: "blue",
        count: 20
      },
      {
        type: "green",
        count: 30
      },
      {
        type: "blue",
        count: 30
      },
      {
        type: "green",
        count: 20
      },
      {
        type: "blue",
        count: 20
      },
      {
        type: "green",
        count: 25
      }
    ]
  },
  {
    num: 17,
    message: "",
    bloons: [
      {
        type: "blue",
        count: 70
      },
      {
        type: "green",
        count: 45
      },
      {
        type: "blue",
        count: 70
      }
    ]
  },
  {
    num: 18,
    message: "",
    bloons: [
      {
        type: "blue",
        count: 30
      },
      {
        type: "yellow",
        count: 27
      },
      {
        type: "green",
        count: 25
      }
    ]
  },
  {
    num: 19,
    message: "",
    bloons: [
      {
        type: "green",
        count: 90
      }
    ]
  },
  {
    num: 20,
    message: "",
    bloons: [
      {
        type: "yellow",
        count: 16
      },
      {
        type: "green",
        count: 12
      },
      {
        type: "yellow",
        count: 15
      },
      {
        type: "green",
        count: 12
      },
      {
        type: "yellow",
        count: 17
      }
    ]
  },
  {
    num: 21,
    message: "",
    bloons: [
      {
        type: "yellow",
        count: 15
      },
      {
        type: "blue",
        count: 10
      },
      {
        type: "yellow",
        count: 20
      },
      {
        type: "green",
        count: 15
      },
      {
        type: "green",
        count: 70
      }
    ]
  },
  {
    num: 22,
    message: "",
    bloons: [
      {
        type: "yellow",
        count: 45
      }
    ]
  },
  {
    num: 23,
    message: "",
    bloons: [
      {
        type: "yellow",
        count: 30
      },
      {
        type: "green",
        count: 35
      },
      {
        type: "yellow",
        count: 34
      }
    ]
  },
  {
    num: 24,
    message: "",
    bloons: [
      {
        type: "green",
        count: 30
      },
      {
        type: "yellow",
        count: 42
      },
      {
        type: "green",
        count: 20
      },
      {
        type: "blue",
        count: 30
      }
    ]
  },
  {
    num: 25,
    message: "",
    bloons: [
      {
        type: "yellow",
        count: 25
      },
      {
        type: "green",
        count: 30
      },
      {
        type: "yellow",
        count: 28
      },
      {
        type: "green",
        count: 40
      }
    ]
  },
  {
    num: 26,
    message: "",
    bloons: [
      {
        type: "yellow",
        count: 85
      }
    ]
  },
  {
    num: 27,
    message: "",
    bloons: [
      {
        type: "black",
        count: 20
      }
    ]
  },
  {
    num: 28,
    message: "",
    bloons: [
      {
        type: "yellow",
        count: 55
      },
      {
        type: "green",
        count: 45
      }
    ]
  },
  {
    num: 29,
    message: "",
    bloons: [
      {
        type: "yellow",
        count: 100
      },
      {
        type: "yellow",
        count: 25
      },
      {
        type: "black",
        count: 19
      }
    ]
  },
  {
    num: 30,
    message: "",
    bloons: [
      {
        type: "green",
        count: 250
      }
    ]
  },
  {
    num: 31,
    message: "",
    bloons: [
      {
        type: "black",
        count: 27
      },
      {
        type: "green",
        count: 55
      },
      {
        type: "blue",
        count: 10
      }
    ]
  },
  {
    num: 32,
    message: "",
    bloons: [
      {
        type: "yellow",
        count: 20
      },
      {
        type: "green",
        count: 25
      },
      {
        type: "black",
        count: 23
      }
    ]
  },
  {
    num: 33,
    message: "",
    bloons: [
      {
        type: "yellow",
        count: 150
      }
    ]
  },
  {
    num: 34,
    message: "",
    bloons: [
      {
        type: "black",
        count: 25
      },
      {
        type: "green",
        count: 35
      },
      {
        type: "yellow",
        count: 35
      }
    ]
  },
  {
    num: 35,
    message: "",
    bloons: [
      {
        type: "yellow",
        count: 25
      },
      {
        type: "green",
        count: 85
      },
      {
        type: "yellow",
        count: 85
      }
    ]
  },
  {
    num: 36,
    message: "",
    bloons: [
      {
        type: "black",
        count: 17
      },
      {
        type: "yellow",
        count: 115
      },
      {
        type: "black",
        count: 18
      }
    ]
  },
  {
    num: 37,
    message: "",
    bloons: [
      {
        type: "black",
        count: 59
      }
    ]
  },
  {
    num: 38,
    message: "",
    bloons: [
      {
        type: "yellow",
        count: 220
      }
    ]
  },
  {
    num: 39,
    message: "",
    bloons: [
      {
        type: "red",
        count: 50
      },
      {
        type: "blue",
        count: 50
      },
      {
        type: "green",
        count: 50
      },
      {
        type: "yellow",
        count: 50
      },
      {
        type: "black",
        count: 40
      }
    ]
  },
  {
    num: 40,
    message: "",
    bloons: [
      {
        type: "black",
        count: 80
      }
    ]
  },
  {
    num: 41,
    message: "",
    bloons: [
      {
        type: "white",
        count: 20
      },
      {
        type: "black",
        count: 20
      },
      {
        type: "white",
        count: 20
      }
    ]
  },
  {
    num: 42,
    message: "",
    bloons: [
      {
        type: "yellow",
        count: 50
      },
      {
        type: "black",
        count: 30
      },
      {
        type: "white",
        count: 30
      }
    ]
  },
  {
    num: 43,
    message: "",
    bloons: [
      {
        type: "yellow",
        count: 150
      },
      {
        type: "black",
        count: 60
      },
      {
        type: "white",
        count: 40
      }
    ]
  },
  {
    num: 44,
    message: "",
    bloons: [
      {
        type: "black",
        count: 120
      }
    ]
  },
  {
    num: 45,
    message: "",
    bloons: [
      {
        type: "white",
        count: 120
      }
    ]
  },
  {
    num: 46,
    message: "",
    bloons: [
      {
        type: "white",
        count: 60
      },
      {
        type: "black",
        count: 60
      },
      {
        type: "yellow",
        count: 59
      }
    ]
  },
  {
    num: 47,
    message: "",
    bloons: [
      {
        type: "black",
        count: 70
      },
      {
        type: "yellow",
        count: 79
      },
      {
        type: "white",
        count: 40
      }
    ]
  },
  {
    num: 48,
    message: "",
    bloons: [
      {
        type: "yellow",
        count: 70
      },
      {
        type: "white",
        count: 80
      },
      {
        type: "black",
        count: 80
      }
    ]
  },
  {
    num: 49,
    message: "",
    bloons: [
      {
        type: "white",
        count: 70
      },
      {
        type: "yellow",
        count: 99
      },
      {
        type: "black",
        count: 80
      }
    ]
  },
  {
    num: 50,
    message: "",
    bloons: [
      {
        type: "white",
        count: 10
      },
      {
        type: "black",
        count: 10
      },
      {
        type: "white",
        count: 10
      },
      {
        type: "black",
        count: 10
      },
      {
        type: "white",
        count: 10
      },
      {
        type: "black",
        count: 10
      },
      {
        type: "white",
        count: 10
      },
      {
        type: "black",
        count: 10
      },
      {
        type: "white",
        count: 10
      },
      {
        type: "black",
        count: 10
      },
      {
        type: "white",
        count: 10
      },
      {
        type: "black",
        count: 10
      },
      {
        type: "white",
        count: 10
      },
      {
        type: "black",
        count: 10
      },
      {
        type: "white",
        count: 10
      },
      {
        type: "black",
        count: 10
      },
      {
        type: "white",
        count: 10
      },
      {
        type: "black",
        count: 10
      },
      {
        type: "white",
        count: 10
      },
      {
        type: "black",
        count: 9
      }
    ]
  }
];
const rounds$1 = {
  rounds
};
const SPEED_FACTOR = 0.3;
const getBloonSpeed = (bloon) => {
  if (bloon.frozen)
    return 0;
  const value = (() => {
    switch (bloon.type) {
      case "red":
        return 1;
      case "blue":
        return 1.5;
      case "green":
        return 1.7;
      case "yellow":
        return 3;
      case "white":
      case "black":
        return 1.5;
    }
  })();
  return value * SPEED_FACTOR;
};
const getNextBloon = (stage, bloonsCreated, id) => {
  const round = rounds$1.rounds[stage - 1].bloons;
  let past = 0;
  for (const bloon of round) {
    if (bloon.count + past > bloonsCreated) {
      return {
        type: bloon.type,
        id,
        x: 0,
        y: 0,
        distance: 0,
        frozen: false,
        escaped: false,
        frozenDuration: 0,
        frozenTime: 0,
        parents: []
      };
    }
    past += bloon.count;
  }
  return null;
};
const BLOON_INTERVAL = 250;
const createBloonSystem = ({
  eventSystem,
  pathSystem
}) => {
  let nextId2 = 1;
  const state = {
    bloons: [],
    bloonTime: 0,
    bloonsCreated: 0,
    finishedSpawning: false,
    round: 0,
    active: false
  };
  eventSystem.subscribe({
    type: "StageStarted",
    callback: (event) => {
      state.active = true;
      state.round = event.payload.stage;
      state.bloonTime = 0;
      state.bloonsCreated = 0;
      state.finishedSpawning = false;
    }
  });
  eventSystem.subscribe({
    type: "BloonHit",
    callback: (event) => {
      const index = state.bloons.findIndex(
        (bloon) => bloon.id === event.payload.bloon.id
      );
      if (index === -1)
        return;
      const poppedBloon = state.bloons[index];
      state.bloons = [
        ...state.bloons.slice(0, index),
        ...state.bloons.slice(index + 1)
      ];
      eventSystem.publish({
        type: "BloonPopped",
        payload: {
          bloon: poppedBloon,
          effect: event.payload.projectile.type !== "bomb"
        }
      });
      if (event.payload.projectile.type === "bomb") {
        eventSystem.publish({
          type: "ExplosionCreated",
          payload: {
            position: {
              x: event.payload.bloon.x,
              y: event.payload.bloon.y
            },
            radius: 200
          }
        });
        const nearbyBloons = state.bloons.filter((bloon) => {
          return Math.sqrt(
            Math.pow(bloon.x - poppedBloon.x, 2) + Math.pow(bloon.y - poppedBloon.y, 2)
          ) < 100;
        }).filter((bloon) => bloon.type !== "black");
        for (const bloon of nearbyBloons) {
          const index2 = state.bloons.findIndex((b) => b.id === bloon.id);
          if (index2 === -1)
            continue;
          state.bloons = [
            ...state.bloons.slice(0, index2),
            ...state.bloons.slice(index2 + 1)
          ];
          eventSystem.publish({
            type: "BloonPopped",
            payload: {
              bloon,
              effect: false
            }
          });
          if (poppedBloon.type === "red") {
            if (state.bloons.length === 0 && state.finishedSpawning === true)
              state.active = false;
            eventSystem.publish({
              type: "BloonDestroyed",
              payload: { bloon }
            });
            continue;
          }
          const children2 = getBloonChildren(poppedBloon.type);
          for (const child of children2) {
            const childBloon = {
              id: createBloonId(nextId2++),
              type: child,
              frozen: false,
              frozenTime: 0,
              frozenDuration: 0,
              distance: poppedBloon.distance,
              x: poppedBloon.x,
              y: poppedBloon.y,
              escaped: false,
              parents: [poppedBloon.id, ...poppedBloon.parents]
            };
            state.bloons.push(childBloon);
            eventSystem.publish({
              type: "BloonCreated",
              payload: childBloon
            });
          }
        }
      }
      if (poppedBloon.type === "red") {
        if (state.bloons.length === 0 && state.finishedSpawning === true)
          state.active = false;
        eventSystem.publish({
          type: "BloonDestroyed",
          payload: { bloon: poppedBloon }
        });
        return;
      }
      const children = getBloonChildren(poppedBloon.type);
      for (const child of children) {
        const childBloon = {
          id: createBloonId(nextId2++),
          type: child,
          frozen: false,
          frozenTime: 0,
          frozenDuration: 0,
          distance: poppedBloon.distance,
          x: poppedBloon.x,
          y: poppedBloon.y,
          escaped: false,
          parents: [poppedBloon.id, ...poppedBloon.parents]
        };
        state.bloons.push(childBloon);
        eventSystem.publish({
          type: "BloonCreated",
          payload: childBloon
        });
      }
    }
  });
  return {
    getLastBloonInRadius: ({
      x,
      y,
      radius
    }) => {
      for (let i = state.bloons.length - 1; i >= 0; i--) {
        const bloon = state.bloons[i];
        const dx = bloon.x - x;
        const dy = bloon.y - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < radius)
          return bloon;
      }
      return null;
    },
    getBloons: () => state.bloons,
    isComplete: () => state.bloons.length === 0 && state.finishedSpawning,
    getBloon: (id) => {
      return state.bloons.find((bloon) => bloon.id === id);
    },
    update: (deltaTime) => {
      if (!state.active)
        return;
      state.bloonTime += deltaTime;
      if (state.bloonTime > BLOON_INTERVAL) {
        const next = getNextBloon(
          state.round,
          state.bloonsCreated,
          createBloonId(nextId2++)
        );
        if (next) {
          state.bloonTime -= BLOON_INTERVAL;
          state.bloons.push(next);
          state.bloonsCreated++;
          eventSystem.publish({
            type: "BloonCreated",
            payload: next
          });
          const nextNext = getNextBloon(
            state.round,
            state.bloonsCreated,
            createBloonId(nextId2++)
          );
          if (!nextNext) {
            state.finishedSpawning = true;
            state.bloonTime = -Infinity;
          }
        } else {
          state.bloonTime = -Infinity;
          state.finishedSpawning = true;
        }
      }
      for (const bloon of state.bloons) {
        if (bloon.frozen) {
          bloon.frozenTime += deltaTime;
          if (bloon.frozenTime > bloon.frozenDuration) {
            bloon.frozen = false;
          } else {
            continue;
          }
        }
        bloon.distance += getBloonSpeed(bloon) * deltaTime;
        const coordinates = pathSystem.computePoint(bloon.distance);
        bloon.x = coordinates.x;
        bloon.y = coordinates.y;
        bloon.escaped = coordinates.completed;
      }
      const { bloons, escaped } = state.bloons.reduce(
        (acc, bloon) => {
          if (bloon.escaped)
            acc.escaped.push(bloon);
          else
            acc.bloons.push(bloon);
          return acc;
        },
        { bloons: [], escaped: [] }
      );
      state.bloons = bloons.sort((a, b) => a.distance - b.distance);
      for (const bloon of escaped) {
        eventSystem.publish({
          type: "BloonEscaped",
          payload: { bloon }
        });
      }
    }
  };
};
const createCallbackId$2 = (num) => num;
const createEventSystem = () => {
  let nextId2 = 1;
  const subscriptions = /* @__PURE__ */ new Map();
  return {
    subscribe: (subscribeOptions) => {
      const id = createCallbackId$2(nextId2++);
      subscriptions.set(subscribeOptions.type, [
        ...subscriptions.get(subscribeOptions.type) || [],
        {
          id,
          callback: subscribeOptions.callback
        }
      ]);
      return id;
    },
    unsubscribe: (unsubscribeOptions) => {
      const currentSubscriptions = subscriptions.get(unsubscribeOptions.type);
      if (!currentSubscriptions)
        return;
      subscriptions.set(
        unsubscribeOptions.type,
        currentSubscriptions.filter(
          (subscription) => subscription.id !== unsubscribeOptions.id
        )
      );
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
const createCallbackId$1 = (num) => num;
const mapKey = (key) => {
  switch (key) {
    case "Escape":
      return "exit";
    default:
      return null;
  }
};
const createKeyboardSystem = () => {
  const keyCallbacks = /* @__PURE__ */ new Map();
  const keydownKeys = /* @__PURE__ */ new Set();
  let nextId2 = 1;
  const keydownListener = (event) => {
    if (event.repeat)
      return;
    const key = mapKey(event.key);
    if (!key)
      return;
    keydownKeys.add(key);
  };
  window.addEventListener("keydown", keydownListener);
  return {
    update: () => {
      const downKeysArray = [...keydownKeys.keys()];
      for (let i = 0; i < downKeysArray.length; i++) {
        const key = downKeysArray[i];
        const callbacks = keyCallbacks.get(key) || [];
        for (let j = 0; j < callbacks.length; j++)
          callbacks[j].callback();
        keydownKeys.delete(key);
      }
    },
    subscribe: ({
      key,
      type,
      callback
    }) => {
      const id = createCallbackId$1(nextId2++);
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
    }
  };
};
const mapBloonTypeToLives = (type) => {
  switch (type) {
    case "red":
      return 1;
    case "blue":
      return 2;
    case "green":
      return 3;
    case "yellow":
      return 4;
    case "white":
    case "black":
      return 11;
  }
};
const createLivesSystem = ({
  eventSystem
}) => {
  let lives = 40;
  eventSystem.subscribe({
    type: "BloonEscaped",
    callback: (event) => {
      const l = mapBloonTypeToLives(event.payload.bloon.type);
      lives -= l;
    }
  });
  return {
    getLives: () => lives
  };
};
const getSellPrice = (cost) => cost * 0.8;
const createMoneySystem = ({
  eventSystem
}) => {
  let money = 1e3;
  eventSystem.subscribe({
    type: "BloonPopped",
    callback: () => {
      money += 1;
    }
  });
  eventSystem.subscribe({
    type: "StageCleared",
    callback: (event) => {
      money += Math.max(0, 100 - (event.payload.stage - 1));
    }
  });
  eventSystem.subscribe({
    type: "TowerPlaced",
    callback: (event) => {
      money -= event.payload.cost;
    }
  });
  eventSystem.subscribe({
    type: "TowerSold",
    callback: (event) => {
      money += getSellPrice(event.payload.tower.cost);
    }
  });
  eventSystem.subscribe({
    type: "TowerUpgraded",
    callback: (event) => {
      money -= event.payload.upgrade.cost;
    }
  });
  return {
    getMoney: () => money
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
  let nextId2 = 1;
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
      const { box, callback } = click[i];
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
          const { box } = hoverIn.find((h) => h.key === id);
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
          const { box, callback } = hoverIn[i];
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
    hoverSubscribe: (props) => {
      const id = createCallbackId(nextId2++);
      hoverIn.push({
        key: id,
        type: "hover-in",
        box: props.box,
        callback: props.in
      });
      hoverOut.push({
        key: id,
        type: "hover-out",
        box: props.box,
        callback: props.out
      });
    },
    moveSubscribe: (props) => {
      const id = createCallbackId(nextId2++);
      move.push({
        key: id,
        type: props.type,
        callback: props.callback
      });
    },
    subscribe: (props) => {
      const id = createCallbackId(nextId2++);
      const listener = {
        key: id,
        type: props.type,
        box: props.box,
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
const createParticleSystem = ({
  eventSystem
}) => {
  let particles = [];
  eventSystem.subscribe({
    type: "BloonPopped",
    callback: (event) => {
      if (!event.payload.effect)
        return;
      const { bloon } = event.payload;
      const particle = {
        type: "pop",
        elapsedTime: 0,
        lifetime: 80,
        x: bloon.x,
        y: bloon.y,
        width: 78,
        height: 78,
        rotation: Math.random() * Math.PI * 2
      };
      particles.push(particle);
    }
  });
  eventSystem.subscribe({
    type: "ExplosionCreated",
    callback: (event) => {
      const particle = {
        type: "explosion",
        elapsedTime: 0,
        lifetime: 100,
        x: event.payload.position.x,
        y: event.payload.position.y,
        width: event.payload.radius,
        height: event.payload.radius,
        rotation: 0
      };
      particles.push(particle);
    }
  });
  return {
    update: (deltaTime) => {
      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        particle.elapsedTime += deltaTime;
      }
      particles = particles.filter((p) => p.elapsedTime < p.lifetime);
    },
    getParticles: () => particles
  };
};
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var buildExports = {};
var build = {
  get exports() {
    return buildExports;
  },
  set exports(v) {
    buildExports = v;
  }
};
/*!
 * 
 *   canvas-txt v3.0.0
 *   https://github.com/geongeorge/Canvas-Txt
 * 
 *   Copyright (c) Geon George (https://geongeorge.com)
 * 
 *   This source code is licensed under the MIT license found in the
 *   LICENSE file in the root directory of this source tree.
 * 
 */
(function (module, exports) {
  !function (t, e) {
    module.exports = e();
  }("undefined" != typeof self ? self : commonjsGlobal, function () {
    return function (t) {
      var e = {};
      function n(r) {
        if (e[r])
          return e[r].exports;
        var i = e[r] = { i: r, l: false, exports: {} };
        return t[r].call(i.exports, i, i.exports, n), i.l = true, i.exports;
      }
      return n.m = t, n.c = e, n.d = function (t2, e2, r) {
        n.o(t2, e2) || Object.defineProperty(t2, e2, { enumerable: true, get: r });
      }, n.r = function (t2) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t2, "__esModule", { value: true });
      }, n.t = function (t2, e2) {
        if (1 & e2 && (t2 = n(t2)), 8 & e2)
          return t2;
        if (4 & e2 && "object" == typeof t2 && t2 && t2.__esModule)
          return t2;
        var r = /* @__PURE__ */ Object.create(null);
        if (n.r(r), Object.defineProperty(r, "default", { enumerable: true, value: t2 }), 2 & e2 && "string" != typeof t2)
          for (var i in t2)
            n.d(r, i, function (e3) {
              return t2[e3];
            }.bind(null, i));
        return r;
      }, n.n = function (t2) {
        var e2 = t2 && t2.__esModule ? function () {
          return t2.default;
        } : function () {
          return t2;
        };
        return n.d(e2, "a", e2), e2;
      }, n.o = function (t2, e2) {
        return Object.prototype.hasOwnProperty.call(t2, e2);
      }, n.p = "", n(n.s = 0);
    }([function (t, e, n) {
      function r(t2, e2) {
        return function (t3) {
          if (Array.isArray(t3))
            return t3;
        }(t2) || function (t3, e3) {
          if ("undefined" != typeof Symbol && Symbol.iterator in Object(t3)) {
            var n2 = [], r2 = true, i2 = false, o2 = void 0;
            try {
              for (var a, u = t3[Symbol.iterator](); !(r2 = (a = u.next()).done) && (n2.push(a.value), !e3 || n2.length !== e3); r2 = true)
                ;
            } catch (t4) {
              i2 = true, o2 = t4;
            } finally {
              try {
                r2 || null == u.return || u.return();
              } finally {
                if (i2)
                  throw o2;
              }
            }
            return n2;
          }
        }(t2, e2) || function (t3, e3) {
          if (t3) {
            if ("string" == typeof t3)
              return i(t3, e3);
            var n2 = Object.prototype.toString.call(t3).slice(8, -1);
            return "Object" === n2 && t3.constructor && (n2 = t3.constructor.name), "Map" === n2 || "Set" === n2 ? Array.from(n2) : "Arguments" === n2 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2) ? i(t3, e3) : void 0;
          }
        }(t2, e2) || function () {
          throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }();
      }
      function i(t2, e2) {
        (null == e2 || e2 > t2.length) && (e2 = t2.length);
        for (var n2 = 0, r2 = Array(e2); n2 < e2; n2++)
          r2[n2] = t2[n2];
        return r2;
      }
      n.r(e);
      var o = {
        debug: false, align: "center", vAlign: "middle", fontSize: 14, fontWeight: "", fontStyle: "", fontVariant: "", font: "Arial", lineHeight: null, justify: false, drawText: function (t2, e2, n2, i2, o2, a) {
          var u = this, f = r([n2, i2, o2, a].map(function (t3) {
            return parseInt(t3);
          }), 4);
          if (n2 = f[0], i2 = f[1], o2 = f[2], a = f[3], !(0 >= o2 || 0 >= a || 0 >= this.fontSize)) {
            var s = n2 + o2, l = i2 + a;
            this.textSize && console.error("%cCanvas-Txt:", "font-weight: bold;", "textSize is depricated and has been renamed to fontSize");
            var c = this.fontStyle, h = this.fontVariant, d = this.fontWeight, p = this.fontSize, y = this.font, b = "".concat(c, " ").concat(h, " ").concat(d, " ").concat(p, "px ").concat(y);
            t2.font = b;
            var g, v = i2 + a / 2 + parseInt(this.fontSize) / 2;
            "right" === this.align ? (g = s, t2.textAlign = "right") : "left" === this.align ? (g = n2, t2.textAlign = "left") : (g = n2 + o2 / 2, t2.textAlign = "center");
            var m = [], x = e2.split("\n"), S = this.justify ? t2.measureText(" ").width : 0;
            x.forEach(function (e3) {
              var n3 = t2.measureText(e3).width;
              if (n3 <= o2)
                m.push(e3);
              else {
                var r2, i3, a2, f2 = e3, s2 = o2;
                for (n3 = t2.measureText(f2).width; n3 > s2;) {
                  for (r2 = 0, i3 = 0, a2 = ""; i3 < s2;)
                    r2++, a2 = f2.substr(0, r2), i3 = t2.measureText(f2.substr(0, r2)).width;
                  r2--, a2 = a2.substr(0, r2);
                  var l2 = r2;
                  if (" " != f2.substr(r2, 1)) {
                    for (; " " != f2.substr(r2, 1) && 0 != r2;)
                      r2--;
                    0 == r2 && (r2 = l2), a2 = f2.substr(0, r2);
                  }
                  a2 = u.justify ? u.justifyLine(t2, a2, S, " ", o2) : a2, f2 = f2.substr(r2), n3 = t2.measureText(f2).width, m.push(a2);
                }
                0 < n3 && m.push(f2);
              }
            });
            var T = this.lineHeight ? this.lineHeight : this.getTextHeight(t2, e2, b), j = T * (m.length - 1), A = i2;
            return "top" === this.vAlign ? v = i2 + this.fontSize : "bottom" === this.vAlign ? (v = l - j, A = l) : (A = i2 + a / 2, v -= j / 2), m.forEach(function (e3) {
              e3 = e3.trim(), t2.fillText(e3, g, v), v += T;
            }), this.debug && (t2.lineWidth = 3, t2.strokeStyle = "#00909e", t2.strokeRect(n2, i2, o2, a), t2.lineWidth = 2, t2.strokeStyle = "#f6d743", t2.beginPath(), t2.moveTo(g, i2), t2.lineTo(g, l), t2.stroke(), t2.strokeStyle = "#ff6363", t2.beginPath(), t2.moveTo(n2, A), t2.lineTo(s, A), t2.stroke()), { height: j + T };
          }
        }, getTextHeight: function (t2, e2, n2) {
          var r2 = t2.textBaseline, i2 = t2.font;
          t2.textBaseline = "bottom", t2.font = n2;
          var o2 = t2.measureText(e2).actualBoundingBoxAscent;
          return t2.textBaseline = r2, t2.font = i2, o2;
        }, justifyLine: function (t2, e2, n2, r2, i2) {
          var o2 = Math.floor, a = e2.trim(), u = t2.measureText(a).width, f = a.split(/\s+/).length - 1, s = o2((i2 - u) / n2);
          if (0 >= f || 0 >= s)
            return a;
          for (var l = o2(s / f), c = s - f * l, h = [], d = 0; d < l; d++)
            h.push(r2);
          return h = h.join(""), a.replace(/\s+/g, function (t3) {
            var e3 = 0 < c ? h + r2 : h;
            return c--, t3 + e3;
          });
        }
      };
      e.default = o;
    }]);
  });
})(build);
const canvasTxt = /* @__PURE__ */ getDefaultExportFromCjs(buildExports);
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
    red,
    blue,
    green,
    yellow,
    black,
    white,
    bloonIce,
    projectileBomb,
    projectileDart,
    projectileIceRing,
    projectileTack,
    effectPop,
    explosion0,
    explosion1,
    explosion2,
    explosion3,
    explosion4,
    explosion5,
    explosion6,
    explosion7,
    explosion8,
    explosion9,
    explosion10,
    explosion11,
    explosion12,
    explosion13,
    explosion14,
    mapGrass,
    mapOverlay,
    mapPathBackground,
    mapTile,
    menuBloons,
    menuTower,
    menuDefense,
    textCongratulations,
    textGameOver,
    textPlayAgain0,
    textPlayAgain1,
    textTryAgain0,
    textTryAgain1,
    towerBombBase,
    towerBombBarrel,
    towerDartMonkey,
    towerIceBorder,
    towerIceOrb,
    towerIceSnowflake,
    towerSuperMonkey,
    towerTackOrb,
    towerTackBase,
    towerTack,
    shopBombTower,
    shopDartMonkey,
    shopIceTower,
    shopSuperMonkey,
    shopTackTower,
    towerTackOrb2,
    projectileTack1
  ] = await Promise.all(
    [
      "bloons/red.svg",
      "bloons/blue.svg",
      "bloons/green.svg",
      "bloons/yellow.svg",
      "bloons/black.svg",
      "bloons/white.svg",
      "bloons/ice.svg",
      "projectiles/bomb.svg",
      "projectiles/dart.svg",
      "projectiles/ice-ring.svg",
      "projectiles/tack2.svg",
      "effects/pop.svg",
      "effects/explosion/explosion0.svg",
      "effects/explosion/explosion1.svg",
      "effects/explosion/explosion2.svg",
      "effects/explosion/explosion3.svg",
      "effects/explosion/explosion4.svg",
      "effects/explosion/explosion5.svg",
      "effects/explosion/explosion6.svg",
      "effects/explosion/explosion7.svg",
      "effects/explosion/explosion8.svg",
      "effects/explosion/explosion9.svg",
      "effects/explosion/explosion10.svg",
      "effects/explosion/explosion11.svg",
      "effects/explosion/explosion12.svg",
      "effects/explosion/explosion13.svg",
      "effects/explosion/explosion14.svg",
      "map/grass.svg",
      "map/overlay.svg",
      "map/path-background.svg",
      "map/tile.svg",
      "menu/bloons.svg",
      "menu/tower.svg",
      "menu/defense.svg",
      "text/congratulations.svg",
      "text/game-over.svg",
      "text/play-again0.svg",
      "text/play-again1.svg",
      "text/try-again0.svg",
      "text/try-again1.svg",
      "towers/bomb-base.svg",
      "towers/bomb-barrel.svg",
      "towers/dart-monkey-base.svg",
      "towers/ice-border.svg",
      "towers/ice-orb.svg",
      "towers/ice-snowflake.svg",
      "towers/super-monkey-base.svg",
      "towers/tack-orb.svg",
      "towers/tack-base.svg",
      "towers/tack.svg",
      "shop/bomb-tower.svg",
      "shop/dart-monkey.svg",
      "shop/ice-tower.svg",
      "shop/super-monkey.svg",
      "shop/tack-shooter.svg",
      "towers/tack-orb2.svg",
      "projectiles/tack.svg"
    ].map((src) => loadTexture(`/hackusu/assets/${src}`))
  ).catch((error) => {
    console.error(error);
    throw new Error("Could not load textures");
  });
  const map = {
    bloons: {
      red,
      blue,
      green,
      yellow,
      black,
      white,
      effects: {
        ice: bloonIce
      }
    },
    projectiles: {
      bomb: projectileBomb,
      dart: projectileDart,
      iceRing: projectileIceRing,
      tack: projectileTack,
      tack1: projectileTack1
    },
    effects: {
      pop: effectPop,
      explosion: [
        explosion0,
        explosion1,
        explosion2,
        explosion3,
        explosion4,
        explosion5,
        explosion6,
        explosion7,
        explosion8,
        explosion9,
        explosion10,
        explosion11,
        explosion12,
        explosion13,
        explosion14
      ]
    },
    map: {
      grass: mapGrass,
      overlay: mapOverlay,
      pathBackground: mapPathBackground,
      tile: mapTile
    },
    menu: {
      bloons: menuBloons,
      tower: menuTower,
      defense: menuDefense
    },
    text: {
      congratulations: textCongratulations,
      gameOver: textGameOver,
      playAgain: [textPlayAgain0, textPlayAgain1],
      tryAgain: [textTryAgain0, textTryAgain1]
    },
    towers: {
      bomb: {
        base: towerBombBase,
        barrel: towerBombBarrel
      },
      dartMonkey: {
        base: towerDartMonkey
      },
      ice: {
        border: towerIceBorder,
        orb: towerIceOrb,
        snowflake: towerIceSnowflake
      },
      superMonkey: {
        base: towerSuperMonkey
      },
      tack: {
        base: towerTackBase,
        orb: towerTackOrb,
        tack: towerTack,
        orb2: towerTackOrb2
      }
    },
    shop: {
      bombTower: shopBombTower,
      dartMonkey: shopDartMonkey,
      iceTower: shopIceTower,
      superMonkey: shopSuperMonkey,
      tackTower: shopTackTower
    }
  };
  textures = map;
};
let textures;
const Textures = () => textures;
const getTowerCooldown = (type) => {
  return 0.9 * (() => {
    switch (type) {
      case "dartMonkey":
        return 500;
      case "bomb":
        return 1500;
      case "tack":
        return 1e3;
      case "ice":
        return 3e3;
      case "superMonkey":
        return 100;
    }
  })();
};
const getTowerCost = (tower) => {
  switch (tower) {
    case "dartMonkey":
      return 250;
    case "tack":
      return 400;
    case "ice":
      return 850;
    case "bomb":
      return 900;
    case "superMonkey":
      return 4e3;
  }
};
const getTowerDescription = (type) => {
  switch (type) {
    case "dartMonkey":
      return "Shoots a single dart. Can upgrade to piercing darts and long range darts.";
    case "tack":
      return "Shoots volleys of tacks in 8 directions. Can upgrade its shoot speed and its range.";
    case "bomb":
      return "Launches a bomb that explodes on impact. Can upgrade to bigger bombs and longer range.";
    case "ice":
      return "Freezes nearby bloons. Frozen bloons are immune to darts and tacks, but bombs will destroy them. Can upgrade to increased freeze time and larger freeze radius.";
    case "superMonkey":
      return "Super monkey shoots a continuous stream of darts and can mow down even the fastest and most stubborn bloons.";
  }
};
const getTowerName = (type) => {
  switch (type) {
    case "bomb":
      return "Bomb Tower";
    case "dartMonkey":
      return "Dart Monkey";
    case "ice":
      return "Ice Tower";
    case "tack":
      return "Tack Tower";
    case "superMonkey":
      return "Super Monkey";
  }
};
const RANGE_MULTIPLIER = 1.75;
const getTowerRange = (type) => {
  const value = (() => {
    switch (type) {
      case "dartMonkey":
        return 100;
      case "bomb":
        return 120;
      case "tack":
        return 70;
      case "ice":
        return 50;
      case "superMonkey":
        return 140;
    }
  })();
  return value * RANGE_MULTIPLIER;
};
const getSpeedLabel = (cooldown) => {
  cooldown = cooldown / 0.9;
  if (cooldown >= 3e3)
    return "slow";
  if (cooldown >= 1e3)
    return "medium";
  if (cooldown >= 500)
    return "fast";
  return "hypersonic";
};
const towerUpgrades = {
  dartMonkey: [
    {
      key: "piercing-darts",
      label: "Piercing Darts",
      cost: 210,
      pierce: 1
    },
    {
      key: "long-range",
      label: "Long Range Darts",
      cost: 100,
      range: 25
    }
  ],
  tack: [
    {
      key: "faster-shooting",
      label: "Faster Shooting",
      cost: 250,
      cooldown: 200
    },
    {
      key: "extra-range-tacks",
      label: "Extra Range Tacks",
      cost: 150,
      range: 10
    }
  ],
  bomb: [
    {
      key: "bigger-bombs",
      label: "Bigger Bombs",
      cost: 650,
      explodeRadius: 100
    },
    {
      key: "extra-range-bombs",
      label: "Extra Range Bombs",
      cost: 300,
      range: 20
    }
  ],
  ice: [
    {
      key: "long-freeze-time",
      label: "Long freeze time",
      cost: 450,
      freezeTime: 1e3
    },
    {
      key: "wide-freeze-radius",
      label: "Wide freeze radius",
      cost: 300,
      range: 20
    }
  ],
  superMonkey: [
    {
      key: "epic-range",
      label: "Epic range",
      cost: 1400,
      range: 100
    }
  ]
};
const getTowerSize = (type) => {
  switch (type) {
    case "dartMonkey":
      return { width: 64, height: 72 };
    case "tack":
      return { width: 64, height: 64 };
    case "ice":
      return { width: 48, height: 48 };
    case "bomb":
      return { width: 56, height: 56 };
    case "superMonkey":
      return { width: 72, height: 82 };
  }
};
const snowflakes = [
  {
    "in": 0,
    out: 1e3,
    reset: 1500,
    from: {
      x: -30,
      y: -20
    },
    to: {
      x: 0,
      y: 10
    }
  },
  {
    "in": 200,
    out: 1200,
    reset: 1500,
    from: {
      x: -45,
      y: -20
    },
    to: {
      x: -15,
      y: 10
    }
  },
  {
    "in": 400,
    out: 1400,
    reset: 1500,
    from: {
      x: -30,
      y: -30
    },
    to: {
      x: 0,
      y: 0
    }
  },
  {
    "in": 600,
    out: 1600,
    reset: 2e3,
    from: {
      x: -30,
      y: -20
    },
    to: {
      x: 0,
      y: 10
    }
  },
  {
    "in": 500,
    out: 1500,
    reset: 1500,
    from: {
      x: -5,
      y: -40
    },
    to: {
      x: 25,
      y: -10
    }
  },
  {
    "in": 700,
    out: 1700,
    reset: 2e3,
    from: {
      x: -10,
      y: -35
    },
    to: {
      x: 20,
      y: -5
    }
  },
  {
    "in": 900,
    out: 1900,
    reset: 2e3,
    from: {
      x: -15,
      y: -30
    },
    to: {
      x: 15,
      y: 0
    }
  }
];
const renderTower = ({
  tower,
  context
}) => {
  const textures2 = Textures();
  context.save();
  context.translate(tower.position.x, tower.position.y);
  const size = getTowerSize(tower.type);
  switch (tower.type) {
    case "dartMonkey": {
      context.rotate(tower.rotation);
      context.drawImage(
        textures2.towers.dartMonkey.base,
        -size.width / 2,
        -size.height / 2,
        size.width,
        size.height
      );
      break;
    }
    case "tack": {
      context.drawImage(
        textures2.towers.tack.base,
        -size.width / 2,
        -size.height / 2,
        size.width,
        size.height
      );
      const orbSize = 0.65;
      context.drawImage(
        textures2.towers.tack.orb,
        -size.width / 2 * orbSize,
        -size.height / 2 * orbSize,
        size.width * orbSize,
        size.height * orbSize
      );
      const orb2Size = 0.35;
      context.drawImage(
        textures2.towers.tack.orb2,
        -size.width / 2 * orb2Size,
        -size.height / 2 * orb2Size,
        size.width * orb2Size,
        size.height * orb2Size
      );
      const tackSize = 0.3;
      context.save();
      context.rotate(-Math.PI / 16);
      context.drawImage(
        textures2.towers.tack.tack,
        -size.width / 2 * tackSize,
        -size.height / 2 * tackSize,
        size.width * tackSize,
        size.height * tackSize
      );
      context.restore();
      context.save();
      context.rotate(Math.PI / 16);
      context.scale(-1, 1);
      context.drawImage(
        textures2.towers.tack.tack,
        -size.width / 2 * tackSize,
        -size.height / 2 * tackSize,
        size.width * tackSize,
        size.height * tackSize
      );
      context.restore();
      break;
    }
    case "ice": {
      context.drawImage(
        textures2.towers.ice.orb,
        -size.width / 2,
        -size.height / 2,
        size.width,
        size.height
      );
      context.drawImage(
        textures2.towers.ice.border,
        -size.width / 2 + 2,
        -size.height / 2 + 4,
        size.width,
        size.height
      );
      for (const snowflake of snowflakes) {
        const time = tower.animation % snowflake.reset;
        if (time > snowflake.in && time < snowflake.out) {
          const progress = (time - snowflake.in) / (snowflake.out - snowflake.in);
          const x = snowflake.from.x + (snowflake.to.x - snowflake.from.x) * progress;
          const y = snowflake.from.y + (snowflake.to.y - snowflake.from.y) * progress;
          context.drawImage(textures2.towers.ice.snowflake, x, y, 10, 10);
        }
      }
      break;
    }
    case "bomb": {
      context.drawImage(
        textures2.towers.bomb.base,
        -size.width / 2,
        -size.height / 2,
        size.width,
        size.height
      );
      context.rotate(tower.rotation);
      const barrelWidth = 1.8;
      const barrelHeight = 0.7;
      const width = size.width * barrelWidth;
      const height = size.height * barrelHeight;
      context.drawImage(
        textures2.towers.bomb.barrel,
        -width / 2,
        -height / 2,
        width,
        height
      );
      break;
    }
    case "superMonkey": {
      context.rotate(tower.rotation);
      context.drawImage(
        textures2.towers.superMonkey.base,
        -size.width / 2,
        -size.height / 2,
        size.width,
        size.height
      );
      break;
    }
  }
  context.restore();
};
const getStoreStartX = () => 780;
const getTowerIconDetails = () => {
  const width = 224;
  const each = width / 5;
  const size = each * 0.95;
  return { size, each, x: 800, y: 270 };
};
const renderTowerIcons = ({
  context
}) => {
  const textures2 = Textures();
  const { x: start, each, size, y } = getTowerIconDetails();
  context.save();
  context.translate(start, y);
  context.drawImage(textures2.shop.dartMonkey, 0, 0, size, size);
  context.save();
  context.translate(each * 0.1, each * 0.3);
  context.rotate(-Math.PI / 4);
  context.drawImage(textures2.projectiles.dart, 0, 0, 10, size * 0.7);
  context.restore();
  context.drawImage(textures2.shop.tackTower, each, 0, size, size);
  context.save();
  context.translate(each * 1.5, each * 0.5);
  for (let i = 0; i < 8; i++) {
    context.rotate(Math.PI / 4);
    context.drawImage(
      textures2.projectiles.tack,
      -3,
      size * 0.15,
      3,
      size * 0.3
    );
  }
  context.restore();
  context.drawImage(textures2.shop.iceTower, each * 2, 0, size, size);
  context.drawImage(textures2.shop.bombTower, each * 3, 0, size, size);
  context.drawImage(textures2.shop.superMonkey, each * 4, 0, size, size);
  context.restore();
};
const renderPlacingTower = ({
  storeSystem,
  canPlace,
  context
}) => {
  const tower = storeSystem.getPlacingTowerDetails();
  if (!tower)
    return;
  context.save();
  context.fillStyle = canPlace ? "rgba(0, 255, 0, 0.5)" : "rgba(255, 0, 0, 0.5)";
  context.beginPath();
  context.arc(tower.position.x, tower.position.y, tower.range, 0, Math.PI * 2);
  context.closePath();
  context.fill();
  context.restore();
  renderTower({
    context,
    tower
  });
};
const renderSelectedTower = ({
  context,
  storeSystem
}) => {
  const tower = storeSystem.getSelectedTower();
  if (!tower)
    return;
  context.save();
  context.fillStyle = "rgba(255, 255, 255, 0.4)";
  context.beginPath();
  context.arc(tower.position.x, tower.position.y, tower.range, 0, Math.PI * 2);
  context.closePath();
  context.fill();
  context.restore();
};
const renderStore = ({
  context,
  canvas,
  storeSystem,
  moneySystem,
  roundSystem,
  livesSystem,
  canPlaceTower: canPlaceTower2
}) => {
  context.save();
  renderSelectedTower({
    context,
    storeSystem
  });
  context.fillStyle = "rgba(255, 255, 255, 0.5)";
  context.beginPath();
  context.rect(getStoreStartX(), 20, 264, canvas.height - 40);
  context.closePath();
  context.fill();
  const lineHeight = 50;
  const linesStart = 70;
  context.textAlign = "left";
  context.fillStyle = "white";
  context.font = "36px TrebuchetMS";
  context.fillText("Round:", 800, linesStart);
  context.fillText("Money:", 800, linesStart + lineHeight);
  context.fillText("Lives:", 800, linesStart + lineHeight * 2);
  context.save();
  context.textAlign = "right";
  context.fillText(roundSystem.getRound().toString(), 1024, linesStart);
  const money = moneySystem.getMoney();
  context.fillText(money.toString(), 1024, linesStart + lineHeight);
  const lives = livesSystem.getLives();
  context.fillText(lives.toString(), 1024, linesStart + lineHeight * 2);
  context.textAlign = "center";
  context.fillText("Build Towers", 912, linesStart + lineHeight * 3.5);
  context.beginPath();
  context.strokeStyle = "white";
  context.lineWidth = 4;
  context.moveTo(800, linesStart + lineHeight * 3.5 + 8);
  context.lineTo(1024, linesStart + lineHeight * 3.5 + 8);
  context.stroke();
  context.restore();
  if (!roundSystem.isActive()) {
    const animation = roundSystem.getAnimation();
    const redBlue = Math.max(0, Math.min(255, animation * 175));
    context.beginPath();
    context.fillStyle = `rgba(${redBlue}, 255, ${redBlue}, 0.7)`;
    context.rect(800, 880, 224, 100);
    context.closePath();
    context.fill();
    context.textAlign = "center";
    context.fillStyle = "white";
    context.font = "36px TrebuchetMS";
    context.fillText("Start Round", 912, 940);
  }
  renderTowerIcons({ context });
  renderPlacingTower({ context, storeSystem, canPlace: canPlaceTower2 });
  if (storeSystem.getHoverTower()) {
    renderHoveredTower({ context, storeSystem });
  } else {
    renderSelectedTowerPane({ context, storeSystem, moneySystem });
  }
  context.restore();
};
const renderSelectedTowerPane = ({
  context,
  storeSystem,
  moneySystem
}) => {
  const tower = storeSystem.getSelectedTower();
  if (!tower)
    return;
  context.save();
  context.globalAlpha = 0.6;
  context.fillStyle = `#B8DEB7`;
  context.beginPath();
  context.rect(800, 330, 224, 532);
  context.closePath();
  context.fill();
  context.globalAlpha = 1;
  context.textAlign = "center";
  context.fillStyle = `#056105`;
  context.font = "24px TrebuchetMS";
  context.fillText(getTowerName(tower.type), 912, 380);
  context.strokeStyle = `#056105`;
  context.lineWidth = 4;
  context.beginPath();
  context.moveTo(820, 390);
  context.lineTo(1004, 390);
  context.stroke();
  context.textAlign = "left";
  context.fillText("Speed:", 810, 430);
  context.fillText("Range:", 810, 480);
  context.textAlign = "right";
  context.fillText(getSpeedLabel(tower.cooldown), 1014, 430);
  context.fillText((tower.range / RANGE_MULTIPLIER).toString(), 1014, 480);
  context.fillStyle = `#A94A2E`;
  context.beginPath();
  const sellButtonCoordinates = getSellButtonCoordinates();
  context.rect(
    sellButtonCoordinates.x,
    sellButtonCoordinates.y,
    sellButtonCoordinates.width,
    sellButtonCoordinates.height
  );
  context.closePath();
  context.fill();
  context.fillStyle = "rgba(255, 255, 255, 0.8)";
  context.font = "24px TrebuchetMS";
  context.textAlign = "left";
  context.fillText("Sell for:", 830, 830);
  context.fillStyle = "white";
  context.font = "24px TrebuchetMS";
  context.textAlign = "right";
  context.fillText(getSellPrice(tower.cost).toString(), 994, 830);
  const upgrades = towerUpgrades[tower.type];
  const xStart = 810;
  const yStart = 500;
  const xSpacing = 10;
  const width = 100;
  const height = 280;
  for (let i = 0; i < upgrades.length; i++) {
    const hover = storeSystem.isHovering(i);
    const purchased = tower.upgrades.find((u) => u.key === upgrades[i].key);
    context.fillStyle = hover && !purchased ? "#42F042" : purchased ? "#11D011" : moneySystem.getMoney() >= upgrades[i].cost ? `#0FBD0F` : "#A94A2E";
    context.beginPath();
    context.rect(xStart + (xSpacing + width) * i, yStart, width, height);
    context.closePath();
    context.fill();
    const lines = upgrades[i].label.split(" ");
    for (let j = 0; j < lines.length; j++) {
      context.fillStyle = "white";
      context.font = "18px TrebuchetMS";
      context.textAlign = "center";
      context.fillText(
        lines[j],
        xStart + (xSpacing + width) * i + width / 2,
        yStart + 150 + j * 25
      );
    }
    context.fillStyle = "rgba(255, 255, 255, 0.8)";
    context.fillText(
      purchased ? "Already" : "Buy for:",
      xStart + (xSpacing + width) * i + width / 2,
      yStart + height - 40
    );
    if (purchased) {
      context.fillText(
        "Purchased",
        xStart + (xSpacing + width) * i + width / 2,
        yStart + height - 40 + 25
      );
    } else {
      context.fillStyle = "white";
      context.fillText(
        purchased ? "" : upgrades[i].cost.toString(),
        xStart + (xSpacing + width) * i + width / 2,
        yStart + height - 40 + 25
      );
    }
  }
  context.restore();
};
const getSellButtonCoordinates = () => ({
  x: 820,
  y: 800,
  width: 184,
  height: 40
});
const getUpgradeButtonCoordinates = (index) => ({
  x: 810 + (10 + 100) * index,
  y: 500,
  width: 100,
  height: 280,
  type: "box"
});
const renderHoveredTower = ({
  context,
  storeSystem
}) => {
  const tower = storeSystem.getHoverTower();
  if (!tower)
    return;
  context.save();
  context.globalAlpha = 0.6;
  context.fillStyle = `#B8DEB7`;
  context.beginPath();
  context.rect(800, 330, 224, 532);
  context.closePath();
  context.fill();
  context.globalAlpha = 1;
  context.textAlign = "center";
  context.fillStyle = `#056105`;
  context.font = "24px TrebuchetMS";
  context.fillText(getTowerName(tower), 912, 380);
  context.strokeStyle = `#056105`;
  context.lineWidth = 4;
  context.beginPath();
  context.moveTo(820, 390);
  context.lineTo(1004, 390);
  context.stroke();
  context.textAlign = "left";
  context.fillText("Cost:", 810, 430);
  context.fillText("Speed:", 810, 480);
  context.textAlign = "right";
  context.fillText(getTowerCost(tower).toString(), 1014, 430);
  context.fillText(getSpeedLabel(getTowerCooldown(tower)), 1014, 480);
  context.textAlign = "left";
  const description = getTowerDescription(tower);
  canvasTxt.fontSize = 18;
  canvasTxt.font = "TrebuchetMS";
  canvasTxt.align = "left";
  canvasTxt.vAlign = "top";
  canvasTxt.drawText(context, description, 815, 500, 200, 200);
  context.restore();
};
const computePoint = (distance) => {
  const segment0 = 150;
  const segment1 = segment0 + 250;
  const segment2 = segment1 + 180;
  const segment3 = segment2 + 505;
  const segment4 = segment3 + 250;
  const segment5 = segment4 + 170;
  const segment6 = segment5 + 600;
  const segment7 = segment6 + 275;
  const segment8 = segment7 + 185;
  const segment9 = segment8 + 225;
  const segment10 = segment9 + 195;
  const segment11 = segment10 + 270;
  const segment12 = segment11 + 260;
  const segment13 = segment12 + 160;
  const value = (() => {
    if (distance < segment0) {
      return {
        completed: false,
        x: distance,
        y: 405
      };
    } else if (distance < segment1) {
      return {
        completed: false,
        x: 150,
        y: 405 - (distance - segment0)
      };
    } else if (distance < segment2) {
      return {
        completed: false,
        x: 150 + (distance - segment1),
        y: 155
      };
    } else if (distance < segment3) {
      return {
        completed: false,
        x: 330,
        y: 155 + (distance - segment2)
      };
    } else if (distance < segment4) {
      return {
        completed: false,
        x: 330 - (distance - segment3),
        y: 660
      };
    } else if (distance < segment5) {
      return {
        completed: false,
        x: 330 - 250,
        y: 660 + (distance - segment4)
      };
    } else if (distance < segment6) {
      return {
        completed: false,
        x: 80 + (distance - segment5),
        y: 660 + 170
      };
    } else if (distance < segment7) {
      return {
        completed: false,
        x: 80 + 600,
        y: 660 + 170 - (distance - segment6)
      };
    } else if (distance < segment8) {
      return {
        completed: false,
        x: 80 + 600 - (distance - segment7),
        y: 660 + 170 - 275
      };
    } else if (distance < segment9) {
      return {
        completed: false,
        x: 80 + 600 - 185,
        y: 660 + 170 - 275 - (distance - segment8)
      };
    } else if (distance < segment10) {
      return {
        completed: false,
        x: 80 + 600 - 185 + (distance - segment9),
        y: 660 + 170 - 275 - 225
      };
    } else if (distance < segment11) {
      return {
        completed: false,
        x: 80 + 600 - 185 + 195,
        y: 660 + 170 - 275 - 225 - (distance - segment10)
      };
    } else if (distance < segment12) {
      return {
        completed: false,
        x: 690 - (distance - segment11),
        y: 60
      };
    } else if (distance < segment13) {
      return {
        completed: false,
        x: 430,
        y: 60 - (distance - segment12)
      };
    } else {
      return {
        completed: true,
        x: 430,
        y: -100
      };
    }
  })();
  return {
    x: value.x + 25,
    y: value.y + 35,
    completed: value.completed
  };
};
const openBoxes = [
  {
    x: 0,
    y: 0,
    width: 143,
    height: 415
  },
  {
    x: 0,
    y: 0,
    width: 422,
    height: 159
  },
  {
    x: 65,
    y: 75,
    width: 103,
    height: 151
  },
  {
    x: 109,
    y: 92,
    width: 75,
    height: 86
  },
  {
    x: 384,
    y: 138,
    width: 309,
    height: 203
  },
  {
    x: 394,
    y: 252,
    width: 94,
    height: 581
  },
  {
    x: 403,
    y: 638,
    width: 277,
    height: 201
  },
  {
    x: 134,
    y: 753,
    width: 543,
    height: 82
  },
  {
    x: 348,
    y: 103,
    width: 107,
    height: 117
  },
  {
    x: 246,
    y: 23,
    width: 185,
    height: 160
  },
  {
    x: 346,
    y: 688,
    width: 245,
    height: 134
  },
  {
    x: 191,
    y: 231,
    width: 145,
    height: 445
  },
  {
    x: 0,
    y: 508,
    width: 332,
    height: 166
  },
  {
    x: 0,
    y: 510,
    width: 86,
    height: 506
  },
  {
    x: 0,
    y: 915,
    width: 784,
    height: 120
  },
  {
    x: 703,
    y: 873,
    width: 75,
    height: 143
  },
  {
    x: 546,
    y: 411,
    width: 231,
    height: 160
  },
  {
    x: 483,
    y: 6,
    width: 296,
    height: 78
  },
  {
    x: 693,
    y: 499,
    width: 118,
    height: 115
  }
];
const tiles = [
  {
    x: -24,
    y: 400,
    width: 140,
    height: 110,
    orientation: "horizontal"
  },
  {
    x: 112,
    y: 405,
    width: 144,
    height: 100,
    orientation: "horizontal"
  },
  {
    x: 112,
    y: 264,
    width: 144,
    height: 100,
    orientation: "vertical"
  },
  {
    x: 112,
    y: 128,
    width: 144,
    height: 100,
    orientation: "vertical"
  },
  {
    x: 208,
    y: 150,
    width: 90,
    height: 100,
    orientation: "horizontal"
  },
  {
    x: 292,
    y: 150,
    width: 144,
    height: 100,
    orientation: "horizontal"
  },
  {
    x: 314,
    y: 244,
    width: 144,
    height: 85,
    orientation: "vertical"
  },
  {
    x: 314,
    y: 384,
    width: 144,
    height: 85,
    orientation: "vertical"
  },
  {
    x: 316,
    y: 384,
    width: 144,
    height: 85,
    orientation: "vertical"
  },
  {
    x: 316,
    y: 524,
    width: 144,
    height: 85,
    orientation: "vertical"
  },
  {
    x: 316,
    y: 664,
    width: 144,
    height: 85,
    orientation: "vertical"
  },
  {
    x: 236,
    y: 664,
    width: 84,
    height: 95,
    orientation: "horizontal"
  },
  {
    x: 126,
    y: 664,
    width: 114,
    height: 95,
    orientation: "horizontal"
  },
  {
    x: 42,
    y: 664,
    width: 144,
    height: 95,
    orientation: "vertical"
  },
  {
    x: 42,
    y: 805,
    width: 144,
    height: 95,
    orientation: "vertical"
  },
  {
    x: 132,
    y: 829,
    width: 144,
    height: 98,
    orientation: "horizontal"
  },
  {
    x: 272,
    y: 829,
    width: 144,
    height: 98,
    orientation: "horizontal"
  },
  {
    x: 412,
    y: 829,
    width: 144,
    height: 98,
    orientation: "horizontal"
  },
  {
    x: 552,
    y: 829,
    width: 128,
    height: 98,
    orientation: "horizontal"
  },
  {
    x: 668,
    y: 790,
    width: 128,
    height: 98,
    orientation: "vertical"
  },
  {
    x: 662,
    y: 650,
    width: 144,
    height: 98,
    orientation: "vertical"
  },
  {
    x: 662,
    y: 550,
    width: 104,
    height: 98,
    orientation: "vertical"
  },
  {
    x: 542,
    y: 555,
    width: 126,
    height: 98,
    orientation: "horizontal"
  },
  {
    x: 472,
    y: 514,
    width: 144,
    height: 78,
    orientation: "vertical"
  },
  {
    x: 472,
    y: 414,
    width: 104,
    height: 78,
    orientation: "vertical"
  },
  {
    x: 460,
    y: 330,
    width: 120,
    height: 88,
    orientation: "horizontal"
  },
  {
    x: 575,
    y: 330,
    width: 110,
    height: 88,
    orientation: "horizontal"
  },
  {
    x: 675,
    y: 270,
    width: 144,
    height: 78,
    orientation: "vertical"
  },
  {
    x: 675,
    y: 140,
    width: 134,
    height: 78,
    orientation: "vertical"
  },
  {
    x: 630,
    y: 52,
    width: 144,
    height: 98,
    orientation: "horizontal"
  },
  {
    x: 500,
    y: 54,
    width: 134,
    height: 98,
    orientation: "horizontal"
  },
  {
    x: 400,
    y: 68,
    width: 104,
    height: 90,
    orientation: "horizontal"
  },
  {
    x: 402,
    y: -30,
    width: 100,
    height: 90,
    orientation: "vertical"
  }
];
const createOriginalPath = () => {
  return {
    key: "original",
    tiles,
    computePoint,
    canPlaceTower: ({ x, y, width, height, canvas }) => {
      if (x - width / 2 < 0 || x + width / 2 > getStoreStartX())
        return false;
      if (y - height / 2 < 0 || y + height / 2 > canvas.height)
        return false;
      for (let i = 0; i < openBoxes.length; i++) {
        const box = openBoxes[i];
        if (x - width / 2 > box.x && x + width / 2 < box.x + box.width && y - height / 2 > box.y && y + height / 2 < box.y + box.height)
          return true;
      }
      return false;
    }
  };
};
const createPathSystem = ({ type }) => {
  switch (type) {
    case "original":
      return createOriginalPath();
  }
};
let nextId$1 = 1;
const createProjectileId = () => {
  return nextId$1++;
};
const getTimeToHit = ({
  bloon,
  origin,
  speed
}) => {
  const distanceToBloon = Math.sqrt(
    Math.pow(bloon.x - origin.x, 2) + Math.pow(bloon.y - origin.y, 2)
  );
  const timeToHit = distanceToBloon * speed;
  return timeToHit * 1e3;
};
const getPositionAfterTime = ({
  bloon,
  time,
  pathSystem
}) => {
  const estimatedHitPosition = pathSystem.computePoint(
    bloon.distance + getBloonSpeed(bloon) * time
  );
  return estimatedHitPosition;
};
const getHitPosition = ({
  bloon,
  origin,
  speed,
  level,
  pathSystem
}) => {
  let position = {
    x: origin.x,
    y: origin.y
  };
  let time;
  for (let i = 0; i < level; i++) {
    time = getTimeToHit({
      bloon: position,
      origin,
      speed
    }) * 1.5;
    position = getPositionAfterTime({
      bloon,
      time,
      pathSystem
    });
  }
  return position;
};
const createBomb = ({
  tower,
  bloon,
  pathSystem
}) => {
  const speed = 1;
  const estimatedHitPosition = getHitPosition({
    bloon,
    origin: tower.position,
    speed,
    level: 1,
    pathSystem
  });
  const direction = {
    x: estimatedHitPosition.x - tower.position.x,
    y: estimatedHitPosition.y - tower.position.y
  };
  const unitDirection = {
    x: direction.x / Math.sqrt(direction.x * direction.x + direction.y * direction.y),
    y: direction.y / Math.sqrt(direction.x * direction.x + direction.y * direction.y)
  };
  return [
    {
      id: createProjectileId(),
      position: {
        x: tower.position.x,
        y: tower.position.y
      },
      origin: {
        x: tower.position.x,
        y: tower.position.y
      },
      direction: unitDirection,
      speed,
      damage: 1,
      range: tower.range,
      elapsed: 0,
      type: tower.type,
      explodeRadius: tower.explodeRadius,
      pierce: tower.pierce || 0,
      pierced: []
    }
  ];
};
const createDart = ({
  bloon,
  pathSystem,
  tower
}) => {
  const speed = 1.2;
  const estimatedHitPosition = getHitPosition({
    bloon,
    origin: tower.position,
    speed,
    level: 1,
    pathSystem
  });
  const direction = {
    x: estimatedHitPosition.x - tower.position.x,
    y: estimatedHitPosition.y - tower.position.y
  };
  const unitDirection = {
    x: direction.x / Math.sqrt(direction.x * direction.x + direction.y * direction.y),
    y: direction.y / Math.sqrt(direction.x * direction.x + direction.y * direction.y)
  };
  return [
    {
      id: createProjectileId(),
      position: {
        x: tower.position.x,
        y: tower.position.y
      },
      origin: {
        x: tower.position.x,
        y: tower.position.y
      },
      direction: unitDirection,
      speed,
      damage: 1,
      range: tower.range,
      elapsed: 0,
      type: tower.type,
      pierce: tower.pierce || 0,
      pierced: []
    }
  ];
};
const createIceRing = ({ tower }) => {
  return [
    {
      id: createProjectileId(),
      position: tower.position,
      origin: tower.position,
      direction: { x: 0, y: 0 },
      speed: 0,
      damage: 0,
      range: tower.range,
      elapsed: 0,
      type: "ice",
      freezeTime: tower.freezeTime,
      pierce: tower.pierce || 0,
      pierced: []
    }
  ];
};
const ICE_SPREAD_RATE = 0.6;
const getProjectileRadius = (type) => {
  switch (type) {
    case "dartMonkey":
    case "superMonkey":
      return 40;
    case "tack":
      return 20;
    case "bomb":
      return 45;
    default:
      return 0;
  }
};
const createTacks = ({ tower }) => {
  const speed = 0.5;
  const projectiles = [];
  for (let i = 0; i < 8; i++) {
    const direction = {
      x: Math.cos(i * Math.PI / 4),
      y: Math.sin(i * Math.PI / 4)
    };
    projectiles.push({
      id: createProjectileId(),
      position: {
        x: tower.position.x,
        y: tower.position.y
      },
      origin: {
        x: tower.position.x,
        y: tower.position.y
      },
      direction,
      speed,
      damage: 1,
      range: 100,
      elapsed: 0,
      type: tower.type,
      pierce: tower.pierce || 0,
      pierced: []
    });
  }
  return projectiles;
};
const createProjectileSystem = ({
  eventSystem,
  bloonSystem,
  pathSystem
}) => {
  const state = {
    projectiles: []
  };
  eventSystem.subscribe({
    type: "TowerFired",
    callback: (event) => {
      const { tower, bloon } = event.payload;
      const projectiles = (() => {
        switch (tower.type) {
          case "dartMonkey":
          case "superMonkey":
            return createDart({ bloon, pathSystem, tower });
          case "tack":
            return createTacks({ tower });
          case "ice":
            return createIceRing({ tower });
          case "bomb":
            return createBomb({ tower, pathSystem, bloon });
          default:
            return [];
        }
      })();
      projectiles == null ? void 0 : projectiles.forEach((projectile) => {
        state.projectiles.push(projectile);
      });
    }
  });
  return {
    update: (deltaTime) => {
      for (let i = 0; i < state.projectiles.length; i++) {
        const projectile = state.projectiles[i];
        projectile.elapsed += deltaTime;
        projectile.position.x += projectile.direction.x * deltaTime * projectile.speed;
        projectile.position.y += projectile.direction.y * deltaTime * projectile.speed;
        const distance = Math.sqrt(
          Math.pow(projectile.position.x - projectile.origin.x, 2) + Math.pow(projectile.position.y - projectile.origin.y, 2)
        );
        if (distance >= projectile.range * 1.4 || projectile.type === "ice" && projectile.elapsed >= projectile.range / ICE_SPREAD_RATE) {
          state.projectiles.splice(i, 1);
          i--;
          if (projectile.type === "ice") {
            const bloons = bloonSystem.getBloons().filter((bloon2) => {
              const distance2 = Math.sqrt(
                Math.pow(bloon2.x - projectile.position.x, 2) + Math.pow(bloon2.y - projectile.position.y, 2)
              );
              return distance2 <= projectile.range && bloon2.type !== "white";
            });
            bloons.forEach((bloon2) => {
              bloon2.frozen = true;
              bloon2.frozenDuration = projectile.freezeTime;
              bloon2.frozenTime = 0;
            });
          }
          continue;
        }
        const bloon = bloonSystem.getLastBloonInRadius({
          x: projectile.position.x,
          y: projectile.position.y,
          radius: getProjectileRadius(projectile.type)
        });
        if (!bloon)
          continue;
        if (bloon.frozen && projectile.type !== "bomb") {
          state.projectiles.splice(i, 1);
          i--;
          continue;
        }
        const pierced = new Set(projectile.pierced);
        const parents = new Set(bloon.parents);
        const intersection = new Set(
          [...pierced].filter((x) => parents.has(x))
        );
        if (intersection.size > 0)
          continue;
        console.log(`hit bloon ${bloon.id} with projectile ${projectile.id}`);
        eventSystem.publish({
          type: "BloonHit",
          payload: { bloon, projectile }
        });
        if (projectile.pierced.length >= projectile.pierce) {
          state.projectiles.splice(i, 1);
          i--;
        } else {
          projectile.pierced.push(bloon.id);
        }
      }
    },
    getProjectiles: () => state.projectiles
  };
};
const canPlaceTower = ({
  towerSystem,
  storeSystem,
  pathSystem,
  canvas
}) => {
  const details = storeSystem.getPlacingTowerDetails();
  if (!details)
    return false;
  const size = getTowerSize(details.type);
  const { x, y } = details.position;
  return pathSystem.canPlaceTower({
    x,
    y,
    width: size.width,
    height: size.height,
    canvas
  }) && towerSystem.canPlaceTower({
    x,
    y,
    width: size.width,
    height: size.height
  });
};
const bloonWidth = 50;
const bloonHeight = 70;
const FROZEN_ANIMATION_DURATION = 500;
const renderBloon = (props) => {
  const texture = Textures().bloons[props.bloon.type];
  props.context.drawImage(
    texture,
    props.bloon.x - bloonWidth / 2,
    props.bloon.y - bloonHeight / 2,
    bloonWidth,
    bloonHeight
  );
  if (props.bloon.frozen) {
    const texture2 = Textures().bloons.effects.ice;
    const opacity = Math.min(
      1,
      props.bloon.frozenTime / FROZEN_ANIMATION_DURATION
    );
    props.context.globalAlpha = opacity;
    props.context.drawImage(
      texture2,
      props.bloon.x - bloonWidth / 2,
      props.bloon.y - bloonHeight / 2,
      bloonWidth,
      bloonHeight
    );
    props.context.globalAlpha = 1;
  }
};
const renderMap = ({
  context,
  pathSystem,
  canvas
}) => {
  const textures2 = Textures();
  const gap = 1024 * 0.1;
  context.save();
  pathSystem.tiles.forEach((tile) => {
    context.save();
    context.translate(tile.x, tile.y);
    if (tile.orientation === "vertical") {
      context.translate(tile.height, 0);
      context.rotate(Math.PI / 2);
    }
    context.drawImage(textures2.map.tile, 0, 0, tile.width, tile.height);
    context.restore();
  });
  context.drawImage(
    textures2.map.grass,
    -gap,
    -gap,
    1024 + gap * 2,
    canvas.height + gap * 2
  );
  context.globalAlpha = 0.9;
  context.drawImage(
    textures2.map.overlay,
    -gap,
    -gap,
    1024 + gap * 2,
    canvas.height + gap * 2
  );
  context.globalAlpha = 1;
  context.drawImage(
    textures2.map.pathBackground,
    -1024 * 0.03,
    -canvas.height * 0.06,
    1024 * 0.77,
    canvas.height * 0.965
  );
  context.restore();
};
const renderParticles = ({
  particleSystem,
  context
}) => {
  const particles = particleSystem.getParticles();
  const textures2 = Textures();
  for (let i = 0; i < particles.length; i++) {
    const particle = particles[i];
    switch (particle.type) {
      case "pop":
        renderPop({ particle, context, textures: textures2 });
        break;
      case "explosion":
        renderExplosion({ particle, context, textures: textures2 });
        break;
    }
  }
};
const renderExplosion = ({
  particle,
  context,
  textures: textures2
}) => {
  context.save();
  context.translate(particle.x, particle.y);
  context.rotate(particle.rotation);
  context.translate(-particle.x, -particle.y);
  const frame = Math.floor(
    particle.elapsedTime / particle.lifetime * textures2.effects.explosion.length
  );
  context.drawImage(
    textures2.effects.explosion[frame],
    particle.x - particle.width / 2,
    particle.y - particle.height / 2,
    particle.width,
    particle.height
  );
  context.restore();
};
const renderPop = ({
  particle,
  context,
  textures: textures2
}) => {
  context.save();
  context.translate(particle.x, particle.y);
  context.rotate(particle.rotation);
  context.translate(-particle.x, -particle.y);
  context.drawImage(
    textures2.effects.pop,
    particle.x - particle.width / 2,
    particle.y - particle.height / 2,
    particle.width,
    particle.height
  );
  context.restore();
};
const renderProjectile = (props) => {
  const { projectile, context } = props;
  switch (projectile.type) {
    case "dartMonkey":
    case "superMonkey":
      renderDart({ projectile, context });
      break;
    case "tack":
      renderTack({ projectile, context });
      break;
    case "ice":
      renderIceRing({ projectile, context });
      break;
    case "bomb":
      renderBomb({ projectile, context });
      break;
  }
};
const renderDart = (props) => {
  const { projectile, context } = props;
  const texture = Textures().projectiles.dart;
  context.save();
  context.translate(projectile.position.x, projectile.position.y);
  context.rotate(
    Math.atan2(projectile.direction.y, projectile.direction.x) + Math.PI / 2
  );
  const size = 0.1;
  context.drawImage(
    texture,
    -texture.width / 2 * size,
    -texture.height / 2 * size,
    texture.width * size,
    texture.height * size
  );
  context.restore();
};
const renderTack = (props) => {
  const { projectile, context } = props;
  const texture = Textures().projectiles.tack1;
  context.save();
  context.translate(projectile.position.x, projectile.position.y);
  context.rotate(
    Math.atan2(projectile.direction.y, projectile.direction.x) + Math.PI / 2
  );
  const size = 1;
  context.drawImage(
    texture,
    -texture.width / 2 * size,
    -texture.height / 2 * size,
    texture.width * size,
    texture.height * size
  );
  context.restore();
};
const renderIceRing = ({
  projectile,
  context
}) => {
  const texture = Textures().projectiles.iceRing;
  context.save();
  context.translate(projectile.position.x, projectile.position.y);
  context.rotate(
    Math.atan2(projectile.direction.y, projectile.direction.x) + Math.PI / 2
  );
  const size = projectile.elapsed / projectile.range * ICE_SPREAD_RATE * 3;
  context.drawImage(
    texture,
    -texture.width / 2 * size,
    -texture.height / 2 * size,
    texture.width * size,
    texture.height * size
  );
  context.restore();
};
const renderBomb = ({
  projectile,
  context
}) => {
  const texture = Textures().projectiles.bomb;
  context.save();
  context.translate(projectile.position.x, projectile.position.y);
  context.rotate(
    Math.atan2(projectile.direction.y, projectile.direction.x) + Math.PI / 2
  );
  const size = 2.5;
  context.drawImage(
    texture,
    -texture.width / 2 * size,
    -texture.height / 2 * size,
    texture.width * size,
    texture.height * size
  );
  context.restore();
};
const createRenderSystem = ({
  bloonSystem,
  storeSystem,
  moneySystem,
  pathSystem,
  context,
  canvas,
  roundSystem,
  livesSystem,
  towerSystem,
  projectileSystem,
  particleSystem
}) => {
  return {
    render: () => {
      renderMap({ context, canvas, pathSystem });
      for (const bloon of bloonSystem.getBloons())
        renderBloon({ bloon, context });
      renderStore({
        context,
        canvas,
        storeSystem,
        moneySystem,
        roundSystem,
        livesSystem,
        canPlaceTower: canPlaceTower({
          towerSystem,
          storeSystem,
          pathSystem,
          canvas
        })
      });
      for (const tower of towerSystem.getTowers())
        renderTower({ tower, context });
      for (const projectile of projectileSystem.getProjectiles())
        renderProjectile({ projectile, context });
      renderParticles({ particleSystem, context });
    }
  };
};
const ANIMATION_LENGTH = 1e3;
const createRoundSystem = ({
  eventSystem,
  mouseSystem,
  bloonSystem
}) => {
  const state = {
    round: 1,
    active: false,
    buttonAnimation: 0
  };
  const handleCheckStageCleared = () => {
    if (bloonSystem.isComplete()) {
      eventSystem.publish({
        type: "StageCleared",
        payload: {
          stage: state.round,
          message: rounds$1.rounds[state.round].message
        }
      });
      state.round += 1;
      state.active = false;
    }
  };
  eventSystem.subscribe({
    type: "BloonDestroyed",
    callback: handleCheckStageCleared
  });
  eventSystem.subscribe({
    type: "BloonEscaped",
    callback: handleCheckStageCleared
  });
  mouseSystem.subscribe({
    type: "click",
    callback: () => {
      state.active = true;
      eventSystem.publish({
        type: "StageStarted",
        payload: {
          stage: state.round
        }
      });
    },
    box: {
      type: "box",
      x: 800,
      y: 880,
      width: 224,
      height: 100
    }
  });
  return {
    isActive: () => state.active,
    getRound: () => state.round,
    update: (deltaTime) => {
      if (state.active) {
        state.buttonAnimation = 0;
        return;
      }
      state.buttonAnimation += deltaTime;
      if (state.buttonAnimation > ANIMATION_LENGTH) {
        state.buttonAnimation -= ANIMATION_LENGTH;
      }
    },
    getAnimation: () => {
      const half = ANIMATION_LENGTH / 2;
      const progress = state.buttonAnimation / half;
      if (progress < 1)
        return progress;
      return 2 - progress;
    }
  };
};
let nextId = 1;
const createTowerId = () => {
  return nextId++;
};
const createStoreSystem = ({
  moneySystem,
  mouseSystem,
  keyboardSystem,
  eventSystem,
  canvas,
  pathSystem,
  towerSystem
}) => {
  const state = {
    placingTower: null,
    selectedTower: null,
    hoverTower: null,
    position: { x: 0, y: 0 },
    upgradeHover: -1
  };
  const buttonDetails = getTowerIconDetails();
  const boxes = {
    dartMonkey: {
      x: buttonDetails.x,
      y: buttonDetails.y
    },
    tackTower: {
      x: buttonDetails.x + buttonDetails.each,
      y: buttonDetails.y
    },
    iceTower: {
      x: buttonDetails.x + buttonDetails.each * 2,
      y: buttonDetails.y
    },
    bombTower: {
      x: buttonDetails.x + buttonDetails.each * 3,
      y: buttonDetails.y
    },
    superMonkey: {
      x: buttonDetails.x + buttonDetails.each * 4,
      y: buttonDetails.y
    }
  };
  mouseSystem.moveSubscribe({
    type: "move",
    callback: (x, y) => {
      state.position = { x, y };
    }
  });
  eventSystem.subscribe({
    type: "TowerSelected",
    callback: (event) => {
      state.selectedTower = event.payload.tower;
    }
  });
  mouseSystem.subscribe({
    type: "click",
    box: {
      type: "box",
      x: 0,
      y: 0,
      width: getStoreStartX(),
      height: canvas.height
    },
    callback: (x, y) => {
      var _a;
      if (!state.placingTower)
        return towerSystem.handleSelectTower({ x, y });
      const size = getTowerSize(((_a = state.placingTower) == null ? void 0 : _a.type) ?? "dartMonkey");
      if (!pathSystem.canPlaceTower({
        x,
        y,
        width: size.width,
        height: size.height,
        canvas
      }) || !towerSystem.canPlaceTower({
        x,
        y,
        width: size.width,
        height: size.height
      }))
        return;
      const cost = getTowerCost(state.placingTower.type);
      if (moneySystem.getMoney() >= cost) {
        eventSystem.publish({
          type: "TowerPlaced",
          payload: {
            type: state.placingTower.type,
            x,
            y,
            cost
          }
        });
      }
    }
  });
  keyboardSystem.subscribe({
    key: "exit",
    callback: () => {
      state.placingTower = null;
    },
    type: "keydown"
  });
  eventSystem.subscribe({
    type: "TowerPlaced",
    callback: () => {
      state.placingTower = null;
      state.selectedTower = null;
    }
  });
  const handleTowerClicked = (tower) => {
    var _a;
    if (((_a = state.placingTower) == null ? void 0 : _a.type) === tower) {
      state.placingTower = null;
      state.selectedTower = null;
      return;
    }
    const cost = getTowerCost(tower);
    if (moneySystem.getMoney() >= cost) {
      state.selectedTower = null;
      state.placingTower = {
        type: tower,
        position: { x: 0, y: 0 },
        cooldown: 0,
        id: createTowerId(),
        range: getTowerRange(tower),
        rotation: 0,
        animation: 0,
        timeSinceFire: 0,
        cost: 0,
        upgrades: []
      };
    }
  };
  const createBoundingCircle = (box) => ({
    x: box.x + buttonDetails.size / 2,
    y: box.y + buttonDetails.size / 2,
    type: "circle",
    radius: buttonDetails.size / 2
  });
  mouseSystem.subscribe({
    box: createBoundingCircle(boxes.dartMonkey),
    type: "click",
    callback: () => handleTowerClicked("dartMonkey")
  });
  mouseSystem.hoverSubscribe({
    box: createBoundingCircle(boxes.dartMonkey),
    type: "hover",
    in: () => state.hoverTower = "dartMonkey",
    out: () => state.hoverTower = null
  });
  mouseSystem.subscribe({
    box: createBoundingCircle(boxes.tackTower),
    type: "click",
    callback: () => handleTowerClicked("tack")
  });
  mouseSystem.hoverSubscribe({
    box: createBoundingCircle(boxes.tackTower),
    type: "hover",
    in: () => state.hoverTower = "tack",
    out: () => state.hoverTower = null
  });
  mouseSystem.subscribe({
    box: createBoundingCircle(boxes.iceTower),
    type: "click",
    callback: () => handleTowerClicked("ice")
  });
  mouseSystem.hoverSubscribe({
    box: createBoundingCircle(boxes.iceTower),
    type: "hover",
    in: () => state.hoverTower = "ice",
    out: () => state.hoverTower = null
  });
  mouseSystem.subscribe({
    box: createBoundingCircle(boxes.bombTower),
    type: "click",
    callback: () => handleTowerClicked("bomb")
  });
  mouseSystem.hoverSubscribe({
    box: createBoundingCircle(boxes.bombTower),
    type: "hover",
    in: () => state.hoverTower = "bomb",
    out: () => state.hoverTower = null
  });
  mouseSystem.subscribe({
    box: createBoundingCircle(boxes.superMonkey),
    type: "click",
    callback: () => handleTowerClicked("superMonkey")
  });
  mouseSystem.hoverSubscribe({
    box: createBoundingCircle(boxes.superMonkey),
    type: "hover",
    in: () => state.hoverTower = "superMonkey",
    out: () => state.hoverTower = null
  });
  const upgrade0 = getUpgradeButtonCoordinates(0);
  const upgrade1 = getUpgradeButtonCoordinates(1);
  mouseSystem.hoverSubscribe({
    box: upgrade0,
    type: "hover",
    in: () => {
      if (!state.selectedTower || moneySystem.getMoney() < towerUpgrades[state.selectedTower.type][0].cost || state.selectedTower.upgrades.map((u) => u.key).includes(towerUpgrades[state.selectedTower.type][0].key))
        return;
      state.upgradeHover = 0;
    },
    out: () => {
      state.upgradeHover = -1;
    }
  });
  mouseSystem.subscribe({
    box: upgrade0,
    type: "click",
    callback: () => {
      if (!state.selectedTower || moneySystem.getMoney() < towerUpgrades[state.selectedTower.type][0].cost || state.selectedTower.upgrades.map((u) => u.key).includes(towerUpgrades[state.selectedTower.type][0].key))
        return;
      eventSystem.publish({
        type: "TowerUpgraded",
        payload: {
          tower: state.selectedTower,
          upgrade: towerUpgrades[state.selectedTower.type][0]
        }
      });
    }
  });
  mouseSystem.hoverSubscribe({
    box: upgrade1,
    type: "hover",
    in: () => {
      if (!state.selectedTower || towerUpgrades[state.selectedTower.type].length < 2 || moneySystem.getMoney() < towerUpgrades[state.selectedTower.type][1].cost || state.selectedTower.upgrades.map((u) => u.key).includes(towerUpgrades[state.selectedTower.type][1].key))
        return;
      state.upgradeHover = 1;
    },
    out: () => {
      state.upgradeHover = -1;
    }
  });
  mouseSystem.subscribe({
    box: upgrade1,
    type: "click",
    callback: () => {
      if (!state.selectedTower || towerUpgrades[state.selectedTower.type].length < 2 || moneySystem.getMoney() < towerUpgrades[state.selectedTower.type][1].cost || state.selectedTower.upgrades.map((u) => u.key).includes(towerUpgrades[state.selectedTower.type][1].key))
        return;
      eventSystem.publish({
        type: "TowerUpgraded",
        payload: {
          tower: state.selectedTower,
          upgrade: towerUpgrades[state.selectedTower.type][1]
        }
      });
    }
  });
  const button = getSellButtonCoordinates();
  mouseSystem.subscribe({
    box: {
      type: "box",
      x: button.x,
      y: button.y,
      width: button.width,
      height: button.height
    },
    type: "click",
    callback: () => {
      if (!state.selectedTower)
        return;
      eventSystem.publish({
        type: "TowerSold",
        payload: {
          tower: state.selectedTower
        }
      });
      state.selectedTower = null;
    }
  });
  return {
    getPlacingTowerDetails: () => {
      if (!state.placingTower)
        return null;
      return {
        ...state.placingTower,
        position: state.position
      };
    },
    getSelectedTower: () => state.selectedTower,
    update: (deltaTime) => {
      if (!state.placingTower)
        return;
      state.placingTower.animation += deltaTime;
    },
    isHovering: (index) => state.upgradeHover === index,
    getHoverTower: () => state.hoverTower
  };
};
const createTowerSystem = ({
  eventSystem,
  bloonSystem
}) => {
  const state = {
    towers: [],
    selectedTower: null
  };
  eventSystem.subscribe({
    type: "TowerPlaced",
    callback: (event) => {
      const cooldown = getTowerCooldown(event.payload.type);
      const tower = {
        id: createTowerId(),
        type: event.payload.type,
        position: {
          x: event.payload.x,
          y: event.payload.y
        },
        cooldown,
        range: getTowerRange(event.payload.type),
        rotation: 0,
        animation: 0,
        timeSinceFire: cooldown,
        freezeTime: event.payload.type === "ice" ? 2e3 : void 0,
        explodeRadius: event.payload.type === "bomb" ? 100 : void 0,
        cost: event.payload.cost,
        upgrades: []
      };
      state.towers.push(tower);
    }
  });
  eventSystem.subscribe({
    type: "TowerSelected",
    callback: (event) => {
      state.selectedTower = event.payload.tower;
    }
  });
  eventSystem.subscribe({
    type: "TowerSold",
    callback: (event) => {
      state.towers = state.towers.filter(
        (tower) => tower.id !== event.payload.tower.id
      );
    }
  });
  eventSystem.subscribe({
    type: "TowerUpgraded",
    callback: (event) => {
      const tower = state.towers.find(
        (tower2) => tower2.id === event.payload.tower.id
      );
      if (!tower)
        return;
      tower.upgrades.push(event.payload.upgrade);
      tower.cost += event.payload.upgrade.cost;
      const upgrade = event.payload.upgrade;
      if (upgrade.range)
        tower.range += upgrade.range * RANGE_MULTIPLIER;
      if (upgrade.freezeTime)
        tower.freezeTime = (tower.freezeTime || 0) + upgrade.freezeTime;
      if (upgrade.explodeRadius)
        tower.explodeRadius = (tower.explodeRadius || 0) + upgrade.explodeRadius;
      if (upgrade.pierce)
        tower.pierce = (tower.pierce || 0) + upgrade.pierce;
      if (upgrade.cooldown)
        tower.cooldown -= upgrade.cooldown;
    }
  });
  return {
    getTowers: () => state.towers,
    update: (deltaTime) => {
      for (const tower of state.towers) {
        tower.animation += deltaTime * 2.5;
        tower.timeSinceFire += deltaTime;
        if (tower.timeSinceFire >= tower.cooldown) {
          const target = bloonSystem.getLastBloonInRadius({
            x: tower.position.x,
            y: tower.position.y,
            radius: tower.range
          });
          if (target) {
            tower.timeSinceFire = 0;
            tower.rotation = Math.atan2(
              target.y - tower.position.y,
              target.x - tower.position.x
            );
            eventSystem.publish({
              type: "TowerFired",
              payload: {
                tower,
                bloon: target
              }
            });
          }
        }
      }
    },
    handleSelectTower: ({ x, y }) => {
      var _a;
      const tower = state.towers.find((tower2) => {
        const size = getTowerSize(tower2.type);
        return x > tower2.position.x - size.width / 2 && x < tower2.position.x + size.width / 2 && y > tower2.position.y - size.height / 2 && y < tower2.position.y + size.height / 2;
      });
      if ((tower == null ? void 0 : tower.id) === ((_a = state.selectedTower) == null ? void 0 : _a.id))
        return eventSystem.publish({
          type: "TowerSelected",
          payload: { tower: null }
        });
      eventSystem.publish({
        type: "TowerSelected",
        payload: { tower: tower || null }
      });
    },
    canPlaceTower: ({
      x,
      y,
      width,
      height
    }) => {
      const factor = 0.75;
      return !state.towers.some((tower) => {
        return x + width * factor > tower.position.x && x < tower.position.x + width * factor && y + height * factor > tower.position.y && y < tower.position.y + height * factor;
      });
    }
  };
};
const createGameplay = ({
  canvas,
  context
}) => {
  const mouseSystem = createMouseSystem({ canvas });
  const keyboardSystem = createKeyboardSystem();
  const eventSystem = createEventSystem();
  const pathSystem = createPathSystem({ type: "original" });
  const bloonSystem = createBloonSystem({ eventSystem, pathSystem });
  const roundSystem = createRoundSystem({
    eventSystem,
    mouseSystem,
    bloonSystem
  });
  const moneySystem = createMoneySystem({ eventSystem });
  const towerSystem = createTowerSystem({ eventSystem, bloonSystem });
  const storeSystem = createStoreSystem({
    moneySystem,
    mouseSystem,
    keyboardSystem,
    eventSystem,
    canvas,
    pathSystem,
    towerSystem
  });
  const livesSystem = createLivesSystem({ eventSystem });
  const projectileSystem = createProjectileSystem({
    eventSystem,
    bloonSystem,
    pathSystem
  });
  const particleSystem = createParticleSystem({ eventSystem });
  const renderSystem = createRenderSystem({
    bloonSystem,
    moneySystem,
    context,
    canvas,
    storeSystem,
    pathSystem,
    roundSystem,
    livesSystem,
    towerSystem,
    projectileSystem,
    particleSystem
  });
  return {
    update: (deltaTime) => {
      keyboardSystem.update();
      mouseSystem.update();
      roundSystem.update(deltaTime);
      bloonSystem.update(deltaTime);
      towerSystem.update(deltaTime);
      storeSystem.update(deltaTime);
      projectileSystem.update(deltaTime);
      particleSystem.update(deltaTime);
    },
    render: () => {
      renderSystem.render();
    }
  };
};
const createGame = ({
  canvas
}) => {
  const context = canvas.getContext("2d");
  if (!context)
    throw new Error("Could not get context from canvas.");
  const state = {
    screen: createGameplay({ canvas, context })
  };
  return {
    update: (deltaTime) => {
      state.screen.update(deltaTime);
    },
    render: () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "#aaa";
      context.fillRect(0, 0, canvas.width, canvas.height);
      state.screen.render();
    }
  };
};
const style = "";
(async () => {
  await Promise.all([initializeTextures()]);
  let previousTime = performance.now();
  const game = createGame({
    canvas: document.querySelector("#canvas-game")
  });
  const gameLoop = (currentTime) => {
    const deltaTime = currentTime - previousTime;
    previousTime = currentTime;
    game.update(deltaTime);
    game.render();
    requestAnimationFrame(gameLoop);
  };
  requestAnimationFrame(gameLoop);
})();
