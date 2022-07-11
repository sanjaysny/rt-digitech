const Busboy = require('busboy');

class BusBoyRequestFormatter {
    /**
    *   This function is for converting form data into JSON like object
    *   @param {Object} request  The http request object
    *   @return {Object} The converted request body from formData to Object
    */
    static getRequestBody(request) {
        const bus_boy = Busboy({
            headers: {
                ...request.headers,
                'content-type': request.headers['Content-Type'] ? request.headers['Content-Type'] : request.headers['content-type']
            }
        });

        return new Promise((resolve, reject) => {
            const body = {};
            bus_boy.on('file', (fieldname, file, meta) => {
                file.on('data', data => {
                    body[fieldname] = body[fieldname] || {}
                    body[fieldname].content = data;
                });

                file.on('end', () => {
                    body[fieldname].filename = meta.filename;
                    body[fieldname].mimeType = meta.mimeType;
                    body[fieldname].encoding = meta.encoding;
                });
            });

            bus_boy.on('field', (name, val) => {
                body[name] = val;
            });

            bus_boy.on('error', error => reject(error));
            bus_boy.on('close', () => {
                resolve(body)
            });
            bus_boy.write(request.body, request.isBase64Encoded ? 'base64' : 'binary');
            bus_boy.end();
        });
    }
}
module.exports = BusBoyRequestFormatter;