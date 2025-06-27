export function joinFruits(items, delimiter = ",") {
  return items.map(text => text.trim()).join(delimiter);
}
