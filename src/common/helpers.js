import { Local } from './Data';

export const getMp3 = (word) => `https://b0r1slav.github.io/pronunciation/mp3/${word}.mp3`;


export const playMp3 = (str='') => {
    const sound = Local.getData('sound');

    if (sound) {
        let mp3Name = str.trim().toLowerCase().replace(/[^a-zA-Z]+/, '_');
        let audio = new Audio(getMp3(mp3Name));

        audio.play();
    }
};


export const myUrl = {

    setParams: function (url, params = {}) {
        let uri = new URL(url);
        uri.search = new URLSearchParams(params);

        return uri;
    }
};