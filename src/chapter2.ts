import { isNumber } from "util"

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
    console.log(list.toArray())
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
    while (pa !== null || pb !== null || !carry) {
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

      output.append(sum)
    }

    return output
  }
}
