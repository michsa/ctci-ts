import { isNumber } from "util"

export default class Chapter1 {

  public isUnique(str: string): boolean {
    let checker: number = 0
    for (let i: number = 0; i < str.length; i++) {
      const value: number = str.charCodeAt(i) - 'a'.charCodeAt(0)
      if ((checker & (1 << value)) > 0) return false
      checker |= (1 << value)
    }
    return true
  }

  public checkPermutation(a: string, b: string): boolean {
    const counts: number[] = new Array<number>(
      'z'.charCodeAt(0) - 'a'.charCodeAt(0)
    )
    for (const i of a) {
      if (i > 'A' && i < 'z') this.pushCharCount(counts, i, 1)
    }
    for (const i of b) {
      if (i > 'A' && i < 'z') this.pushCharCount(counts, i, -1)
    }
    for (const i of counts) {
      if (i && i !== 0) return false
    }
    return true
  }

  private charToIndex(char: string): number {
    console.log(char)
    return (char.charCodeAt(0) - 'a'.charCodeAt(0))
  }

  private pushCharCount(counts: number[], char: string, value: number): void {
    const index = this.charToIndex(char.toLowerCase())
    if (isNumber(counts[index])) counts[index] += value
    else counts[index] = value
  }
}
