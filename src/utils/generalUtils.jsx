export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const legendFormatter = (value, entry, type) => {
  return (
    <div
      className={
        type === "line"
          ? "circular-legend-item circular-legend-item-line"
          : "circular-legend-item"
      }
    >
      <div
        className={
          type === "line"
            ? "circular-legend-color-line"
            : "circular-legend-color"
        }
        style={{ backgroundColor: entry.color }}
      />
      <div className="circular-legend-text">{value}</div>
    </div>
  );
};