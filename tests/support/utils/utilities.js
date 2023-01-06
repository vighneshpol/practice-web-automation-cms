const find = require("lodash/find");
const fs = require('fs');
class Utilities {

    compareText(text1, text2) {
        return text1 == text2 ? true : false;
    }

    findJSON(body, key, text) {
        return find(body, (o) => {
            return o[key] === text;
        });
    }

    verifyTextLength(text) {
        return text.length > 0;
    }

    getSpecificText(text, sliceValue, wordIndex) {
        try
            {
                let slicedText = text.slice(sliceValue);
                slicedText = slicedText.split(" ");
                return slicedText[wordIndex];
            }
        catch (Err)
            {
                console.log("Index out of bounds or element not found: " + Err);
            }
    }
}

module.exports = new Utilities;