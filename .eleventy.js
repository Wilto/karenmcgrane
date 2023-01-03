const Image = require("@11ty/eleventy-img");
const path = require('path')


module.exports = function(eleventyConfig) {

async function imageShortcode(src, alt, sizes="100vw") {
  let metadata = await Image(src, {
    formats: ["avif", "webp", "jpeg"],
    widths: [1000, 800, 400],
    urlPath: "img",
    outputDir: "_dist/img/",
    filenameFormat: function( id, src, width, format, options ) {
      const ext = path.extname( src ),
        name = path.basename( src, ext );

      return `${name}-${width}.${format}`
    }
  });

  let imageAttributes = {
    alt,
    sizes,
    loading: "lazy"
  };

  return Image.generateHTML(metadata, imageAttributes);
}

eleventyConfig.addAsyncShortcode("respimg", imageShortcode);

  return {
    templateFormats: [
      "md"
    ],
    pathPrefix: "/",
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    passthroughFileCopy: true,
    dir: {
      input: "_src",
      includes: "_templates",
      data: "_data",
      output: "_dist"
    }
  };
};
