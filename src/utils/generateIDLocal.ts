export const generateIDLocal = () => {
  return "xxxxxxxxxx".replace(/[x]/g, function (c) {
    const r = Math.floor(Math.random() * 10);
    return r.toString();
  });
};

export default generateIDLocal;
