const formatNumber = (numParam: number | string) => {
  let num: number;
  
  if (typeof numParam === "string") {
    num = parseInt(numParam.replace(/[^0-9]/g, ''), 10);
  } else {
    num = numParam;
  }

  if (!num) {
    return '';
  }

  return num.toLocaleString("id-ID");
};

export default formatNumber;