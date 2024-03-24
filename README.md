# Our Politics

[Our Politics](https://ourpolitics.ca) started in 2015 with a single aim: making election platforms easier to understand.

Elections matter, but understanding headlines and press releases takes a lot of time. Our Politics aims to offer easy-to-read summaries of party platforms.

## Development

### Run Project

```sh
npm install
node serve.mjs
```

### Run Project with Server

To run with the development server run `node serve.mjs` and view in the browser at http://localhost:8000. Running in this environment provides hot reloading and support for routing; just edit and save the file and the browser will automatically refresh.

### Build for Production

```sh
node build.mjs
```

This will replace the development artifacts in `www/` for optimized versions. You can then deploy the contents of the `www/` directory.