
class Marvelservice {

    _apiPath = "https://gateway.marvel.com:443/v1/public/characters";
    _apiKey = "8374473684477c920371c5b67c7ad2f5";

     getData = async (url) => {
        const data = await fetch(url)
            .then(res => {
                if (res.ok) {
                    return res;
                } else {
                    throw new Error(`Could not feth
                    ${url}, status: ${res.status}`);
                }
            });
        return await data.json();
    };

    getAllCharacters = async () => {
        const  res = await this.getData(`${this._apiPath}?limit=9&offset=210&apikey=${this._apiKey}`)
        return res.data.results.map(this._transformChar)
    }
    getCharacter = async (id) => {
        const res = await this.getData(`${this._apiPath}/${id}?apikey=${this._apiKey}`);
        return this._transformChar(res.data.results[0]);
    }

    _transformChar = (char) => {
        let description = "";

        if (!char.description) {
            description = "Sorry, we can't find information about this character!";
        } else if (char.description.lenght > 180) {
            description = `${char.description.substring(0,180)}...`
        } else {
            description = char.description;
        }

        return {
            name: char.name,
            description: description,
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url
        }
    }
}

export default Marvelservice;
