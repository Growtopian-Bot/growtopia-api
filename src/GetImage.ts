import axios from "axios";
import cheerio from "cheerio";

async function getImage(input: string): Promise<string | undefined> {

    try {
        const itemList = await axios.get("https://growtopia.fandom.com/api/v1/SearchSuggestions/List?query=" + input).then(res => res.data?.items);

        if (itemList.length === 0) return undefined;

        const itemName = itemList[0].title;
        const link = `https://growtopia.wikia.com/wiki/${itemName}`;

        const getData = await axios.get(link).then(res => res.data);
        const $ = cheerio.load(getData);

        const Sprite = $("div.card-header .growsprite > img").attr('src');
        if (!Sprite) return undefined;

        return Sprite;
    } catch (error) {
        throw error?.response;
    }
}

export default getImage