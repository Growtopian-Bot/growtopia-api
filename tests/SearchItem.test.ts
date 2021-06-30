import { searchItem } from "../src";

test('check if function returns item', async () => {
    const items = await searchItem("angel of mercy's wings");
    expect(items[0]).toMatchObject({
        itemName: "Angel of Mercy's Wings",
        url: "https://growtopia.fandom.com/wiki/Angel_of_Mercy's_Wings"
    })
}, 10000);