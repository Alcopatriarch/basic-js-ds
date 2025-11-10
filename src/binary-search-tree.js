const { NotImplementedError } = require('../lib/errors');
const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    function add(node, data) {
      if (!node) {
        return new Node(data);
      }
      if (data > node.data) {
        node.right = add(node.right, data);
      } else {
        node.left = add(node.left, data);
      }
      return node;
    }
    this.rootNode = add(this.rootNode, data);
  }

  find(data) {
    function nodeFind(node, data) {
      if (!node) {
        return null;
      }
      if (node.data === data) {
        return node;
      }
      return data < node.data ? nodeFind(node.left, data) : nodeFind(node.right, data);
    }
    return nodeFind(this.rootNode, data);
  }

  has(data) {
    function nodeHas(node, data) {
      if (!node) {
        return false;
      }
      if (node.data === data) {
        return true;
      }
      return data < node.data
        ? nodeHas(node.left, data)
        : nodeHas(node.right, data);
    }
    return nodeHas(this.rootNode, data);
  }

  remove(data) {
    function removeNode(node, data) {
      if (!node) {
        return null;
      }
      if (node.data > data) {
        node.left = removeNode(node.left, data);
        return node;
      }
      if (node.data < data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }
        if (!node.left) {
          return node.right;
        }
        if (!node.right) {
          return node.left;
        }
        let minRight = node.right;
        while (minRight.left) {
          minRight = minRight.left;
        }
        node.data = minRight.data;
        node.right = removeNode(node.right, minRight.data);
        return node;
      }
    }
    this.rootNode = removeNode(this.rootNode, data);
  }

  min() {
    let node = this.rootNode;
    if (!this.rootNode) {
      return null;
    }
    while (node.left) {
      node = node.left;
    }
    return node.data;
  }

  max() {
    let node = this.rootNode;
    if (this.rootNode === null) {
      return null;
    }
    while (node.right !== null) {
      node = node.right;
    }
    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};