const COLORS = ['#F58F51', '#936BBE', '#4CA667', '#1C88B8'];

export function getColorByIndex(index) {
  return COLORS[index % COLORS.length];
}
