var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { T as Textures, S as Scripts, b as createAnimatedSprite, A as Audio } from "./index-d0be2068.js";
const SPRITE_SIZE$5 = 48;
class Bullet {
  // super charge bullets that are timed well
  constructor(x, y, events, charged) {
    __publicField(this, "events");
    __publicField(this, "image");
    __publicField(this, "width");
    __publicField(this, "height");
    __publicField(this, "xPosition");
    __publicField(this, "yPosition");
    __publicField(this, "active");
    __publicField(this, "speed");
    __publicField(this, "charged");
    this.image = Textures().projectiles.mine;
    this.width = SPRITE_SIZE$5;
    this.height = SPRITE_SIZE$5;
    this.xPosition = x;
    this.yPosition = y;
    this.active = true;
    this.speed = 1;
    this.events = events;
    this.charged = charged || false;
  }
  render(context) {
    context.drawImage(
      this.image,
      this.xPosition - (this.charged ? this.width * 0.25 : 0),
      this.yPosition - (this.charged ? this.height * 0.25 : 0),
      this.width * (this.charged ? 1.5 : 1),
      this.height * (this.charged ? 1.5 : 1)
    );
  }
  update(deltaTime, enemies) {
    if (this.yPosition < 0 - this.height)
      this.active = false;
    if (this.active)
      this.yPosition -= this.speed * deltaTime;
    enemies.forEach((enemy) => {
      let centerX = this.xPosition + this.width / 2;
      let centerY = this.yPosition + this.height / 2;
      if (centerX - this.width * 0.25 < enemy.xPosition + enemy.width * 0.75 && centerX + this.width * 0.25 > enemy.xPosition + enemy.width * 0.25 && centerY < enemy.yPosition + enemy.height * 0.9 && centerY + this.height * 0.25 > enemy.yPosition) {
        this.events.publish({
          type: "BULLET_HIT_ENEMY",
          payload: {
            enemy
          }
        });
        if (!this.charged)
          this.active = false;
      }
    });
  }
}
const SHIP_DESTROYED_ANIMATION_DURATION = 1e3;
const SHIP_READYING_ANIMATION_DURATION = 3e3;
const NEW_SHIP_DELAY = SHIP_READYING_ANIMATION_DURATION + SHIP_DESTROYED_ANIMATION_DURATION;
const SHIP_SPRITE_SIZE = 48;
const SHIP_Y_OFFSET = 112;
const SHIP_FIRE_DELAY = 300;
const createShip = ({
  events,
  canvas
}) => {
  const image = Textures().ship;
  const width = SHIP_SPRITE_SIZE;
  const height = SHIP_SPRITE_SIZE;
  let xPosition = canvas.width / 2 - width / 2;
  let yPosition = canvas.height - SHIP_Y_OFFSET;
  let speed = 0.4;
  let active = false;
  let bullets = [];
  let fireCooldown = 0;
  const onDispose = [];
  let stateElapsed = 0;
  let state = "starting";
  const fire = () => {
    let charged = false;
    if (!active || fireCooldown > 20)
      return;
    if (fireCooldown > 0 && fireCooldown <= 20)
      charged = true;
    bullets.push(new Bullet(xPosition, yPosition, events, charged));
    fireCooldown = SHIP_FIRE_DELAY;
  };
  const resetShip = () => {
    xPosition = canvas.width / 2 - width / 2;
    yPosition = canvas.height - SHIP_Y_OFFSET;
    active = true;
  };
  onDispose.push(
    events.subscribe({
      type: "GAME_OVER",
      callback: () => {
        state = "gameOver";
        stateElapsed = 0;
      }
    })
  );
  onDispose.push(
    events.subscribe({
      type: "PLAYER_FIRED",
      callback: () => {
        fire();
      }
    })
  );
  onDispose.push(
    events.subscribe({
      type: "GAME_OVER",
      callback: () => {
        active = false;
        state = "gameOver";
        stateElapsed = 0;
      }
    })
  );
  const dispose = () => {
    onDispose.forEach((fn) => fn());
  };
  const moveLeft = (deltaTime) => {
    if (!active)
      return;
    xPosition = Math.max(0, xPosition - speed * deltaTime);
  };
  const moveRight = (deltaTime) => {
    if (!active)
      return;
    xPosition = Math.min(canvas.width - width, xPosition + speed * deltaTime);
  };
  const hit = () => {
    if (!active)
      return;
    active = false;
    state = "preparing";
    stateElapsed = 0;
    events.publish({
      type: "PLAYER_DESTROYED",
      payload: {
        x: xPosition,
        y: yPosition
      }
    });
  };
  const render = (context) => {
    bullets.forEach((bullet) => {
      bullet.render(context);
    });
    if (active)
      context.drawImage(image, xPosition, yPosition, width, height);
  };
  const update = (deltaTime, enemies, enemyBullets) => {
    if (fireCooldown > 0)
      fireCooldown -= deltaTime;
    if (fireCooldown < 0)
      fireCooldown = 0;
    stateElapsed += deltaTime;
    if (state === "preparing" && stateElapsed > NEW_SHIP_DELAY || state === "starting" && stateElapsed > SHIP_READYING_ANIMATION_DURATION) {
      state = "playing";
      resetShip();
    }
    for (let i = 0; i < bullets.length; i++)
      bullets[i].update(deltaTime, enemies);
    bullets = bullets.filter((bullet) => bullet.active);
    if (!active)
      return;
    enemies.forEach((enemy) => {
      if (enemy.active && xPosition < enemy.xPosition + enemy.width && xPosition + width * 0.8 > enemy.xPosition && yPosition < enemy.yPosition + enemy.height && yPosition + height * 0.85 > enemy.yPosition) {
        events.publish({
          type: "PLAYER_HIT_ENEMY",
          payload: { enemy }
        });
        hit();
      }
      enemyBullets.forEach((bullet) => {
        if (bullet.active && xPosition < bullet.xPosition + bullet.width && xPosition + width * 0.8 > bullet.xPosition && yPosition < bullet.yPosition + bullet.height && yPosition + height * 0.85 > bullet.yPosition) {
          hit();
          events.publish({
            type: "BULLET_HIT_PLAYER",
            payload: {}
          });
          bullet.active = false;
        }
      });
    });
  };
  return {
    dispose,
    render,
    update,
    moveRight,
    resetShip,
    moveLeft,
    active: () => active,
    xPosition: () => xPosition,
    yPosition: () => yPosition,
    setActive: (value) => {
      active = value;
    }
  };
};
const SPRITE_SIZE$4 = 48;
const ERROR_FACTOR = 10;
const MAX_LIFE = 8e3;
class EnemyBullet {
  constructor(x, y, ship) {
    __publicField(this, "image");
    __publicField(this, "width");
    __publicField(this, "height");
    __publicField(this, "xPosition");
    __publicField(this, "yPosition");
    __publicField(this, "active");
    __publicField(this, "speed");
    __publicField(this, "direction");
    __publicField(this, "elapsedTime");
    this.elapsedTime = 0;
    this.image = Textures().projectiles.theirs;
    this.width = SPRITE_SIZE$4;
    this.height = SPRITE_SIZE$4;
    this.xPosition = x;
    this.yPosition = y;
    this.active = true;
    this.speed = 0.4;
    const direction = {
      x: ship.xPosition() + SHIP_SPRITE_SIZE / 2 - x + Math.random() * ERROR_FACTOR,
      y: ship.yPosition() + SHIP_SPRITE_SIZE / 2 - y
    };
    const magnitude = Math.sqrt(
      direction.x * direction.x + direction.y * direction.y
    );
    this.direction = {
      x: direction.x / magnitude,
      y: direction.y / magnitude
    };
  }
  render(context) {
    if (!this.active)
      return;
    context.save();
    context.translate(
      this.xPosition + this.width / 2,
      this.yPosition + this.height / 2
    );
    context.rotate(
      Math.atan2(this.direction.y, this.direction.x) + Math.PI / 2
    );
    context.drawImage(
      this.image,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );
    context.restore();
  }
  update(deltaTime) {
    if (!this.active)
      return;
    this.elapsedTime += deltaTime;
    if (this.elapsedTime > MAX_LIFE || this.yPosition > 1500)
      this.active = false;
    if (this.active) {
      this.xPosition += this.direction.x * this.speed * deltaTime;
      this.yPosition += this.direction.y * this.speed * deltaTime;
    }
  }
}
const createBulletSystem = ({
  events,
  ship
}) => {
  let bullets = [];
  const dispose = [];
  const update = (deltaTime) => {
    bullets.forEach((bullet) => {
      bullet.update(deltaTime);
    });
    bullets = bullets.filter((bullet) => bullet.active);
  };
  dispose.push(
    events.subscribe({
      type: "ENEMY_FIRED",
      callback: (event) => {
        if (ship.active())
          bullets.push(new EnemyBullet(event.payload.x, event.payload.y, ship));
      }
    })
  );
  return {
    update,
    dispose: () => {
      dispose.forEach((dispose2) => dispose2());
    },
    get: () => bullets,
    render: (context) => {
      bullets.forEach((bullet) => {
        bullet.render(context);
      });
    }
  };
};
const STARTING_LIVES = 3;
const LIVES_SPRITE = Textures().ship;
const X_POSITION = 10;
const Y_POSITION = 10;
const WIDTH = 48;
const HEIGHT = 48;
class Lives {
  constructor(events, canvas, context) {
    __publicField(this, "lives");
    __publicField(this, "events");
    __publicField(this, "context");
    __publicField(this, "canvas");
    __publicField(this, "onDispose", []);
    this.lives = STARTING_LIVES;
    this.events = events;
    this.canvas = canvas;
    this.context = context;
    this.onDispose.push(
      this.events.subscribe({
        type: "PLAYER_DESTROYED",
        callback: () => {
          this.loseLife();
        }
      })
    );
  }
  dispose() {
    this.onDispose.forEach((dispose) => dispose());
  }
  getLives() {
    return this.lives;
  }
  loseLife() {
    this.lives--;
    if (this.lives === 0)
      this.gameOver();
  }
  reset() {
    this.lives = STARTING_LIVES;
  }
  gameOver() {
    this.events.publish({
      type: "GAME_OVER",
      payload: {}
    });
  }
  render(active) {
    const livesToRender = this.lives - (active ? 1 : 0);
    for (let i = 0; i < livesToRender; i++) {
      this.context.drawImage(
        LIVES_SPRITE,
        X_POSITION + i * WIDTH,
        this.canvas.height - Y_POSITION - HEIGHT,
        WIDTH,
        HEIGHT
      );
    }
  }
}
const mapTypeToColor = (type) => {
  switch (type) {
    case "enemy-destroyed":
      return Scripts().color("red");
    case "player-destroyed":
      return Scripts().color("#eeeeff");
    case "new-ship":
      return Scripts().color("green");
  }
};
const mapTypeToCount = (type) => {
  switch (type) {
    case "enemy-destroyed":
      return 100;
    case "player-destroyed":
      return 200;
    case "new-ship":
      return 50;
  }
};
const mapTypeToMaxSpeed = (type) => {
  switch (type) {
    case "enemy-destroyed":
      return 0.15;
    case "player-destroyed":
      return 0.25;
    case "new-ship":
      return 0.1;
  }
};
const mapTypeToDuration = (type) => {
  switch (type) {
    case "enemy-destroyed":
      return { min: 250, random: 500 };
    case "player-destroyed":
      return { min: 750, random: 1e3 };
    case "new-ship":
      return { min: 500, random: 250 };
  }
};
const createParticleSystem = () => {
  let particles = [];
  const handleCreateParticles = (options) => {
    const particleCount = mapTypeToCount(options.type);
    const maxSpeed = mapTypeToMaxSpeed(options.type);
    const duration = mapTypeToDuration(options.type);
    const { x, y } = options;
    for (let i = 0; i < particleCount; i++) {
      const particleSize = Math.floor(Math.random() * 2 + 1);
      const particleSpeed = Math.random() * maxSpeed;
      const particleLifetime = Math.random() * duration.random + duration.min;
      const particleDirection = Math.random() * Math.PI * 2;
      const particleDirectionX = Math.cos(particleDirection);
      const particleDirectionY = Math.sin(particleDirection);
      const particle = {
        elapsedTime: 0,
        lifetime: particleLifetime,
        color: mapTypeToColor(options.type).darken(Math.random() * 0.2),
        x,
        y,
        size: particleSize * (Math.random() + 1),
        speed: particleSpeed,
        direction: {
          x: particleDirectionX,
          y: particleDirectionY
        }
      };
      particles.push(particle);
    }
  };
  return {
    update: (deltaTime) => {
      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        particle.x += particle.direction.x * particle.speed * deltaTime;
        particle.y += particle.direction.y * particle.speed * deltaTime;
        particle.elapsedTime += deltaTime;
      }
      particles = particles.filter((p) => p.elapsedTime < p.lifetime);
    },
    render: (context) => {
      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        const percentLifetime = particle.elapsedTime / particle.lifetime;
        context.beginPath();
        const alpha = 1 - percentLifetime;
        const color = `rgba(${particle.color.red()}, ${particle.color.green()}, ${particle.color.blue()}, ${alpha})`;
        context.fillStyle = color;
        context.strokeStyle = color;
        context.fillRect(particle.x, particle.y, particle.size, particle.size);
        context.strokeRect(
          particle.x,
          particle.y,
          particle.size,
          particle.size
        );
        context.closePath();
      }
    },
    addEffect: (options) => {
      handleCreateParticles({
        type: options.type,
        x: options.x,
        y: options.y
      });
    }
  };
};
const setupParticles = (events) => {
  const { update, render, addEffect } = createParticleSystem();
  const dispose = [];
  dispose.push(
    events.subscribe({
      type: "PLAYER_DESTROYED",
      callback: (event) => addEffect({
        type: "player-destroyed",
        x: event.payload.x,
        y: event.payload.y
      })
    })
  );
  dispose.push(
    events.subscribe({
      type: "ENEMY_DESTROYED",
      callback: (event) => {
        addEffect({
          type: "enemy-destroyed",
          x: event.payload.x,
          y: event.payload.y
        });
      }
    })
  );
  return {
    update,
    render,
    dispose: () => {
      dispose.forEach((fn) => fn());
    }
  };
};
const CANVAS_WIDTH$1 = 768;
const START_Y = 100;
const EXPANDING_SPEED = 5e-3;
const MOVING_SPEED = 8e-3;
class FormationGrid {
  constructor(rows, grid, events) {
    __publicField(this, "enemyGap");
    __publicField(this, "state");
    __publicField(this, "inCenter");
    __publicField(this, "rows");
    __publicField(this, "grid");
    __publicField(this, "onDispose");
    __publicField(this, "gridCenter");
    this.enemyGap = { x: 5, y: 5 };
    this.state = "left";
    this.inCenter = false;
    this.rows = rows | 5;
    this.grid = grid;
    this.gridCenter = CANVAS_WIDTH$1 / 2;
    this.onDispose = [];
    this.onDispose.push(
      events.subscribe({
        type: "ENEMY_DESTROYED",
        callback: (event) => {
          for (let i = 0; i < this.grid.length; i++) {
            if (this.grid[i].includes(event.payload.enemy)) {
              this.grid[i].splice(this.grid[i].indexOf(event.payload.enemy), 1, null);
              break;
            }
          }
        }
      })
    );
  }
  dispose() {
    this.onDispose.forEach((dispose) => dispose());
  }
  // returns the x y position of an enemy based on the grid
  // the grid will have enemies centered in the middle of the screen, 
  // evently spaced out by the current enemyGap on top and bottom and the size of the enemy
  getPositionInGrid(enemy) {
    let enemyPosition = 0;
    let enemiesInRow = 0;
    let rowNumber = 0;
    for (let i = 0; i < this.grid.length; i++) {
      if (this.grid[i].includes(enemy)) {
        rowNumber = i;
        enemiesInRow = this.grid[i].length;
        enemyPosition = this.grid[i].indexOf(enemy);
      }
    }
    let gridCenterTop = { x: this.gridCenter + enemy.width / 15, y: START_Y };
    let enemyPositionOnScreen = { x: 0, y: 0 };
    if (enemyPosition > enemiesInRow / 2) {
      enemyPositionOnScreen.x = gridCenterTop.x + (enemyPosition - enemiesInRow / 2) * (enemy.width + this.enemyGap.x);
    } else {
      enemyPositionOnScreen.x = gridCenterTop.x - (enemiesInRow / 2 - enemyPosition) * (enemy.width + this.enemyGap.x);
    }
    enemyPositionOnScreen.y = gridCenterTop.y + rowNumber * (enemy.height + this.enemyGap.y);
    return enemyPositionOnScreen;
  }
  update(deltaTime) {
    if (this.state == "expanding") {
      this.gridCenter = CANVAS_WIDTH$1 / 2;
      this.enemyGap.x += EXPANDING_SPEED * deltaTime;
      this.enemyGap.y += EXPANDING_SPEED * deltaTime;
      if (this.enemyGap.x >= 15) {
        this.state = "contracting";
      }
    } else if (this.state == "contracting") {
      this.enemyGap.x -= EXPANDING_SPEED * deltaTime;
      this.enemyGap.y -= EXPANDING_SPEED * deltaTime;
      if (this.enemyGap.x <= 4) {
        this.state = "expanding";
      }
    }
    if (this.state == "right") {
      this.gridCenter += MOVING_SPEED * deltaTime;
      if (this.gridCenter - CANVAS_WIDTH$1 / 2 >= 30) {
        this.state = "left";
      }
    } else if (this.state == "left") {
      this.gridCenter -= MOVING_SPEED * deltaTime;
      if (CANVAS_WIDTH$1 / 2 - this.gridCenter >= 30) {
        this.state = "right";
      }
    }
    if (this.gridCenter - CANVAS_WIDTH$1 / 2 < 14 && CANVAS_WIDTH$1 / 2 - this.gridCenter < 14) {
      this.inCenter = true;
    } else {
      this.inCenter = false;
    }
    this.grid.forEach((row) => {
      row.forEach((enemy) => {
        if (!enemy)
          return;
        if (enemy.state == "formation") {
          enemy.update(deltaTime);
          enemy.xPosition = this.getPositionInGrid(enemy).x;
          enemy.yPosition = this.getPositionInGrid(enemy).y;
        } else if (enemy.state == "diving") {
          enemy.update(deltaTime);
        }
      });
    });
  }
  // render all enemies in formation
  render(context) {
    var _a;
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        (_a = this.grid[i][j]) == null ? void 0 : _a.render(context);
      }
    }
  }
}
const SPRITE_SIZE$3 = 48;
class Enemy {
  constructor(events) {
    __publicField(this, "events");
    __publicField(this, "sprite");
    __publicField(this, "width");
    __publicField(this, "height");
    __publicField(this, "xPosition");
    __publicField(this, "yPosition");
    __publicField(this, "active");
    __publicField(this, "state");
    __publicField(this, "speed");
    __publicField(this, "points");
    __publicField(this, "direction");
    __publicField(this, "segmentElapsed");
    __publicField(this, "delayRemaining");
    __publicField(this, "onDispose");
    __publicField(this, "shootInMs", Infinity);
    __publicField(this, "nextShots", []);
    __publicField(this, "getFinalPosition");
    this.events = events;
    this.sprite = null;
    this.width = SPRITE_SIZE$3;
    this.height = SPRITE_SIZE$3;
    this.xPosition = -1e3;
    this.yPosition = -1e3;
    this.active = true;
    this.state = "diving";
    this.speed = 0.25;
    this.points = [];
    this.segmentElapsed = 0;
    this.direction = { x: 0, y: 0 };
    this.delayRemaining = 0;
    this.onDispose = [];
    this.onDispose.push(
      this.events.subscribe({
        type: "BULLET_HIT_ENEMY",
        callback: (event) => {
          if (event.payload.enemy === this)
            this.hit();
        }
      })
    );
    this.onDispose.push(
      this.events.subscribe({
        type: "PLAYER_HIT_ENEMY",
        callback: (event) => {
          if (event.payload.enemy === this)
            this.hit();
        }
      })
    );
  }
  makeUnitDirection(direction) {
    const magnitude = Math.sqrt(
      direction.x * direction.x + direction.y * direction.y
    );
    return {
      x: direction.x / magnitude,
      y: direction.y / magnitude
    };
  }
  dispose() {
    this.onDispose.forEach((fn) => fn());
  }
  hit() {
    if (!this.active)
      return;
    this.active = false;
    this.events.publish({
      type: "ENEMY_DESTROYED",
      payload: {
        x: this.xPosition + this.width / 2,
        y: this.yPosition + this.height / 2,
        enemy: this
      }
    });
  }
  shoot() {
    this.events.publish({
      type: "ENEMY_FIRED",
      payload: {
        x: this.xPosition + this.width / 2,
        y: this.yPosition + this.height / 2
      }
    });
  }
  update(deltaTime) {
    var _a;
    if (this.active) {
      this.updatePosition(deltaTime);
      (_a = this.sprite) == null ? void 0 : _a.update(deltaTime);
      this.shootInMs -= deltaTime;
      if (this.shootInMs <= 0) {
        this.shoot();
        const nextShot = this.nextShots.shift();
        this.shootInMs = nextShot || Infinity;
      }
    }
    if (this.yPosition > 1040) {
      this.yPosition = -50;
    }
  }
  render(context) {
    var _a;
    const rotation = Math.atan2(this.direction.y, this.direction.x);
    (_a = this.sprite) == null ? void 0 : _a.render({
      context,
      x: this.xPosition,
      y: this.yPosition,
      width: this.width,
      height: this.height,
      rotation
    });
  }
  setPath({
    path,
    dx,
    dy,
    delay,
    speed,
    numberOfShots,
    getFinalPosition
  }) {
    if (this.points.length > 0)
      return;
    this.getFinalPosition = getFinalPosition;
    this.speed = speed || this.speed;
    this.delayRemaining = delay || 0;
    this.segmentElapsed = 0;
    if (numberOfShots > 0) {
      const pathDistance = path.reduce((distance, point, index) => {
        if (index === 0)
          return distance;
        const lastPoint = path[index - 1];
        return distance + Math.sqrt(
          (point.x - lastPoint.x) * (point.x - lastPoint.x) + (point.y - lastPoint.y) * (point.y - lastPoint.y)
        );
      }, 0);
      const shootTime = Math.random() * (pathDistance / 4) / this.speed;
      this.shootInMs = shootTime + (delay || 0);
    }
    this.points = path.slice(1).map((point, index) => {
      const lastPoint = path[index];
      const distance = Math.sqrt(
        (point.x - lastPoint.x) * (point.x - lastPoint.x) + (point.y - lastPoint.y) * (point.y - lastPoint.y)
      );
      const direction = this.makeUnitDirection({
        x: point.x - lastPoint.x,
        y: point.y - lastPoint.y
      });
      return {
        x: point.x + (dx || 0),
        y: point.y + (dy || 0),
        distance,
        direction,
        lastPoint: {
          x: lastPoint.x + (dx || 0),
          y: lastPoint.y + (dy || 0)
        }
      };
    });
  }
  resetRotation() {
    let rotation = this.makeUnitDirection(this.direction);
    console.log(rotation);
    const rotationSpeed = 0.02;
    if (rotation.x > 0)
      rotation.x -= rotationSpeed;
    if (rotation.x < 0)
      rotation.x += rotationSpeed;
    if (rotation.y > -1)
      rotation.y -= rotationSpeed;
    if (rotation.y < -1)
      rotation.y += rotationSpeed;
    this.direction = this.makeUnitDirection(rotation);
  }
  updatePosition(deltaTime) {
    if (this.yPosition > 1034) {
      this.yPosition -= 1034;
      this.points.forEach((point) => {
        point.y -= 1034;
        point.lastPoint.y -= 1034;
      });
    }
    if (this.delayRemaining > 0) {
      this.delayRemaining -= deltaTime;
      this.state = "diving";
      return;
    }
    if (this.points.length === 0) {
      if (this.getFinalPosition) {
        const finalPosition = this.getFinalPosition();
        const distanceToFinalPosition = Math.sqrt(
          (finalPosition.x - this.xPosition) * (finalPosition.x - this.xPosition) + (finalPosition.y - this.yPosition) * (finalPosition.y - this.yPosition)
        );
        if (distanceToFinalPosition > 2) {
          this.setPath({
            path: [
              { x: this.xPosition, y: this.yPosition },
              this.getFinalPosition()
            ],
            numberOfShots: 0,
            delay: 0,
            dx: 0,
            dy: 0
          });
        } else {
          this.getFinalPosition = void 0;
        }
      } else {
        this.resetRotation();
        this.state = "formation";
      }
      return;
    }
    const nextPoint = this.points[0];
    const distanceToTravel = this.speed * deltaTime;
    const distanceRemaining = nextPoint.distance - this.segmentElapsed;
    this.direction = nextPoint.direction;
    if (distanceRemaining < distanceToTravel) {
      this.segmentElapsed = 0;
      this.xPosition = nextPoint.x;
      this.yPosition = nextPoint.y;
      this.points.shift();
    } else {
      this.segmentElapsed += distanceToTravel;
      const percentTravelled = this.segmentElapsed / nextPoint.distance;
      const lerp = (a, b, t) => a + (b - a) * t;
      this.xPosition = lerp(
        nextPoint.lastPoint.x,
        nextPoint.x,
        percentTravelled
      );
      this.yPosition = lerp(
        nextPoint.lastPoint.y,
        nextPoint.y,
        percentTravelled
      );
    }
  }
  attack(path, shootOnDelay, delay, speed, loopOffScreen = false) {
    if (!this.active)
      return;
    this.state = "diving";
    this.setPath({
      dx: this.xPosition,
      dy: this.yPosition,
      path: [...path, { x: 0, y: !loopOffScreen ? 0 : 1034 }],
      delay: delay || 0,
      speed: speed || 0.2,
      numberOfShots: 0
    });
    if (shootOnDelay && shootOnDelay.length > 0) {
      this.shootInMs = shootOnDelay[0];
      this.nextShots = shootOnDelay.slice(1);
    }
  }
  get inFormation() {
    return this.state === "formation";
  }
  get variant() {
    throw new Error("Not implemented");
  }
  get escortCount() {
    return 0;
  }
}
const SPRITE_SIZE$2 = 48;
class Boss extends Enemy {
  constructor(events, escorts) {
    super(events);
    // Boss has two states, damaged and undamaged, so it can take two hits
    __publicField(this, "damaged", false);
    __publicField(this, "escorts");
    __publicField(this, "onDisposeBoss", []);
    this.escorts = escorts;
    this.sprite = createAnimatedSprite({
      texture: Textures().enemies[1],
      frames: 2,
      frameDuration: 500
    });
    this.width = SPRITE_SIZE$2;
    this.height = SPRITE_SIZE$2;
    this.onDisposeBoss.push(
      events.subscribe({
        type: "ENEMY_DESTROYED",
        callback: (event) => {
          if (this.escorts.includes(event.payload.enemy))
            this.escorts.splice(this.escorts.indexOf(event.payload.enemy), 1);
        }
      })
    );
  }
  dispose() {
    this.onDisposeBoss.forEach((dispose) => dispose());
    super.dispose();
  }
  hit() {
    if (!this.damaged) {
      this.damaged = true;
      this.sprite = createAnimatedSprite({
        texture: Textures().enemies[2],
        frames: 2,
        frameDuration: 500
      });
    } else
      super.hit();
  }
  update(deltaTime) {
    super.update(deltaTime);
    if (this.escorts.length > 0) {
      if (this.state == "formation" || !this.active) {
        this.escorts = [];
      }
    }
  }
  get variant() {
    return "boss";
  }
  get escortCount() {
    return this.escorts.length;
  }
}
const SPRITE_SIZE$1 = 48;
class Bee extends Enemy {
  constructor(events) {
    super(events);
    this.sprite = createAnimatedSprite({
      texture: Textures().enemies[4],
      frames: 2,
      frameDuration: 500
    });
    this.width = SPRITE_SIZE$1;
    this.height = SPRITE_SIZE$1;
  }
  get variant() {
    return "bee";
  }
}
const SPRITE_SIZE = 48;
class Butterfly extends Enemy {
  constructor(events) {
    super(events);
    this.sprite = createAnimatedSprite({
      texture: Textures().enemies[3],
      frames: 2,
      frameDuration: 500
    });
    this.width = SPRITE_SIZE;
    this.height = SPRITE_SIZE;
  }
  get variant() {
    return "butterfly";
  }
}
const CANVAS_WIDTH = 724;
const bee1 = [
  { x: CANVAS_WIDTH / 2 + 50, y: -25 },
  { x: CANVAS_WIDTH / 2, y: 200 },
  { x: CANVAS_WIDTH / 6, y: 500 },
  { x: CANVAS_WIDTH / 6 - 15, y: 555 },
  { x: CANVAS_WIDTH / 6, y: 610 },
  { x: CANVAS_WIDTH / 6 + 15, y: 625 },
  { x: CANVAS_WIDTH / 6 + 30, y: 630 },
  { x: CANVAS_WIDTH / 6 + 45, y: 630 },
  { x: CANVAS_WIDTH / 6 + 60, y: 625 },
  { x: CANVAS_WIDTH / 6 + 75, y: 610 },
  { x: CANVAS_WIDTH / 2 - 20, y: 400 }
];
const butterfly1 = [
  { x: CANVAS_WIDTH / 2 - 50, y: -25 },
  { x: CANVAS_WIDTH / 2, y: 200 },
  { x: CANVAS_WIDTH / 6 * 5, y: 500 },
  { x: CANVAS_WIDTH / 6 * 5 + 15, y: 555 },
  { x: CANVAS_WIDTH / 6 * 5, y: 610 },
  { x: CANVAS_WIDTH / 6 * 5 - 15, y: 625 },
  { x: CANVAS_WIDTH / 6 * 5 - 30, y: 630 },
  { x: CANVAS_WIDTH / 6 * 5 - 45, y: 630 },
  { x: CANVAS_WIDTH / 6 * 5 - 60, y: 625 },
  { x: CANVAS_WIDTH / 6 * 5 - 75, y: 610 },
  { x: CANVAS_WIDTH / 2 + 20, y: 400 }
];
const bossbutterfly1 = [
  { x: -50, y: 700 },
  { x: 50, y: 700 },
  { x: 140, y: 680 },
  { x: 200, y: 660 },
  { x: 260, y: 560 },
  { x: 268, y: 524 },
  { x: 280, y: 472 },
  { x: 272, y: 420 },
  { x: 246, y: 374 },
  { x: 206, y: 346 },
  { x: 160, y: 346 },
  { x: 120, y: 374 },
  { x: 94, y: 420 },
  { x: 86, y: 472 },
  { x: 98, y: 524 },
  { x: 126, y: 560 },
  { x: 164, y: 580 },
  { x: 200, y: 600 },
  { x: 236, y: 580 },
  { x: 274, y: 560 },
  { x: 302, y: 524 }
];
const butterfly2 = [
  { x: 774, y: 700 },
  { x: 662, y: 700 },
  { x: 572, y: 680 },
  { x: 512, y: 660 },
  { x: 454, y: 560 },
  { x: 446, y: 524 },
  { x: 434, y: 472 },
  { x: 442, y: 420 },
  { x: 468, y: 374 },
  { x: 508, y: 346 },
  { x: 554, y: 346 },
  { x: 594, y: 374 },
  { x: 620, y: 420 },
  { x: 628, y: 472 },
  { x: 616, y: 524 },
  { x: 588, y: 560 },
  { x: 550, y: 580 },
  { x: 514, y: 600 },
  { x: 478, y: 580 },
  { x: 440, y: 560 },
  { x: 412, y: 524 }
];
const bee2 = [
  { x: CANVAS_WIDTH / 2 + 20, y: -40 },
  { x: CANVAS_WIDTH / 2 + 20, y: 140 },
  { x: CANVAS_WIDTH / 2 - 20, y: 190 },
  { x: 100, y: 360 },
  { x: 80, y: 430 },
  { x: 100, y: 500 },
  { x: 140, y: 550 },
  { x: 200, y: 580 },
  { x: 260, y: 580 },
  { x: 320, y: 550 },
  { x: 360, y: 500 }
];
const bee3 = [
  { x: CANVAS_WIDTH / 2 - 20, y: -40 },
  { x: CANVAS_WIDTH / 2 - 20, y: 140 },
  { x: CANVAS_WIDTH / 2 + 20, y: 190 },
  { x: 686, y: 360 },
  { x: 706, y: 430 },
  { x: 686, y: 500 },
  { x: 646, y: 550 },
  { x: 586, y: 580 },
  { x: 526, y: 580 },
  { x: 466, y: 550 },
  { x: 424, y: 500 }
];
const beeAttackLeft = [
  { x: 0, y: 0 },
  { x: 0, y: -10 },
  { x: -10, y: -20 },
  { x: -25, y: -20 },
  { x: -40, y: -5 },
  { x: -40, y: 30 },
  { x: -25, y: 50 },
  { x: 30, y: 110 },
  { x: 150, y: 110 },
  { x: 200, y: 130 },
  { x: 240, y: 150 },
  { x: 270, y: 250 },
  { x: 270, y: 400 },
  { x: 250, y: 600 },
  { x: 150, y: 650 },
  { x: 110, y: 600 },
  { x: 100, y: 400 },
  { x: 60, y: 200 }
];
const beeAttackRight = [
  { x: 0, y: 0 },
  { x: 0, y: -10 },
  { x: 10, y: -20 },
  { x: 25, y: -20 },
  { x: 40, y: -5 },
  { x: 40, y: 30 },
  { x: 25, y: 50 },
  { x: -30, y: 110 },
  { x: -150, y: 110 },
  { x: -200, y: 130 },
  { x: -240, y: 150 },
  { x: -270, y: 250 },
  { x: -270, y: 400 },
  { x: -250, y: 600 },
  { x: -150, y: 650 },
  { x: -110, y: 600 },
  { x: -100, y: 400 },
  { x: -60, y: 200 }
];
const butterflyAttackLeft = [
  { x: 0, y: 0 },
  { x: 0, y: -10 },
  { x: -10, y: -20 },
  { x: -25, y: -20 },
  { x: -40, y: -5 },
  { x: -40, y: 30 },
  { x: -25, y: 50 },
  { x: 175, y: 220 },
  { x: 200, y: 300 },
  { x: 190, y: 320 },
  { x: 175, y: 330 },
  { x: 175, y: 390 },
  { x: 190, y: 420 },
  { x: 240, y: 480 },
  { x: 270, y: 520 },
  { x: 245, y: 550 },
  { x: 245, y: 610 },
  { x: 250, y: 630 },
  { x: 270, y: 670 },
  { x: 150, y: 850 },
  { x: 40, y: 1e3 },
  { x: 0, y: 1034 }
];
const butterflyAttackRight = [
  { x: 0, y: 0 },
  { x: 0, y: -10 },
  { x: 10, y: -20 },
  { x: 25, y: -20 },
  { x: 40, y: -5 },
  { x: 40, y: 30 },
  { x: 25, y: 50 },
  { x: -175, y: 220 },
  { x: -200, y: 300 },
  { x: -190, y: 320 },
  { x: -175, y: 330 },
  { x: -175, y: 390 },
  { x: -190, y: 420 },
  { x: -240, y: 480 },
  { x: -270, y: 520 },
  { x: -245, y: 550 },
  { x: -245, y: 610 },
  { x: -250, y: 630 },
  { x: -270, y: 670 },
  { x: -150, y: 850 },
  { x: -40, y: 1e3 },
  { x: 0, y: 1034 }
];
const bossAttackLeft = [
  { x: 0, y: 0 },
  { x: 0, y: -10 },
  { x: -5, y: -20 },
  { x: -10, y: -30 },
  { x: -40, y: -40 },
  { x: -70, y: -40 },
  { x: -90, y: -30 },
  { x: -110, y: -25 },
  { x: -115, y: -15 },
  { x: -100, y: 20 },
  { x: -90, y: 100 },
  { x: -80, y: 200 },
  { x: -70, y: 230 },
  { x: -20, y: 250 },
  { x: 0, y: 250 },
  { x: 20, y: 235 },
  { x: 40, y: 200 },
  { x: 50, y: 100 },
  { x: 30, y: 70 },
  { x: 0, y: 70 },
  { x: -60, y: 80 },
  { x: -80, y: 100 },
  { x: -100, y: 170 },
  { x: -110, y: 250 },
  { x: -70, y: 400 },
  { x: 100, y: 700 },
  { x: 150, y: 1e3 },
  { x: 100, y: 1050 },
  { x: 0, y: 1034 }
];
function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex]
    ];
  }
  return array;
}
const bonus1Left = [
  { x: 321.13215400624347, y: 2.13111342351717 },
  { x: 327.52549427679503, y: 338.84703433923 },
  { x: 339.2466181061394, y: 410.2393340270552 },
  { x: 362.68886576482834, y: 485.89386056191466 },
  { x: 392.52445369406865, y: 561.5483870967741 },
  { x: 434.0811654526535, y: 646.792924037461 },
  { x: 474.5723204994797, y: 706.4640998959417 },
  { x: 552.3579604578564, y: 769.3319458896982 },
  { x: 647.1925078043705, y: 785.315296566077 },
  { x: 722.84703433923, y: 759.741935483871 },
  { x: 762.2726326742976, y: 665.9729448491155 },
  { x: 762.2726326742976, y: 557.2861602497399 },
  { x: 732.4370447450573, y: 505.0738813735692 },
  { x: 661.044745057232, y: 454.9927159209157 },
  { x: 445.80228928199796, y: 339.91259105098857 },
  { x: -50, y: 45 }
];
const bonus1Right = [
  { x: 402.8678459937565, y: 2.13111342351717 },
  { x: 396.47450572320497, y: 338.84703433923 },
  { x: 384.7533818938606, y: 410.2393340270552 },
  { x: 361.31113423517166, y: 485.89386056191466 },
  { x: 331.47554630593135, y: 561.5483870967741 },
  { x: 289.9188345473465, y: 646.792924037461 },
  { x: 249.42767950052024, y: 706.4640998959417 },
  { x: 171.64203954214355, y: 769.3319458896982 },
  { x: 76.8074921956294, y: 785.315296566077 },
  { x: 1.1529656607690666, y: 759.741935483871 },
  { x: -38.27263267429761, y: 665.9729448491155 },
  { x: -38.27263267429761, y: 557.2861602497399 },
  { x: -8.437044745057303, y: 505.0738813735692 },
  { x: 62.95525494276804, y: 454.9927159209157 },
  { x: 278.19771071800204, y: 339.91259105098857 },
  { x: 784, y: 65 }
];
const bonus2 = [
  { x: -20.903259726603576, y: 814.031545741325 },
  { x: 53.43427970557308, y: 812.9547844374342 },
  { x: 139.57518401682438, y: 792.496319663512 },
  { x: 289.2450052576236, y: 734.3512092534174 },
  { x: 424.91692954784435, y: 643.9032597266036 },
  { x: 520.7486855941115, y: 480.2355415352261 },
  { x: 527.2092534174553, y: 189.50998948475288 },
  { x: 521.825446898002, y: 160.43743427970557 },
  { x: 494.90641430073606, y: 138.90220820189273 },
  { x: 453.98948475289166, y: 137.8254468980021 },
  { x: 424.91692954784435, y: 153.97686645636173 },
  { x: 423.84016824395377, y: 191.66351209253418 },
  { x: 420.6098843322818, y: 478.0820189274448 },
  { x: 429.2239747634069, y: 498.540483701367 },
  { x: 445.3753943217665, y: 516.8454258675079 },
  { x: 470.14090431125135, y: 527.6130389064143 },
  { x: 501.36698212407987, y: 520.0757097791798 },
  { x: 572.4332281808622, y: 471.62145110410097 },
  { x: 661.8044164037855, y: 368.25236593059935 },
  { x: 776.2502628811777, y: 181.66351209253418 }
];
const bonus3 = [
  { x: 776.9333333333334, y: 823.4666666666667 },
  { x: 711.4666666666667, y: 822.4 },
  { x: 644.2666666666667, y: 803.2 },
  { x: 568.5333333333333, y: 763.7333333333333 },
  { x: 464, y: 706.1333333333333 },
  { x: 338.1333333333333, y: 616.5333333333333 },
  { x: 262.4, y: 518.4 },
  { x: 241.06666666666666, y: 434.1333333333333 },
  { x: 243.2, y: 352 },
  { x: 246.40000000000003, y: 154.66666666666666 },
  { x: 261.33333333333337, y: 121.6 },
  { x: 284.8, y: 110.93333333333334 },
  { x: 311.4666666666667, y: 110.93333333333334 },
  { x: 324.26666666666665, y: 128 },
  { x: 332.8, y: 152.53333333333333 },
  { x: 328.5333333333333, y: 507.73333333333335 },
  { x: 313.6, y: 532.2666666666667 },
  { x: 281.59999999999997, y: 544 },
  { x: 237.86666666666667, y: 546.1333333333333 },
  { x: 212.26666666666668, y: 533.3333333333334 },
  { x: 182.39999999999998, y: 505.6 },
  { x: -45, y: 150.13333333333333 }
];
const bonus4Right = [
  { x: 456.4265505984766, y: 2.2285092491838956 },
  { x: 456.4265505984766, y: 322.0195865070729 },
  { x: 448.62676822633296, y: 382.18933623503807 },
  { x: 408.51360174102285, y: 488.0435255712731 },
  { x: 323.8302502720348, y: 625.0968443960827 },
  { x: 210.17627856365615, y: 724.265505984766 },
  { x: 134.4069640914037, y: 755.4646354733405 },
  { x: 79.80848748639826, y: 748.7791077257889 },
  { x: 56.40914036996735, y: 725.379760609358 },
  { x: 48.60935799782372, y: 689.7236126224157 },
  { x: 48.60935799782372, y: 625.0968443960827 },
  { x: 59.7519042437432, y: 581.6409140369967 },
  { x: 104.3220892274211, y: 502.52883569096844 },
  { x: 137.74972796517955, y: 465.75843307943416 },
  { x: 261.43199129488573, y: 366.5897714907508 },
  { x: 765.0750816104461, y: 114.76822633297061 }
];
const bonus4Left = [
  { x: 277.8734494015234, y: 2.2285092491838956 },
  { x: 277.8734494015234, y: 322.0195865070729 },
  { x: 285.67323177366706, y: 382.18933623503807 },
  { x: 325.78639825897716, y: 488.0435255712731 },
  { x: 410.4697497279652, y: 625.0968443960827 },
  { x: 524.1237214363438, y: 724.265505984766 },
  { x: 599.8930359085963, y: 755.4646354733405 },
  { x: 654.4915125136017, y: 748.7791077257889 },
  { x: 677.8908596300327, y: 725.379760609358 },
  { x: 685.6906420021763, y: 689.7236126224157 },
  { x: 685.6906420021763, y: 625.0968443960827 },
  { x: 674.5480957562568, y: 581.6409140369967 },
  { x: 629.9779107725789, y: 502.52883569096844 },
  { x: 596.5502720348204, y: 465.75843307943416 },
  { x: 472.8680087051143, y: 366.5897714907508 },
  { x: -45.77508161044607, y: 127.76822633297061 }
];
const WAVE_DURATION = 35e3;
class WaveBonus {
  constructor(events) {
    __publicField(this, "elapsedTime");
    __publicField(this, "events");
    __publicField(this, "enemies");
    this.events = events;
    this.elapsedTime = 0;
    this.enemies = [
      [new Bee(events), new Bee(events), new Bee(events), new Bee(events)],
      // 0
      [new Bee(events), new Bee(events), new Bee(events), new Bee(events)],
      // 1
      [
        new Boss(events, []),
        new Bee(events),
        new Boss(events, []),
        new Bee(events),
        new Boss(events, []),
        new Bee(events),
        new Boss(events, []),
        new Bee(events)
      ],
      // 2
      [
        new Bee(events),
        new Bee(events),
        new Bee(events),
        new Bee(events),
        new Bee(events),
        new Bee(events),
        new Bee(events),
        new Bee(events)
      ],
      // 3
      [
        new Bee(events),
        new Bee(events),
        new Bee(events),
        new Bee(events),
        new Bee(events),
        new Bee(events),
        new Bee(events),
        new Bee(events)
      ],
      // 4
      [
        new Bee(events),
        new Bee(events),
        new Bee(events),
        new Bee(events),
        new Bee(events),
        new Bee(events),
        new Bee(events),
        new Bee(events)
      ]
      // 5
    ];
    this.setEnemyPaths(this.enemies[0], bonus1Left, 4e3);
    this.setEnemyPaths(this.enemies[1], bonus1Right, 4e3);
    this.setEnemyPaths(this.enemies[2], bonus2, 1e4);
    this.setEnemyPaths(this.enemies[3], bonus3, 16e3);
    this.setEnemyPaths(this.enemies[4], bonus4Right, 22e3);
    this.setEnemyPaths(this.enemies[5], bonus4Left, 28e3);
  }
  setEnemyPaths(enemiesList, path, firstDelay) {
    let delay = firstDelay;
    for (let i = 0; i < enemiesList.length; i++) {
      if (!enemiesList[i])
        continue;
      enemiesList[i].setPath({
        dx: 0,
        dy: 0,
        path,
        delay,
        speed: 0.5,
        numberOfShots: 0
      });
      delay += 150;
    }
  }
  isComplete() {
    if (this.elapsedTime > WAVE_DURATION) {
      return true;
    } else {
      return false;
    }
  }
  update(deltaTime, options) {
    if (!options.pauseAttack) {
      this.elapsedTime += deltaTime;
    }
  }
  render(context) {
    this.getEnemies().forEach((enemy) => {
      if (!enemy || !enemy.active)
        return;
      enemy.render(context);
    });
  }
  getEnemies() {
    let enemies = [];
    for (let i = 0; i < this.enemies.length; i++) {
      for (let j = 0; j < this.enemies[i].length; j++) {
        if (this.enemies[i][j])
          enemies.push(this.enemies[i][j]);
      }
    }
    return enemies;
  }
  nextWave() {
    this.events.publish({
      type: "NEXT_WAVE",
      payload: {
        wave: this
      }
    });
    return new Wave1(this.events);
  }
}
const SECOND_SHOT_MIN_DELAY = 200;
const SECOND_SHOT_MAX_DELAY = 300;
const ROW_SEPARATION = 64;
const ATTACK_DELAY$1 = 17 * 1e3;
class Wave2 {
  constructor(events) {
    __publicField(this, "formation");
    __publicField(this, "elapsedTime");
    __publicField(this, "attacking");
    __publicField(this, "events");
    __publicField(this, "bee_attacks", {
      elapsed: 0,
      restartTime: 8e3,
      attack_list: [0, 4e3],
      activated_attacks: [],
      0: () => {
        const shotDelay1 = Math.floor(Math.random() * 1500);
        const shotDelay2 = Math.floor(
          Math.random() * SECOND_SHOT_MAX_DELAY + SECOND_SHOT_MIN_DELAY
        );
        let row = 4;
        if (this.formation.grid[4].every((enemy) => !(enemy == null ? void 0 : enemy.active)))
          row = 3;
        let bee = this.formation.grid[row].find((enemy) => enemy == null ? void 0 : enemy.active);
        if (bee)
          bee.attack(beeAttackLeft, [shotDelay1, shotDelay2]);
      },
      4e3: () => {
        const shotDelay1 = Math.floor(Math.random() * 1500);
        const shotDelay2 = Math.floor(
          Math.random() * SECOND_SHOT_MAX_DELAY + SECOND_SHOT_MIN_DELAY
        );
        let row = 4;
        if (this.formation.grid[4].filter((enemy) => enemy == null ? void 0 : enemy.active).length <= 1)
          row = 3;
        let bee = this.formation.grid[row].reverse().find((enemy) => enemy == null ? void 0 : enemy.active);
        this.formation.grid[row].reverse();
        if (bee)
          bee.attack(beeAttackRight, [shotDelay1, shotDelay2]);
      }
    });
    __publicField(this, "butterfly_attack_chance", 1);
    __publicField(this, "butterfly_attacks", {
      elapsed: 0,
      restartTime: 7e3,
      attack_list: [500],
      activated_attacks: [],
      500: () => {
        const shotDelay1 = Math.floor(Math.random() * 1500);
        const shotDelay2 = Math.floor(
          Math.random() * SECOND_SHOT_MAX_DELAY + SECOND_SHOT_MIN_DELAY
        );
        let row = 2;
        if (this.formation.grid[row].every((enemy) => !(enemy == null ? void 0 : enemy.active)))
          row = 1;
        const activeButterflies = this.formation.grid[row].filter(
          (enemy) => enemy == null ? void 0 : enemy.active
        );
        shuffle(activeButterflies);
        let butterfly = activeButterflies[0];
        let positionInRow = this.formation.grid[row].indexOf(butterfly);
        let path = positionInRow < 5 ? butterflyAttackLeft : butterflyAttackRight;
        if (butterfly)
          butterfly.attack(path, [shotDelay1, shotDelay2], 10, 0.14, true);
      }
    });
    __publicField(this, "boss_attack_chance", 0.5);
    __publicField(this, "boss_attacks", {
      elapsed: 0,
      restartTime: 9e3,
      attack_list: [4e3],
      activated_attacks: [],
      4e3: () => {
        const shotDelay1 = Math.floor(Math.random() * 1500);
        const shotDelay2 = Math.floor(
          Math.random() * SECOND_SHOT_MAX_DELAY + SECOND_SHOT_MIN_DELAY
        );
        let row = 0;
        const activeBosses = this.formation.grid[row].filter(
          (enemy) => enemy == null ? void 0 : enemy.active
        );
        if (activeBosses.length === 0)
          return;
        shuffle(activeBosses);
        let boss = activeBosses[0];
        let positionInRow = this.formation.grid[row].indexOf(boss);
        let path = positionInRow < 2 ? bossAttackLeft : bossAttackLeft;
        let nearestButterflies = this.formation.grid[1].slice(1, 6).filter((enemy) => enemy == null ? void 0 : enemy.active).sort((a, b) => {
          let aDistance = Math.abs(a.xPosition - boss.xPosition);
          let bDistance = Math.abs(b.xPosition - boss.xPosition);
          return aDistance - bDistance;
        }).slice(0, Math.floor(Math.random() * 2) + 1);
        boss.escorts = nearestButterflies;
        boss.escorts.forEach((escort) => {
          let shootOnDelay = 0;
          let willShoot = Math.random() < this.boss_attack_chance;
          if (willShoot) {
            shootOnDelay = Math.floor(Math.random() * 1500);
          }
          escort.attack(path, shootOnDelay ? [shootOnDelay] : [], 10, 0.14, true);
        });
        if (boss)
          boss.attack(path, [shotDelay1, shotDelay2], 10, 0.14, true);
      }
    });
    __publicField(this, "attacksList", [this.bee_attacks, this.butterfly_attacks, this.boss_attacks]);
    this.events = events;
    this.elapsedTime = 0;
    this.attacking = false;
    this.formation = new FormationGrid(
      5,
      [
        [
          new Boss(events, []),
          new Boss(events, []),
          new Boss(events, []),
          new Boss(events, [])
        ],
        [
          new Butterfly(events),
          new Butterfly(events),
          new Butterfly(events),
          new Butterfly(events),
          new Butterfly(events),
          new Butterfly(events),
          new Butterfly(events),
          new Butterfly(events)
        ],
        [
          new Butterfly(events),
          new Butterfly(events),
          new Butterfly(events),
          new Butterfly(events),
          new Butterfly(events),
          new Butterfly(events),
          new Butterfly(events),
          new Butterfly(events)
        ],
        [
          new Bee(events),
          new Bee(events),
          new Bee(events),
          new Bee(events),
          new Bee(events),
          new Bee(events),
          new Bee(events),
          new Bee(events),
          new Bee(events),
          new Bee(events)
        ],
        [
          new Bee(events),
          new Bee(events),
          new Bee(events),
          new Bee(events),
          new Bee(events),
          new Bee(events),
          new Bee(events),
          new Bee(events),
          new Bee(events),
          new Bee(events)
        ]
      ],
      events
    );
    let enemiesList = [
      this.formation.grid[3][4],
      this.formation.grid[3][5],
      this.formation.grid[4][4],
      this.formation.grid[4][5]
    ];
    this.setEnemyPaths(enemiesList, bee1, 5e3, 0, 0, 0.5);
    enemiesList = [
      this.formation.grid[1][3],
      this.formation.grid[1][4],
      this.formation.grid[2][3],
      this.formation.grid[2][4]
    ];
    this.setEnemyPaths(enemiesList, butterfly1, 5e3, 0, 0, 0.5);
    enemiesList = [
      this.formation.grid[0][0],
      this.formation.grid[0][1],
      this.formation.grid[0][2],
      this.formation.grid[0][3]
    ];
    this.setEnemyPaths(
      enemiesList,
      bossbutterfly1,
      1e4,
      0,
      ROW_SEPARATION,
      1
    );
    enemiesList = [
      this.formation.grid[1][2],
      this.formation.grid[1][5],
      this.formation.grid[2][2],
      this.formation.grid[2][5]
    ];
    this.setEnemyPaths(enemiesList, bossbutterfly1, 1e4, 0, 0);
    enemiesList = [
      this.formation.grid[1][6],
      this.formation.grid[1][0],
      this.formation.grid[1][7],
      this.formation.grid[1][1]
    ];
    this.setEnemyPaths(enemiesList, butterfly2, 16e3, 0, 0);
    enemiesList = [
      this.formation.grid[2][6],
      this.formation.grid[2][0],
      this.formation.grid[2][7],
      this.formation.grid[2][1]
    ];
    this.setEnemyPaths(enemiesList, butterfly2, 16e3, 0, ROW_SEPARATION, 1);
    enemiesList = [
      this.formation.grid[3][6],
      this.formation.grid[3][2],
      this.formation.grid[3][7],
      this.formation.grid[3][3]
    ];
    this.setEnemyPaths(enemiesList, bee2, 24e3, 0, 0);
    enemiesList = [
      this.formation.grid[4][6],
      this.formation.grid[4][2],
      this.formation.grid[4][7],
      this.formation.grid[4][3]
    ];
    this.setEnemyPaths(enemiesList, bee2, 24e3, ROW_SEPARATION, 0, 1);
    enemiesList = [
      this.formation.grid[3][0],
      this.formation.grid[3][8],
      this.formation.grid[3][1],
      this.formation.grid[3][9]
    ];
    this.setEnemyPaths(enemiesList, bee3, 32e3, 0, 0, 0.5);
    enemiesList = [
      this.formation.grid[4][0],
      this.formation.grid[4][8],
      this.formation.grid[4][1],
      this.formation.grid[4][9]
    ];
    this.setEnemyPaths(enemiesList, bee3, 32e3, ROW_SEPARATION, 0, 0.5);
  }
  isComplete() {
    let complete = true;
    for (let i = 0; i < this.formation.grid.length; i++) {
      for (let j = 0; j < this.formation.grid[i].length; j++) {
        if (this.formation.grid[i][j]) {
          complete = false;
          break;
        }
      }
    }
    return complete;
  }
  setEnemyPaths(enemiesList, path, firstDelay, dx, dy, numberOfShots = 0) {
    let delay = firstDelay;
    let shotCount = numberOfShots * enemiesList.length;
    while (enemiesList.length > 0) {
      const willShoot = Math.random() < shotCount / enemiesList.length;
      if (willShoot)
        shotCount--;
      let nextEnemy = enemiesList.shift();
      if (!nextEnemy)
        continue;
      nextEnemy.setPath({
        dx,
        dy,
        path: [...path],
        getFinalPosition: () => {
          return this.formation.getPositionInGrid(nextEnemy);
        },
        delay,
        numberOfShots: willShoot ? 1 : 0
      });
      delay += 250;
    }
  }
  update(deltaTime, options) {
    this.formation.update(deltaTime);
    if (!options.pauseAttack) {
      this.elapsedTime += deltaTime;
      if (this.elapsedTime > ATTACK_DELAY$1 - 4e3) {
        if (this.formation.inCenter && (this.formation.state == "right" || this.formation.state == "left")) {
          this.formation.state = "expanding";
        }
      }
      if (this.elapsedTime > ATTACK_DELAY$1) {
        this.attacking = true;
      }
      if (this.attacking) {
        this.attacksList.forEach((attacks) => {
          this.runAttacks(attacks, deltaTime);
        });
      }
    }
  }
  render(context) {
    this.formation.render(context);
  }
  getEnemies() {
    var enemies = [];
    this.formation.grid.forEach((row) => {
      row.forEach((enemy) => {
        if (enemy != null) {
          enemies.push(enemy);
        }
      });
    });
    return enemies;
  }
  runAttacks(attacks, deltaTime) {
    attacks.elapsed += deltaTime;
    if (attacks.elapsed > attacks.restartTime) {
      attacks.elapsed = 0;
      attacks.activated_attacks = [];
    }
    attacks.attack_list.forEach((attackTime) => {
      if (attacks.elapsed >= attackTime && !attacks.activated_attacks.includes(attackTime)) {
        attacks.activated_attacks.push(attackTime);
        attacks[attackTime]();
      }
    });
  }
  nextWave() {
    this.events.publish({
      type: "NEXT_WAVE",
      payload: {
        wave: this
      }
    });
    return new WaveBonus(this.events);
  }
}
const ATTACK_DELAY = 24 * 1e3;
class Wave1 {
  constructor(events) {
    __publicField(this, "events");
    __publicField(this, "formation");
    __publicField(this, "elapsedTime");
    __publicField(this, "attacking");
    __publicField(this, "bee_attack_chance", 0.65);
    __publicField(this, "bee_attacks", {
      elapsed: 0,
      restartTime: 8e3,
      attack_list: [0, 4e3],
      activated_attacks: [],
      0: () => {
        let shootOnDelay = 0;
        let willShoot = Math.random() < this.bee_attack_chance;
        if (willShoot) {
          shootOnDelay = Math.floor(Math.random() * 1500);
        }
        let row = 4;
        if (this.formation.grid[4].every((enemy) => !(enemy == null ? void 0 : enemy.active)))
          row = 3;
        let bee = this.formation.grid[row].find((enemy) => enemy == null ? void 0 : enemy.active);
        if (bee)
          bee.attack(beeAttackLeft, shootOnDelay === 0 ? [] : [shootOnDelay]);
      },
      4e3: () => {
        let shootOnDelay = 0;
        let willShoot = Math.random() < this.bee_attack_chance;
        if (willShoot) {
          shootOnDelay = Math.floor(Math.random() * 1600);
        }
        let row = 4;
        if (this.formation.grid[4].filter((enemy) => enemy == null ? void 0 : enemy.active).length <= 1)
          row = 3;
        let bee = this.formation.grid[row].reverse().find((enemy) => enemy == null ? void 0 : enemy.active);
        this.formation.grid[row].reverse();
        if (bee)
          bee.attack(beeAttackRight, shootOnDelay === 0 ? [] : [shootOnDelay]);
      }
    });
    __publicField(this, "butterfly_attack_chance", 0.75);
    __publicField(this, "butterfly_attacks", {
      elapsed: 0,
      restartTime: 7e3,
      attack_list: [500],
      activated_attacks: [],
      500: () => {
        let shootOnDelay = 0;
        let willShoot = Math.random() < this.bee_attack_chance;
        if (willShoot) {
          shootOnDelay = Math.floor(Math.random() * 1500);
        }
        let row = 2;
        if (this.formation.grid[row].every((enemy) => !(enemy == null ? void 0 : enemy.active)))
          row = 1;
        const activeButterflies = this.formation.grid[row].filter((enemy) => enemy == null ? void 0 : enemy.active);
        shuffle(activeButterflies);
        let butterfly = activeButterflies[0];
        let positionInRow = this.formation.grid[row].indexOf(butterfly);
        let path = positionInRow < 5 ? butterflyAttackLeft : butterflyAttackRight;
        if (butterfly)
          butterfly.attack(path, shootOnDelay === 0 ? [] : [shootOnDelay], 10, 0.14, true);
      }
    });
    __publicField(this, "boss_attack_chance", 0.8);
    __publicField(this, "boss_attacks", {
      elapsed: 0,
      restartTime: 9e3,
      attack_list: [4e3],
      activated_attacks: [],
      4e3: () => {
        let shootOnDelay = 0;
        let willShoot = Math.random() < this.boss_attack_chance;
        if (willShoot) {
          shootOnDelay = Math.floor(Math.random() * 1500);
        }
        let row = 0;
        const activeBosses = this.formation.grid[row].filter((enemy) => enemy == null ? void 0 : enemy.active);
        if (activeBosses.length === 0)
          return;
        shuffle(activeBosses);
        let boss = activeBosses[0];
        let positionInRow = this.formation.grid[row].indexOf(boss);
        let path = positionInRow < 2 ? bossAttackLeft : bossAttackLeft;
        let nearestButterflies = this.formation.grid[1].slice(1, 6).filter((enemy) => enemy == null ? void 0 : enemy.active).sort((a, b) => {
          let aDistance = Math.abs(a.xPosition - boss.xPosition);
          let bDistance = Math.abs(b.xPosition - boss.xPosition);
          return aDistance - bDistance;
        }).slice(0, Math.floor(Math.random() * 2) + 1);
        boss.escorts = nearestButterflies;
        boss.escorts.forEach((escort) => {
          let shootOnDelay2 = 0;
          let willShoot2 = Math.random() < this.boss_attack_chance;
          if (willShoot2) {
            shootOnDelay2 = Math.floor(Math.random() * 1500);
          }
          escort.attack(path, shootOnDelay2 === 0 ? [] : [shootOnDelay2], 10, 0.14, true);
        });
        if (boss)
          boss.attack(path, shootOnDelay === 0 ? [] : [shootOnDelay], 10, 0.14, true);
      }
    });
    __publicField(this, "attacksList", [this.bee_attacks, this.butterfly_attacks, this.boss_attacks]);
    this.events = events;
    this.elapsedTime = 0;
    this.attacking = false;
    this.formation = new FormationGrid(5, [
      [new Boss(events, []), new Boss(events, []), new Boss(events, []), new Boss(events, [])],
      [new Butterfly(events), new Butterfly(events), new Butterfly(events), new Butterfly(events), new Butterfly(events), new Butterfly(events), new Butterfly(events), new Butterfly(events)],
      [new Butterfly(events), new Butterfly(events), new Butterfly(events), new Butterfly(events), new Butterfly(events), new Butterfly(events), new Butterfly(events), new Butterfly(events)],
      [new Bee(events), new Bee(events), new Bee(events), new Bee(events), new Bee(events), new Bee(events), new Bee(events), new Bee(events), new Bee(events), new Bee(events)],
      [new Bee(events), new Bee(events), new Bee(events), new Bee(events), new Bee(events), new Bee(events), new Bee(events), new Bee(events), new Bee(events), new Bee(events)]
    ], events);
    let enemiesList = [
      this.formation.grid[3][4],
      this.formation.grid[3][5],
      this.formation.grid[4][4],
      this.formation.grid[4][5]
    ];
    this.setEnemyPaths(enemiesList, bee1, 5e3, 0, 0);
    enemiesList = [
      this.formation.grid[1][3],
      this.formation.grid[1][4],
      this.formation.grid[2][3],
      this.formation.grid[2][4]
    ];
    this.setEnemyPaths(enemiesList, butterfly1, 5e3, 0, 0);
    enemiesList = [
      this.formation.grid[0][0],
      this.formation.grid[1][2],
      this.formation.grid[0][1],
      this.formation.grid[1][5],
      this.formation.grid[0][2],
      this.formation.grid[2][2],
      this.formation.grid[0][3],
      this.formation.grid[2][5]
    ];
    this.setEnemyPaths(enemiesList, bossbutterfly1, 1e4, 0, 0);
    enemiesList = [
      this.formation.grid[1][6],
      this.formation.grid[1][0],
      this.formation.grid[1][7],
      this.formation.grid[1][1],
      this.formation.grid[2][6],
      this.formation.grid[2][0],
      this.formation.grid[2][7],
      this.formation.grid[2][1]
    ];
    this.setEnemyPaths(enemiesList, butterfly2, 17500, 0, 0);
    enemiesList = [
      this.formation.grid[3][6],
      this.formation.grid[3][2],
      this.formation.grid[3][7],
      this.formation.grid[3][3],
      this.formation.grid[4][6],
      this.formation.grid[4][2],
      this.formation.grid[4][7],
      this.formation.grid[4][3]
    ];
    this.setEnemyPaths(enemiesList, bee2, 28e3, 0, 0);
    enemiesList = [
      this.formation.grid[3][0],
      this.formation.grid[3][8],
      this.formation.grid[3][1],
      this.formation.grid[3][9],
      this.formation.grid[4][0],
      this.formation.grid[4][8],
      this.formation.grid[4][1],
      this.formation.grid[4][9]
    ];
    this.setEnemyPaths(enemiesList, bee3, 37e3, 0, 0);
  }
  isComplete() {
    let complete = true;
    for (let i = 0; i < this.formation.grid.length; i++) {
      for (let j = 0; j < this.formation.grid[i].length; j++) {
        if (this.formation.grid[i][j]) {
          complete = false;
          break;
        }
      }
    }
    return complete;
  }
  setEnemyPaths(enemiesList, path, firstDelay, dx, dy) {
    let delay = firstDelay;
    while (enemiesList.length > 0) {
      let nextEnemy = enemiesList.shift();
      if (!nextEnemy)
        continue;
      nextEnemy.setPath({
        dx,
        dy,
        path: [...path],
        getFinalPosition: () => {
          return this.formation.getPositionInGrid(nextEnemy);
        },
        delay,
        numberOfShots: 0
      });
      delay += 250;
    }
  }
  update(deltaTime, options) {
    this.formation.update(deltaTime);
    if (!options.pauseAttack) {
      this.elapsedTime += deltaTime;
      if (this.elapsedTime > ATTACK_DELAY - 4e3) {
        if (this.formation.inCenter && (this.formation.state == "right" || this.formation.state == "left")) {
          this.formation.state = "expanding";
        }
      }
      if (this.elapsedTime > ATTACK_DELAY) {
        this.attacking = true;
      }
      if (this.attacking) {
        this.attacksList.forEach((attacks) => {
          this.runAttacks(attacks, deltaTime);
        });
      }
    }
  }
  render(context) {
    this.formation.render(context);
  }
  getEnemies() {
    var enemies = [];
    this.formation.grid.forEach((row) => {
      row.forEach((enemy) => {
        if (enemy != null) {
          enemies.push(enemy);
        }
      });
    });
    return enemies;
  }
  runAttacks(attacks, deltaTime) {
    attacks.elapsed += deltaTime;
    if (attacks.elapsed > attacks.restartTime) {
      attacks.elapsed = 0;
      attacks.activated_attacks = [];
    }
    attacks.attack_list.forEach((attackTime) => {
      if (attacks.elapsed >= attackTime && !attacks.activated_attacks.includes(attackTime)) {
        attacks.activated_attacks.push(attackTime);
        attacks[attackTime]();
      }
    });
  }
  nextWave() {
    this.events.publish({
      type: "NEXT_WAVE",
      payload: {
        wave: this
      }
    });
    return new Wave2(this.events);
  }
}
const renderGame = ({
  context,
  canvas,
  score,
  highScore,
  state,
  achievedHighScore,
  shotsFired,
  shotsHit,
  wave
}) => {
  context.save();
  context.font = `24px Emulogic, monospace`;
  context.fillStyle = "white";
  context.textAlign = "left";
  context.textBaseline = "top";
  context.fillText(`${score}`, 100, 40);
  context.textAlign = "center";
  context.fillStyle = "red";
  context.fillText("HIGH SCORE", canvas.width / 2, 10);
  context.fillStyle = "white";
  const actualHighScore = Math.max(score, highScore);
  context.fillText(`${actualHighScore}`, canvas.width / 2, 40);
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.font = `36px Emulogic, monospace`;
  switch (state) {
    case "readying":
      context.fillText("READY", canvas.width / 2, canvas.height / 2);
      break;
    case "gameover":
      context.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
      context.font = `24px Emulogic, monospace`;
      if (achievedHighScore)
        context.fillText(
          "NEW HIGH SCORE",
          canvas.width / 2,
          canvas.height / 2 + 40
        );
      context.fillText(
        `${shotsFired} shots fired`,
        canvas.width / 2,
        canvas.height / 2 + 80
      );
      context.fillText(
        `${shotsHit} shots hit`,
        canvas.width / 2,
        canvas.height / 2 + 120
      );
      const percentHit = Math.round(shotsHit / shotsFired * 100) || 0;
      context.fillText(
        `${percentHit}% shots hit`,
        canvas.width / 2,
        canvas.height / 2 + 160
      );
      context.textBaseline = "bottom";
      context.fillText("press escape", canvas.width / 2, canvas.height - 10);
      break;
  }
  if (wave.showing) {
    context.fillStyle = "lightblue";
    context.fillText(
      wave.count % 3 == 0 ? "CHALLENGE" : "STAGE " + wave.count,
      canvas.width / 2,
      canvas.height / 2 - 50
    );
  }
  context.restore();
};
const setupSound = (events) => {
  const audio = Audio();
  audio.play({
    key: "background",
    loop: true,
    volume: 0.2
  });
  const dispose = [];
  dispose.push(
    events.subscribe({
      type: "PLAYER_FIRED",
      callback: () => {
        audio.play({
          key: "fire"
        });
      }
    })
  );
  dispose.push(
    events.subscribe({
      type: "PLAYER_DESTROYED",
      callback: () => {
        audio.play({
          key: "player-die"
        });
      }
    })
  );
  dispose.push(
    events.subscribe({
      type: "ENEMY_DESTROYED",
      callback: () => {
        audio.play({
          key: "enemy-die"
        });
      }
    })
  );
  return {
    dispose: () => {
      dispose.forEach((fn) => fn());
      audio.stopAll();
    }
  };
};
export {
  Lives as L,
  SHIP_READYING_ANIMATION_DURATION as S,
  Wave1 as W,
  createBulletSystem as a,
  setupParticles as b,
  createShip as c,
  SHIP_DESTROYED_ANIMATION_DURATION as d,
  SHIP_SPRITE_SIZE as e,
  renderGame as r,
  setupSound as s
};
