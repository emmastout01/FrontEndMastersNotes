// Important to understand: The 'queue' is also the 'tree' in our example: A good way to think about this is that the 'tree' is actually just the root node. 

// recursive
const breadthFirstTraverse = (queue, array) => {
    if (!queue.length) return array;
    const node = queue.shift(); //Here, we take off the first thing in the queue and return it. So node is the returned first value from the queue.
    array.push(node.value); //Here, we take that thing that we just took off the front of the queue, and we add it to our array.
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
    return breadthFirstTraverse(queue, array);
  }

const breadthFirstTraverse2 = (queue, array) => {
    // fill code in here
    //   iterative:

    while (queue.length) {
      //while there is still something in the queue
      const node = queue.shift(); //take something off of the beginning of the array
      array.push(node.value); // then push the node value to the end of the array
      if (node.left) queue.push(node.left); // then push the left, then right, child values to the end of the array. you have to do the left one first.
      if (node.right) queue.push(node.right);
    }
    return array;
  
    /* 
  First I want to add the first tree value to the array
  Then I want to go across the tree--left value, then right value
  my attempt (it was wrong):
  array.push(queue);
  array = breadthFirstTraverse (queue.left);
  array = breadthFirstTraverse (queue.right);
  array.pop(queue);
  return array;
  
  */
  };
  
  describe("tests", function() {
    const answer = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"];
  
    const tree = {
      value: "A",
      left: {
        value: "B",
        left: {
          value: "D",
          left: {
            value: "G",
            left: null,
            right: null
          },
          right: null
        },
        right: {
          value: "E",
          left: null,
          right: {
            value: "H",
            left: {
              value: "K",
              left: null,
              right: null
            }
          }
        }
      },
      right: {
        value: "C",
        left: {
          value: "F",
          left: {
            value: "I",
            left: null,
            right: null
          },
          right: {
            value: "J",
            left: null,
            right: null
          }
        },
        right: null
      }
    };
  
    render(tree, answer);
  
    it("breadthFirstTraverse", () => {
      expect(breadthFirstTraverse([tree], [])).toEqual(answer);
    });
  });
  