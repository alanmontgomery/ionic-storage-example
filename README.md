# ionic-storage-example
An example of using Ionic Storage with React

### Showcasing the following Ionic Storage functionality
1. `new Storage()` with config using Drivers
2. `create()`
3. `set()`
4. `get()`
5. `remove()`
6. `clear()`
7. Some custom functions for accessing arrays of objects

> Based on the "list" Ionic React starter template

- All `@ionic/storage` functionality is in `IonicStorage.js` within the data folder

- Pass any name to the `createStore` function to name your DB
- Mimic of data fetching from `messages.js` just like in the list starter template
- Fetched data is placed into Ionic Storage then manipulated throughout
- Upon "refresh", if the `msgs` key exists in Ionic Storage, this will be used instead of fetching

**To reset: within DevTools > Application, delete the IndexedDB created. It will then be re-created and populated with fetched data.**

Are you on Twitter? Lets connect [@93alan](https://twitter.com/93alan)
If you'd like to support, you can <a className="link" href="https://www.buymeacoffee.com/ionicreacthub" target="_blank" rel="noopener">buy me a coffee</a> ☕️
