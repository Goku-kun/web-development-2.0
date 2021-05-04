var SearchingUtility = {
    searching(input) {
        fetch(input).then(function logger(response) {
            console.log(response);
            return response;
        });
    },
};

export default SearchingUtility;
