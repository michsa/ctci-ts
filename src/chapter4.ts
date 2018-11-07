import { isUndefined } from "util"

export class TreeNode<T> {
  value: T
  left: TreeNode<T>
  right: TreeNode<T>

  constructor(t: TreeArrayNode<T>) {
    if (t instanceof Array) {
      this.value = t[0] as T
      if (t[1]) this.left = new TreeNode(t[1])
      if (t[2]) this.right = new TreeNode(t[2])
    }
    else this.value = t as T
  }

  toArray(): TreeArrayNode<T> {
    if (!this.left && !this.right) return this.value
    
    const a: TreeArrayNode<T> = [this.value]
    if (this.left) a.push(this.left.toArray())
    if (this.right) a.push(this.right.toArray())
    return a
  }

  inOrder = (): T[] => [
    ...this.doIfExists(this.left, 'inOrder'),
    this.value,
    ...this.doIfExists(this.right, 'inOrder')
  ]

  preOrder = (): T[] => [
    this.value, 
    ...this.doIfExists(this.left, 'preOrder'), 
    ...this.doIfExists(this.right, 'preOrder')
  ]
  
  postOrder = (): T[] => [
    ...this.doIfExists(this.left, 'postOrder'),
    ...this.doIfExists(this.right, 'postOrder'),
    this.value
  ]

  doIfExists = (n: TreeNode<T>, f: string): T[] => n ? n[f]() : []
}

type TreeArrayNode<T> = T | TreeArray<T>
interface TreeArray<T> extends Array<TreeArrayNode<T>> {}

export class Tree<T> {
  root: TreeNode<T>

  constructor(a?: TreeArrayNode<T>) {
    if (a) this.root = new TreeNode(a)
  }

  isEmpty(): boolean {
    return this.root === undefined
  }

  inOrder = (): T[] => this.root.inOrder()

  preOrder = (): T[] => this.root.preOrder()

  postOrder = (): T[] => this.root.postOrder()

  print(): string {
    function doPrint(n: TreeNode<T>): string {
      if (!n) return ''
      let s: string = `${n.value}`
      if (n.left) s = `(${s} ${doPrint(n.left)}`
      if (n.right) s = `${s} ${doPrint(n.right)})`
      return s
    }
    return doPrint(this.root)
  }

  toArray(): T[] {
    const a = this.root.toArray()
    if (a instanceof Array) return a as T[]
    else return [a as T]
  }
}

interface ArrayPieces {
  left: number[]
  middle: number
  right: number[]
}

export class Chapter4 {
  /* 4.2 Minimal Tree */
  public minimalTree<T>(a: T[]): Tree<T> {
    const t: Tree<T> = new Tree<T>()
    t.root = this.makeNode(a, 0, a.length - 1)
    return t
  }
  private makeNode<T>(a: T[], min: number, max: number): TreeNode<T> {
    const n: TreeNode<T> = new TreeNode(a[min])
    const mid = ((max + 1 - min) / 2) + min
    if (min < mid) n.left = this.makeNode(a, min, mid - 1)
    if (max > mid) n.right = this.makeNode(a, mid + 1, max)
    return n
  }

  /* 4.5 Validate BST */
  public isSearchTree(t: Tree<number>): boolean {
    if (t.isEmpty()) return false
    return this.checkTree(t.root, Number.MIN_VALUE, Number.MAX_VALUE)
  }
  private checkTree<T>(n: TreeNode<T>, min: T, max: T): boolean {
    // console.log(`this is checkTree (${n ? n.value : "null"})`)
    return n === undefined || (
      this.checkNode(n, min, max)
      && this.checkTree(n.left, min, n.value)
      && this.checkTree(n.right, n.value, max)
    )
  }
  private checkNode<T>(n: TreeNode<T>, min: T, max: T): boolean {
    // console.log(`checking node: ${n ? n.value : "null"} | min: ${min} | max: ${max}`)
    return n.value <= max && n.value >= min
  }
}
