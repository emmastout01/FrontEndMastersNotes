// you work for a professional social network. in this social network, a professional
// can follow other people to see their updates (think Twitter for professionals.)
// write a function that finds the job `title` that shows up most frequently given
// a set of degree of separation from you. count the initial id's own job title in the total

/*
  parameters:
  myId                - number    - the id of the user who is the root node
  getUser             - function - a function that returns a user's object given an ID
  degreesOfSeparation - number   - how many degrees of separation away to look on the graph
*/

const findMostCommonTitle = (myId, getUser, degreesOfSeparation) => {
    let queue = [myId];
    const seen = new Set(); //Sets are this amorphous cloud of data and then you can ask if it contains a particular type of data
    const jobs = {};
    
    for (let i = 0; i <= degreesOfSeparation; i++) {
      queue = queue
        .filter((id) => !seen.has(id))
        .map(getUser) //This transforms every id into the user object.
        .map(user => {
          jobs[user.title] = jobs[user.title] ? jobs[user.title] + 1 : 1; //If I've seen jobs[user.title] before, then add 1. If I haven't seen it before, make it 1.
          seen.add(user.id)
          return user; //Map returns an array at the end
        }) //Same array as before, but there were side effects
        .map((user) => user.connections) //This gives me an array of arrays, but I just want an array.
        .reduce((acc, users) => acc.concat(users), []) //So here, we're concatenating users. I'll get back just one array. 
    }

    //jobs = an object with different jobs: {'dev': 50, 'designer': 35, etc.}
    return Object.keys(jobs) //Object.keys is a thing
      .map((job) => [job, jobs[job]]) // This creates an intermediary data structure: ['dev', 50]
      .sort((a, b) => { //Tell it to sort the items in the array
        if (a[1] > b[1]) return -1; //Here we're comparing the numbers against each other
        if (a[1] < b[1]) return 1;
        return 0;
      })[0][0] //Take the 0 element of the array, that will give you the job name.
  }
  