import axios from 'axios';

interface Item {
    title: string
}

export async function searchItem(itemName: string) {
    try {
        const data = await axios.get("https://growtopia.fandom.com/api.php?action=query&srlimit=20&list=search&srsearch=" + itemName + "&format=json").then(res => res.data)
        if (!data) throw new TypeError("Couldn't find the specified item!");

        const filter = (item: Item) => stringContains(item.title, ['category:', 'update', 'disambiguation', 'week']) && item.title.toLowerCase().includes(itemName);
        const itemList = data.query.search;
        const items = itemList.filter(filter);

        if (!(items.length > 0)) throw new TypeError("Couldn't find the specified item!");

        const result = items.map((item: Item) => ({
            itemName: item.title,
            url: `https://growtopia.fandom.com/wiki/${item.title.replace(/ /g, "_")}`
        }))

        return result;
    } catch (error) {
        throw error;
    }
}

function stringContains(string: string, array: string[]): boolean {
    for (let i = 0; i < array.length; i++) {
        if (string.toLowerCase().includes(array[i])) {
            console.log(string);
            
            return false;
        }
    }
    return true;
}