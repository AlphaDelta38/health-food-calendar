const esbuild = require('esbuild');
const path = require('path');

console.log('Bundling server...');

esbuild.build({
  entryPoints: [path.resolve(__dirname, '../server/dist/index.js')],
  
  outfile: path.resolve(__dirname, 'server-build/index.js'),
  
  bundle: true,
  platform: 'node',
  target: 'node16',
  
  external: ['electron', 'pg-native'], 
}).then(() => {
  console.log(' Server bundled successfully into /server-build/index.js');
}).catch(() => process.exit(1));