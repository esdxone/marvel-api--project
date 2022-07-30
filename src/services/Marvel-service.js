import { useHttp } from "../hooks/http.hook";

const useMarvelservice = () => {
    const {loading, request, error} = useHttp();


    const _apiPath = "https://gateway.marvel.com:443/v1/public/characters";
    const _apiKey = "8374473684477c920371c5b67c7ad2f5";
    const _baseOffset = 210;


    const getAllCharacters = async (offset = _baseOffset) => {
        const  res = await request(`${_apiPath}?limit=9&offset=${offset}&apikey=${_apiKey}`)
        return res.data.results.map(_transformChar)
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiPath}/${id}?apikey=${_apiKey}`);
        return _transformChar(res.data.results[0]);
    }

    const _transformChar = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : "Sorry, we can't find information about this character!",
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    return {getAllCharacters, getCharacter, loading, error};
}

export default useMarvelservice;
