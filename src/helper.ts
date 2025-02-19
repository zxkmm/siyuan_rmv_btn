export function convertStringToArray(userInput) {
  if (userInput) {
    var inputArray = userInput.split(/[,，]/);
    for (let i = 0; i < inputArray.length; i++) {
      inputArray[i] = inputArray[i].trim();
    }
    return inputArray;
  } else {
    // 处理 undefined
    return [];
  }
}
