export default class Adapter {
    constructor(loader, uploadModel) {
        this.loader = loader;
        this.uploadModel = uploadModel;
    }

    upload() {
        return new Promise((resolve, reject) => {
            this._initRequest();
            this._initListeners(resolve, reject);
            this._sendRequest();
        });
    }

    abort() {
        if (this.xhr) {
            this.xhr.abort();
        }
    }

    _initRequest() {
        const xhr = this.xhr = new XMLHttpRequest();
		
		let url = this.uploadModel.url;
		let headers = null;
		if (typeof(this.uploadModel) === 'object'){
			url=this.uploadModel.url;
			headers = this.uploadModel.headers;
		}

        xhr.withCredentials = true;
        xhr.open('POST', url, true);
		if (headers !== null){
			for(let key in headers){
				if (typeof(headers[key]) === 'function'){
					xhr.setRequestHeader(key, headers[key]());
				}else{
					xhr.setRequestHeader(key, headers[key]);
				}
			}
		}
		
        xhr.responseType = 'json';
    }

    _initListeners(resolve, reject) {
		let successCallback = this.uploadModel.onSuccess;
		let failCallback = this.uploadModel.onFail;
		
        const xhr = this.xhr;
        const loader = this.loader;

        xhr.addEventListener('error', () => {
			const response = xhr.response;
			if(failCallback) {
				return reject(failCallback(xhr.response))
			} else {
				console.error(response);
			}
		});
        xhr.addEventListener('abort', () => reject());
        xhr.addEventListener('load', () => {
            const response = xhr.response;
		    if(successCallback) {
				return resolve({
                    default: successCallback(xhr.response)
                });
			} else {
				resolve({
					default: response.url
				});
			}
        });

        if (xhr.upload) {
            xhr.upload.addEventListener('progress', evt => {
                if (evt.lengthComputable) {
                    loader.uploadTotal = evt.total;
                    loader.uploaded = evt.loaded;
                }
            });
        }
    }
	

    _sendRequest() {
        const data = new FormData();
        data.append('upload', this.loader.file);
        this.xhr.send(data);
    }
}
