# copy2clipboard
A tampermonkey script, to add a code copy button to Stack Overflow, Zhihu and other web sites, **as long as the source code is wrapped in the \<pre\> html tag**.

![demo](./imgs/stackoverflow.gif)

## Install

Please go to https://openuserjs.org/scripts/neulana/copy2clipboard or https://greasyfork.org/zh-CN/scripts/375274-copy2clipboard

## Supported websites

```bash
https://stackoverflow.com/*
https://*.zhihu.com/*
https://www.jianshu.com/*
https://dev.to/*
```

## How to custom

If you find any website that not in the above list, you can add your websites at the top of the script.there is some steps:

1. Find the Tampermonkey extension in the Chrome;

2. Click the "administration panel" in the popup list;

3. Find the "copy2clipboard", click the "edit" in the "operation" on the right;

4. Add your websites at the top of the script, support for regular expressions, for example:

   ```bash
   // @include      https://example.com/*
   ```

5. Happy Copy!

## Thanks

If you feel good about it, please give me a star⭐.
