import { asyncOperationDemo } from '../src/main.js'
const order = []
await asyncOperationDemo(operation => order.push(operation))
console.log('Порядок callback:', order.join(' → '))
console.log('setTimeout запланирован из setImmediate: это явная последовательность, а не универсальный порядок независимых таймеров.')
