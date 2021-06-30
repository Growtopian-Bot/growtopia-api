import { getImage } from "../src";

test('check if returns sprite url', async () => {
    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
    const regex = new RegExp(expression);
    expect(await getImage('angel')).toMatch(regex);
}, 10000);