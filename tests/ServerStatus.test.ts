import { serverStatus } from "../src";

test('check if function returns item', async () => {
    const obj = await serverStatus();
    expect(obj.playerCount).not.toBeNaN();
}, 10000);