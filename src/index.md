---
layout: base.njk
title: Course Introduction
date: Last Modified
name: value
eleventyNavigation:
  key: Home
  order: 1
---

# Welcome to {{pkg.name}}

## {{title}}

Just some sample content. {{name}}

[MAD&D Course Progression](/assets/MAD&D-Course-Progression.pdf) as inline link to load in browser.

<a href="/assets/MAD&D-Course-Progression.pdf" download>Course Progression PDF</a>

page.url: {{page.url}} available if needed

page.inputPath: {{page.inputPath}} available if needed

Environment: {{project.environment}} available from data file if needed

{% feather "feather" %} from [https://feathericons.com/](https://feathericons.com/)

Just in case you can't find it, here is the link to [Google](http://google.ca)

![Alien Used Car Salesman](/img/get-you-into-this-ufo.png)

```js
function myFunction() {
  return true;
}
```

<div class="tip">
  <span class="ttl">Optional Title</span>
  Testing if html in markdown works.
</div>

{% tip 'Testing if tip shortcode works', 'watch out' %}

{% warn 'Testing if warn shortcode works', 'watch out' %}

{% danger 'Testing if danger shortcode works', 'watch out' %}

{% youTube 'Video about Van Halen', 'LfwJdWHjkGY' %}

## Todo for Next Week

- read everything
- do your assignments
- buy me a coffee
