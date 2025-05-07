// import { DateTime } from 'luxon';
import eleventyNavigationPlugin from '@11ty/eleventy-navigation';
import { eleventyImageTransformPlugin } from '@11ty/eleventy-img';
import syntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight';
import eleventyPluginFeathericons from 'eleventy-plugin-feathericons';
import markdownIt from 'markdown-it';
import markdownItAnchor from 'markdown-it-anchor';
import markdownItAttrs from 'markdown-it-attrs';

let markdownItOptions = {
  html: true, // Enable HTML tags in source
  linkify: true, // Autoconvert URL-like text to links
  typographer: true,
};
let markdownItAnchorOptions = {
  level: 2,
  // minimum level header — anchors will only be applied to h2 level headers and below but not h1
  permalink: markdownItAnchor.permalink.headerLink(),
  //wrap the text inside the header with an anchor tag
};

export default async function (eleventyConfig) {
  // Configure Eleventy
  // Order matters, put this at the top of your configuration file.
  eleventyConfig.setOutputDirectory('dist');
  //Folder to read for content
  eleventyConfig.setInputDirectory('src');
  //Add library for markdown-it anchors and attributes
  eleventyConfig.setLibrary(
    'md',
    markdownIt(markdownItOptions)
      .use(markdownItAnchor, markdownItAnchorOptions)
      .use(markdownItAttrs)
      .use(function () {
        console.log('setting md');
      })
  );
  //PLUGINS
  //Navigation plugin
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  //Image optimization plugin
  eleventyConfig.addPlugin(eleventyImageTransformPlugin);
  //syntax highlighting
  eleventyConfig.addPlugin(syntaxHighlight, {
    // Line separator for line breaks
    lineSeparator: '\n',
    // Change which Eleventy template formats use syntax highlighters
    templateFormats: ['*'], // default
    // init callback lets you customize Prism
    init: function ({ Prism }) {
      Prism.languages.myCustomLanguage = {
        /* … */
      };
    },
    // Added in 3.1.1, add HTML attributes to the <pre> or <code> tags
    preAttributes: {
      tabindex: 0,
      // Added in 4.1.0 you can use callback functions too
      'data-language': function ({ language, content, options }) {
        return language;
      },
    },
    codeAttributes: {},
    // Added in 5.0.0, throw errors on invalid language names
    errorOnInvalidLanguage: false,
  });
  //icon plugins - access the feather icons set - https://feathericons.com/
  eleventyConfig.addPlugin(eleventyPluginFeathericons, {
    class: 'feather feather-x',
    xmlns: 'http://www.w3.org/2000/svg',
    width: 24,
    height: 24,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    'stroke-width': 2,
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
  });
  //BUNDLES
  //add support for svg embedded in files
  eleventyConfig.addBundle('svg');
  //FILTERS
  // Universal filters (Adds to Liquid, Nunjucks, and 11ty.js)
  // eleventyConfig.addFilter('XYouTube', function (videoID) {
  //   return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoID}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
  // }); //{{ 'LfwJdWHjkGY' | youTube }}
  //shortcodes
  eleventyConfig.addShortcode('youTube', function (title, videoID) {
    return `<h3 class="video-title">${title}</h3><iframe width="560" height="315" src="https://www.youtube.com/embed/${videoID}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
  }); //{% youTube 'Video about Van Halen', 'LfwJdWHjkGY' %}
  eleventyConfig.addShortcode('bottomNav', function (page, navigation) {
    //
    // console.log('bottomNav', navigation);
    // console.log('bottomNav', page);
    if (navigation.parent == 'Modules') {
      let key = navigation.key;
      let slug = page.fileSlug;
      let index = +slug.replace('week', '');
      let prev = index - 1;
      prev = prev == 8 ? 7 : prev;
      let next = index + 1;
      next = next == 8 ? 9 : next;
      let prevLink = '<span></span>';
      let nextLink = '<span></span>';
      if (prev > 0) {
        prevLink = `<a href="/modules/week${prev}">&laquo; Previous</a>`;
      }
      if (next <= 15) {
        nextLink = `<a href="/modules/week${next}">Next &raquo;</a>`;
      }
      if (prevLink || nextLink) {
        return `<nav class="bottom-nav">${prevLink} ${nextLink}</nav>`;
      }
    }
    return '';
  }); //{% bottomNav page %}
  eleventyConfig.addShortcode('tip', function (content, title) {
    return `<p class="tip">${title ? '<span class="ttl">' + title + '</span>' : ''}${content}</p>`;
  });
  eleventyConfig.addShortcode('warn', function (content, title) {
    return `<p class="warn">${title ? '<span class="ttl">' + title + '</span>' : ''}${content}</p>`;
  });
  eleventyConfig.addShortcode('danger', function (content, title) {
    return `<p class="danger">${title ? '<span class="ttl">' + title + '</span>' : ''}${content}</p>`;
  });
  //for layout files
  eleventyConfig.setLayoutsDirectory('_layouts');
  //for include files, extends files, partials, or macros
  eleventyConfig.setIncludesDirectory('_includes');
  //for global data files
  eleventyConfig.setDataDirectory('_data');

  // Copy `src/img/` to `dist/img`
  eleventyConfig.addPassthroughCopy('src/img');
  // Copy `assets/*` to `dist/assets/*`
  eleventyConfig.addPassthroughCopy('src/assets');
  //copy CSS into dist folder
  eleventyConfig.addPassthroughCopy('bundle.css');
  // copy 404 to dist folder
  eleventyConfig.addPassthroughCopy('404.html');
  //
  eleventyConfig.setTemplateFormats(['njk', 'md', 'html']); //

  //reduce console messages if desired
  eleventyConfig.setQuietMode(false);
  // Looks for index.json and index.11tydata.json instead of using folder names
  eleventyConfig.setDataFileBaseName('index');
  //layout aliasing
  //eleventyConfig.addLayoutAlias("post", "layouts/post.njk");
  //Date formatting using Luxon (needs npm i luxon)
  eleventyConfig.addDateParsing(function (dateValue) {
    //we can do custom date formatting here IF A REAL DATE STRING is given to frontmatter
    // return DateTime.fromJSDate(dateValue, 'yyyy-MM-dd').setZone(TIME_ZONE, { keepLocalTime: false });
  });
}

//TODO: shortcode for blockquote
