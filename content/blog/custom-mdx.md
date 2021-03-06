---
title: Custom MDX Components for Gatsby
date: "2020-04-26"
description: Make custom MDX components for a Gatsby Website/Blog
---

So this week I updated my **Blog in Gatsby** to use MDX rather than usual Markdown for writing content. The major reason I had done this was because I could use React components inside the contents itself to make it more interactive and user-friendly.

> Life update: Started as an intern in a Bangalore Based Startup called Algoshelf

As a noob in this React ecosystem, I found it hard to implement custom components to be used in MDX and the number of blog posts were less too, so I thought why not implement it and write a blog.... And here we are now :)


## MDX
*"MDX is an authorable format that lets you seamlessly write JSX in your Markdown documents. You can import components, such as interactive charts or alerts, and embed them within your content. This makes writing long-form content with components a blast 🚀."* - [MDX Website](https://mdxjs.com/)

In simpler terms, you can use React Components inside Markdown.

## Authoring Components
Authoring custom components for mdx is quite easy. Easily said it's just a React Component and if you know react well then this will be easy as pie.

Here we'll implement a custom callout like component with basic styling. This callout will have an emoji in the beginning and followed by text. So let's get to it

### The Component Itself
This will be first thing that we'll define. Here is the code, and we'll be defining the code in the `src/components/callout.js` file.
```js
import React from "react"

const Callout = ({ emoji, children }) => {
    return (
            <div className="callout" emoji={emoji}>
                <div className="callout-inner">
                    {children}
                </div>
            </div>
    )
}

export default Callout
```
Here we're making a new Callout function with 2 arguments. The Emoji argument is for the for the emoji for the callout and the children argument is the data that will be enclosed inside the component's tags while in use. We're appending the emoji tag to the div as an attribute for getting the data with CSS.

Now we need to be able to use it in the blog/website. I'll show an example of a blog.

In your `src/templates/blog-post.js` file add these in the top

```jsx
import { MDXProvider } from "@mdx-js/react"
import Callout from "../components/callout"
const shortcodes = {
  Callout
}
```
and for using the callout inside the markdown content, paste this
```jsx
    <MDXProvider components={shortcodes}>
        <MDXRenderer>{post.body}</MDXRenderer>
    </MDXProvider>
```
Now we'll be able to use it with our content.

### Styling the Component
I've used CSS styling for the component since i'm comfortable with CSS.
```css
.callout {
  color: black;
  background: azure;
  padding: 1.5em 1.25em;
  border-radius: 25px;
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  border-bottom-width: 4px ;
  border-bottom-style: solid;
  border-bottom-color: #50fa7b;
  border-left-color: #50fa7b;
  border-left-width: 6px;
  border-left-style: solid;
}
.callout-inner {
  font-style: italic;
  margin-left: 1em;
}

@media (max-width: 767px) {
  .callout {
  padding: 1.5em 0.75em 1.5em 0.6em;
  }
  .callout-inner {
    margin-left: 0.5em;
  }
}

div .callout::before{
  color:red;
  content: attr(emoji);
}
```
You can use any other framework or library for styling and it's upto personal preference.

### Using the component
Now we want out custom made callout component to be used with our content. For that just call the components inside our post like this
```md
<Callout emoji="🔮">
This data will be displayed in the callout component
</Callout>
```
<Callout emoji="🔮">
This data will be displayed in the callout component
</Callout>

So that was easy right? Creating a new component and using it here and all the stuff.

Even better, you can use already other components too other than the custom made ones,
For that just import the component and use it in the content like this. Here we're using components from Rebass, you can use any one you prefer.
```md
import { Box } from 'rebass'
<Box
  color='white'
  bg='blue'
  p={3}
  my={5}
>
> ”This is an important quote.”
</Box>
```

## Conclusion
So we have just made a custom component for MDX and now we know how to use other components to be used in our content. So that's all ⚡️.