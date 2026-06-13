import { useState, useEffect } from "react";
import PROFILES from "./profiles.js";
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
);

// ─── 管理者パスワード（変更可能）────────────────────────
const ADMIN_PASSWORD = "starto2026";

// ─── NGワードリスト ───────────────────────────────────
const NG_WORDS = [
  "死ね","死んで","殺す","殺して","氏ね","ゴミ","クズ","カス",
  "消えろ","うせろ","キモい","きもい","ブス","デブ","ブサイク",
  "最悪","最低","嫌い","むかつく","うざい","うざ",
  "個人情報","住所","電話番号","LINE ID","SNS ID",
];

// 連投制限（秒）
const RATE_LIMIT_SEC = 30;

// ─── グループ定義 ─────────────────────────────────────
const GROUPS = [
  { id:"snowman",  agency:"STARTO", name:"Snow Man",        color:"#64B5F6", emoji:"❄️", members:["岩本照","深澤辰哉","ラウール","渡辺翔太","向井康二","阿部亮平","佐久間大介","宮舘涼太","目黒蓮"] },
  { id:"sixtones", agency:"STARTO", name:"SixTONES",        color:"#FFB300", emoji:"🎸", members:["ジェシー","京本大我","松村北斗","髙地優吾","田中樹","森本慎太郎"] },
  { id:"kinpri",   agency:"STARTO", name:"King & Prince",   color:"#F48FB1", emoji:"👑", members:["髙橋海人","永瀬廉"] },
  { id:"naniwa",   agency:"STARTO", name:"なにわ男子",      color:"#69F0AE", emoji:"🌟", members:["大西流星","道枝駿佑","高橋恭平","西畑大吾","長尾謙杜","藤原丈一郎","玉川聡一"] },
  { id:"travis",   agency:"STARTO", name:"Travis Japan",    color:"#CE93D8", emoji:"🎭", members:["松倉海斗","中村海人","七五三掛龍也","川島如恵留","宮近海斗","吉澤閑也","元太"] },
  { id:"hsj",      agency:"STARTO", name:"Hey! Say! JUMP",  color:"#4DD0E1", emoji:"🚀", members:["山田涼介","知念侑李","岡本圭人","中島裕翔","有岡大貴","高木雄也","伊野尾慧","八乙女光","薮宏太"] },
  { id:"kisumai",  agency:"STARTO", name:"Kis-My-Ft2",      color:"#81C784", emoji:"⛸️", members:["藤ヶ谷太輔","玉森裕太","千賀健永","宮田俊哉","二階堂高嗣","横尾渉"] },
  { id:"timelesz", agency:"STARTO", name:"timelesz",        color:"#F06292", emoji:"⏳", members:["菊池風磨","佐藤勝利","松島聡","寺西拓人","原嘉孝","橋本将生","猪俣周杜","篠塚大輝"] },
  { id:"abcz",     agency:"STARTO", name:"A.B.C-Z",         color:"#FFD54F", emoji:"🎪", members:["河合郁人","戸塚祥太","五関晃一","橋本良亮","塚田僚一"] },
  { id:"west",     agency:"STARTO", name:"WEST.",           color:"#AED581", emoji:"🌊", members:["重岡大毅","桐山照史","中間淳太","小瀧望","藤井流星","神山智洋","濵田崇裕"] },
  { id:"ae",       agency:"STARTO", name:"Aぇ! group",      color:"#FF7043", emoji:"🔥", members:["末澤誠也","佐野晶哉","小島健","草間リチャード敬太","福本大晴","正門良規"] },
  { id:"s8",       agency:"STARTO", name:"SUPER EIGHT",     color:"#FF8A65", emoji:"∞",  members:["横山裕","村上信五","丸山隆平","安田章大","大倉忠義"] },
  { id:"news",     agency:"STARTO", name:"NEWS",            color:"#4DB6AC", emoji:"📰", members:["増田貴久","小山慶一郎","加藤シゲアキ"] },
  { id:"domoto",   agency:"STARTO", name:"DOMOTO",          color:"#9575CD", emoji:"🎹", members:["堂本光一","堂本剛"] },
  { id:"20thc",    agency:"STARTO", name:"20th Century",    color:"#7986CB", emoji:"🌙", members:["坂本昌行","長野博","井ノ原快彦"] },
  { id:"kimura",   agency:"STARTO", name:"木村拓哉",        color:"#90A4AE", emoji:"⭐", members:["木村拓哉"], solo:true },
  { id:"numberi",  agency:"TOBE",   name:"Number_i",        color:"#FF4444", emoji:"🔢", members:["平野紫耀","神宮寺勇太","岸優太"] },
  { id:"imp",      agency:"TOBE",   name:"IMP.",            color:"#FF8C42", emoji:"✦",  members:["佐藤新","影山拓也","鈴木大河","基俊介","椿泰我","横原悠毅","松井奏"] },
  { id:"cs7",      agency:"TOBE",   name:"CLASS SEVEN",     color:"#A78BFA", emoji:"🌠", members:["大東立樹","髙野秀侑","高田憐","近藤大海","横田大雅","星慧音","中澤漣"] },
  { id:"miyake",   agency:"TOBE",   name:"三宅健",          color:"#34D399", emoji:"🌿", members:["三宅健"],   solo:true },
  { id:"kitayama", agency:"TOBE",   name:"北山宏光",        color:"#60A5FA", emoji:"💫", members:["北山宏光"], solo:true },
];

// ─── 初期スレッド ─────────────────────────────────────
const mk = (id,title,tag,replies=[],ago=Math.random()*172800000) => ({id,title,tag,replies,lastUpdated:Date.now()-ago});
const rp = (id,author,userId,text,ago) => ({id,author,userId,text,ago,reported:false,hidden:false});

const INITIAL_THREADS = {
  snowman:  [mk("sm1","LIVE TOUR「MUGEN」情報・感想スレ","ライブ",[rp("r1","ゆきみ★","#f3a2","横浜初日当たった！！9列目！泣きそう😭","2時間前"),rp("r2","snowlove","#b7c1","大阪公演落選続き…誰か譲渡して泣","3時間前")]),mk("sm2","Snow Man 雑談スレ","雑談",[rp("r3","ふっか民","#2d9f","深澤くんのものまねまた見たい笑","1時間前")])],
  sixtones: [mk("st1","アリーナツアー当落スレ","ライブ",[rp("r1","りおぽん","#e15b","ドーム当選した！！！うれし🔥","1時間前"),rp("r2","きょも民","#a33c","ブロック図まだ出ない？","2時間前")]),mk("st2","SixTONES 雑談スレ","雑談",[rp("r3","こーち推し","#7f2d","最近の髙地くんトーク切れ味上がってない？","4時間前")])],
  kinpri:   [mk("kp1","ベストアルバム記念スレ","リリース",[rp("r1","かいちゃん民","#9e4a","デビューからの歴史が詰まってる…エモすぎる","5時間前")]),mk("kp2","King & Prince 雑談スレ","雑談",[rp("r2","プリンセス","#c830","2人体制の絆がどんどん深まってるよね","6時間前")])],
  naniwa:   [mk("nw1","台湾・香港公演スレ","ライブ",[rp("r1","まりん🌸","#51fa","現地行きたすぎる！","1時間前"),rp("r2","なにわLOVE","#d8b2","アジアデビューおめでとう🎉","3時間前")]),mk("nw2","なにわ男子 雑談スレ","雑談",[rp("r3","にしきー推し","#ab77","西畑くんのリーダーとしての成長がすごい","5時間前")])],
  travis:   [mk("tj1","全米ツアー応援スレ","ライブ",[rp("r1","はるか☀️","#3e9c","誰か現地レポお願い！","2時間前"),rp("r2","TJ_fan","#f02a","MSGで聴く日本語MCがエモすぎる","3時間前")]),mk("tj2","Travis Japan 雑談スレ","雑談",[rp("r3","しめかけ民","#8b4f","七五三掛くんのDJセット最高すぎた","8時間前")])],
  hsj:      [mk("hj1","東京ドーム20周年5days スレ","ライブ",[rp("r1","JUMP大好き","#7a3d","ドーム5daysは過去最大規模！","1時間前"),rp("r2","20周年感謝","#c1e0","デビューから見てる古参として感無量","4時間前")]),mk("hj2","Hey! Say! JUMP 雑談スレ","雑談",[rp("r3","ちねん推し","#4fb8","知念くんダンス動画700万再生超えた！","6時間前")])],
  numberi:  [mk("ni1","東京ドーム単独公演スレ","ライブ",[rp("r1","しょう推し","#2ca4","TOBE初ドーム単独って本当に快挙","1時間前"),rp("r2","じんくん民","#e83b","きっしーとしょうくんが同じステージを夢みたい","2時間前")]),mk("ni2","Number_i 雑談スレ","雑談",[rp("r3","きっしー推し","#9d57","きっしーのバラエティ相変わらず最高笑","7時間前")])],
  imp:      [mk("im1","初ドームツアースレ","ライブ",[rp("r1","あらちゃん推し","#5fc2","IMP.がドームか！デビューから3年で","2時間前")]),mk("im2","IMP. 雑談スレ","雑談",[rp("r2","IMPヲタ","#b319","かげちゃんのInstagramアート性高すぎ","6時間前")])],
  cs7:      [mk("cs1","デビュー「miss you」感想スレ","リリース",[rp("r1","cs7_fan","#7d2e","デビュー曲から完成度高すぎ！全員10代とは","2時間前")]),mk("cs2","CLASS SEVEN 雑談スレ","雑談",[rp("r2","new_gen","#a10c","まだ知らない人が多いけど絶対ブレイクする！","5時間前")])],
};
// その他のグループは空スレッドで初期化
GROUPS.forEach(g => { if (!INITIAL_THREADS[g.id]) INITIAL_THREADS[g.id] = [mk(`${g.id}_0`,"雑談・なんでもOKスレ","雑談",[])]; });

const TAG_COLOR = { ライブ:"#EF5350", 映画:"#EC407A", リリース:"#66BB6A", ドラマ:"#42A5F5", ファッション:"#CE93D8", 雑談:"#90A4AE", 舞台:"#AB47BC", バラエティ:"#FFA726", TV:"#42A5F5" };

function timeAgo(ts) {
  if (!ts) return "";
  const d = Date.now() - ts, m = Math.floor(d/60000);
  if (m < 1)  return "今";
  if (m < 60) return `${m}分前`;
  const h = Math.floor(m/60);
  if (h < 24) return `${h}時間前`;
  return `${Math.floor(h/24)}日前`;
}

// ─── ニュースデータ ───────────────────────────────────
const n = (id,date,title,tag,body,source,url) => ({id,date,title,tag,body,source,url});
const NEWS = {
  snowman:  [n(1,"05/10","LIVE TOUR 2026「MUGEN」開催決定！","ライブ","全国8都市14公演。チケット一般先行は5月20日スタート。横浜・大阪・名古屋・福岡ほか。","STARTO公式","https://starto.jp/"),n(2,"05/08","目黒蓮、映画「blanc」主演決定","映画","2026年秋公開。共演に石原さとみ。監督は岩井俊二。","映画.com","https://eiga.com/"),n(3,"05/05","新シングル「AURORA」6月25日発売","リリース","3形態同時発売。通常盤・初回盤A・初回盤B。","Oricon","https://www.oricon.co.jp/"),n(4,"04/30","ラウール、パリコレに初参加","ファッション","Louis Vuitton 2026SSショーにゲスト出演。世界中で話題に。","WWD JAPAN","https://www.wwdjapan.com/"),n(5,"05/13","VS魂 出演（フジテレビ 21:00）","バラエティ","岩本照・深澤辰哉・佐久間大介の3人がVS魂に登場。圧巻のフィジカルバトルに注目。","フジテレビ","https://www.fujitv.co.jp/"),n(6,"05/20","しゃべくり007 出演（NTV 22:00）","バラエティ","全メンバー出演。新シングルPRと爆笑エピソード連発の予告あり。","日本テレビ","https://www.ntv.co.jp/"),n(7,"04/22","ダウンタウンDX 出演","バラエティ","ラウールのパリコレ秘話を初公開。向井康二のトークも炸裂。","日本テレビ","https://www.ntv.co.jp/")],
  sixtones: [n(1,"05/09","アリーナツアー2026発表","ライブ","初の単独ドームを含む全国ツアー。9月〜11月の大型公演。","STARTO公式","https://starto.jp/"),n(2,"05/07","松村北斗、NHKドラマ主演","ドラマ","「光の庭」7月放送スタート。全8話。","NHK","https://www.nhk.jp/"),n(3,"05/03","新曲「Overdrive」配信開始","リリース","7枚目のデジタルシングル。各サブスク解禁。","natalie","https://natalie.mu/music/"),n(4,"05/11","踊る！さんま御殿!! 出演（NTV）","バラエティ","6人全員で登場。髙地優吾のトーク力が爆発。田中樹のフリースタイルMCも見どころ。","日本テレビ","https://www.ntv.co.jp/"),n(5,"04/27","ダウンタウンなう 出演（フジ）","バラエティ","松村北斗・森本慎太郎が出演。普段は語らないグループ秘話を激白。","フジテレビ","https://www.fujitv.co.jp/")],
  kinpri:   [n(1,"05/11","ベストアルバム発売決定","リリース","デビューからの全シングル収録。7月21日発売。","Oricon","https://www.oricon.co.jp/"),n(2,"05/06","永瀬廉 主演映画が10億円突破","映画","「最後の夏」興収10億円突破。ロングラン上映継続中。","映画.com","https://eiga.com/"),n(3,"05/09","しゃべくり007 出演（NTV）","バラエティ","髙橋海人・永瀬廉の2人で登場。2人体制になってからの絆エピソードが話題に。","日本テレビ","https://www.ntv.co.jp/"),n(4,"04/24","踊る！さんま御殿!! 出演","バラエティ","永瀬廉がサッカー愛を語り、髙橋海人のスケートボード挑戦秘話も。","日本テレビ","https://www.ntv.co.jp/")],
  naniwa:   [n(1,"05/10","初の海外公演決定（台湾・香港）","ライブ","8月、台北アリーナ・香港コロシアムにて。アジアデビュー。","STARTO公式","https://starto.jp/"),n(2,"05/04","道枝駿佑 連続ドラマ初主演","ドラマ","フジテレビ「隣人」10月スタート。サイコスリラー挑戦。","フジテレビ","https://www.fujitv.co.jp/"),n(3,"05/08","にじいろジーン 出演（フジ）","バラエティ","大西流星・玉川聡一が台湾公演への意気込みを語る。道枝駿佑の料理腕前も披露。","フジテレビ","https://www.fujitv.co.jp/"),n(4,"04/26","しゃべくり007 出演（NTV）","バラエティ","高橋恭平のボケが止まらない45分。西畑大吾のリーダー論も話題に。","日本テレビ","https://www.ntv.co.jp/"),n(5,"04/18","週刊さんまとマツコ 出演（TBS）","バラエティ","長尾謙杜・藤原丈一郎が出演。野球少年時代の藤原のトークが爆笑を呼ぶ。","TBS","https://www.tbs.co.jp/")],
  travis:   [n(1,"05/09","全米ツアー2026開催","ライブ","LA・NY・シカゴほか全5都市。日系アイドル初の快挙。","Billboard","https://www.billboard.com/"),n(2,"05/02","「Million Dreams」米国チャート入り","リリース","Billboard Hot 100に初ランクイン。","Billboard","https://www.billboard.com/"),n(3,"05/07","ラヴィット！出演（TBS 8:00）","バラエティ","帰国直後の松倉海斗・宮近海斗が生出演。全米ツアーの舞台裏を語る。","TBS","https://www.tbs.co.jp/"),n(4,"04/21","しゃべくり007 出演（NTV）","バラエティ","七五三掛龍也のDJパフォーマンスをスタジオで披露。海外での経験談も。","日本テレビ","https://www.ntv.co.jp/")],
  hsj:      [n(1,"05/08","デビュー20周年記念 東京ドーム5days","ライブ","9月1日〜5日、東京ドーム公演決定。","STARTO公式","https://starto.jp/"),n(2,"05/05","山田涼介 主演映画 17ヶ国公開","映画","「BLADE」世界同時公開。海外メディアから絶賛の声。","映画.com","https://eiga.com/"),n(3,"05/12","踊る！さんま御殿!! 出演（NTV）","バラエティ","有岡大貴・八乙女光・伊野尾慧の3人が登場。20周年の裏話を爆笑トークで披露。","日本テレビ","https://www.ntv.co.jp/"),n(4,"04/30","ダウンタウンDX 出演","バラエティ","山田涼介が映画撮影秘話を語る。知念侑李のダンス生披露も。","日本テレビ","https://www.ntv.co.jp/"),n(5,"04/15","しゃべくり007 出演（NTV）","バラエティ","薮宏太・高木雄也・岡本圭人が出演。ロンドン育ちの圭人の衝撃エピソードが話題。","日本テレビ","https://www.ntv.co.jp/")],
  kisumai:  [n(1,"05/07","Kis-My-Ft2 デビュー15周年記念コン","ライブ","横浜アリーナ2daysを皮切りに全国ツアー開催決定。","STARTO公式","https://starto.jp/"),n(2,"04/28","新曲「HIKARI」配信開始","リリース","各サブスク同時解禁。爽やかなポップチューン。","natalie","https://natalie.mu/music/"),n(3,"05/05","キスマイBUSAIKU!? スペシャル放送","バラエティ","15周年記念の特別版。歴代名シーンを振り返りながら新企画も。","フジテレビ","https://www.fujitv.co.jp/"),n(4,"04/20","ラヴィット！出演（TBS）","バラエティ","藤ヶ谷太輔・玉森裕太・千賀健永の3人が朝から爆笑トーク。","TBS","https://www.tbs.co.jp/")],
  timelesz: [n(1,"05/10","timelesz 8人体制初ライブ開催！","ライブ","新メンバー5人を迎えた初の単独公演。東京・大阪にて。","STARTO公式","https://starto.jp/"),n(2,"04/20","新メンバー本格始動","リリース","菊池風磨が新メンバーとの新曲を初プロデュース。","natalie","https://natalie.mu/music/"),n(3,"05/06","しゃべくり007 出演（NTV）","バラエティ","菊池風磨が8人体制の舞台裏を語る。新メンバーのキャラも全開に。","日本テレビ","https://www.ntv.co.jp/"),n(4,"04/24","ダウンタウンDX 出演","バラエティ","松島聡・佐藤勝利・新メンバー2人が出演。タイプロ秘話を初公開。","日本テレビ","https://www.ntv.co.jp/")],
  west:     [n(1,"05/06","WEST. 全国アリーナツアー2026発表","ライブ","7都市14公演。10周年を超えても止まらない勢い。","STARTO公式","https://starto.jp/"),n(2,"04/25","重岡大毅 月9ドラマ主演決定","ドラマ","フジテレビ月9「夏の罪」7月スタート。ラブサスペンス。","フジテレビ","https://www.fujitv.co.jp/"),n(3,"05/09","週刊さんまとマツコ 出演（TBS）","バラエティ","重岡大毅・神山智洋が出演。月9主演秘話と大阪出身トークで爆笑。","TBS","https://www.tbs.co.jp/"),n(4,"04/28","踊る！さんま御殿!! 出演（NTV）","バラエティ","中間淳太・小瀧望・藤井流星の3人が登場。WESTお家芸の笑いが炸裂。","日本テレビ","https://www.ntv.co.jp/"),n(5,"04/12","ラヴィット！出演（TBS）","バラエティ","濵田崇裕・桐山照史がグルメ企画に参加。食への情熱を熱く語る。","TBS","https://www.tbs.co.jp/")],
  ae:       [n(1,"05/08","Aぇ! group 初の東京ドーム進出決定！","ライブ","デビュー3周年を飾る大型公演。関西発の新世代が遂に東京ドームへ。","STARTO公式","https://starto.jp/"),n(2,"04/30","新シングル「彗星」6月リリース","リリース","メンバー全員が楽曲制作に参加した渾身の一枚。","natalie","https://natalie.mu/music/"),n(3,"05/10","まる見え！スター大集合SP 出演（NTV）","バラエティ","草間リチャード敬太のぶっ飛びキャラが全国ネットに。末澤誠也のMCさばきにも注目。","日本テレビ","https://www.ntv.co.jp/"),n(4,"04/23","ラヴィット！出演（TBS）","バラエティ","佐野晶哉・正門良規・小島健が朝から大阪弁トーク。福本大晴の天然発言も話題に。","TBS","https://www.tbs.co.jp/")],
  s8:       [n(1,"05/05","SUPER EIGHT 20周年ドームツアー発表","ライブ","全4都市ドーム公演。バンドとしての集大成を見せる。","STARTO公式","https://starto.jp/"),n(2,"04/22","安田章大 ソロ写真集 発売決定","その他","ビジュアルとアートにこだわった渾身のソロ写真集。","Oricon","https://www.oricon.co.jp/"),n(3,"05/07","関ジャム 完全燃SHOW 出演（テレ朝）","バラエティ","村上信五が司会をつとめる音楽バラエティ。メンバー全員でスペシャル企画に参加。","テレビ朝日","https://www.tv-asahi.co.jp/"),n(4,"04/26","踊る！さんま御殿!! 出演（NTV）","バラエティ","横山裕・丸山隆平・大倉忠義が出演。20周年の思い出エピソードで大爆笑。","日本テレビ","https://www.ntv.co.jp/")],
  news:     [n(1,"05/06","NEWS 15周年アニバーサリーライブ発表","ライブ","東京ガーデンシアター2days。3人の絆を見せる特別公演。","STARTO公式","https://starto.jp/"),n(2,"04/18","加藤シゲアキ 新小説発売","その他","累計50万部突破の人気作家・シゲが新作を発表。","natalie","https://natalie.mu/"),n(3,"05/04","しゃべくり007 出演（NTV）","バラエティ","増田貴久・小山慶一郎・加藤シゲアキが3人で登場。シゲの作家業とアイドル業の両立秘話が話題に。","日本テレビ","https://www.ntv.co.jp/")],
  domoto:   [n(1,"05/04","DOMOTO 活動再開発表","ライブ","DOMOTO改名後初のコンサートツアー開催決定。","STARTO公式","https://starto.jp/"),n(2,"04/10","堂本光一 舞台「Endless SHOCK」再演","舞台","帝国劇場にて再演決定。30周年記念公演。","TBS","https://www.tbs.co.jp/"),n(3,"04/28","KinKi Kidsのブンブブーン 放送（フジ）","バラエティ","堂本光一・堂本剛の冠バラエティ。2人の軽快なトークと音楽愛が炸裂する名物番組。","フジテレビ","https://www.fujitv.co.jp/")],
  "20thc":  [n(1,"05/03","20th Century 単独コンサート発表","ライブ","V6解散後も続く3人の活動。Zepp全国ツアー決定。","STARTO公式","https://starto.jp/"),n(2,"04/20","オールスター感謝祭 出演（TBS）","バラエティ","坂本昌行・長野博・井ノ原快彦がクイズに挑戦。V6時代の懐かしエピソードも披露。","TBS","https://www.tbs.co.jp/")],
  abcz:     [n(1,"05/02","A.B.C-Z デビュー15周年記念ライブ","ライブ","横浜アリーナにて15周年記念公演開催決定。","STARTO公式","https://starto.jp/"),n(2,"04/25","ラヴィット！出演（TBS）","バラエティ","戸塚祥太・河合郁人が朝から爆笑トーク。アクロバット技を生披露して話題に。","TBS","https://www.tbs.co.jp/")],
  kimura:   [n(1,"05/01","木村拓哉 主演映画 全米公開決定","映画","ハリウッド映画への参加が正式発表。日本公開は秋。","映画.com","https://eiga.com/"),n(2,"04/15","グランメゾン・リターンズ 放送決定","ドラマ","人気ドラマの続編が決定。木村拓哉主演でTBS系にて放送予定。","TBS","https://www.tbs.co.jp/"),n(3,"04/08","木村拓哉のWhat's up SMAP! 特番放送","バラエティ","MBSラジオで好評の冠番組がTV特番に。木村拓哉の素顔に迫る。","MBS","https://www.mbs.jp/")],
  numberi:  [n(1,"05/12","Number_i 東京ドーム単独公演決定","ライブ","8月8日、東京ドーム単独公演。TOBE所属初のドーム単独。","TOBE公式","https://tobe-official.jp/"),n(2,"05/08","新曲「INZM」ストリーミング解禁","リリース","Spotifyグローバルチャートにも即ランクイン。","Billboard","https://www.billboard.com/"),n(3,"04/25","平野紫耀 ハリウッド映画出演決定","映画","2027年公開アクション大作に抜擢。","映画.com","https://eiga.com/"),n(4,"05/06","まつもtoなかい 出演（フジ）","バラエティ","平野紫耀・神宮寺勇太・岸優太の3人が登場。TOBE移籍後の本音を初めて語る。","フジテレビ","https://www.fujitv.co.jp/"),n(5,"04/22","ダウンタウンDX 出演","バラエティ","岸優太が天然発言連発。平野紫耀の海外挑戦秘話も初公開。","日本テレビ","https://www.ntv.co.jp/")],
  imp:      [n(1,"05/11","IMP. 初ドームツアー発表","ライブ","全4都市8公演。東京・大阪・名古屋・福岡のドーム公演。","TOBE公式","https://tobe-official.jp/"),n(2,"05/06","佐藤新、連ドラ初主演","ドラマ","TBS「境界線」9月スタート。サスペンスラブストーリー。","TBS","https://www.tbs.co.jp/"),n(3,"04/29","ラヴィット！出演（TBS）","バラエティ","佐藤新・影山拓也・基俊介の3人が出演。ドームツアーへの意気込みと素顔トーク。","TBS","https://www.tbs.co.jp/")],
  cs7:      [n(1,"07/07","CLASS SEVEN デビュー「miss you」配信！","リリース","全世界同時配信デビュー。平均年齢18歳の新世代グループ。","TOBE公式","https://tobe-official.jp/"),n(2,"05/07","初の単独ライブ発表","ライブ","8月、Zepp Tokyo にてデビュー記念ライブ。","TOBE公式","https://tobe-official.jp/"),n(3,"05/04","ZIP! 出演（NTV 朝）","バラエティ","デビュー直前の7人が初の全国放送バラエティに登場。フレッシュな素顔が人気に。","日本テレビ","https://www.ntv.co.jp/")],
  miyake:   [n(1,"05/09","三宅健 舞台「PHANTOM」帝国劇場主演","舞台","10月〜12月。ブロードウェイミュージカル日本初演。","TBS","https://www.tbs.co.jp/"),n(2,"04/20","新曲「Still Alive」配信開始","リリース","V6時代のファンも懐かしむミッドテンポのポップナンバー。","natalie","https://natalie.mu/music/"),n(3,"04/14","おしゃれイズム 出演（NTV）","バラエティ","三宅健がTOBE移籍後初のバラエティ出演。V6解散後の心境と現在の活動を語る。","日本テレビ","https://www.ntv.co.jp/")],
  kitayama: [n(1,"05/07","北山宏光 初ソロアルバム発売決定","リリース","7月発売。全14曲収録。ローラースケートライブも予定。","Oricon","https://www.oricon.co.jp/"),n(2,"04/15","舞台「DREAM BOYS 2026」主演決定","舞台","9月〜10月、帝国劇場。TOBE移籍後初の主演舞台。","TBS","https://www.tbs.co.jp/"),n(3,"04/09","しゃべくり007 出演（NTV）","バラエティ","北山宏光がローラースケートダンスの特訓秘話を語る。TOBE加入後の変化も語る。","日本テレビ","https://www.ntv.co.jp/")],
};

// ─── ユーティリティ ───────────────────────────────────
function genUserId() {
  return "#" + Math.random().toString(36).slice(2,6).toUpperCase();
}
function checkNgWords(text) {
  return NG_WORDS.find(w => text.includes(w)) || null;
}
function checkSpam(text) {
  // 同じ文字が10回以上連続
  if (/(.)\1{9,}/.test(text)) return "同じ文字の連続投稿";
  // URLスパム
  if ((text.match(/https?:\/\//g) || []).length > 2) return "URLの過剰な貼り付け";
  return null;
}
function photoUrl(name, color) {
  return `https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(name)}&backgroundColor=${color.replace("#","")}22&backgroundType=gradientLinear`;
}
// プロフィールは profiles.js から静的に取得（API不要・無料）
async function fetchMemberProfile(memberName) {
  return PROFILES[memberName] || null;
}

// ─── メンバーアバター ─────────────────────────────────
function MemberAvatar({ name, color, size=50, fontSize=18 }) {
  const [err,setErr] = useState(false);
  return (
    <div style={{width:size,height:size,borderRadius:"50%",overflow:"hidden",flexShrink:0,background:`${color}18`,border:`1.5px solid ${color}44`,display:"flex",alignItems:"center",justifyContent:"center"}}>
      {!err ? <img src={photoUrl(name,color)} alt={name} width={size} height={size} style={{borderRadius:"50%",objectFit:"cover"}} onError={()=>setErr(true)}/>
             : <span style={{fontSize,fontWeight:700,color,fontFamily:"'Noto Serif JP',serif"}}>{name[0]}</span>}
    </div>
  );
}

// ─── プロフィールモーダル ──────────────────────────────
function MemberModal({ member, groupName, color, onClose }) {
  const [profile,setProfile] = useState(null);
  const [loading,setLoading] = useState(true);
  useEffect(() => {
    fetchMemberProfile(member).then(p=>{setProfile(p);setLoading(false);}).catch(()=>setLoading(false));
  }, [member]);
  const calcAge = born => { const [y,m,d]=born.split("/").map(Number); let a=2026-y; if(new Date(2026,4,25)<new Date(2026,m-1,d))a--; return a; };
  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,zIndex:200,background:"rgba(0,0,0,0.8)",display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
      <style>{`@keyframes slideUp{from{transform:translateY(80px);opacity:0}to{transform:translateY(0);opacity:1}}@keyframes shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(250%)}}`}</style>
      <div onClick={e=>e.stopPropagation()} style={{background:"#0D1325",borderRadius:"22px 22px 0 0",width:"100%",maxWidth:480,padding:"20px 20px 48px",border:`1px solid ${color}33`,borderBottom:"none",animation:"slideUp 0.22s cubic-bezier(0.16,1,0.3,1)"}}>
        <div style={{display:"flex",justifyContent:"flex-end",marginBottom:4}}><button onClick={onClose} style={{background:"rgba(255,255,255,0.08)",border:"none",color:"rgba(255,255,255,0.7)",width:28,height:28,borderRadius:"50%",cursor:"pointer",fontSize:14}}>✕</button></div>
        <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:20}}>
          <MemberAvatar name={member} color={color} size={80} fontSize={28}/>
          <div>
            <div style={{fontFamily:"'Noto Serif JP',serif",fontSize:22,fontWeight:700,color:"#EEF0FF",lineHeight:1.2}}>{member}</div>
            {profile&&<div style={{fontSize:13,color,marginTop:5,fontWeight:600}}>「{profile.nick}」</div>}
            {profile&&<div style={{fontSize:11,color:"rgba(255,255,255,0.38)",marginTop:2}}>{profile.role}</div>}
          </div>
        </div>
        {loading&&<div style={{textAlign:"center",padding:"30px 0"}}><div style={{fontSize:12,color:"rgba(255,255,255,0.35)",marginBottom:10}}>AIがプロフィールを生成中…</div><div style={{width:40,height:3,background:`${color}22`,borderRadius:2,margin:"0 auto",overflow:"hidden"}}><div style={{width:"60%",height:"100%",background:color,borderRadius:2,animation:"shimmer 1s ease infinite"}}/></div></div>}
        {!loading&&!profile&&<div style={{textAlign:"center",padding:"20px 0",color:"rgba(255,255,255,0.4)",fontSize:13}}>取得できませんでした</div>}
        {profile&&!loading&&(
          <>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
              {[["🎂 誕生日",`${profile.born}（${calcAge(profile.born)}歳）`],["📏 身長",profile.height],["🩸 血液型",profile.blood],["📍 出身",profile.from]].map(([l,v])=>(
                <div key={l} style={{background:"rgba(255,255,255,0.04)",borderRadius:10,padding:"10px 12px",border:"1px solid rgba(255,255,255,0.06)"}}>
                  <div style={{fontSize:10,color:"rgba(255,255,255,0.32)",marginBottom:3}}>{l}</div>
                  <div style={{fontSize:13,color:"#DDE1EE",fontWeight:500,lineHeight:1.4}}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{background:"rgba(255,255,255,0.04)",borderRadius:10,padding:"10px 14px",border:"1px solid rgba(255,255,255,0.06)",marginBottom:10}}>
              <div style={{fontSize:10,color:"rgba(255,255,255,0.32)",marginBottom:3}}>✨ 特技・趣味</div>
              <div style={{fontSize:13,color:"#DDE1EE",fontWeight:500}}>{profile.skill}</div>
            </div>
            {profile.marital && (
              <div style={{background:"rgba(255,255,255,0.04)",borderRadius:10,padding:"10px 14px",border:"1px solid rgba(255,255,255,0.06)",marginBottom:10}}>
                <div style={{fontSize:10,color:"rgba(255,255,255,0.32)",marginBottom:3}}>💍 婚姻状況</div>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <span style={{fontSize:13,color:"#DDE1EE",fontWeight:600}}>{profile.marital}</span>
                  {profile.spouse && <span style={{fontSize:12,color:color,fontWeight:500}}>{profile.spouse}</span>}
                </div>
                {profile.spouseNote && <div style={{fontSize:11,color:"rgba(255,255,255,0.45)",marginTop:4,lineHeight:1.5}}>{profile.spouseNote}</div>}
              </div>
            )}
            <div style={{background:`${color}0D`,borderRadius:10,padding:"12px 14px",border:`1px solid ${color}20`,fontSize:12.5,color:"rgba(255,255,255,0.75)",lineHeight:1.75}}>{profile.tag}</div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── 管理パネル ───────────────────────────────────────
function AdminPanel({ threads, group, bannedIds, onDeletePost, onRestorePost, onBanUser, onUnban, onClose }) {
  const c = group.color;
  const [tab, setAdminTab] = useState("posts");
  const posts = (threads[group.id]||[]).flatMap(t => t.replies.map(r=>({...r, threadTitle:t.title, threadId:t.id})));

  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
      <style>{`@keyframes slideUp{from{transform:translateY(80px);opacity:0}to{transform:translateY(0);opacity:1}}`}</style>
      <div onClick={e=>e.stopPropagation()} style={{background:"#0D1325",borderRadius:"22px 22px 0 0",width:"100%",maxWidth:480,maxHeight:"80vh",display:"flex",flexDirection:"column",border:"1px solid #FF444433",borderBottom:"none",animation:"slideUp 0.22s ease"}}>
        {/* ヘッダー */}
        <div style={{padding:"16px 20px 0",borderBottom:"1px solid rgba(255,255,255,0.07)"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
            <div style={{fontSize:13,fontWeight:700,color:"#EEF0FF"}}>🔐 管理パネル — {group.name}</div>
            <button onClick={onClose} style={{background:"rgba(255,255,255,0.08)",border:"none",color:"rgba(255,255,255,0.7)",width:28,height:28,borderRadius:"50%",cursor:"pointer",fontSize:14}}>✕</button>
          </div>
          <div style={{display:"flex",gap:0}}>
            {[["posts","投稿管理"],["ban","BANリスト"]].map(([id,label])=>(
              <button key={id} onClick={()=>setAdminTab(id)} style={{flex:1,padding:"8px 4px",fontSize:12,fontWeight:tab===id?700:400,color:tab===id?"#FF4444":"rgba(255,255,255,0.4)",background:"none",border:"none",cursor:"pointer",borderBottom:`2px solid ${tab===id?"#FF4444":"transparent"}`}}>{label}</button>
            ))}
          </div>
        </div>

        <div style={{flex:1,overflowY:"auto",padding:"14px 16px 30px"}}>
          {/* 投稿管理 */}
          {tab==="posts" && (
            <div>
              <div style={{fontSize:11,color:"rgba(255,255,255,0.3)",marginBottom:12}}>全{posts.length}件の投稿 · タップで削除/BAN</div>
              {posts.length===0 && <div style={{textAlign:"center",color:"rgba(255,255,255,0.25)",padding:20,fontSize:12}}>投稿がありません</div>}
              {posts.map(post=>(
                <div key={post.id} style={{background:post.hidden?"rgba(255,68,68,0.07)":"#0F1524",border:`1px solid ${post.hidden?"rgba(255,68,68,0.2)":"rgba(255,255,255,0.06)"}`,borderRadius:10,padding:"10px 12px",marginBottom:8}}>
                  <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}>
                    <span style={{fontSize:11,fontWeight:700,color:"#EEF0FF"}}>{post.author}</span>
                    <span style={{fontSize:10,color:"rgba(255,255,255,0.35)",background:"rgba(255,255,255,0.06)",padding:"1px 6px",borderRadius:4,fontFamily:"monospace"}}>{post.userId}</span>
                    {bannedIds.includes(post.userId) && <span style={{fontSize:9,color:"#FF4444",background:"rgba(255,68,68,0.15)",padding:"1px 6px",borderRadius:4}}>BAN済み</span>}
                    <span style={{fontSize:10,color:"rgba(255,255,255,0.22)",marginLeft:"auto"}}>{post.ago}</span>
                  </div>
                  <div style={{fontSize:12,color:post.hidden?"rgba(255,255,255,0.3)":"rgba(255,255,255,0.6)",lineHeight:1.6,marginBottom:8,fontStyle:post.hidden?"italic":"normal"}}>
                    {post.hidden ? "【非表示】この投稿は削除されています" : post.text}
                  </div>
                  <div style={{fontSize:10,color:"rgba(255,255,255,0.25)",marginBottom:8}}>スレ：{post.threadTitle}</div>
                  <div style={{display:"flex",gap:6}}>
                    {!post.hidden ? (
                      <button onClick={()=>onDeletePost(group.id, post.threadId, post.id)}
                        style={{fontSize:11,padding:"4px 10px",borderRadius:6,background:"rgba(255,68,68,0.2)",border:"1px solid rgba(255,68,68,0.4)",color:"#FF4444",cursor:"pointer",fontWeight:600}}>
                        🗑 削除
                      </button>
                    ) : (
                      <button onClick={()=>onRestorePost(group.id, post.threadId, post.id)}
                        style={{fontSize:11,padding:"4px 10px",borderRadius:6,background:"rgba(102,187,106,0.2)",border:"1px solid rgba(102,187,106,0.4)",color:"#66BB6A",cursor:"pointer",fontWeight:600}}>
                        ↩ 復元
                      </button>
                    )}
                    {!bannedIds.includes(post.userId) ? (
                      <button onClick={()=>onBanUser(post.userId)}
                        style={{fontSize:11,padding:"4px 10px",borderRadius:6,background:"rgba(255,150,0,0.15)",border:"1px solid rgba(255,150,0,0.4)",color:"#FFA500",cursor:"pointer",fontWeight:600}}>
                        🚫 BAN
                      </button>
                    ) : (
                      <button onClick={()=>onUnban(post.userId)}
                        style={{fontSize:11,padding:"4px 10px",borderRadius:6,background:"rgba(100,181,246,0.15)",border:"1px solid rgba(100,181,246,0.4)",color:"#64B5F6",cursor:"pointer",fontWeight:600}}>
                        ✓ BAN解除
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* BANリスト */}
          {tab==="ban" && (
            <div>
              <div style={{fontSize:11,color:"rgba(255,255,255,0.3)",marginBottom:12}}>BANされているID一覧</div>
              {bannedIds.length===0 && <div style={{textAlign:"center",color:"rgba(255,255,255,0.25)",padding:30,fontSize:12}}>BANされているユーザーはいません</div>}
              {bannedIds.map(bid=>(
                <div key={bid} style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:"rgba(255,68,68,0.07)",border:"1px solid rgba(255,68,68,0.2)",borderRadius:10,padding:"10px 14px",marginBottom:8}}>
                  <div>
                    <div style={{fontSize:13,fontFamily:"monospace",color:"#FF4444",fontWeight:700}}>{bid}</div>
                    <div style={{fontSize:10,color:"rgba(255,255,255,0.3)",marginTop:2}}>このIDからの投稿はブロックされています</div>
                  </div>
                  <button onClick={()=>onUnban(bid)} style={{fontSize:11,padding:"5px 12px",borderRadius:8,background:"rgba(100,181,246,0.15)",border:"1px solid rgba(100,181,246,0.4)",color:"#64B5F6",cursor:"pointer",fontWeight:600}}>解除</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── スレッド一覧 ─────────────────────────────────────
function ThreadList({ group, threads, userId, nickname, onNickChange, bannedIds, onSelect, onNew }) {
  const c = group.color;
  const [show,     setShow]    = useState(false);
  const [title,    setTitle]   = useState("");
  const [tag,      setTag]     = useState("雑談");
  const [editNick, setEditNick]= useState(false);
  const [nickDraft,setNickDraft]=useState(nickname);
  const isBanned = bannedIds.includes(userId);

  const saveNick = () => {
    const v = nickDraft.trim() || "名無し";
    onNickChange(v); setNickDraft(v); setEditNick(false);
  };

  return (
    <div>
      {/* ニックネームエリア */}
      <div style={{background:"#0F1524",border:"1px solid rgba(255,255,255,0.07)",borderRadius:12,padding:"10px 14px",marginBottom:12}}>
        <div style={{fontSize:10,color:"rgba(255,255,255,0.35)",marginBottom:6}}>あなたの情報</div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <span style={{fontSize:10,fontFamily:"monospace",color:c,background:`${c}15`,padding:"2px 8px",borderRadius:4,fontWeight:700,flexShrink:0}}>{userId}</span>
          {!editNick ? (
            <>
              <span style={{fontSize:13,color:"#EEF0FF",fontWeight:600,flex:1}}>{nickname||"名無し"}</span>
              <button onClick={()=>{setNickDraft(nickname);setEditNick(true);}}
                style={{flexShrink:0,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:6,padding:"3px 10px",fontSize:11,color:"rgba(255,255,255,0.5)",cursor:"pointer"}}>✏ 変更</button>
            </>
          ) : (
            <>
              <input value={nickDraft} onChange={e=>setNickDraft(e.target.value)} onKeyDown={e=>e.key==="Enter"&&saveNick()}
                placeholder="ニックネーム" maxLength={20} autoFocus
                style={{flex:1,background:"rgba(255,255,255,0.08)",border:`1px solid ${c}44`,borderRadius:6,padding:"4px 10px",color:"#EEF0FF",fontSize:12,outline:"none",fontFamily:"inherit"}}/>
              <button onClick={saveNick} style={{flexShrink:0,background:c,border:"none",borderRadius:6,padding:"4px 12px",fontSize:11,color:"#fff",fontWeight:700,cursor:"pointer"}}>保存</button>
              <button onClick={()=>setEditNick(false)} style={{flexShrink:0,background:"rgba(255,255,255,0.06)",border:"none",borderRadius:6,padding:"4px 8px",fontSize:11,color:"rgba(255,255,255,0.4)",cursor:"pointer"}}>✕</button>
            </>
          )}
        </div>
      </div>

      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
        <div style={{fontSize:13,fontWeight:700,color:"#EEF0FF"}}>{group.emoji} {group.name} 掲示板 <span style={{fontSize:11,color:"rgba(255,255,255,0.3)",fontWeight:400}}>{threads.length}スレ</span></div>
        {!isBanned && (
          <button onClick={()=>setShow(v=>!v)} style={{background:show?"rgba(255,255,255,0.08)":`${c}22`,border:`1px solid ${c}44`,borderRadius:20,padding:"6px 14px",fontSize:12,fontWeight:700,color:c,cursor:"pointer"}}>
            {show?"✕ 閉じる":"＋ スレ立て"}
          </button>
        )}
      </div>

      {isBanned && (
        <div style={{background:"rgba(255,68,68,0.1)",border:"1px solid rgba(255,68,68,0.3)",borderRadius:10,padding:"12px 14px",marginBottom:14,fontSize:12,color:"#FF7777",textAlign:"center"}}>
          🚫 この端末からは投稿できません
        </div>
      )}

      {show && !isBanned && (
        <div style={{background:"#0F1524",border:`1px solid ${c}33`,borderRadius:12,padding:14,marginBottom:14}}>
          <div style={{fontSize:11,color:"rgba(255,255,255,0.4)",marginBottom:8}}>
            新しいスレッドを立てる（投稿名：<span style={{color:c,fontWeight:600}}>{nickname||"名無し"}</span>）
          </div>
          <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="スレッドタイトル"
            style={{width:"100%",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:8,padding:"8px 12px",color:"#EEF0FF",fontSize:12,outline:"none",fontFamily:"inherit",boxSizing:"border-box",marginBottom:10}}/>
          <div style={{display:"flex",gap:8,alignItems:"center",justifyContent:"space-between"}}>
            <select value={tag} onChange={e=>setTag(e.target.value)} style={{background:"#161E35",border:"1px solid rgba(255,255,255,0.1)",borderRadius:8,color:"#DDE1EE",fontSize:12,padding:"6px 10px",outline:"none"}}>
              {["ライブ","映画","リリース","ドラマ","舞台","雑談"].map(t=><option key={t}>{t}</option>)}
            </select>
            <button onClick={()=>{if(!title.trim())return;onNew({title:title.trim(),tag});setTitle("");setShow(false);}}
              style={{background:c,color:"#fff",border:"none",borderRadius:8,padding:"7px 20px",fontSize:12,fontWeight:700,cursor:"pointer"}}>作成</button>
          </div>
        </div>
      )}

      {threads.map(t=>{
        const vis = t.replies.filter(r=>!r.hidden);
        const last = vis.slice(-1)[0];
        return (
          <div key={t.id} onClick={()=>onSelect(t.id)}
            style={{background:"#0F1524",border:"1px solid rgba(255,255,255,0.07)",borderRadius:12,padding:14,marginBottom:8,cursor:"pointer",transition:"all 0.18s"}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=`${c}44`;e.currentTarget.style.background="#131B2E";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.07)";e.currentTarget.style.background="#0F1524";}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:7}}>
              <span style={{flexShrink:0,display:"inline-block",padding:"2px 8px",borderRadius:4,fontSize:10,fontWeight:700,background:`${TAG_COLOR[t.tag]||"#888"}22`,color:TAG_COLOR[t.tag]||"#888"}}>{t.tag}</span>
              <span style={{fontSize:13,fontWeight:700,color:"#EEF0FF",flex:1,lineHeight:1.4}}>{t.title}</span>
            </div>
            {last && <div style={{fontSize:11,color:"rgba(255,255,255,0.35)",overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis",marginBottom:5}}>💬 {last.text}</div>}
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div style={{fontSize:10,color:"rgba(255,255,255,0.25)"}}>
                {t.lastUpdated && <span>🕐 {timeAgo(t.lastUpdated)}</span>}
                {last && <span>　{last.author}</span>}
              </div>
              <div style={{fontSize:11,color:c,fontWeight:700}}>💬 {vis.length}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── スレッド詳細 ─────────────────────────────────────
function ThreadDetail({ thread, group, userId, nickname, bannedIds, lastPostTime, onBack, onPost }) {
  const c = group.color;
  const [draft,     setDraft]    = useState("");
  const [err,       setErr]      = useState("");
  const [countdown, setCountdown]= useState(0);
  const isBanned = bannedIds.includes(userId);

  useEffect(() => {
    if (!lastPostTime) return;
    const update = () => {
      const rem = RATE_LIMIT_SEC - Math.floor((Date.now()-lastPostTime)/1000);
      setCountdown(rem > 0 ? rem : 0);
    };
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, [lastPostTime]);

  const handleSubmit = () => {
    if (!draft.trim()) return;
    if (isBanned)      { setErr("🚫 この端末からは投稿できません"); return; }
    if (countdown > 0) { setErr(`⏱ あと${countdown}秒待ってください`); return; }
    const ng = checkNgWords(draft);
    if (ng)   { setErr(`🚫「${ng}」は使用できません`); return; }
    const sp = checkSpam(draft);
    if (sp)   { setErr(`🚫 ${sp}`); return; }
    if (draft.trim().length > 500) { setErr("🚫 500文字以内で入力してください"); return; }
    setErr("");
    onPost(thread.id, draft.trim());
    setDraft("");
  };

  const vis = thread.replies.filter(r=>!r.hidden);

  return (
    <div>
      <button onClick={onBack} style={{background:"none",border:"none",color:c,fontSize:12,cursor:"pointer",padding:"0 0 10px",display:"flex",alignItems:"center",gap:4,fontWeight:600}}>← スレ一覧に戻る</button>
      <div style={{display:"flex",alignItems:"flex-start",gap:8,marginBottom:6}}>
        <span style={{flexShrink:0,display:"inline-block",padding:"2px 8px",borderRadius:4,fontSize:10,fontWeight:700,background:`${TAG_COLOR[thread.tag]||"#888"}22`,color:TAG_COLOR[thread.tag]||"#888",marginTop:2}}>{thread.tag}</span>
        <div style={{fontSize:15,fontWeight:700,color:"#EEF0FF",lineHeight:1.4}}>{thread.title}</div>
      </div>
      <div style={{fontSize:11,color:"rgba(255,255,255,0.28)",marginBottom:14}}>{group.emoji} {group.name} · {vis.length}件</div>

      <div style={{marginBottom:14}}>
        {vis.map((r,i)=>(
          <div key={r.id} style={{display:"flex",gap:10,marginBottom:12}}>
            <div style={{flexShrink:0,width:22,height:22,borderRadius:"50%",background:`${c}20`,border:`1px solid ${c}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,color:c,marginTop:2}}>{i+1}</div>
            <div style={{flex:1,background:"#0F1524",border:"1px solid rgba(255,255,255,0.06)",borderRadius:10,padding:"10px 12px"}}>
              <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6,flexWrap:"wrap"}}>
                <span style={{fontSize:13,fontWeight:700,color:"#EEF0FF"}}>{r.author}</span>
                <span style={{fontSize:9,fontFamily:"monospace",color:"rgba(255,255,255,0.3)",background:"rgba(255,255,255,0.05)",padding:"1px 5px",borderRadius:3}}>{r.userId}</span>
                {r.userId===userId && <span style={{fontSize:9,color:c,background:`${c}15`,padding:"1px 5px",borderRadius:3}}>自分</span>}
                <span style={{fontSize:10,color:"rgba(255,255,255,0.22)",marginLeft:"auto"}}>{r.ago}</span>
              </div>
              <div style={{fontSize:13,lineHeight:1.8,color:"#C8CCDC"}}>{r.text}</div>
            </div>
          </div>
        ))}
        {!vis.length && <div style={{textAlign:"center",color:"rgba(255,255,255,0.28)",padding:"30px 0",fontSize:13}}>まだレスがありません。最初に投稿しよう！</div>}
      </div>

      <div style={{background:"#0F1524",border:`1px solid ${isBanned||countdown>0?"rgba(255,68,68,0.3)":`${c}33`}`,borderRadius:12,padding:12}}>
        <div style={{fontSize:11,color:"rgba(255,255,255,0.35)",marginBottom:8,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span>返信する（<span style={{color:c,fontWeight:600}}>{nickname||"名無し"}</span> として投稿）</span>
          <span style={{fontFamily:"monospace",color:"rgba(255,255,255,0.3)",fontSize:10}}>{userId}</span>
        </div>
        <textarea value={draft} onChange={e=>{setDraft(e.target.value);setErr("");}}
          placeholder={isBanned?"この端末からは投稿できません":countdown>0?`あと${countdown}秒待ってください…`:"レスを書く…（500文字以内）"}
          disabled={isBanned||countdown>0} rows={3}
          style={{width:"100%",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:8,padding:"9px 12px",color:isBanned||countdown>0?"rgba(255,255,255,0.3)":"#EEF0FF",fontSize:13,resize:"none",outline:"none",fontFamily:"inherit",lineHeight:1.7,boxSizing:"border-box",cursor:isBanned?"not-allowed":"auto"}}/>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:8}}>
          <div>
            {err && <div style={{fontSize:11,color:"#FF6B6B"}}>{err}</div>}
            <div style={{fontSize:10,color:"rgba(255,255,255,0.22)",marginTop:err?2:0}}>{draft.length}/500</div>
          </div>
          <button onClick={handleSubmit} disabled={isBanned||countdown>0}
            style={{background:isBanned||countdown>0?"rgba(255,255,255,0.1)":c,color:isBanned||countdown>0?"rgba(255,255,255,0.3)":"#fff",border:"none",borderRadius:8,padding:"7px 22px",fontSize:12,fontWeight:700,cursor:isBanned||countdown>0?"not-allowed":"pointer"}}>
            {countdown>0?`${countdown}s 待機中`:"返信"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── メインアプリ ─────────────────────────────────────
export default function FanPortalApp() {
  const [group,     setGroup]    = useState(GROUPS.find(g=>g.id==="snowman"));
  const [tab,       setTab]      = useState("board");
  const [threads,   setThreads]  = useState(INITIAL_THREADS);
  const [activeThread, setAT]    = useState(null);
  const [activeMember, setAM]    = useState(null);
  const [expandedNews, setEN]    = useState(null);
  const [dbNews,    setDbNews]   = useState(null);
  const [newsLoading, setNewsLoading] = useState(false);

  // ── 匿名ID ──
  const [userId,    setUserId]   = useState("#????");
  const [nickname,  setNickname] = useState("");
  // ── 管理 ──
  const [bannedIds, setBannedIds]= useState([]);
  const [adminOpen, setAdminOpen]= useState(false);
  const [adminAuth, setAdminAuth]= useState(false);
  const [adminPw,   setAdminPw]  = useState("");
  const [adminErr,  setAdminErr] = useState("");
  // ── 連投制限 ──
  const [lastPostTime, setLastPostTime] = useState(null);

  // ローカルストレージから匿名ID・BAN・ニックネームを読み込み
  useEffect(()=>{
    // フォント読み込み
    const fontLink = document.createElement("link");
    fontLink.rel = "stylesheet";
    fontLink.href = "https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@600;700&family=Noto+Sans+JP:wght@300;400;500;700&display=swap";
    document.head.appendChild(fontLink);

    // 匿名ID
    try {
      const saved = localStorage.getItem("anon_user_id");
      if (saved) {
        setUserId(saved);
      } else {
        const newId = genUserId();
        localStorage.setItem("anon_user_id", newId);
        setUserId(newId);
      }
    } catch { setUserId(genUserId()); }

    // BANリスト
    try {
      const saved = localStorage.getItem("banned_ids");
      if (saved) setBannedIds(JSON.parse(saved));
    } catch {}

    // ニックネーム
    try {
      const saved = localStorage.getItem("user_nickname");
      if (saved) setNickname(saved);
    } catch {}
  },[]);

  const handleNickChange = (name) => {
    setNickname(name);
    try { localStorage.setItem("user_nickname", name); } catch {}
  };

  // Supabaseからニュース取得（グループ切り替え時）
  useEffect(() => {
    if (!import.meta.env.VITE_SUPABASE_URL) return;
    setDbNews(null);
    setNewsLoading(true);
    supabase
      .from('news')
      .select('*')
      .eq('group_id', group.id)
      .order('pub_date', { ascending: false })
      .limit(20)
      .then(({ data }) => {
        setDbNews(data && data.length > 0 ? data : null);
        setNewsLoading(false);
      })
      .catch(() => { setNewsLoading(false); });
  }, [group.id]);

  const accent = group.color;
  const groupThreads = threads[group.id] || [];
  const activeThreadObj = activeThread ? groupThreads.find(t=>t.id===activeThread) : null;

  const handleNewThread = ({title,tag}) => {
    setThreads(p=>({...p,[group.id]:[{id:`${group.id}_${Date.now()}`,title,tag,replies:[],lastUpdated:Date.now()}, ...(p[group.id]||[])]}));
  };
  const handlePost = (tid, text) => {
    setThreads(p=>({...p,[group.id]:(p[group.id]||[]).map(t=>t.id===tid?{...t,replies:[...t.replies,{id:`r_${Date.now()}`,author:nickname||"名無し",userId,text,ago:"今",hidden:false}],lastUpdated:Date.now()}:t)}));
    setLastPostTime(Date.now());
  };

  // 管理: 投稿削除
  const handleDeletePost = (gid, tid, rid) => {
    setThreads(p=>({...p,[gid]:(p[gid]||[]).map(t=>t.id===tid?{...t,replies:t.replies.map(r=>r.id===rid?{...r,hidden:true}:r)}:t)}));
  };
  // 管理: 削除解除（復元）
  const handleRestorePost = (gid, tid, rid) => {
    setThreads(p=>({...p,[gid]:(p[gid]||[]).map(t=>t.id===tid?{...t,replies:t.replies.map(r=>r.id===rid?{...r,hidden:false}:r)}:t)}));
  };
  // 管理: BAN
  const handleBan = (uid) => {
    const next = [...new Set([...bannedIds, uid])];
    setBannedIds(next);
    try { localStorage.setItem("banned_ids", JSON.stringify(next)); } catch {}
  };
  // 管理: BAN解除
  const handleUnban = (uid) => {
    const next = bannedIds.filter(b=>b!==uid);
    setBannedIds(next);
    try { localStorage.setItem("banned_ids", JSON.stringify(next)); } catch {}
  };

  // 管理ログイン
  const handleAdminLogin = () => {
    if (adminPw === ADMIN_PASSWORD) { setAdminAuth(true); setAdminErr(""); }
    else { setAdminErr("パスワードが違います"); }
  };

  const startoGroups = GROUPS.filter(g=>g.agency==="STARTO");
  const tobeGroups   = GROUPS.filter(g=>g.agency==="TOBE");
  const pillStyle = g => ({
    flexShrink:0,padding:"5px 11px",borderRadius:20,fontSize:11,fontWeight:g.id===group.id?700:400,
    cursor:"pointer",whiteSpace:"nowrap",border:`1px solid ${g.id===group.id?g.color:"rgba(255,255,255,0.1)"}`,
    background:g.id===group.id?`${g.color}22`:"transparent",color:g.id===group.id?g.color:"rgba(255,255,255,0.5)",
  });
  const agencyLabel = (label, color) => (
    <div style={{flexShrink:0,display:"flex",alignItems:"center",gap:5,padding:"0 4px"}}>
      <div style={{width:1,height:20,background:"rgba(255,255,255,0.12)"}}/>
      <span style={{fontSize:9,fontWeight:700,letterSpacing:"0.12em",color,opacity:0.7,textTransform:"uppercase"}}>{label}</span>
    </div>
  );

  return (
    <div style={{fontFamily:"'Noto Sans JP',sans-serif",background:"#070B17",minHeight:"100vh",color:"#DDE1EE",maxWidth:480,margin:"0 auto",display:"flex",flexDirection:"column"}}>

      {/* ヘッダー */}
      <div style={{padding:"14px 16px 10px",borderBottom:"1px solid rgba(255,255,255,0.06)",background:"#0A0E1B",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div>
          <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:3}}>
            <span style={{fontSize:9,fontWeight:700,letterSpacing:"0.15em",padding:"2px 8px",borderRadius:4,background:`${group.agency==="TOBE"?"#FF4444":"#64B5F6"}22`,color:group.agency==="TOBE"?"#FF4444":"#64B5F6"}}>{group.agency}</span>
          </div>
          <div style={{fontFamily:"'Noto Serif JP',serif",fontSize:20,fontWeight:700,color:accent,transition:"color 0.3s"}}>{group.emoji} {group.name}</div>
        </div>
        {/* 管理ボタン */}
        <button onClick={()=>{setAdminOpen(true);setAdminAuth(false);setAdminPw("");setAdminErr("");}}
          style={{background:"rgba(255,68,68,0.1)",border:"1px solid rgba(255,68,68,0.25)",borderRadius:10,padding:"7px 11px",fontSize:11,color:"rgba(255,100,100,0.7)",cursor:"pointer",fontWeight:600}}>
          🔐 管理
        </button>
      </div>

      {/* グループ選択 */}
      <div style={{display:"flex",gap:6,overflowX:"auto",padding:"8px 12px",background:"#0A0E1B",borderBottom:"1px solid rgba(255,255,255,0.05)",scrollbarWidth:"none",alignItems:"center"}}>
        {agencyLabel("STARTO","#64B5F6")}
        {startoGroups.map(g=><button key={g.id} style={pillStyle(g)} onClick={()=>{setGroup(g);setAT(null);setAM(null);}}>{g.emoji} {g.name}</button>)}
        {agencyLabel("TOBE","#FF4444")}
        {tobeGroups.map(g=><button key={g.id} style={pillStyle(g)} onClick={()=>{setGroup(g);setAT(null);setAM(null);}}>{g.emoji} {g.name}</button>)}
      </div>

      {/* タブ */}
      <div style={{display:"flex",borderBottom:"1px solid rgba(255,255,255,0.06)",background:"#0A0E1B"}}>
        {[["news","ニュース"],["board","掲示板"],["members","メンバー"]].map(([id,label])=>(
          <button key={id} style={{flex:1,padding:"12px 4px",fontSize:12,fontWeight:tab===id?700:400,color:tab===id?accent:"rgba(255,255,255,0.4)",background:"none",border:"none",cursor:"pointer",borderBottom:`2px solid ${tab===id?accent:"transparent"}`,transition:"all 0.2s"}}
            onClick={()=>{setTab(id);if(id==="board")setAT(null);}}>
            {label}
          </button>
        ))}
      </div>

      {/* コンテンツ */}
      <div style={{flex:1,overflowY:"auto",padding:"14px 14px 80px"}}>

        {/* ニュース */}
        {tab==="news" && (
          <div>
            {newsLoading && (
              <div style={{textAlign:"center",color:"rgba(255,255,255,0.3)",padding:"40px 0",fontSize:13}}>
                <div style={{marginBottom:8}}>ニュースを取得中…</div>
                <div style={{width:40,height:3,background:`${accent}22`,borderRadius:2,margin:"0 auto",overflow:"hidden"}}>
                  <div style={{width:"60%",height:"100%",background:accent,borderRadius:2,animation:"shimmer 1s ease infinite"}}/>
                </div>
              </div>
            )}
            {!newsLoading && (() => {
              const items = dbNews || (NEWS[group.id] || []).map((item, i) => ({
                id: item.id ?? i,
                tag: item.tag,
                pub_date: item.date,
                title: item.title,
                body: item.body,
                source: item.source,
                url: item.url,
              }));
              if (items.length === 0) return <div style={{textAlign:"center",color:"rgba(255,255,255,0.3)",padding:"40px 0",fontSize:13}}>ニュースを準備中です</div>;
              return items.map(item => {
                const key = item.id;
                const dateStr = item.pub_date ? (item.pub_date.length > 10 ? item.pub_date.slice(5,10).replace('-','/') : item.pub_date) : "";
                return (
                  <div key={key} onClick={()=>setEN(expandedNews===key?null:key)}
                    style={{background:"#0F1524",border:`1px solid ${expandedNews===key?`${accent}40`:"rgba(255,255,255,0.07)"}`,borderRadius:12,padding:14,marginBottom:10,cursor:"pointer",transition:"border-color 0.2s"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
                      <span style={{display:"inline-block",padding:"2px 8px",borderRadius:4,fontSize:10,fontWeight:700,background:`${TAG_COLOR[item.tag]||"#888"}22`,color:TAG_COLOR[item.tag]||"#888"}}>{item.tag}</span>
                      <span style={{fontSize:11,color:"rgba(255,255,255,0.28)"}}>{dateStr}</span>
                    </div>
                    <div style={{fontSize:14,fontWeight:700,lineHeight:1.5,color:"#EEF0FF"}}>{item.title}</div>
                    {expandedNews===key && (
                      <div>
                        <div style={{fontSize:12,color:"rgba(255,255,255,0.55)",lineHeight:1.7,marginTop:8,marginBottom:10}}>{item.body}</div>
                        <a href={item.url} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()}
                          style={{display:"inline-flex",alignItems:"center",gap:5,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:8,padding:"6px 12px",fontSize:11,color:"rgba(255,255,255,0.55)",textDecoration:"none"}}>
                          🔗 <span style={{fontWeight:600}}>{item.source}</span> で確認 ↗
                        </a>
                      </div>
                    )}
                  </div>
                );
              });
            })()}
          </div>
        )}

        {tab==="board" && (
          activeThreadObj
            ? <ThreadDetail thread={activeThreadObj} group={group} userId={userId} nickname={nickname} bannedIds={bannedIds} lastPostTime={lastPostTime} onBack={()=>setAT(null)} onPost={handlePost}/>
            : <ThreadList   group={group} threads={groupThreads} userId={userId} nickname={nickname} onNickChange={handleNickChange} bannedIds={bannedIds} onSelect={setAT} onNew={handleNewThread}/>
        )}

        {tab==="members" && (
          <div>
            <div style={{fontSize:11,color:"rgba(255,255,255,0.3)",marginBottom:12}}>{group.name} — {group.members.length}名　<span style={{color:"rgba(255,255,255,0.18)"}}>タップでAIプロフィール</span></div>
            <div style={{display:"grid",gridTemplateColumns:group.solo?"1fr":"repeat(3,1fr)",gap:8}}>
              {group.members.map(m=>(
                <div key={m} onClick={()=>setAM(m)}
                  style={{background:"#0F1524",border:"1px solid rgba(255,255,255,0.07)",borderRadius:12,padding:group.solo?"20px 8px 16px":"14px 8px 12px",textAlign:"center",cursor:"pointer",transition:"all 0.18s"}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=`${accent}55`;e.currentTarget.style.background="#131B2E";}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.07)";e.currentTarget.style.background="#0F1524";}}>
                  <div style={{display:"flex",justifyContent:"center",marginBottom:10}}>
                    <MemberAvatar name={m} color={accent} size={group.solo?76:52} fontSize={group.solo?28:20}/>
                  </div>
                  <div style={{fontSize:group.solo?15:12,color:"#EEF0FF",lineHeight:1.4,marginBottom:6,fontWeight:500}}>{m}</div>
                  <div style={{fontSize:9,color:accent,opacity:0.6}}>✦ AI プロフ</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 管理パネル（パスワードゲート） */}
      {adminOpen && !adminAuth && (
        <div onClick={()=>setAdminOpen(false)} style={{position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,0.8)",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <div onClick={e=>e.stopPropagation()} style={{background:"#0D1325",borderRadius:16,padding:24,width:300,border:"1px solid rgba(255,68,68,0.3)"}}>
            <div style={{fontSize:15,fontWeight:700,color:"#EEF0FF",marginBottom:4}}>🔐 管理者認証</div>
            <div style={{fontSize:11,color:"rgba(255,255,255,0.35)",marginBottom:16}}>管理者パスワードを入力してください</div>
            <input type="password" value={adminPw} onChange={e=>setAdminPw(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&handleAdminLogin()}
              placeholder="パスワード"
              style={{width:"100%",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.15)",borderRadius:8,padding:"10px 12px",color:"#EEF0FF",fontSize:13,outline:"none",fontFamily:"inherit",boxSizing:"border-box",marginBottom:8}}/>
            {adminErr && <div style={{fontSize:11,color:"#FF6B6B",marginBottom:8}}>{adminErr}</div>}
            <div style={{display:"flex",gap:8}}>
              <button onClick={()=>setAdminOpen(false)} style={{flex:1,padding:"9px",borderRadius:8,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",color:"rgba(255,255,255,0.5)",fontSize:12,cursor:"pointer"}}>キャンセル</button>
              <button onClick={handleAdminLogin} style={{flex:1,padding:"9px",borderRadius:8,background:"rgba(255,68,68,0.25)",border:"1px solid rgba(255,68,68,0.4)",color:"#FF4444",fontSize:12,fontWeight:700,cursor:"pointer"}}>ログイン</button>
            </div>
          </div>
        </div>
      )}

      {/* 管理パネル本体 */}
      {adminOpen && adminAuth && (
        <AdminPanel threads={threads} group={group} bannedIds={bannedIds} onDeletePost={handleDeletePost} onRestorePost={handleRestorePost} onBanUser={handleBan} onUnban={handleUnban} onClose={()=>setAdminOpen(false)}/>
      )}

      {/* プロフィールモーダル */}
      {activeMember && <MemberModal member={activeMember} groupName={group.name} color={accent} onClose={()=>setAM(null)}/>}

      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:480,height:3,background:`linear-gradient(90deg,transparent,${accent}88,transparent)`,pointerEvents:"none"}}/>
    </div>
  );
}
