export function getHeapSortAnimations(A) {
    const animations = [];
    buildMaxHeap(A, animations);
    for(let i = A.length-1; i>0; i--){
        //swap A[1], A[i];
        animations.push([1,i,'swap']);
        let buffer = A[1];
        A[1] = A[i];
        A[i] = buffer;
        heapify(A,1,animations);
    }
    return animations;
}

function buildMaxHeap(A, animations){
    for(let i = Math.floor(A.length/2); i>0; i--){
        heapify(A,i, animations);
    }
}

function heapify(A,i, animations){
    let left = 2*i;
    let right = 2*i+1;
    let max;
    if(left<=A.length-1 && A[left]>A[i]){
        max = left;
    }else{
        max = i;
    }

    if(right <= A.length-1 && A[right]>A[max]){
        max = right;
    }

    if(max !== i){
        //swap A[i] and A[max]
        animations.push([i,max,'swap']);
        let buffer = A[i];
        A[i] = A[max];
        A[max] = buffer;
    }
}