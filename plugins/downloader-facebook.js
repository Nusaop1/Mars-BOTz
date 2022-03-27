import axios from 'axios'
import { facebookdl, facebookdlv2 } from '@bochilteam/scraper'
let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `Use example ${usedPrefix}${command} https://fb.watch/azFEBmFRcy/`
    const { result } = await facebookdl(args[0]).catch(async _ => await facebookdlv2(args[0]))
    for (const { url, isVideo } of result.reverse()) conn.sendFile(m.chat, url, `facebook.${!isVideo ? 'bin' : 'mp4'}`, `*Url:* ${await shortlink(url)}`, m)
}
handler.help = ['facebbok'].map(v => v + ' <url>')
handler.tags = ['downloader']

handler.command = /^((facebook|fb)(downloder|dl)?)$/i

export default handler

async function shortlink(url){
const isurl = /https?:\/\//.test(url)
return isurl ? (await axios.get('https://tinyurl.com/api-create.php?url='+encodeURIComponent(url))).data : ''}
