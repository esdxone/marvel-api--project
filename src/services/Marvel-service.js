import { useHttp } from "../hooks/http.hook";

const useMarvelservice = () => {
    const {loading, request, error, clearError} = useHttp();


    const _charPath = "https://gateway.marvel.com:443/v1/public/characters";
    const _comicsPath = "https://gateway.marvel.com:443/v1/public/comics";
    const _apiKey = "8374473684477c920371c5b67c7ad2f5";
    const _baseOffset = 210;


    const getAllCharacters = async (offset = _baseOffset) => {
        const  res = await request(`${_charPath}?limit=9&offset=${offset}&apikey=${_apiKey}`)
        return res.data.results.map(_transformChar)
    }

    const getCharacter = async (id) => {
        const res = await request(`${_charPath}/${id}?apikey=${_apiKey}`);
        return _transformChar(res.data.results[0]);
    }

    const getCharacterbyName = async (name) => {
        const res = await request(`${_charPath}?name=${name}&apikey=${_apiKey}`);
        return res.data.results.map(_transformChar);
    }

    const getAllComics = async(offset = _baseOffset) => {
        const res = await request(`${_comicsPath}?format=comic&formatType=comic&&orderBy=title&offset=${offset}&limit=8&apikey=${_apiKey}`);
        return res.data.results.map(_transformComics);
    }

    const getComics = async (id) => {
        const res = await request(`${_comicsPath}/${id}?apikey=${_apiKey}`);
        return _transformComics(res.data.results[0]);
    }


    const _transformChar = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : "Sorry, we can't find information about this character!",
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items,
        }
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            name: comics.title,
            description: comics.description ? comics.description : "Sorry, we can't find information about this character!",
            thumbnail: `${comics.thumbnail.path}.${comics.thumbnail.extension}`,
            price: comics.prices[0].price === 0 ? 'Sold out' : `${comics.prices[0].price}$`,
            pageCount: comics.pageCount,
            language: comics.textObjects[0].language
        }
    }



    return {getAllCharacters, getCharacter, getCharacterbyName, getAllComics, getComics, clearError, loading, error};
}

export default useMarvelservice;
