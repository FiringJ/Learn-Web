// 1.两数之和 - 哈希表
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
let twoSum = function(nums, target) {
  let map = new Map()
  for (let i in nums) {
    if (map.get(target - nums[i])) {
      return [i, map.get(target - nums[i])]
    }
    map.set(nums[i], i)
  }
};
// twoSum([2,7,11,15],9)

// 2.两数相加
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
class ListNode {
  constructor(val, next) {
    this.val = val === undefined ? 0 : val
    this.next = next === undefined ? null : next
  }
}

let addTwoNumbers = function(l1, l2) {
  let head = null, tail = null
  let carry = 0
  while (l1 || l2) {
    const n1 = l1 ? l1.val : 0
    const n2 = l2 ? l2.val : 0
    const sum = n1 + n2 + carry
    if (!head) {
      head = tail = new ListNode(sum % 10)
    } else {
      tail.next = new ListNode(sum % 10)
      tail = tail.next
    }
    carry = Math.floor(sum / 10)
    if (l1) {
      l1 = l1.next
    }
    if (l2) {
      l2 = l2.next
    }
  }
  if (carry > 0) {
    tail.next = new ListNode(carry)
  }
  return head
};
// addTwoNumbers([2,4,3], [5,6,4])

// 3.无重复字符的最长子串
/**
 * @param {string} s
 * @return {Number}
 */
let lengthOfLongestSubstring = function(s) {
  if (s.length === 0) {
    return 0
  }
  let start = 0, end = 0, max = 0, maxStr = ''
  let map = new Map()
  for (let i = 0; i < s.length; i++) {
    if (!map.has(s[i])) {
      map.set(s[i], i)
      end = i + 1
      if (end - start > max) {
        max = end - start
        maxStr = s.substring(start, end)
      }
    }
    else {
      let temp = map.get(s[i]) + 1
      for (let j = start; j <= map.get(s[i]); j++) {
        map.delete(s[j])
      }
      map.set(s[i], i)
      start = temp
      end = i + 1
    }
  }
  return max
};
console.log(lengthOfLongestSubstring("dvdf"))

// 4.寻找两个正序数组的中位数
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
const findMedianSortedArrays = function(nums1, nums2) {
  let m = nums1.length, n = nums2.length

};
function findKth (nums1, i, nums2, j) {}
