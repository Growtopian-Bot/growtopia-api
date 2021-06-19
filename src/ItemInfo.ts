import axios from "axios";
import cheerio from "cheerio";

interface DataList {
    Description?: string,
    Properties?: string[],
    Sprite?: string,
    Color?: string,
    Rarity?: number,
    Recipe?: object,
    Splice?: string,
    Info?: string,
    matches?: string[]
}

interface Item {
    title: string
}

export async function itemInfo(nameItem: string) {
    try {
        const itemList = await axios.get("https://growtopia.fandom.com/api/v1/SearchSuggestions/List?query=" + nameItem).then(res => res.data?.items);

        if (itemList.length === 0) throw TypeError("Couldn't find the specified item!");

        const itemName = itemList[0].title;
        const link = `https://growtopia.wikia.com/wiki/${itemName}`;

        const getData = await axios.get(link).then(res => res.data);
        const $ = cheerio.load(getData);

        const Description = $(".card-text").first().text()
        const Properties = $("#mw-content-text > div > div.gtw-card.item-card > div:nth-child(4)").text()
        const Sprite = $("div.card-header .growsprite > img").attr('src');
        const Color = $(".seedColor > div").text()
        const Rarity = $(".card-header b > small").text()
        const Recipe = $("div.recipebox table.content").first().text().trim().split(/[\r\n\x0B\x0C\u0085\u2028\u2029]+/)
        const Splice = $(".bg-splice").text()
        const Info = $("#mw-content-text > div > p:nth-child(3)").text()

        const dataList: DataList = {};
        const RecipeHeader = Recipe.shift() || '';
        if (Description) dataList.Description = Description;
        if (Recipe && Recipe.length > 0) dataList.Recipe = {
            type: RecipeHeader,
            recipe: Recipe
        }
        if (Sprite) dataList.Sprite = Sprite;
        if (Color) dataList.Color = Color;
        if (Rarity) dataList.Rarity = parseInt(Rarity);
        if (Splice) dataList.Splice = Splice;
        if (Info) dataList.Info = Info;
        if (Properties.replace(/T/g, "\nT").length > 0) dataList.Properties = Properties.split('.')


        if (itemList.length > 1 && nameItem.toLowerCase() !== itemName.toLowerCase()) {
            const matches = itemList.map((i: Item) => i.title);            
            dataList.matches = matches;
        }

        return dataList;

    } catch (error) {
        throw error;
    }
}