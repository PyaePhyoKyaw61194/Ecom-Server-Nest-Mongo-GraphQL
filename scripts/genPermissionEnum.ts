import { seedData as permissionData } from 'src/permission/seedData';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('node:fs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('node:path');

const filename = 'permission.enum.ts';
const filePath = path.resolve(process.cwd(), './src/enum/', filename);

let enumData = `export enum Permissions {`;

permissionData.forEach((permission) => {
  enumData += `${permission.name}='${permission.name}',`;
});

enumData += '}';

fs.writeFileSync(filePath, enumData);
