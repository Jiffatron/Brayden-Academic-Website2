import fs from 'fs';
import path from 'path';

const source = path.join(process.cwd(), 'CNAME');
const dest = path.join(process.cwd(), 'docs', 'CNAME');

fs.copyFile(source, dest, (err) => {
  if (err) throw err;
  console.log('✅ CNAME copied to /docs successfully');
});
