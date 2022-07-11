import { sum as renamedSum } from './DemoModule.js';
import { sum, divideTwoNumbers } from './DemoModule.js';
import * as api from './DemoModule.js';

console.log(sum(5, 2));
console.log(renamedSum(3, 3));
console.log(api.sum(2, 2));
