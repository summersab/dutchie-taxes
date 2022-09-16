export default (brand, name) => {
  if (brand?.name) {
    return `${brand?.name} | ${name}`;
  }

  return name;
};
