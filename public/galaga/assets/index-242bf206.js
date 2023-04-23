import { r as renderTitle, S as Scripts, c as createKeyboardSystem, a as createMouseSystem, d as defaultKeyMapping, A as Audio } from "./index-d0be2068.js";
const getKeyConfigPosition = ({
  canvas,
  index
}) => {
  const x = canvas.width / 2 - 30;
  const width = canvas.width / 3;
  const y = canvas.height / 4 + index * 75;
  const height = 50;
  return { x, y, width, height };
};
const renderKeyConfig = ({
  context,
  canvas,
  key,
  mapping,
  index,
  hover,
  editing
}) => {
  const position = getKeyConfigPosition({ canvas, index });
  const color = Scripts().color;
  context.fillStyle = editing ? color("green").lighten(0.4).hex() : hover ? color("white").darken(0.2).hex() : "white";
  context.fillRect(position.x, position.y, position.width, position.height);
  context.font = `24px Emulogic, monospace`;
  context.fillStyle = "black";
  context.textAlign = "center";
  context.fillText(
    mapping[key],
    position.x + position.width / 2,
    position.y + position.height / 2
  );
  context.font = `32px Emulogic, monospace`;
  context.fillStyle = "white";
  context.textAlign = "right";
  context.textBaseline = "middle";
  context.fillText(key, position.x - 25, position.y + position.height / 2);
};
const renderControlsScreen = ({
  canvas,
  context,
  mapping,
  hover,
  editing,
  exitKey
}) => {
  renderTitle({ canvas, context, text: "Controls", fontSize: 56 });
  for (let i = 0; i < Object.keys(mapping).length; i++) {
    const key = Object.keys(mapping)[i];
    renderKeyConfig({
      context,
      canvas,
      key,
      mapping,
      index: i,
      hover: hover === key && !editing,
      editing: editing === key
    });
  }
  const info = editing ? "Press a key" : "Click to edit";
  context.font = `24px Emulogic, monospace`;
  context.fillStyle = "white";
  context.textAlign = "center";
  context.fillText(info, canvas.width / 2, canvas.height - 175);
  if (!editing)
    context.fillText(
      `Press ${exitKey} to return`,
      canvas.width / 2,
      canvas.height - 50
    );
};
const setupInput = ({
  events,
  onKeyDown,
  canvas
}) => {
  const keyboard = createKeyboardSystem();
  const mouse = createMouseSystem({ canvas });
  keyboard.subscribe({
    key: "*",
    type: "keydown",
    callback: onKeyDown
  });
  for (let i = 0; i < Object.keys(defaultKeyMapping).length; i++) {
    const key = Object.keys(defaultKeyMapping)[i];
    const position = getKeyConfigPosition({ canvas, index: i });
    mouse.onClick({
      area: { ...position, type: "box" },
      callback: () => {
        events.publish({
          type: "KEY_CONFIG_SELECTION_CHANGED",
          payload: {
            key
          }
        });
      }
    });
    mouse.onHover({
      area: { ...position, type: "box" },
      in: () => {
        events.publish({
          type: "KEY_CONFIG_HOVER_CHANGED",
          payload: {
            key
          }
        });
      },
      out: () => {
        events.publish({
          type: "KEY_CONFIG_HOVER_CHANGED",
          payload: {
            key: null
          }
        });
      }
    });
  }
  return { keyboard, mouse };
};
const controlsScreen = ({
  canvas,
  context,
  events
}) => {
  const { keyboard, mouse } = setupInput({
    events,
    canvas,
    onKeyDown: (key) => {
      if (!state.editing)
        return;
      keyboard.setMapping({
        [state.editing]: key
      });
      mapping = keyboard.getMapping();
      state.editing = null;
    }
  });
  let mapping = keyboard.getMapping();
  const state = {
    hovering: null,
    editing: null
  };
  keyboard.subscribe({
    key: "exit",
    type: "keydown",
    callback: () => {
      if (state.editing)
        return;
      Audio().play({ key: "input" });
      events.publish({
        type: "GAME_SCREEN_CHANGED",
        payload: {
          screen: "menu"
        }
      });
    }
  });
  const disposeHover = events.subscribe({
    type: "KEY_CONFIG_HOVER_CHANGED",
    callback: (event) => {
      state.hovering = event.payload.key;
    }
  });
  const disposeSelection = events.subscribe({
    type: "KEY_CONFIG_SELECTION_CHANGED",
    callback: (event) => {
      if (state.editing === event.payload.key) {
        state.editing = null;
        return;
      }
      state.editing = event.payload.key;
    }
  });
  return {
    dispose: () => {
      disposeHover();
      disposeSelection();
      keyboard.dispose();
      mouse.dispose();
    },
    update: () => {
    },
    render: () => {
      renderControlsScreen({
        context,
        canvas,
        mapping,
        hover: state.hovering,
        editing: state.editing,
        exitKey: keyboard.getMapping().exit
      });
    },
    processInput: (deltaTime) => {
      keyboard.update(deltaTime);
      mouse.update();
    }
  };
};
export {
  controlsScreen
};
