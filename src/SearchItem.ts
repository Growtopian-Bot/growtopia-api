import axios from 'axios';

interface Item {
    title: string
}

interface ISearchItem {
    [index: number]: { itemName: string, url: string }
}

async function searchItem(itemName: string): Promise<ISearchItem> {
    try {
        const data = await axios.get("https://growtopia.fandom.com/api.php?action=query&srlimit=20&list=search&srsearch=" + itemName + "&format=json").then(res => res.data)        
        if (!data) return [];

        const filter = (item: Item) => stringContains(item.title, ['category:', 'update', 'disambiguation', 'week']) && item.title.toLowerCase().includes(itemName);
        const itemList = data.query.search;
        const items = itemList.filter(filter);

        if (!(items.length > 0)) return [];

        const result = items.map((item: Item) => ({
            itemName: item.title,
            url: `https://growtopia.fandom.com/wiki/${item.title.replace(/ /g, "_")}`
        }))

        return result;
    } catch (error) {
        throw error?.response;
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

export default searchItem