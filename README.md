# Monorepo for Vorte

**DEVELOPMENT PHILOSOPHY**

At **Vorte**, our mission is to empower Finnish entrepreneurs with **technically powerful**, **well-known**, and **accessible** tools.

**Technically powerful** means software that _simply works_: reliably, securely, and purposefully. It ensures **full privacy**, operates **offline**, and remains seamlessly available through the browser with **strong networking and collaboration capabilities**.

**Well-known** means not reinventing the wheel but enhancing and integrating the tools users already find useful.

**Accessible** means affordable, cross-platform, and available in all relevant languages.

**Clarity** is central to our philosophy. User-generated data must be displayed in a way that enables meaningful understanding and intelligent decision-making.

**Automation** is another core principle: if a task can be handled correctly in the background, it should be — without interrupting the user. Yet **transparency** must remain absolute. Advanced users should be able to audit, trace, and understand every automated process.

Even as we minimize the need for user interaction, we never compromise on the **interface** itself. It must remain **beautiful**, **responsive**, **emotionally resonant**, and **clear** — a space that breathes and focuses attention on what truly matters.

## IMPORTANT ABSOLUTES

1. **The `alternativeScripts` directory**

   - Contains source code for alternative browser main-thread scenarios, e.g. authentication or workflows not relevant to the basic usage of this software, which would otherwise add unnecessary weight.

2. **The `appLoader` directory**

   - A simple, _indexed_ and _search-engine-optimized_ static page generation directory.
   - Provides a good user experience while the service worker is being installed.
   - Enables users to access the otherwise offline application via search engine results.
   - Displayed only once — subsequent requests are served offline-first by the service worker proxy.

3. **The `assetsManagement` directory**

   - Holds pre-optimization static assets such as fonts and images.
   - Optimization should be performed only once during development start (`npm run start`) or when the directory is updated (`npm run optimize`), not on every build — only on deployments (`npm run deploy`).

4. **The `cloudWorker` directory**

   - Contains the source code for the worker script deployed to Cloudflare’s edge.
   - Its purpose is to orchestrate database and storage access, including IAM operations.
   - In other words, it functions as an API.

5. **The `mainScripts` directory**

   - Contains the source code for browser-side scripts handling rendering and event management.

6. **The `networkHeaders` directory**

   - Enforces separation of concerns by building the `_headers` file into `dist/static`.
   - Used to declare cache, content-security, and other browser policies for static assets.

7. **The `serviceWorker` directory**

   - Contains the source code for the offline application with a request/response structure similar to a server.
   - Renders the initial view, manages user-generated content and credential caches, and maintains the zero-knowledge layer.

### SCRIPTS

- Build scripts are generally stored directly in the source directory of the specific runtime.  
  Plugin, optimization, and other utility scripts can be found in the `scripts` directory.

- To start development, run `npm run start`.  
  This installs dependencies, copies and optimizes assets from the `assetsManagement` directory to the distribution (`dist`) directory, and starts a development server with a `watch` on the `src` directory via Cloudflare’s Wrangler CLI.

- To continue later, run `npm run dev` or `npx wrangler dev` to get a build watch on `src`.  
  If live watching isn’t needed, run `npm run build` when you want to bundle changes into `dist`.

- Additional aliases for scripts are available. Check `package.json` for details.

#### SHARED

- The `shared` directory holds JavaScript variables required across the codebase in a config-like manner to avoid searching for distributed variables that critically affect software behavior.

##### CONTRIBUTION

Join our Discord server to discuss how you can contribute:  
[https://discord.gg/5HXEHJKK](https://discord.gg/5HXEHJKK)
