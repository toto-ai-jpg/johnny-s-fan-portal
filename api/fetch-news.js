import Parser from 'rss-parser';
import { createClient } from '@supabase/supabase-js';

const parser = new Parser();
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
);

const RSS_FEEDS = [
  'https://natalie.mu/music/feed/news',
  'https://www.oricon.co.jp/rss/news/',
  'https://www.barks.jp/rss/news.rdf',
];

const GROUP_KEYWORDS = {
  snowman:  ['Snow Man','スノーマン','岩本照','深澤辰哉','ラウール','渡辺翔太','向井康二','阿部亮平','佐久間大介','宮舘涼太','目黒蓮'],
  sixtones: ['SixTONES','ジェシー','京本大我','松村北斗','髙地優吾','田中樹','森本慎太郎'],
  kinpri:   ['King & Prince','キンプリ','髙橋海人','永瀬廉'],
  naniwa:   ['なにわ男子','大西流星','道枝駿佑','高橋恭平','西畑大吾','長尾謙杜','藤原丈一郎','玉川聡一'],
  travis:   ['Travis Japan','松倉海斗','中村海人','七五三掛龍也','川島如恵留','宮近海斗','吉澤閑也','元太'],
  hsj:      ['Hey! Say! JUMP','山田涼介','知念侑李','岡本圭人','中島裕翔'],
  kisumai:  ['Kis-My-Ft2','キスマイ','藤ヶ谷太輔','玉森裕太','千賀健永'],
  timelesz: ['timelesz','菊池風磨','佐藤勝利','松島聡'],
  west:     ['WEST.','ジャニーズWEST','重岡大毅','桐山照史'],
  ae:       ['Aぇ! group','末澤誠也','佐野晶哉','正門良規'],
  s8:       ['SUPER EIGHT','スーパーエイト','村上信五','横山裕'],
  news:     ['NEWS','増田貴久','小山慶一郎','加藤シゲアキ'],
  domoto:   ['DOMOTO','KinKi Kids','堂本光一','堂本剛'],
  numberi:  ['Number_i','平野紫耀','神宮寺勇太','岸優太'],
  imp:      ['IMP.','佐藤新','影山拓也','鈴木大河'],
  cs7:      ['CLASS SEVEN','大東立樹'],
  miyake:   ['三宅健'],
  kitayama: ['北山宏光'],
};

function detectGroup(text) {
  for (const [id, keywords] of Object.entries(GROUP_KEYWORDS)) {
    if (keywords.some(kw => text.includes(kw))) return id;
  }
  return null;
}

function detectTag(text) {
  if (/ライブ|コンサート|ツアー|公演/.test(text)) return 'ライブ';
  if (/映画/.test(text)) return '映画';
  if (/発売|リリース|シングル|アルバム|配信/.test(text)) return 'リリース';
  if (/ドラマ/.test(text)) return 'ドラマ';
  if (/舞台|ミュージカル/.test(text)) return '舞台';
  if (/バラエティ|番組|出演/.test(text)) return 'バラエティ';
  return 'その他';
}

export default async function handler(req, res) {
  const auth = req.headers.authorization;
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  let inserted = 0;
  const errors = [];

  for (const feedUrl of RSS_FEEDS) {
    try {
      const feed = await parser.parseURL(feedUrl);
      for (const item of feed.items.slice(0, 30)) {
        const text = `${item.title || ''} ${item.contentSnippet || ''}`;
        const groupId = detectGroup(text);
        if (!groupId) continue;

        const { data: existing } = await supabase
          .from('news').select('id').eq('url', item.link).maybeSingle();
        if (existing) continue;

        const { error } = await supabase.from('news').insert({
          group_id: groupId,
          title:    item.title,
          body:     item.contentSnippet || item.title,
          tag:      detectTag(text),
          source:   feed.title || 'ニュース',
          url:      item.link,
          pub_date: item.pubDate || new Date().toISOString(),
        });

        if (error) errors.push(error.message);
        else inserted++;
      }
    } catch (e) {
      errors.push(`${feedUrl}: ${e.message}`);
    }
  }

  return res.status(200).json({ inserted, errors });
}
