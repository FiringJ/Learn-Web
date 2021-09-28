// Buffer 对象用于表示固定长度的字节序列
const { Buffer } = require('buffer')

// 创建长度为 10 的以零填充的缓冲区。
const buf1 = Buffer.alloc(10);  // <Buffer 00 00 00 00 00 00 00 00 00 00>

// 创建长度为 10 的缓冲区，
// 使用值为 `1` 的字节填充。
const buf2 = Buffer.alloc(10, 1); // <Buffer 01 01 01 01 01 01 01 01 01 01>

// 创建长度为 10 的未初始化的缓冲区。
// 这比调用 Buffer.alloc() 快，
// 但返回的缓冲区实例可能包含旧数据，
// 需要使用 fill()、write() 、
// 或其他填充缓冲区内容的函数重写。
const buf3 = Buffer.allocUnsafe(10);  // <Buffer 00 00 00 00 62 00 00 00 02 01>

// 创建包含字节 [1, 2, 3] 的缓冲区。
const buf4 = Buffer.from([1, 2, 3]); // <Buffer 01 02 03>

// 创建包含字节 [1, 1, 1, 1] 的缓冲区，
// 所有条目都使用 `(value & 255)` 截断以符合范围 0–255。
const buf5 = Buffer.from([257, 257.5, -255, '1']);

// 创建包含字符串 'tést' 的 UTF-8 编码字节的缓冲区：
// [0x74, 0xc3, 0xa9, 0x73, 0x74]（十六进制）
// [116, 195, 169, 115, 116]（十进制）
const buf6 = Buffer.from('tést'); // <Buffer 74 c3 a9 73 74>

// 创建包含 Latin-1 字节 [0x74, 0xe9, 0x73, 0x74] 的缓冲区。
const buf7 = Buffer.from('tést', 'latin1'); // <Buffer 74 e9 73 74>


console.log(buf7)
