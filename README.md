# Our Politics

[Our Politics](https://ourpolitics.ca) started in 2015 with a single aim: making election platforms easier to understand. 

Plenty of people don't have time to read daily election news, but they still care about the policies. Our goal is to provide context to these announcements for those who don't follow politics.

## Development

### Run Project

```sh
npm install
npm start
# in another tab
npm run webpack
```

After you see the webpack compilation succeed (the `npm run webpack` step), open up `build/index.html` (**no server needed!**). Then modify whichever `.re` file in `src` and refresh the page to see the changes.

### Run Project with Server

To run with the webpack development server run `npm run server` and view in the browser at http://localhost:8080. Running in this environment provides hot reloading and support for routing; just edit and save the file and the browser will automatically refresh.

### Build for Production

```sh
npm run clean
npm run build
npm run webpack:production
```

This will replace the development artifact `build/Index.js` for an optimized version as well as copy `src/index.html` into `build/`. You can then deploy the contents of the `build` directory (`index.html` and `Index.js`).