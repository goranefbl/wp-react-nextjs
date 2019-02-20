# NextJS Boilerplate with WordPress routes.

NextJS Boilerplate with custom Express server and default WordPress routes. Comes packed with Eslint AirBnB JS Style Guide & Prettier.

## Prefetching Data

Since NextJS has code splitting, that means you will be loading only code needed for route you are on. If you want to prefetch code for other routes, NextJS has this built in by adding prefetch attribute to Link component. We expanded this by allowing data prefetching as well. To do this, pass withData attribute.

```
// Will NOT prefetch route
<Link href="/blog" />

// Will prefetch JS
<Link prefetch href="/blog" />

// Will prefetch both JS and Data
<Link prefetch withData href="/blog" />

```

## License

MIT © Goran Jakovljevic
