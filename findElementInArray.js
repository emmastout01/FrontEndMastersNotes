// for both exercises, the id of the object you're searching for is given to you
// as integer. return the whole object that you're looking for
// 
// it's up to you what to return if the object isn't found (we're not testing that)

function linearSearch(id, array) {
    // code hoes here
    for(let i=0; i<array.length, i++) {
      if (id === array[i].id) {
        return array[i];
      }
    }
  }
  
  function binarySearch(id, array) {
    // code goes here
    let min = 0;
    let max = array.length -1;
    let index;
    let element;
    
    while (min <= max) {
      index = math.floor(min+max/2);
      element = array[index];
          if (element.id < id) {
            min = index +1;
          } else if ( element > id) {
            max = index - 1;
          } else {
            return element;
          }
    }
  }