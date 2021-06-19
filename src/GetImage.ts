import axios from "axios";
import cheerio from "cheerio";

export async function getImage(input: string) {

    try {
        const itemList = await axios.get("https://growtopia.fandom.com/api/v1/SearchSuggestions/List?query=" + input).then(res => res.data?.items);

        if (itemList.length === 0) throw TypeError("Couldn't find the specified item!");

        const itemName = itemList[0].title;
        const link = `https://growtopia.wikia.com/wiki/${itemName}`;

        const getData = await axios.get(link).then(res => res.data);
        const $ = cheerio.load(getData);

        const Sprite = $("div.card-header .growsprite > img").attr('src');
        if (!Sprite) throw TypeError("Couldn't find the sprite for this item!");

        return Sprite;
    } catch (error) {
        throw error;
    }
}