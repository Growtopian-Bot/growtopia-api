import { itemInfo } from "../src";

test('check if function returns item', async () => {
    expect(await itemInfo('angel')).toBeInstanceOf(Object)
}, 10000);