import YAML from 'yaml';
import fs from 'node:fs';

const file = fs.readFileSync('./swagger.yaml', 'utf-8');
const swaggerDoc = YAML.parse(file);

export default swaggerDoc;