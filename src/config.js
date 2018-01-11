const config = {
  CELLS_PER_ROW : 60, //number of cells PER ROW
  CELL_SIZE : Math.round((window.innerHeight - 70) / 60),
  gridData : [],
  frameId : null,
  container : document.querySelector('.grid')
};

export default config;