import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import FileRepository from '@ckeditor/ckeditor5-upload/src/filerepository';

import Adapter from './adapter';

export default class AjaxUpload extends Plugin {

    static get requires() {
        return [FileRepository];
    }

    static get pluginName() {
        return 'AjaxUpload';
    }

    init() {
        const uploadModel = this.editor.config.get('AjaxUpload');
		
        if (!uploadModel) {
            console.warn('AjaxUpload is not configured')
            return;
        }

        this.editor.plugins.get('FileRepository').createUploadAdapter = loader => new Adapter(loader, uploadModel);
    }
}
