## Ajax Support for Ckeditor5 ImageUpload

### build integration

Refer this document to learn how to custom build ckeditor  

https://docs.ckeditor.com/ckeditor5/latest/builds/guides/development/custom-builds.html

1、 Clone ckeditor5-build-classic stable branch to local


2、 CD to ckeditor5-build-classic and install ckeditor5-ajax-upload

```
npm install -D ckeditor5-ajax-upload
```

3、 add this plugin and remove the ckfinder and easyimage plugins in ckeditor.js

```javascript
// ckeditor.js

import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment'; 
import Font from '@ckeditor/ckeditor5-font/src/font'; 
import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight'; 

import AjaxUpload from 'ckeditor5-ajax-upload/src/ajaxupload'; 

export default class ClassicEditor extends ClassicEditorBase {}

// Plugins to include in the build.
ClassicEditor.builtinPlugins = [
	Essentials,
	//UploadAdapter,
	Autoformat,
	Bold,
	Italic,
	BlockQuote,
	//EasyImage,
	Heading,
	Font, 
	Highlight,
	Image,
	ImageCaption,
	ImageStyle,
	ImageToolbar,
	ImageUpload,
	Link,
	List,
	Paragraph,
	Alignment,
	AjaxUpload
];
        
```

### Usage Example

```javascript
ClassicEditor.create(document.querySelector( '#editor' ), {
    AjaxUpload: {
		url:
		headers:{ 'Authorization':'Bearer xxx' } 
        onSuccess: function(res) {
			// must return image url
			return response.url;
		},
		onFail: function(res) {
			
		}
    }
});
```