//build/api.js
import { build } from 'esbuild';

async function runBuild() {
  await build({
    entryPoints: ['./services/user/src/handleRequest.js'],
    bundle:    true,
    minify:    true,
    sourcemap: false,
    outdir:   './services/user/dist',
    platform:  'browser',
    format:    'esm',
    target:    ['es2020'],
    logLevel:  'info',
    splitting: true,    
    external:    ['cloudflare:workers'], 
    //plugins:   [],
  });
}

runBuild().catch(err => {
  console.error(err);
  process.exit(1);
});
