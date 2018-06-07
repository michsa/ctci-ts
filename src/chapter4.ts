export class TreeNode<T> {
  value: T
  left: TreeNode<T> = null
  right: TreeNode<T> = null

  constructor(val: T) {
    this.value = val
  }
}

export class Tree<T> {
  root: TreeNode<T> = null

  isEmpty(): boolean {
    return this.root === null
  }

  inOrder(): T[] {
    function appendInOrder(n: TreeNode<T>, a: T[]) {
      if (n.left !== null) appendInOrder(n.left, a)
      a.push(n.value)
      if (n.right !== null) appendInOrder(n.right, a)
    }
    const arr: T[] = []
    appendInOrder(this.root, arr)
    return arr
  }

  preOrder(): T[] {
    function appendPreOrder(n: TreeNode<T>, a: T[]) {
      a.push(n.value)
      if (n.left !== null) appendPreOrder(n.left, a)
      if (n.right !== null) appendPreOrder(n.right, a)
    }
    const arr: T[] = []
    appendPreOrder(this.root, arr)
    return arr
  }

  print(): string {
    function doPrint(n: TreeNode<T>): string {
      let s: string = "" + n.value
      if (n.left !== null) s = "(" + s + " " + doPrint(n.left)
      if (n.right !== null) s = s + " " + doPrint(n.right) + ")"
      return s
    }
    return doPrint(this.root)
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
    // DEBUG: console.log(`this is checkTree (${n !== null ? n.value : "null"})`)
    return n === null || (
      this.checkNode(n, min, max)
      && this.checkTree(n.left, min, n.value)
      && this.checkTree(n.right, n.value, max)
    )
  }
  private checkNode<T>(n: TreeNode<T>, min: T, max: T): boolean {
    // DEBUG: console.log(`checking node: ${n.value} | min: ${min} | max: ${max}`)
    return n.value <= max && n.value >= min
  }
}
