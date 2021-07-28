import { SitemapStream, streamToPromise } from 'sitemap'
const { Readable } = require( 'stream' )

// An array with your links
const links = [{ url: '/page-1/',  changefreq: 'daily', priority: 0.3  }]

// Create a stream to write to
const stream = new SitemapStream( { hostname: 'https://...' } )

// Return a promise that resolves with your XML string
console.log(streamToPromise(Readable.from(links).pipe(stream)).then((data) =>
  data.toString()
))