export function clamp(value) {
  if (value < 0) return 0;
  if (value > 100) return 100;
  return value;
}
export function applyStatsChange(currentStats, changes) {
  return {
    health: clamp(currentStats.health + (changes.health ?? 0)),
    beauty: clamp(currentStats.beauty + (changes.beauty ?? 0)),
    intellect: clamp(currentStats.intellect + (changes.intellect ?? 0)),
    mentalHealth: clamp(
      currentStats.mentalHealth + (changes.mentalHealth ?? 0)
    ),
  };
}
export function generateYearEvents(
  currentAge,
  currentStats,
  character,
  generateContextualEvent
) {
  const events = [];
  const numEvents = Math.floor(Math.random() * 3) + 1;

  for (let i = 0; i < numEvents; i++) {
    const event = generateContextualEvent(
      currentAge,
      currentStats,
      character
    );
    if (event) events.push(event);
  }

  return events.length > 0
    ? events
    : [{ description: "Foi um ano tranquilo.", statsChange: {} }];
}
export function advanceYear({
  age,
  stats,
  timeline,
  currentYearEvents,
}) {
  let updatedStats = { ...stats };

  currentYearEvents.forEach((event) => {
    updatedStats = applyStatsChange(updatedStats, event.statsChange);
  });

  return {
    newAge: age + 1,
    newStats: updatedStats,
    newTimeline: [
      ...timeline,
      {
        age,
        events: currentYearEvents,
        finalStats: updatedStats,
      },
    ],
  };
}
