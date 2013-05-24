#Yelp Search Extension for Chrome

This is a simplistic Chrome Extension I'm open sourcing to provide simple example code for search extensions in general.

# Parts of this Repo

## Icons

Publishing a Chrome Extension actually requires 3 icons, all PNGs and transparency is handled pretty well at all sizes:

16x16, 48x48, and 128x128.

The 16 is used in the app (in context menus), the 48 is used in the Extensions list once it's installed, and the 128 is used in the Chrome Web Store while the user is considering the app (and not in the app itself, oddly enough).

There's also a 19x19 format mentioned in the documentation that does not appear to have any use, whatsoever.

## Screenshot

You probably shouldn't post an Extension without a screenshot. The upload process will tell you it can be either 1280x800, or 640x480. It lies. It will reject anything that isn't 1280x800. But - the actual window it shows these screenshots in is 640x480. Solution? Take a screenshot, crop/scale it to 640x480, then increase the Canvas Size to 1280x800 with transparent borders all around and the 640x480 image centered. ss1280x800.png is a clear example of this (ss.png being the original image it's based on).

## Manifest.json

The manifest is fairly self-explanatory or covered in [the documentation](http://developer.chrome.com/extensions/getstarted.html), but there are a few important things to note:

**`browser_action` is not required** The getting started guide might lead you to believe the `"browser_action"` section is required. It is not. If you don't want your extension to add a button to the toolbar (and a simple context menu extension really shouldn't), don't include this at all.

**A 16x16 icon is required** If you don't you'll end up with a "I didn't finish my work" plugin icon next to your context menu item when the user right-clicks.

**A background page is mandatory** Although you probably don't want a trivial context menu extension generating its own background page, this appears to be unavoidable. Thus placing your one script governing everything in the `"background"` section feels dirty, but it's part of the requirements.

**Permissions are obscure** The Permissions list is basically a magical list you have to sort of ferret out what you are and aren't allowed to do from experimentation and intuiting the list provided in the [Permissions section](http://developer.chrome.com/extensions/permission_warnings.html). For a context menu reading the selected text however, all you need is the one `contextMenus` permission.

##yelpsearch.js

This file really starts with the second section:

    chrome.contextMenus.create({...

This call isn't creating a context menu; it's adding a context menu entry to the standard Chrome context menu, in a section dedicated specifically to Extensions.

The title property is the text of the context menu item, and the `%s` in it magically pulls in whatever the user currently has selected.

The `contexts` property is somewhat similar to the `permissions` property in its use of magic keywords - you can find a list of these in the [ContextMenus Sample Code](http://developer.chrome.com/extensions/samples.html#contextMenus). For a search plugin all you need is `'selection'`.

The call to `chrome.tabs.create({ url: ...` in is basically the cheapest way to open a new tab.




Legal disclaimer: I have no association with Yelp or Google, I just think it's strange that it's difficult to find a clear example of how to add a simple Search extension to Chrome. Google and Yelp are trademarks and/or copyrights of their respective companies.