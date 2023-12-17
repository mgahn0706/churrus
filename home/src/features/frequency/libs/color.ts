export const getRandomColor = () => {
  const color_r = Math.floor(Math.random() * 127 + 128).toString(16);
  const color_g = Math.floor(Math.random() * 127 + 128).toString(16);
  const color_b = Math.floor(Math.random() * 127 + 128).toString(16);
  return `#${color_r + color_g + color_b}`;
};
