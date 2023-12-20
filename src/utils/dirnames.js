import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirUtilis = path.dirname(__filename);
const __dirSrc = path.join(__dirUtilis, '..');
const __dirProyecto = path.join(__dirSrc, '..');

export { __dirSrc, __dirProyecto };
