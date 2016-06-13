import Q from 'q';
import SparkMD5 from 'spark-md5';
import Moment from 'moment';

import { getLangText } from './lang';

// Re-export related utilities from js-utility-belt for easier access
export { extractFileExtensionFromString, extractFileExtensionFromUrl } from 'js-utility-belt/es6/file';

/**
 * Takes a file Object, computes the MD5 hash and returns the URL of the textfile with the hash
 *
 * @param  {File}   file javascript File object
 * @return {string}      regular javascript string
 */
export function computeHashOfFile(file) {
    return Q.Promise((resolve, reject, notify) => {
        const blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
        const chunkSize = 2097152; // Read in chunks of 2MB
        const chunks = Math.ceil(file.size / chunkSize);
        const spark = new SparkMD5.ArrayBuffer();
        const fileReader = new FileReader();
        const startTime = new Moment();
        let currentChunk = 0;

        // comment: We should convert this to es6 at some point, however if so please consider that
        // an arrow function will get rid of the function's scope...
        fileReader.onload = (e) => {
            // console.log('read chunk nr', currentChunk + 1, 'of', chunks);
            spark.append(e.target.result); // Append array buffer
            currentChunk++;

            if (currentChunk < chunks) {
                loadNext();
            } else {
                const fileHash = spark.end();

                console.info('computed hash %s (took %d s)',
                    fileHash,
                    Math.round(((new Moment() - startTime) / 1000) % 60)); // Compute hash

                resolve(makeTextFile(fileHash, file));
            }
        };

        fileReader.onerror = () => {
            reject(new Error(getLangText("We weren't able to hash your file locally. Try to " +
                                         'upload it manually or consider contact us.')));
        };

        function loadNext() {
            const start = currentChunk * chunkSize;
            const end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;

            // send progress
            // Due to the fact that progressHandler and notify are going to be removed in v2
            // of Q, the functionality of throwing errors in the progressHandler will not be implemented
            // anymore. To still be able to throw an error however, we can just expose the promise's reject
            // method to the .progress function to stop the execution immediately.
            notify({
                progress: start / file.size,
                reject
            });

            fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
        }

        loadNext();
    });
}

/**
 * Takes a string, creates a text file and returns the URL
 *
 * @param  {string} text regular javascript string
 * @return {string}      regular javascript string
 */
function makeTextFile(text, file) {
    const textFileBlob = new Blob([text], { type: 'text/plain' });
    const textFile = new File([textFileBlob], `hash-of-${file.name}.txt`, {
        lastModifiedDate: file.lastModifiedDate,
        lastModified: file.lastModified,
        type: 'text/plain'
    });

    return textFile;
}
