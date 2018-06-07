class StackItem<T> {
  value: T
  next: StackItem<T> = null

  constructor(val: T) {
    this.value = val
  }
}

export class Stack<T> {
  top: StackItem<T> = null

  constructor(...values: T[]) {
    for (const val of values) {
      this.push(val)
    }
  }

  isEmpty(): boolean {
    return this.top === null
  }

  push(value: T) {
    const end: StackItem<T> = new StackItem(value)
    end.next = this.top
    this.top = end
  }

  pop(): any {
    if (this.isEmpty()) return null
    const pop = this.top.value
    this.top = this.top.next
    return pop
  }

  peek(): any {
    return this.top ? this.top.value : null
  }

  toArray() {
    let p: StackItem<T> = this.top
    const a: any[] = []
    while (p !== null) {
      a.push(p.value)
      p = p.next
    }
    return a
  }
}

/* 3.2 Stack Min: How would you design a stack which, in addition to push and
pop, has a function min which returns the minimum element? Push, pop and min
should all operate in 0(1) time. */
class MinStack<T> extends Stack<T> {
  mins: Stack<StackItem<T>> // of StackItems

  constructor(...values: T[]) {
    super(...values)
  }
  
  push(value: T) {
    super.push(value)
    if (!this.mins) this.mins = new Stack()
    if (this.mins.isEmpty() || value < this.min())
      this.mins.push(this.top)
  }

  pop(): T {
    if (this.min() === this.peek()) this.mins.pop()
    return super.pop()
  }

  min(): T {
    return this.mins && !this.mins.isEmpty() 
      ? this.mins.peek().value 
      : null
  }
}

/* 3.3 Stack of Plates: implement a stack composed of substacks with a maximum
size; when a substack would exceed the maximum size, a new substack should be
created. */
class SetOfStacks<T> {
  currentStackSize: number = 0
  stacks: Stack<Stack<T>>

  constructor(readonly STACK_SIZE: number, values?: T[]) {
    if (values) for (const i of values) this.push(i)
  }

  push(value: T) {
    if (!this.stacks) this.stacks = new Stack<Stack<T>>()
    // if our current stack is at capacity, make a new one
    if (this.currentStackSize >= this.STACK_SIZE || this.stacks.isEmpty()) {
      this.stacks.push(new Stack<T>(value))
      this.currentStackSize = 1
    }
    // otherwise add the value to the current stack
    else {
      this.getCurrStack().push(value)
      this.currentStackSize++
    }
  }

  pop(): T {
    if (this.peek() === null) return null
    const value: T = this.getCurrStack().pop()
    this.currentStackSize--
    if (this.currentStackSize <= 0) {
      this.stacks.pop()
      this.currentStackSize = this.STACK_SIZE
    }
    return value
  }

  peek() {
    return this.getCurrStack() ? this.getCurrStack().peek() : null
  }

  getCurrStack(): Stack<T> {
    return this.stacks ? this.stacks.peek() : null
  }

  isEmpty(): boolean {
    return !this.stacks 
        || this.stacks.isEmpty() 
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
