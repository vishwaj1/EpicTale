/**
 * utility to process JSON strings and handle common parsing errors
 * attempts strict parsing,  on failure, applies fixes for common errors
 */

const lenientJsonParse = (json: string): any => {
    let fixedJson = json;

    // add double quotes around unquoted property names
    fixedJson = fixedJson.replace(/(\s*{?\s*)(?<!")(\w+)(?!")(\s*:)/g, '$1"$2"$4');

    // remove newline characters that might break JSON
    fixedJson = fixedJson.replace(/\\n|\n/g, '');

    // remove trailing commas before closing braces or brackets
    fixedJson = fixedJson.replace(/,\s*(}|])/g, '$1');

    // add more fixes here

    try {
        return JSON.parse(fixedJson);
    } catch (error) {
        console.error('Failed to parse JSON after applying fixes:', error);
        return { error: error.message };
    }
};

const processJson = <T>(jsonString: string): T => {
    let parsedObject;

    // standard parsing
    try {
        parsedObject = JSON.parse(jsonString);
    } catch (error) {
        console.warn('Strict JSON parsing failed. Falling back to lenient parsing.');
        parsedObject = lenientJsonParse(jsonString);
    }

    // if parsing failed even with lenient parsing
    if ('error' in parsedObject) {
        throw new Error('Failed to parse JSON: ' + parsedObject.error);
    }

    // typecast parsedObject and return
    return parsedObject as T;
};

export default processJson;
