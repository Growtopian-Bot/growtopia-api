import * as moment from 'moment-timezone'
import axios from 'axios'

interface ServerStatus {
    date: string;
    time: string;
    playerCount: number;
    wotdName: string;
    wotdURL: string;
}

async function serverStatus(): Promise<ServerStatus> {
    const growtopiaTime = moment().tz("America/New_York");

    try {
        const res = await axios.get("https://www.growtopiagame.com/detail").then(res => res.data);
        const playerCount = parseInt(res.online_user);
        const wotdURL = res.world_day_images.full_size;
        const wotdName = wotdURL.slice(wotdURL.lastIndexOf("/") + 1, wotdURL.lastIndexOf(".")).toUpperCase();

        return {
            date: growtopiaTime.format("MMM Do"),
            time: growtopiaTime.format("h:mm:ss"),
            playerCount,
            wotdName,
            wotdURL,
        }

    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error?.response;
        } else {
            throw error;
        }
    }
}

export default serverStatus