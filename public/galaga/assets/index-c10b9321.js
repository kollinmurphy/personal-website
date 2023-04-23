import { r as renderTitle, S as Scripts, c as createKeyboardSystem, A as Audio } from "./index-d0be2068.js";
const renderCredits = ({
  context,
  canvas,
  exitKey
}) => {
  context.save();
  renderTitle({ canvas, context, text: "Credits", fontSize: 56 });
  context.textBaseline = "top";
  context.fillStyle = "white";
  context.textAlign = "center";
  context.font = `32px Emulogic, monospace`;
  const lineHeight = context.measureText("m").width * 2.25;
  const { canvasTxt } = Scripts();
  canvasTxt.align = "center";
  canvasTxt.lineHeight = 48;
  canvasTxt.font = `32px Emulogic, monospace`;
  canvasTxt.vAlign = "top";
  canvasTxt.drawText(
    context,
    "by Caden Harris and Kollin Murphy for USU CS5410",
    canvas.width / 8,
    canvas.height / 2 - lineHeight * 2.25,
    canvas.width * 3 / 4,
    canvas.height / 2
  );
  context.font = `24px Emulogic, monospace`;
  context.textBaseline = "bottom";
  context.fillText(
    `Press ${exitKey} to return`,
    canvas.width / 2,
    canvas.height - 50
  );
  context.restore();
};
const creditsScreen = ({
  canvas,
  context,
  events
}) => {
  const input = createKeyboardSystem();
  input.subscribe({
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
  return {
    dispose: () => {
      input.dispose();
    },
    update: () => {
    },
    processInput: (deltaTime) => {
      input.update(deltaTime);
    },
    render: () => {
      renderCredits({ context, canvas, exitKey: input.getMapping().exit });
    }
  };
};
export {
  creditsScreen
};
