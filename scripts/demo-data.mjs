import { asyncOperationDemo } from '../src/main.js'
export const runDemo = async () => {
  const order = []
  await asyncOperationDemo(operation => order.push(operation))
  return { order, scheduling: 'setTimeout is scheduled inside setImmediate' }
}
