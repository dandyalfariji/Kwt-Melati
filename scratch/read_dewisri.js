import fs from 'fs';
import path from 'path';

const fileBytes = fs.readFileSync('scratch/ref_data.txt');
let text = '';
if (fileBytes[0] === 0xff && fileBytes[1] === 0xfe) {
  text = fileBytes.toString('utf16le');
} else {
  text = fileBytes.toString('utf8');
}

const lines = text.split('\n');
console.log("Total lines:", lines.length);

let dewiSriSection = [];
let capture = false;
for (const line of lines) {
  if (line.includes("DATA FOR: Dewi Sri GBA")) {
    capture = true;
  }
  if (line.includes("DATA FOR: PAUD Husnul Khoir")) {
    capture = false;
  }
  if (capture) {
    dewiSriSection.push(line);
  }
}

console.log("Dewi Sri GBA Section (first 250 lines):");
console.log(dewiSriSection.slice(0, 250).join('\n'));
