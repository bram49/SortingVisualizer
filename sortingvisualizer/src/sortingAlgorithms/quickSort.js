export function getQuickSortAnimations(array) {
    const animations = [];
    const auxiliaryArray = array.slice();
    quickSort(auxiliaryArray,0,auxiliaryArray.length-1, animations)
    return animations
}

function quickSort(A, low, high, animations){
    if(low<high){
        //partition pivot, pivot is in right place
        const pivot_location = partition(A,low,high, animations);
        quickSort(A, low, pivot_location-1, animations);
        quickSort(A, pivot_location+1, high, animations);
    }
}

function partition(A,low,high, animations){
    const pivot = A[high];
    let i = low-1; //index of smaller element
    
    for(let j=low; j<high; j++){
        animations.push([j,high,'pivot'])
        animations.push([j,high,'uncompare'])
        if(A[j]<pivot){
            i++; //increment index of smaller element
            //swap
            let buffer = A[i];
            A[i] = A[j];
            A[j] = buffer;
            animations.push([i,j,'swap'])
        }
    }

    //swap pivot
    i++;
    A[high] = A[i]
    A[i] = pivot
    animations.push([i,high,'swap'])
    animations.push([high, i, 'pivot'])
    animations.push([high, i, 'uncompare'])

    return i;
}