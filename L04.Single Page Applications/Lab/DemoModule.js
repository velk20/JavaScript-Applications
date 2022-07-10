export function sum(a, b) {
  return a + b;
}

function divide(a, b) {
  return a / b;
}

function product(a, b) {
  return a * b;
}

//*renaming when exporting
export { divide as divideTwoNumbers, product };
