import { c as createShip, L as Lives, W as Wave1, a as createBulletSystem, s as setupSound, b as setupParticles, S as SHIP_READYING_ANIMATION_DURATION, d as SHIP_DESTROYED_ANIMATION_DURATION, r as renderGame } from "./sound-23b6522c.js";
import { c as createScoreSystem } from "./scoring-e97370d4.js";
import { c as createKeyboardSystem } from "./index-d0be2068.js";
const setupGameInput = ({
  ship,
  events,
  state
}) => {
  const keyboard = createKeyboardSystem();
  keyboard.subscribe({
    key: "exit",
    type: "keydown",
    callback: () => {
      events.publish({
        type: "GAME_SCREEN_CHANGED",
        payload: {
          screen: "menu"
        }
      });
    }
  });
  keyboard.subscribe({
    key: "left",
    type: "repeat",
    callback: (_, deltaTime) => {
      ship.moveLeft(deltaTime);
    }
  });
  keyboard.subscribe({
    key: "right",
    type: "repeat",
    callback: (_, deltaTime) => {
      ship.moveRight(deltaTime);
    }
  });
  keyboard.subscribe({
    key: "fire",
    type: "keydown",
    callback: () => {
      if (state.state !== "playing")
        return;
      state.shotsFired++;
      events.publish({
        type: "PLAYER_FIRED",
        payload: {
          x: ship.xPosition(),
          y: ship.yPosition()
        }
      });
    }
  });
  return {
    keyboard
  };
};
const gameplayScreen = ({ canvas, events }) => {
  const context = canvas.getContext("2d");
  if (!context)
    throw new Error("Could not get canvas context");
  const ship = createShip({ canvas, events });
  const state = {
    elapsedTime: 0,
    shotsFired: 0,
    shotsHit: 0,
    score: createScoreSystem(events),
    state: "readying",
    lives: new Lives(events, canvas, context),
    canvas,
    ship,
    enemies: [],
    wave: new Wave1(events),
    waveCount: 1,
    bullets: createBulletSystem({ events, ship }),
    displayWaveForMs: 3e3
  };
  const dispose = [];
  const sound = setupSound(events);
  const particles = setupParticles(events);
  const { keyboard } = setupGameInput({ ship: state.ship, events, state });
  dispose.push(
    events.subscribe({
      type: "GAME_OVER",
      callback: () => {
        state.state = "gameover";
      }
    })
  );
  dispose.push(
    events.subscribe({
      type: "BULLET_HIT_ENEMY",
      callback: () => {
        state.shotsHit++;
      }
    })
  );
  dispose.push(
    events.subscribe({
      type: "ENEMY_DESTROYED",
      callback: (event) => {
        const index = state.enemies.findIndex((e) => e === event.payload.enemy);
        state.enemies[index].dispose();
        state.enemies.splice(index, 1);
      }
    })
  );
  dispose.push(
    events.subscribe({
      type: "PLAYER_DESTROYED",
      callback: () => {
        if (state.state === "gameover")
          return;
        state.state = "waiting";
        state.elapsedTime = 0;
      }
    })
  );
  dispose.push(
    events.subscribe({
      type: "NEXT_WAVE",
      callback: () => {
        state.waveCount++;
        state.displayWaveForMs = 3e3;
      }
    })
  );
  const waveEnemies = state.wave.getEnemies();
  state.enemies = state.enemies.concat(waveEnemies);
  return {
    update: (deltaTime) => {
      state.elapsedTime += deltaTime;
      state.displayWaveForMs -= deltaTime;
      switch (state.state) {
        case "waiting":
          if (state.elapsedTime >= SHIP_DESTROYED_ANIMATION_DURATION) {
            state.elapsedTime -= SHIP_DESTROYED_ANIMATION_DURATION;
            state.state = "readying";
          }
          break;
        case "readying":
          if (state.elapsedTime >= SHIP_READYING_ANIMATION_DURATION) {
            state.elapsedTime -= SHIP_READYING_ANIMATION_DURATION;
            state.state = "playing";
            state.ship.resetShip();
          }
          break;
      }
      state.bullets.update(deltaTime);
      state.ship.update(deltaTime, state.enemies, state.bullets.get());
      particles.update(deltaTime);
      for (let i = 0; i < state.enemies.length; i++)
        state.enemies[i].update(deltaTime);
      state.wave.update(deltaTime, {
        pauseAttack: state.state !== "playing"
      });
      if (state.wave.isComplete()) {
        state.wave = state.wave.nextWave();
        state.enemies = state.wave.getEnemies();
      }
    },
    render: () => {
      state.ship.render(context);
      state.lives.render(state.ship.active());
      particles.render(context);
      state.wave.render(context);
      state.bullets.render(context);
      renderGame({
        context,
        canvas,
        score: state.score.score,
        highScore: state.score.highScore,
        achievedHighScore: state.score.achievedHighScore,
        shotsFired: state.shotsFired,
        shotsHit: state.shotsHit,
        state: state.state,
        wave: { count: state.waveCount, showing: state.displayWaveForMs > 0 }
      });
    },
    processInput: (deltaTime) => {
      keyboard.update(deltaTime);
    },
    dispose: () => {
      state.ship.dispose();
      particles.dispose();
      sound.dispose();
      keyboard.dispose();
      sound.dispose();
      state.lives.dispose();
      state.score.dispose();
      state.bullets.dispose();
      for (let i = 0; i < dispose.length; i++)
        dispose[i]();
    }
  };
};
export {
  gameplayScreen
};
