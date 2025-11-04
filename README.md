# Monorepo for Vorte

**DEVELOPMENT PHILOSOPHY**

At **Vorte**, our mission is to empower Finnish entrepreneurs with **technically powerful**, **well-known**, and **accessible** tools.

**Technically powerful** means software that _simply works_: reliably, securely, and purposefully. It ensures **full privacy**, operates **offline**, and remains seamlessly available through the browser with **strong networking capabilities**.

**Well-known** means not reinventing the wheel, but enhancing and integrating the tools users already find useful.

**Accessible** means affordable, cross-platform, and available across relevant languages.

**Clarity** is central to our philosophy. User-generated data must be displayed in a way that enables meaningful understanding and intelligent decision-making.

**Automation** is another core principle: if a task can be handled correctly in the background, it should be done without interrupting the user. Yet **transparency** must remain absolute. Advanced users should be able to audit, trace, and understand every automated process.

Even as we minimize the need for user interaction, we never compromise on the **interface** itself. It must remain **beautiful**, **responsive**, **emotionally resonant**, and **clear** — a space that breathes and focuses attention on what truly matters.

## IMPORTANT ABSOLUTES

1. **The `appLoader` directory**

   - A simple, _indexed_ and _search-engine-optimized_ static page generation directory
   - The goal is to provide a good user experience while the service worker is being installed
   - As well as enabling users to access the otherwise offline application via search engine results
   - Displayed only once, subsequent requests are served offline-first by the service worker proxy

2. **The `assetsManagement` directory**

   - Holds pre-optimization static assets such as fonts and images
   - Optimization should be performed only once during development start `$npm run start` and when the directory is updated `$npm run optimize` not on every build, but instead on deployments `$npm run deploy`

3. **The `cloudWorker` directory**

   - Contains the source code for the worker script deployed to Cloudflare’s edge
   - Its purpose is to orchestrate database and storage access, including IAM operations
   - In other words, it functions as an API

4. **The `mainScripts` directory**

   - Contains the source code for browser-side scripts handling rendering and event management

5. **The `networkHeaders` directory**

   - Enforces separation of concerns by building the `_headers` file into `dist/static`
   - Used to declare cache, content-security, and other browser policies for static assets

6. **The `serviceWorker` directory**

   - Contains the source code for the offline application with a request/response structure similar to a server
   - Renders the initial view, manages user-generated content and credential caches, and maintains the zero-knowledge layer

### SCRIPTS

- Build scripts are in most cases stored directly in the source directory of the specific runtime, plugins and optimiziation and other scripts can be found in the scripts directory

- To start development run `$npm run start`. This installs depencies copies and optimizes assets from the assetsManagement directory to the distribution (dist) directory, and starts a development server with a `watch` on the src directory via cloudflares Wrangler CLI tools

- To continue later run `$npm run dev` or `$npx wrangler dev` to get a build watch on the src, if thats not neccessary for your development phase you can just run `$npm run build` when you want changes to be bundled in to dist

- There is also many other aliases for scripts that you can run. Check `package.json` for more info

#### SHARED

- The `shared` directory holds javascript variables that are required accross the code base in a config like manner to avoid having to look for distributed variables that critically effect software behaviour

##### CONTRIBUTION

Join our Discord server to discuss how you can contribute:  
[https://discord.gg/5HXEHJKK](https://discord.gg/5HXEHJKK)
