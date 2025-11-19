const ROLL_INTERVAL_MS = 100;
let lastRollTime = 0;

function maybeRoll(direction) {
  const now = performance.now();
  if (now - lastRollTime < ROLL_INTERVAL_MS) return;
  lastRollTime = now;
  if (direction === "down") rollWheelDown();
  else rollWheelUp();
}
