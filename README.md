# copy2clipboard
An Tampermonkey script, to add code copy function Stack Overflow, Github, zhihu and other web sites, **as long as the code is wrapped in the <pre> html tag**.

## Supported websites

- ```bash
  - https://github.com/*
  - https://stackoverflow.com/*
  - https://*.zhihu.com/*
  - https://www.jianshu.com/*
  ```

## The custom

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

If you feel good about it, please give me a star.