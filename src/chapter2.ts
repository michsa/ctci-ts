class ListNode {
  value: any
  next: ListNode = null

  constructor(val: any) {
    this.value = val
  }

  insertAfter(node: ListNode) {
    node.next = this.next
    this.next = node
  }

  // like appending, but we swap the values, effectively
  // placing the new node before our current one. it's not
  // really a "prepend" because any pointers to this node
  // will stay pointed at the new value in the old node's
  // place, until they are incremented.
  insertInPlace(node: ListNode) {
    const temp: any = this.value
    this.value = node.value
    node.value = temp
    this.insertAfter(node)
  }
}

export class LinkedList {
  head: ListNode = null

  constructor(...values: any[]) {
    for (const val of values) {
      this.append(val)
    }
  }

  append(value: any) {
    const end: ListNode = new ListNode(value)
    if (this.head === null) this.head = end
    else {
      let n: ListNode = this.head
      while (n.next !== null) { n = n.next }
      n.next = end
    }
  }

  prepend(value: any) {
    const n: ListNode = new ListNode(value)
    n.next = this.head
    this.head = n
  }

  toArray() {
    let n: ListNode = this.head
    const a: any[] = []
    while (n !== null) {
      a.push(n.value)
      n = n.next
    }
    return a
  }

  copy() {
    const l = new LinkedList()
    let n: ListNode = this.head
    while (n !== null) {
      l.append(n.value)
      n = n.next
    }
    return l
  }
}

export class Chapter2 {
  /* 2.4 Partition: write code to partition a linked list around x, such that 
  all nodes less than x come before all nodes greater than or equal to x. */
  public partition(list: LinkedList, threshold: number): void {
    if (list.head === null) return

    let pLook: ListNode = list.head
    let pPart: ListNode = list.head

    // look through until we find the first node with a value greater 
    // than the partition threshold. this is where we'll park pPart.
    while (pPart.value < threshold) {
      if (pPart.next === null) return
      else pLook = pPart = pPart.next
    }
    while (pLook.next !== null) {
      // DEBUG: console.log(list.toArray(), pPart.value, pLook.next.value)
      if (pLook.next.value < threshold) {
        // detatch pLook.next
        const node: ListNode = pLook.next
        pLook.next = node.next
        
        // reinsert it before pPart
        pPart.insertInPlace(node)
        pPart = pPart.next
      }
      // we only need to move pLook forward if our original pLook.next 
      // wasn't moved across the partition this loop. if it *was*, then
      // pLook.next will have already been updated to a new node, and 
      // moving to it now would make us skip it in the next loop.
      else pLook = pLook.next
    }
    // DEBUG: console.log(list.toArray())
  }

  /* 2.5 Sum Lists: you have two numbers represented by a linked list, where
  each node contains a single digit. the digits are stored in *reverse* order,
  such that the 1's digit is at the head of the list. write a function that
  adds the two numbers and returns the sum as a linked list. */
  public sumLists(a: LinkedList, b: LinkedList, base: number = 10): LinkedList {
    const output = new LinkedList()
    let pa = a.head
    let pb = b.head
    let carry: boolean = false
    let sum: number = 0
    while (pa !== null || pb !== null || carry) {
      // do some sums
      if (pa !== null) {
        sum += pa.value
        pa = pa.next
      }
      if (pb !== null) {
        sum += pb.value 
        pb = pb.next
      }
      if (carry) {
        sum += 1
        carry = false
      }

      // make a node out of our sums
      if (sum >= base) {
        carry = true
        sum -= base
      }

      // DEBUG: console.log("sum:", sum, " pa:", pa, " pb:", pb, " carry:", carry)
      output.append(sum)
      sum = 0
    }
    return output
  }

  /* 2.6 Palindrome: manages two pointers simultaneously to check if a linked
  list is a palindrome in O(n) time. each recursion takes the next pLast as an
  argument, and returns the next pFirst for its caller to use. 
  
  the result is that we progress through the list before doing any checking; 
  once we hit the base case, pFirst is still at the head node, and we begin 
  comparing first and last as we unspool the stack, incrementing pFirst and
  returning to the previous pLast each time. 
  
  es6 destructuring makes it really easy to return both pFirst and the status
  of our palindrome check. if we get a false, it will propagate back through
  the stack. (if we want, we can check isValid to skip the comparison if we
  already have a false, for a tiny extra bit of optimization at the cost of 
  like 10 characters.)

  note: for a valid palindrome, this will compare most nodes twice, on the way
  down and on the way back. as long as comparison is constant time (like for
  numbers) this is still optimal, but if we want to compare something else, it
  must be further optimized to quit after it gets back to the middle. a counter
  added to the return array would probably do the trick, though it'd be fun to 
  see if the recursion could be modified to work with slow/fast pointers. */
  public isPalindrome(l: LinkedList): boolean {
    return l.head !== null && this.checkPalindrome(l.head, l.head)[1]
  }

  private checkPalindrome(pLast: ListNode, pFirst: ListNode): [ListNode, boolean] {
    let isValid = true
    if (pLast.next !== null) {
      [pFirst, isValid] = this.checkPalindrome(pLast.next, pFirst) 
    }
    if (isValid && pLast.value !== pFirst.value) isValid = false 
    // DEBUG: console.log("last:", pLast.value, " | first:", pFirst.value)
    return [pFirst.next, isValid]
  }

  /* 2.7 Intersection: given two singly-linked lists, determine if the lists 
  intersect (by reference), and return the intersecting node. */
  public isIntersecting(a: LinkedList, b: LinkedList): ListNode {
    // meh
    return null
  }
}
