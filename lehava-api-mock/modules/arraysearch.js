const Search = (nameKey, valueKey, Arr) => {
    for (var index = 0; index < Arr.length; index++) {
        if (Arr[index][nameKey] === valueKey) {
            return index;
        }
    }
}

module.exports = Search;