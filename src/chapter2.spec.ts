import { expect } from 'chai'
import { Chapter2, LinkedList } from './chapter2'
import { notDeepEqual } from 'assert'

describe("Chapter 2: Linked Lists", () => {
  const chap2 = new Chapter2()

  /* 2.4: implement an algorithm to determine 
          if a string has all unique characters. */
  describe("linked list implementation", () => {
    const input = new LinkedList(1, 5, 4, 7, 3, 2, 8, 0, 1, 10, 1)
    const sameAsInput = new LinkedList(1, 5, 4, 7, 3, 2, 8, 0, 1, 10, 1)
    const copyOfInput = input.copy()
    const diffList = new LinkedList(1, 2, 3, 4, 5)
    const modifiedList = input.copy()
    modifiedList.append(12)

    it("Different list should not deep equal original", () => {
      expect(diffList).not.to.deep.equal(input)
    })

    it("Initialized-to-same list should deep equal original", () => {
      expect(sameAsInput.toArray()).to.deep.equal(input.toArray())
    })

    it("Copied list should not shallow equal original", () => {
      expect(copyOfInput).to.not.equal(input)
    })

    it("Copied list should deep equal original", () => {
      expect(copyOfInput).to.deep.equal(input)
    })

    it("Modified list should not deep equal original", () => {
      expect(modifiedList.toArray()).not.to.deep.equal(diffList.toArray())
    })
  })

  describe("2.4: partition", () => {
    // const input = 
    // const startingList: any[] = input.toArray()

    function checkIfPartitioned(list: LinkedList, threshold: any) {
      let threshReached: boolean = false
      let n = list.head
      while (n !== null) {
        if (n.value >= threshold && !threshReached) threshReached = true
        if (n.value < threshold && threshReached) return false
        n = n.next
      }
      return true
    }

    it("Should handle null input", () => {
      const nullList = new LinkedList()
      chap2.partition(nullList, 0)
      expect(nullList.toArray()).to.eql([])
      expect(checkIfPartitioned(nullList, 0)).to.equal(true)
    })

    it("Should partition correctly when the first value is above the threshold", () => {
      const list = new LinkedList(8, 1, 4, 6, 9, 10, 11, 4, 2)
      chap2.partition(list, 7)
      expect(checkIfPartitioned(list, 7)).to.equal(true)
    })

    it("Should partition correctly when the first value is below the threshold", () => {
      const list = new LinkedList(1, 5, 4, 7, 3, 2, 8, 0, 1, 10, 1)
      chap2.partition(list, 7)
      expect(checkIfPartitioned(list, 7)).to.equal(true)
    })
  })



})
