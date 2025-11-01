# Monorepo for Vorte

## IMPORTANT ABSOLUTES

1. **The `appLoader` directory**

   - A simple, _indexed_ and _search-engine-optimized_ static page generation directory
   - The goal is to provide a good user experience while the service worker is being installed
   - Displayed only once — subsequent requests are served offline-first by the service worker proxy

2. **The `assetsManagement` directory**

   - Holds pre-optimization static assets such as fonts and images
   - Optimization should be performed once during development — not on every build, but instead on deployments

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

### CONTRIBUTION

Join our Discord server to discuss how you can contribute:  
[https://discord.gg/5HXEHJKK](https://discord.gg/5HXEHJKK)
