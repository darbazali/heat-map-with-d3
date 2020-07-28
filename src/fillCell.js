/*==============================================
  CELL COLORIZER, Filles a cell based on temp
===============================================*/
export const fillCell = temp => {
  temp = parseFloat(temp);
  if (temp <= 3) {
    return "#205695";
  }
  else if (temp <= 4) {
    return "#2A6DBA";
  }
  else if (temp <= 5) {
    return "#5D96D8";
  }
  else if (temp <= 6) {
    return "#99BCE5";
  }
  else if (temp <= 7) {
    return "#DEEDFF";
  }
  else if (temp <= 8) {
    return "#F7F0CC";
  }
  else if (temp <= 9) {
    return "#F0D0A3";
  }
  else if (temp <= 10) {
    return "#E0B06D";
  }
  else if (temp <= 11) {
    return "#CC8726";
  }
  else if (temp <= 12) {
    return "#985E0D";
  }
};
