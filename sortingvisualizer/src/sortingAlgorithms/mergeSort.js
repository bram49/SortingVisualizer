export function getMergeSortAnimations(array) {
    const animations = [];
    const auxiliaryArray = array.slice();
    divide(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
  }
  
  function divide(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    divide(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    divide(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    conquer(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
  }
  
  function conquer(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      animations.push([i, j, 'compare']);
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        animations.push([k, auxiliaryArray[i], 'swap']);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        animations.push([k, auxiliaryArray[j], 'swap']);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
  
    //when out of j
    while (i <= middleIdx) {
      animations.push([i, i,'compare']);
      animations.push([k, auxiliaryArray[i], 'swap']);
      mainArray[k++] = auxiliaryArray[i++];
    }
    //when out of i
    while (j <= endIdx) {
      animations.push([j, j, 'compare']);
      animations.push([k, auxiliaryArray[j], 'swap']);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  