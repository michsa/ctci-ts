import { expect } from 'chai'
import Chapter1 from './chapter1'

describe("Chapter1", () => {
  const chap1 = new Chapter1()

  /* 1.1: implement an algorithm to determine 
          if a string has all unique characters. */
  describe("1.1: isUnique", () => {
    const trueInput = 'abnfdsjhe'
    const falseInput = 'fgduiyqwerhjf'
    
    it("Should return true for " + trueInput, () => {
      const result = chap1.isUnique(trueInput)
      expect(result).to.equal(true)
    })

    it("Should return false for " + falseInput, () => {
      const result = chap1.isUnique(falseInput)
      expect(result).to.equal(false)
    })
  })

  describe("1.2: checkPermutation", () => {
    const trueInputs = ["God    ", "dog"]
    const falseInputs = ["amy sue", "roger"]

    it("Should return true for " + trueInputs, () => {
      const result = chap1.checkPermutation(trueInputs[0], trueInputs[1])
      expect(result).to.equal(true)
    })

    it("Should return false for " + falseInputs, () => {
      const result = chap1.checkPermutation(falseInputs[0], falseInputs[1])
      expect(result).to.equal(false)
    })
  })
})
