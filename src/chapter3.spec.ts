import { expect } from 'chai'
import { Stack, Chapter3 } from './chapter3'
import { notDeepEqual } from 'assert'

describe("Chapter 3: Stacks & Queues", () => {
  const chap3 = new Chapter3()

  describe("Stack implementation", () => {
    it("should handle pop and peek on a null stack", () => {
      const stack = new Stack()
      expect(stack.pop()).to.equal(null)
      expect(stack.peek()).to.equal(null)
    })

    it("should initialize values on construct", () => {
      const stack = new Stack(4, 5, 2, 3, 7)
      expect(stack.toArray()).to.eql([7, 3, 2, 5, 4])
    })

    it("should pop/peek the most recently added value", () => {
      const stack = new Stack()
      stack.push("hello")
      stack.push("world")
      expect(stack.peek()).to.equal("world")
      expect(stack.pop()).to.equal("world")
      expect(stack.peek()).to.equal("hello")
      expect(stack.pop()).to.equal("hello")
    })
  })

  describe("3.2: Min Stack", () => {
    const minStack = chap3.minStack()

    it("should gracefully handle an empty stack", () => {
      expect(minStack.min()).to.equal(null)
    })

    it("should set min when the stack is initialized", () => {
      minStack.push(5)
      expect(minStack.min()).to.equal(5)
    })

    it("should not update min when push does not set a new minimum", () => {
      minStack.push(6)
      expect(minStack.min()).to.equal(5)
    })

    it("should update min when a new minimum is pushed", () => {
      minStack.push(3)
      expect(minStack.min()).to.equal(3)
    })

    it("should not update min when pop does not remove the minimum", () => {
      minStack.push(7)
      minStack.pop()
      expect(minStack.min()).to.equal(3)
    })

    it("should update min when the current minimum is popped", () => {
      minStack.pop()
      expect(minStack.min()).to.equal(5)
    })
  })

  describe("3.3: Stack of Plates", () => {
    const stackStack = chap3.setOfStacks(4)

    it("should handle pop on an empty stack", () => {
      expect(stackStack.pop()).to.equal(null)
    })

    it("should initialize the first substack on first push", () => {
      stackStack.push(1)
      expect(stackStack.getCurrStack()).not.to.equal(null)
      expect(stackStack.peek()).to.equal(1)
    })

    it("should create another stack after the limit has been reached", () => {
      for (const i of [2, 3, 4, 5]) stackStack.push(i)
      expect(stackStack.stacks.top.next.value.peek()).to.equal(4)
      expect(stackStack.peek()).to.equal(5)
    })

    it("should pop the topmost stack when its last value has been popped", () => {
      stackStack.pop()
      expect(stackStack.stacks.top.next).to.equal(null)
      expect(stackStack.peek()).to.equal(4)
    })
  })

  describe("3.4: Queue", () => {
    const queue = chap3.queue()

    it("should handle pop and peek when empty", () => {
      expect(queue.isEmpty()).to.equal(true)
      expect(queue.pop()).to.equal(null)
      expect(queue.peek()).to.equal(null)
    })

    it("should pop/peek elements in the order they were entered", () => {
      queue.push("hello")
      queue.push("world")
      expect(queue.peek()).to.equal("hello")
      expect(queue.pop()).to.equal("hello")
      expect(queue.peek()).to.equal("world")
      expect(queue.pop()).to.equal("world")
    })
  }) 

  describe("3.5: Sort Stack", () => {
    const values: number[] = [4, 8, 7, 3, 0, 9, 1, 5, 2]
    const stack = new Stack(...values)
    
    it("should handle an empty stack", () => {
      expect(() => chap3.sortStack(new Stack())).not.to.throw(Error)
    })

    it("should sort the stack", () => {
      chap3.sortStack(stack)
      expect(stack.toArray()).to.eql(values.sort())
    })
  })
})
