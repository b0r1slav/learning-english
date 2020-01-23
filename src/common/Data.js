/**
 * API routes
 * 
 * words/search/{search?}
 * words/{limit}/{level?}
 * phrases/{limit}
 * exercises/search/{search?}
 * exercises/{limit}/{lesson?}
 * lessons
 */

const apiUri = 'https://summertime-sadness.herokuapp.com/api/';


export const Data = {

    get: function(uri) {
        
        return fetch(apiUri + uri)
            .then((response) => {
                return response.json();
            });
    }
};


export const Local = {

    setItem: function(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    },

    getItem: function(key) {
        return JSON.parse(localStorage.getItem(key));
    }
};