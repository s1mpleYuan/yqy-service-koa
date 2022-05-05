const style = 0;
const color = 30;
const input = '输出文本';

process.stdout.write(`\x1b[${style};${color}m${input}\x1b[0m`)