'use strict';

/**
 * Checks shallow equality
 * Re-export of shallow from shallow-equals
 */
export { default as isShallowEqual } from 'shallow-equals';

/**
 * Takes an object and returns a shallow copy without any keys
 * that fail the passed in filter function.
 * Does not modify the passed in object.
 *
 * @param  {object} obj regular javascript object
 * @return {object}     regular javascript object without null values or empty strings
 */
export function sanitize(obj, filterFn) {
    if (!filterFn) {
        // By matching null with a double equal, we can match undefined and null
        // http://stackoverflow.com/a/15992131
        filterFn = (val) => val == null || val === '';
    }

    return omitFromObject(obj, filterFn);
}

/**
 * Removes all falsy values (undefined, null, false, ...) from a list/array
 * @param  {array} l the array to sanitize
 * @return {array}   the sanitized array
 */
export function sanitizeList(l) {
    let sanitizedList = [];

    for(let i = 0; i < l.length; i++) {
        if(l[i]) {
            sanitizedList.push(l[i]);
        }
    }

    return sanitizedList;
}

/**
 * Sums up a list of numbers. Like a Epsilon-math-kinda-sum...
 */
export function sumNumList(l) {
    let sum = 0;
    l.forEach((num) => sum += parseFloat(num) || 0);
    return sum;
}

/*
    Taken from http://stackoverflow.com/a/4795914/1263876
    Behaves like C's format string function
*/
export function formatText() {
    let args = arguments,
    string = args[0],
    i = 1;
    return string.replace(/%((%)|s|d)/g, (m) => {
        // m is the matched format, e.g. %s, %d
        let val = null;
        if (m[2]) {
            val = m[2];
        } else {
            val = args[i];
            // A switch statement so that the formatter can be extended. Default is %s
            switch (m) {
                case '%d':
                    val = parseFloat(val);
                    if (isNaN(val)) {
                        val = 0;
                    }
                    break;
            }
            i++;
        }
        return val;
    });
}

/**
 * Checks a list of objects for key duplicates and returns a boolean
 */
function _doesObjectListHaveDuplicates(l) {
    let mergedList = [];

    l = l.map((obj) => {
        if(!obj) {
            throw new Error('The object you are trying to merge is null instead of an empty object');
        }

        return Object.keys(obj);
    });

    // Taken from: http://stackoverflow.com/a/10865042
    // How to flatten an array of arrays in javascript.
    // If two objects contain the same key, then these two keys
    // will actually be represented in the merged array
    mergedList = mergedList.concat.apply(mergedList, l);

    // Taken from: http://stackoverflow.com/a/7376645/1263876
    // By casting the array to a set, and then checking if the size of the array
    // shrunk in the process of casting, we can check if there were any duplicates
    return new Set(mergedList).size !== mergedList.length;
}

/**
 * Takes a list of object and merges their keys to one object.
 * Uses mergeOptions for two objects.
 * @param  {[type]} l [description]
 * @return {[type]}   [description]
 */
export function mergeOptions(...l) {
    // If the objects submitted in the list have duplicates,in their key names,
    // abort the merge and tell the function's user to check his objects.
    if (_doesObjectListHaveDuplicates(l)) {
        throw new Error('The objects you submitted for merging have duplicates. Merge aborted.');
    }

    return Object.assign({}, ...l);
}

/**
 * In place update of a dictionary
 */
export function update(a, ...l) {
    for(let i = 0; i < l.length; i++) {
        for (let attrname in l[i]) {
            a[attrname] = l[i][attrname];
        }
    }

    return a;
}

/**
 * Escape HTML in a string so it can be injected safely using
 * React's `dangerouslySetInnerHTML`
 *
 * @param s the string to be sanitized
 *
 * Taken from: http://stackoverflow.com/a/17546215/597097
 */
export function escapeHTML(s) {
    return document.createElement('div').appendChild(document.createTextNode(s)).parentNode.innerHTML;
}

/**
 * Returns a copy of the given object's own and inherited enumerable
 * properties, omitting any keys that pass the given filter function.
 */
function applyFilterOnObject(obj, filterFn) {
    const filteredObj = {};

    for (let key in obj) {
        const val = obj[key];
        if (filterFn == null || !filterFn(val, key)) {
            filteredObj[key] = val;
        }
    }

    return filteredObj;
}

/**
 * Abstraction for selectFromObject and omitFromObject
 * for DRYness
 * @param {boolean} isInclusion True if the filter should be for including the filtered items
 *                              (ie. selecting only them vs omitting only them)
 */
function filterFromObject(obj, filter, { isInclusion = true } = {}) {
    if (filter && filter.constructor === Array) {
        return applyFilterOnObject(obj, isInclusion ? ((_, key) => filter.indexOf(key) < 0)
                                                    : ((_, key) => filter.indexOf(key) >= 0));
    } else if (filter && typeof filter === 'function') {
        // Flip the filter fn's return if it's for inclusion
        return applyFilterOnObject(obj, isInclusion ? (...args) => !filter(...args)
                                                    : filter);
    } else {
        throw new Error('The given filter is not an array or function. Exclude aborted');
    }
}

/**
 * Similar to lodash's _.pick(), this returns a copy of the given object's
 * own and inherited enumerable properties, selecting only the keys in
 * the given array or whose value pass the given filter function.
 * @param  {object}         obj    Source object
 * @param  {array|function} filter Array of key names to select or function to invoke per iteration
 * @return {object}                The new object
*/
export function selectFromObject(obj, filter) {
    return filterFromObject(obj, filter);
}

/**
 * Similar to lodash's _.omit(), this returns a copy of the given object's
 * own and inherited enumerable properties, omitting any keys that are
 * in the given array or whose value pass the given filter function.
 * @param  {object}         obj    Source object
 * @param  {array|function} filter Array of key names to omit or function to invoke per iteration
 * @return {object}                The new object
*/
export function omitFromObject(obj, filter) {
    return filterFromObject(obj, filter, { isInclusion: false });
}

/**
 * Recursively tests an object against a "match" object to see if the
 * object is similar to the "match" object. In other words, this will
 * deeply traverse the "match" object's properties and check them
 * against the object by using the testFn.
 *
 * The object is considered a match if all primitive properties in the
 * "match" object are found and accepted in the object by the testFn.
 *
 * @param  {object}     obj    Object to test
 * @param  {object}     match  "Match" object to test against
 * @param  {(function)} testFn Function to use on each property test.
 *                             Return true to accept the match.
 *                             By default, applies strict equality using ===
 * @return {boolean}           True if obj matches the "match" object
 */
export function deepMatchObject(obj, match, testFn = (objProp, matchProp) => objProp === matchProp) {
    if (typeof match !== 'object') {
        throw new Error('Your specified match argument was not an object');
    }
    if (typeof testFn !== 'function') {
        throw new Error('Your specified test function was not a function');
    }

    return Object
            .keys(match)
            .reduce((result, matchKey) => {
                if (!result) { return false; }

                const objProp = obj && obj[matchKey];
                const matchProp = match[matchKey];

                if (typeof matchProp === 'object') {
                    return (typeof objProp === 'object') ? deepMatchObject(objProp, matchProp, testFn)
                                                         : false;
                } else {
                    return testFn(objProp, matchProp);
                }
            }, true);
}

/**
 * Takes a string and breaks it at the supplied index and replaces it
 * with a (potentially) short string that also has been provided
 * @param  {string} text        The string to truncate
 * @param  {number} charIndex   The char number at which the text should be truncated
 * @param  {String} replacement All text after charIndex will be replaced with this string
 * @return {string}             The truncated text
 */
export function truncateTextAtCharIndex(text, charIndex, replacement = '...') {
    let truncatedText = '';

    truncatedText = text.slice(0, charIndex);
    truncatedText += text.length > charIndex ? replacement : '';

    return truncatedText;
}

/**
 * @param index, int, the starting index of the substring to be replaced
 * @param character, substring to be replaced
 * @returns {string}
 */
export function replaceSubstringAtIndex(baseString, substrToReplace, stringToBePut) {
    let index = baseString.indexOf(substrToReplace);
    return baseString.substr(0, index) + stringToBePut + baseString.substr(index + substrToReplace.length);
}

/**
 * Extracts the user's subdomain from the browser's window.
 * If no subdomain is found (for example on a naked domain), the default "www" is just assumed.
 * @return {string} subdomain as a string
 */
export function getSubdomain() {
    let { host } = window.location;
    let tokens = host.split('.');
    return tokens.length > 2 ? tokens[0] : 'www';
}

/**
 * Takes two lists and returns their intersection as a list
 * @param  {Array} a
 * @param  {Array} b
 * @return {[Array]} Intersected list of a and b
 */
export function intersectLists(a, b) {
    return a.filter((val) => b.indexOf(val) > -1);
}
