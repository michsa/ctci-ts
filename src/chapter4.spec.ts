import { expect } from 'chai'
import { Tree, TreeNode, Chapter4 } from './chapter4'
import { notDeepEqual } from 'assert'

describe("Chapter 4: Lists & Graphs", () => {
  const chap4 = new Chapter4()

  describe("4.0: Binary Tree Implementation", () => {
    const t1 = new Tree<number>()
    t1.root = new TreeNode(8)
    t1.root.left = new TreeNode(5)
    t1.root.left.left = new TreeNode(3)
    t1.root.left.left.left = new TreeNode(2)
    t1.root.left.left.right = new TreeNode(4)
    t1.root.left.right = new TreeNode(7)
    t1.root.left.right.left = new TreeNode(6)
    t1.root.right = new TreeNode(10)
    t1.root.right.left = new TreeNode(9)
    t1.root.right.right = new TreeNode(11)

    const arr = [8, [5, [3, 2, 4], [7, 6]], [10, 9, 11]]
    const t2 = new Tree<number>(arr)

    it("can be initialized with undefined root", () => {
      const t = new Tree<number>()
      expect(t.isEmpty()).to.equal(true)
    })

    it("can be initialized from a single value", () => {
      const t3 = new Tree<number>(9)
      expect(t3.toArray()).to.eql([9])
      expect(t3.inOrder()).to.eql([9])
    })

    it("can be initialized from nested arrays", () => {
      expect(t2.root.value).to.deep.equal(8)
      expect(t2.root.left.left.right.value).to.deep.equal(4)
      expect(new TreeNode(6)).to.deep.equal(t1.root.left.right.left)
      expect(new TreeNode([10, 9, 11])).to.deep.equal(t2.root.right)
      expect(new TreeNode(10)).not.to.deep.equal(t2.root.right)
    })

    it("can serialize to nested arrays", () => {
      expect(t1.toArray()).to.eql(arr)
      expect(t2.toArray()).to.eql(arr)
    })

    // TODO: preorder, inorder, postorder tests
    // expect(t2.inOrder()).to.eql([ 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ])
  })

  describe("4.5: Check Binary Search Tree", () => {

    it("should return true for a proper binary search tree", () => {
      expect(chap4.isSearchTree(new Tree<number>(
        [8, 
          [5, 
            [3, 2, 4], 
            [7, 6]
          ], 
          [10, 9, 11]
        ]
      ))).to.equal(true)
    })

    it("should return false when it's not a search tree", () => {
      expect(chap4.isSearchTree(new Tree<number>(
        [8, 
          [5, 
            [3, 2, 7], 
            [6, 6]
          ], 
          [10, 11, 11]
        ]
      ))).to.equal(false)
    })

    it("should return false for a null tree (i guess)", () => {
      expect(chap4.isSearchTree(new Tree<number>())).to.equal(false)
    })


    it("does a void function return undefined?", () => {
      const foo = (a) => {
        if (a === 2) return a + 1
      }
      console.log(`foo(2): ${foo(2)}`)
      console.log(`foo(): ${foo(1)}`)
    })

  })
})
