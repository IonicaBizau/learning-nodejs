## WebView Electron

1. Installing dependencies

 - I will install Electronify (https://github.com/IonicaBizau/electronify). This makes the development lot faster. Of course, you can integrate the code in your app.

 ```sh
 $ npm i electronify
 ```

 - Also, install `electron-prebuilt`

 ```sh
 $ npm i electron-prebuilt
 ```

2. I will create a file named `app.js`
3. Now, we write the `index.html` file. To integrate a webview (Chrome window) in the html,
   we will use the `<webview>` element. I set the `myWebView` id, so we can access it from
   the JavaScript side.
4. Now we should make it to load a page. E.g. Google.com
5. Then, we should already see this working.
6. To start the app, we use an npm script. Then we use `npm start` to start the app.
7. Here are some docs: https://github.com/atom/electron/blob/master/docs/api/web-view-tag.md
8. The `<webview>` element has the `openDevTools` method: https://github.com/atom/electron/blob/master/docs/api/web-view-tag.md#webviewopendevtools
