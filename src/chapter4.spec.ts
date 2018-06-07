import { expect } from 'chai'
import { Tree, TreeNode, Chapter4 } from './chapter4'
import { notDeepEqual } from 'assert'

describe("Chapter 4: Lists & Graphs", () => {
  const chap4 = new Chapter4()

  describe("4.4: Check Binary Search Tree", () => {
    const t = new Tree<number>()
    t.root = new TreeNode(8)
    t.root.left = new TreeNode(5)
    t.root.left.left = new TreeNode(3)
    t.root.left.left.left = new TreeNode(2)
    t.root.left.left.right = new TreeNode(4)
    t.root.left.right = new TreeNode(7)
    t.root.left.right.left = new TreeNode(6)
    t.root.right = new TreeNode(10)
    t.root.right.left = new TreeNode(9)
    t.root.right.right = new TreeNode(11)

    console.log("printing t:")
    console.log("print:", t.print())
    console.log("preorder:", t.preOrder())
    console.log("inorder: ", t.inOrder())

    const f = new Tree<number>()
    f.root = new TreeNode(8)
    f.root.left = new TreeNode(5)
    f.root.left.left = new TreeNode(3)
    f.root.left.left.left = new TreeNode(2)
    f.root.left.left.right = new TreeNode(7)
    f.root.left.right = new TreeNode(6)
    f.root.left.right.left = new TreeNode(6)
    f.root.right = new TreeNode(10)
    f.root.right.left = new TreeNode(11)
    f.root.right.right = new TreeNode(11)

    it("should return true for a proper binary search tree", () => {
      expect(chap4.isSearchTree(t)).to.equal(true)
    })

    it("should return false when it's not a search tree", () => {
      expect(chap4.isSearchTree(f)).to.equal(false)
    })

    it("should return false for a null tree (i guess)", () => {
      expect(chap4.isSearchTree(new Tree<number>())).to.equal(false)
    })

  })
})
