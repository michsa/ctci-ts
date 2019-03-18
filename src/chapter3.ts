class StackItem<T> {
  value: T
  next: StackItem<T> = null

  constructor(val: T) {
    this.value = val
  }
}

export class Stack<T> {
  top: StackItem<T>

  constructor(...values: T[]) {
    values.forEach(v => this.push(v))
  }

  isEmpty(): boolean {
    return this.top === undefined
  }

  push(value: T) {
    const end: StackItem<T> = new StackItem(value)
    end.next = this.top
    this.top = end
  }

  pop(): T {
    if (this.top) {
      const pop = this.top.value
      this.top = this.top.next
      return pop
    }
  }

  peek(): T {
    if (this.top) return this.top.value
  }

  toArray(): T[] {
    let p: StackItem<T> = this.top
    const a: T[] = []
    while (p) {
      a.push(p.value)
      p = p.next
    }
    return a
  }
}

/* 3.2 Stack Min: How would you design a stack which, in addition to push and
pop, has a function min which returns the minimum element? Push, pop and min
should all operate in O(1) time. */
class MinStack<T> extends Stack<T> {
  mins: Stack<StackItem<T>> // of StackItems

  constructor(...values: T[]) {
    super(...values)
    this.mins = new Stack()
  }
  
  push(value: T): void {
    if (this.mins.isEmpty() || value < this.min()) {
      this.mins.push(this.top)
    }
    super.push(value)
  }

  pop(): T {
    if (this.mins.peek() === this.top) this.mins.pop()
    return super.pop()
  }

  min(): T {
    if (!this.mins.isEmpty()) 
      return this.mins.peek().value
  }
}

class SizedStack<T> extends Stack<T> {
  size: number = 0

  constructor(readonly STACK_SIZE: number, values: T[]) {
    super(...values)
  }

  isFull(): boolean {
    return this.size === this.STACK_SIZE
  }

  push(value: T): void {
    if (this.isFull()) return
    super.push(value)
    this.size++
  }

  pop(): T {
    const pop: T = super.pop()
    if (pop) {
      this.size--
      return pop
    }
  }
}

/* 3.3 Stack of Plates: implement a stack composed of substacks with a maximum
size; when a substack would exceed the maximum size, a new substack should be
created. */
class StackOfStacks<T> {
  stacks: Stack<SizedStack<T>>

  constructor(readonly STACK_SIZE: number, values: T[]) {
    this.stacks = new Stack<SizedStack<T>>()
    values.forEach(v => this.push(v))
  }

  push(value: T): void {
    // if our current stack is at capacity, make a new one
    if (this.currStackSize >= this.STACK_SIZE || this.stacks.isEmpty()) {
      this.stacks.push(new Stack<T>(value))
      this.currStackSize = 1
    }
    // otherwise add the value to the current stack
    else {
      this.getCurrStack().push(value)
      this.currStackSize++
    }
  }

  pop(): T {
    if (this.isEmpty()) return
    const value: T = this.getCurrStack().pop()
    this.currStackSize--
    if (this.currStackSize < 1) {
      this.stacks.pop()
      this.currStackSize = this.isEmpty() ? 0 : this.STACK_SIZE
    }
    return value
  }

  peek(): T {
    if (this.getCurrStack()) return this.getCurrStack().peek()
  }

  getCurrStack(): Stack<T> {
    return this.stacks.peek()
  }

  // either we have no stacks, or we have one empty stack
  isEmpty(): boolean {
    return this.stacks.isEmpty() 
        || this.getCurrStack().isEmpty()
  }
}

/* 3.5 Queue: implement a queue from two stacks. */
class Queue<T> {
  inbound: Stack<T>
  outbound: Stack<T>

  constructor(...values: T[]) {
    this.inbound = new Stack<T>(...values)
    this.outbound = new Stack<T>()
  }

  push(value: T): void {
    this.inbound.push(value)
  }

  pop(): T {
    if (this.outbound.isEmpty()) this.restack()
    return this.outbound.pop()
  }

  restack(): void {
    if (!this.outbound.isEmpty()) return // just in case
    while (!this.inbound.isEmpty()) {
      this.outbound.push(this.inbound.pop())
    }
  }

  peek(): T {
    if (this.outbound.isEmpty()) this.restack()
    return this.outbound.peek()
  }

  isEmpty(): boolean {
    return this.outbound.isEmpty() && this.inbound.isEmpty()
  }
}

export class Chapter3 {
  minStack(...args: number[]): MinStack<number> {
    return new MinStack(...args)
  }

  setOfStacks(size: number, args?: number[]): SetOfStacks<number> {
    return new SetOfStacks(size, args ? args : [])
  }

  queue<T>(...args: T[]): Queue<T> {
    return new Queue(...args)
  }

  sortStack<T>(s: Stack<T>): void {
    const sorted = new Stack<T>(s.pop())
    let temp: T

    while (!s.isEmpty()) {
      if (s.peek() < sorted.peek()) {
        temp = s.pop()
        while (!sorted.isEmpty() && sorted.peek() > temp) {
          s.push(sorted.pop())
        }
        sorted.push(temp)
      }
      sorted.push(s.pop())
    }

    while (!sorted.isEmpty()) s.push(sorted.pop())
  }
}
