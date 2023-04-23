import { g as getFromStorage, e as removeFromStorage, s as saveToStorage } from "./index-d0be2068.js";
const STORAGE_KEY = "usu-galaga-kollin-caden-high-scores-2";
const MAX_SCORES_TO_SAVE = 5;
const getHighScores = () => {
  const highScores = getFromStorage({
    key: STORAGE_KEY,
    defaultValue: []
  });
  highScores.sort((a, b) => b.score - a.score);
  return highScores;
};
const saveScoreIfHighScore = (score) => {
  const scores = getHighScores();
  if (scores.length < MAX_SCORES_TO_SAVE || score.score > scores[scores.length - 1].score) {
    const isHighestScore = score.score > scores[0].score;
    const newScores = [...scores, score].sort((a, b) => b.score - a.score).slice(0, MAX_SCORES_TO_SAVE);
    saveToStorage({
      key: STORAGE_KEY,
      value: newScores
    });
    return isHighestScore ? "saved" : "no-high-score";
  }
  return "no-high-score";
};
const resetHighScores = () => {
  removeFromStorage({ key: STORAGE_KEY });
};
const createScoreSystem = (events, options) => {
  const highScores = getHighScores();
  const dispose = [];
  let score = 0;
  let achievedHighScore = false;
  const scores = /* @__PURE__ */ new Map();
  scores.set("bee", { formation: 50, diving: 100 });
  scores.set("butterfly", { formation: 80, diving: 160 });
  scores.set("boss", { formation: 150, diving: 400 });
  dispose.push(
    events.subscribe({
      type: "ENEMY_DESTROYED",
      callback: (event) => {
        const formation = event.payload.enemy.inFormation;
        const variant = event.payload.enemy.variant;
        const escorts = event.payload.enemy.escortCount;
        const variantScore = scores.get(variant);
        if (!variantScore)
          throw new Error("Missing score data for enemy variant");
        const scoreValue = formation ? variantScore.formation : variantScore.diving * Math.pow(2, escorts);
        score += scoreValue;
      }
    })
  );
  if (!(options == null ? void 0 : options.attractMode)) {
    dispose.push(
      events.subscribe({
        type: "GAME_OVER",
        callback: () => {
          if (saveScoreIfHighScore({ date: Date.now(), score }) === "saved")
            achievedHighScore = true;
        }
      })
    );
  }
  return {
    dispose: () => dispose.forEach((dispose2) => dispose2()),
    get score() {
      return score;
    },
    get achievedHighScore() {
      return achievedHighScore;
    },
    get highScore() {
      var _a;
      return ((_a = highScores[0]) == null ? void 0 : _a.score) ?? 0;
    }
  };
};
export {
  MAX_SCORES_TO_SAVE as M,
  createScoreSystem as c,
  getHighScores as g,
  resetHighScores as r
};
