let id = 0;

const uniq = {
  get id() {
    return id++;
  },
};

export default uniq;
