// Note: This code is the 'answer' section to the pathfinder exercise on FEM course.

const NO_ONE = 0;
const BY_A = 1;
const BY_B = 2;

// write in a function thats a X by X array of arrays of numbers
// as well two x/y combinations and have it return the shortest
// length (you don't need to track the actual path) from point A
// to point B.
//
// the numbers in the maze array represent as follows:
// 0 – open space
// 1 - closed space, cannot pass through. a wall
// 2 - one of the two origination points
//
// you will almost certainly need to transform the maze into your own
// data structure to keep track of all the meta data
const findShortestPathLength = (maze, [xA, yA], [xB, yB]) => {
  const queue = [];
//   What we're trying to do here: We want to transform the data that we're getting (an array of arrays) and pull out useful information. We're saying that we want to get an array of arrays to change into (x, y) coordinates
// The index that will be represented by x will be the point on the x axis
// We're returning an object here: showing if the point is closed, etc.
  const visited = maze.map((row, y) =>
    row.map((origin, x) => ({
      closed: origin === 1,
      length: 0,
      openedBy: NO_ONE,
      x,
      y
    }))
  );

  visited[yA][xA].openedBy = BY_A;
  visited[yB][xB].openedBy = BY_B;
  logMaze(visited);

//   We're putting the origin here. 
  let aQueue = [visited[yA][xA]];
  let bQueue = [visited[yB][xB]];
//   We need to keep track of the iteration that we're on to note if we're 1 away, 2 away, etc from the origin
  let iteration = 0;

  // if one runs out, there's no path
//   If one of them runs out that means we know it's impossible. So first we need to check that aQueue and bQueue have length.

  while (aQueue.length && bQueue.length) {
    iteration++;
    // Basically: This code 
    const aNeighbors = aQueue.reduce((acc, neighbor) => acc.concat(getNeighbors(visited, neighbor.x, neighbor.y)), [])
    // Then, we need to get the neighbors out of the aQueue
    aQueue = [];
    for (let i = 0; i < aNeighbors.length; i++) {
      const neighbor = aNeighbors[i];
    //   If this happens, we've solved the problem!
      if (neighbor.openedBy === BY_B) {
        //   So, we want to add these together. Neighbor.length is how far away neighbor is from its origin. So, we add this to the iteration, which is how many spots I am from my origin.
        return neighbor.length + iteration;
      } else if (neighbor.openedBy === NO_ONE) {
        neighbor.length = iteration;
        neighbor.openedBy = BY_A;
        aQueue.push(neighbor); 
      }
    }

    // Reduce method: Reduces an array of something down to one number (?)
    // Use reduce when you have an array and want to combine it with other items in the array

    const bNeighbors = bQueue.reduce((acc, neighbor) => acc.concat(getNeighbors(visited, neighbor.x, neighbor.y)), [])
    bQueue = [];
    for (let i = 0; i < bNeighbors.length; i++) {
      const neighbor = bNeighbors[i];
      if (neighbor.openedBy === BY_A) {
        return neighbor.length + iteration;
      } else if (neighbor.openedBy === NO_ONE) {
        neighbor.length = iteration;
        neighbor.openedBy = BY_B;
        bQueue.push(neighbor); 
      }
    }
    logMaze(visited);
  }
  return -1;
};

// This function will get all of the valid neighbors.
const getNeighbors = (visited, x, y) => {
  const neighbors = [];

  if (y - 1 >= 0 && !visited[y - 1][x].closed) {
    // left
    neighbors.push(visited[y - 1][x]);
  }

  if (y + 1 < visited[0].length && !visited[y + 1][x].closed) {
    // right
    neighbors.push(visited[y + 1][x]);
  }

  if (x - 1 >= 0 && !visited[y][x - 1].closed) {
    // up
    neighbors.push(visited[y][x - 1]);
  }

  if (x + 1 < visited.length && !visited[y][x + 1].closed) {
    // down
    neighbors.push(visited[y][x + 1]);
  }

  return neighbors;
};

// takes in a maze and outputs it to the console
// this logger requires your objects to be shaped like
// {
//  openedBy: number - represents who owns it, 0 meaning no one owns it yet
//  closed: boolean  - if the node is an unpassable wall
// .length: number   - how far away the current node is from its origin
// }
function logMaze (maze) {
  console.log('================');
  let header = 'XX | '
  let subheader = '-----'
  for (let i = 0; i < maze[0].length; i++) {
    const num = i >= 10 ? i : '0' + i;
    header += `${num} `
    subheader += '---'
  }
  console.log(header);
  console.log(subheader);
  maze.forEach((row, i) => {
    const num = i >= 10 ? i : '0' + i;
    let buffer = `${num} | `
    
    row.forEach((item) => {
      if (item.closed) {
        buffer += 'XX '
      } else if (item.openedBy === NO_ONE) {
        buffer += '•• '
      } else {
        buffer += (item.length >= 10 ? item.length : '0' + item.length) + ' '
      }
    })
    
    console.log(buffer);
  })
}