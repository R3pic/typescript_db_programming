import YAML from 'yaml';
import fs from 'node:fs';
import { getLocalAddress } from "@common/utils.ts";

const file = fs.readFileSync('./swagger.yaml', 'utf-8');
const swaggerDoc = YAML.parse(file);

const localAddress = getLocalAddress();

swaggerDoc.servers[0].url = localAddress ? `http://${localAddress}:3000` : 'http://localhost:3000';


export default swaggerDoc;