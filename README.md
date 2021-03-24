# ionic-storage-example
An example of using Ionic Storage with React

> Based on the "list" Ionic React starter template

- All `@ionic/storage` functionality is in `IonicStorage.js` within the data folder

- Pass any name to the `createStore` function to name your DB
- Mimic of data fetching from `messages.js` just like in the list starter template
- Fetched data is placed into Ionic Storage then manipulated throughout
- Upon "refresh", if the `msgs` key exists in Ionic Storage, this will be used instead of fetching

**To reset: within DevTools > Application, delete the IndexedDB created. It will then be re-created and populated with fetched data.**
