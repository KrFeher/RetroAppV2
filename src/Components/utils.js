const utils = {
  truncate: function(str, truncateTo) {
    return str.length > truncateTo ? str.substring(0, truncateTo-3) + "..." : str;
  } 
}

export default utils;

