// src/profiles.js
// 全メンバープロフィール静的データ（API不要・完全無料）
// 変更があった場合はここを直接編集してください

const PROFILES = {
  // ══ 20th Century ══
  "坂本昌行": { born:"1974/9/16",  height:"173cm", blood:"O型",  from:"東京",          nick:"まっつ",     role:"リーダー・ボーカル",       skill:"ダンス・振付",            tag:"V6最年長。華麗なダンスと圧倒的な歌声でエンタメ界を牽引",         marital:"既婚", spouse:"中山絵梨奈", spouseNote:"女優" },
  "長野博":   { born:"1972/10/22", height:"175cm", blood:"O型",  from:"長野",          nick:"ながの",     role:"ボーカル・バラエティ担当",  skill:"料理・写真",              tag:"V6の温かいキャラ担当。料理の腕前はプロ並みで写真家としても活躍",  marital:"非公表", spouse:null, spouseNote:null },
  "井ノ原快彦":{ born:"1976/5/17",  height:"175cm", blood:"A型",  from:"東京",          nick:"イノッチ",   role:"バラエティ・MC担当",        skill:"MC・子育て",              tag:"NHK「あさイチ」MCで国民的司会者に。優しいキャラで全世代から愛される", marital:"既婚", spouse:"瀬戸朝香", spouseNote:"女優" },

  // ══ DOMOTO ══
  "堂本光一": { born:"1979/1/1",   height:"167cm", blood:"B型",  from:"奈良",          nick:"コウイチ",   role:"ダンス・舞台演出担当",      skill:"ダンス・振付・舞台演出",  tag:"Endless SHOCK主演30年超。KinKi Kidsのダンスと演出の鬼才",           marital:"未婚", spouse:null, spouseNote:null },
  "堂本剛":   { born:"1979/4/29",  height:"163cm", blood:"A型",  from:"奈良",          nick:"ツヨシ",     role:"ボーカル・音楽担当",        skill:"音楽制作・ギター・絵画",  tag:"ENDRECHERIとして独自の音楽世界を構築。唯一無二の音楽家",            marital:"非公表", spouse:null, spouseNote:null },

  // ══ NEWS ══
  "増田貴久": { born:"1986/11/4",  height:"171cm", blood:"AB型", from:"埼玉",          nick:"マスダ",     role:"ビジュアル・ダンス担当",    skill:"ダンス・ファッション・作詞",tag:"NEWSのビジュアル担当。ソロ活動も精力的で独自のアート世界観を持つ才人",marital:"未婚", spouse:null, spouseNote:null },
  "小山慶一郎":{ born:"1984/5/17",  height:"177cm", blood:"O型",  from:"東京",          nick:"こやま",     role:"MC・バラエティ担当",        skill:"MC・トーク",              tag:"日テレアナウンサー試験合格経歴。NEWSの安定したMC担当",               marital:"未婚", spouse:null, spouseNote:null },
  "加藤シゲアキ":{ born:"1987/7/11", height:"175cm", blood:"A型", from:"大阪",          nick:"シゲ",       role:"作家・頭脳担当",            skill:"小説執筆・演技",          tag:"累計100万部超の人気作家。アイドルと文学を両立する唯一無二の存在",    marital:"未婚", spouse:null, spouseNote:null },

  // ══ SUPER EIGHT ══
  "横山裕":   { born:"1980/11/4",  height:"172cm", blood:"B型",  from:"大阪",          nick:"よこやん",   role:"リーダー・MC担当",          skill:"MC・バラエティ",          tag:"SUPER EIGHTの司令塔。関西仕込みのMC力で番組を縦横無尽に仕切る",     marital:"未婚", spouse:null, spouseNote:null },
  "村上信五": { born:"1981/1/26",  height:"170cm", blood:"B型",  from:"大阪",          nick:"ムラカミ",   role:"司会・バラエティ担当",      skill:"MC・トーク",              tag:"日本一多忙な司会者のひとり。関ジャム等多数のレギュラー番組を持つ",   marital:"未婚", spouse:null, spouseNote:null },
  "丸山隆平": { born:"1983/11/12", height:"171cm", blood:"A型",  from:"大阪",          nick:"マル",       role:"お笑い・バラエティ担当",    skill:"笑いのセンス・芸術",      tag:"天才的なボケで笑いを生む。独自のアートセンスも持つ多才なエンターテイナー", marital:"未婚", spouse:null, spouseNote:null },
  "安田章大": { born:"1984/11/26", height:"167cm", blood:"A型",  from:"大阪",          nick:"やすだ",     role:"ビジュアル・アート担当",    skill:"アート・絵画・作詞",      tag:"繊細な感性と独自のアート世界観を持つ。病を乗り越えて活動を続ける不屈の芸術家", marital:"未婚", spouse:null, spouseNote:null },
  "大倉忠義": { born:"1985/11/4",  height:"178cm", blood:"O型",  from:"大阪",          nick:"おっくん",   role:"ドラム・クール担当",        skill:"ドラム・演技",            tag:"SUPER EIGHTのドラム担当。クールなビジュアルと演技力で俳優としても活躍", marital:"未婚", spouse:null, spouseNote:null },

  // ══ Hey! Say! JUMP ══
  "山田涼介": { born:"1993/5/9",   height:"170cm", blood:"A型",  from:"東京",          nick:"やまだ",     role:"リーダー・俳優",            skill:"演技・映画鑑賞",          tag:"20年のキャリアを誇るHey!Say!JUMPの絶対的エース俳優",               marital:"未婚", spouse:null, spouseNote:null },
  "知念侑李": { born:"1993/11/30", height:"163cm", blood:"A型",  from:"沖縄",          nick:"ちねん",     role:"ダンス担当",                skill:"ダンス・体操",            tag:"沖縄出身の小柄なダンスマスター。卓越した技術は世界レベル",           marital:"未婚", spouse:null, spouseNote:null },
  "岡本圭人": { born:"1993/4/1",   height:"176cm", blood:"O型",  from:"東京(ロンドン育ち)",nick:"けいと",  role:"国際担当",                  skill:"バンド・英語",            tag:"ロンドン育ちの国際派。バンドでギター・ベースをこなす音楽家",          marital:"未婚", spouse:null, spouseNote:null },
  "中島裕翔": { born:"1993/8/10",  height:"181cm", blood:"AB型", from:"東京",          nick:"ゆうと",     role:"ビジュアル・俳優担当",      skill:"バスケ・演技",            tag:"長身イケメン俳優。バスケの腕前はセミプロ級で身体能力も抜群",         marital:"未婚", spouse:null, spouseNote:null },
  "有岡大貴": { born:"1992/11/4",  height:"169cm", blood:"O型",  from:"大阪",          nick:"ありちゃん", role:"お笑い担当",                skill:"ゲーム・トーク",          tag:"大阪出身の天然ボケキャラ。グループの雰囲気を和ませる存在",           marital:"未婚", spouse:null, spouseNote:null },
  "高木雄也": { born:"1992/3/19",  height:"178cm", blood:"B型",  from:"神奈川",        nick:"たかき",     role:"ファッション担当",          skill:"ゴルフ・ファッション",    tag:"グループ随一のオシャレさん。ゴルフも本格的で多才な一面も",           marital:"未婚", spouse:null, spouseNote:null },
  "伊野尾慧": { born:"1993/6/22",  height:"162cm", blood:"A型",  from:"埼玉",          nick:"いのお",     role:"バラエティ担当",            skill:"料理・建築",              tag:"明治大学建築学科卒。料理の腕前も抜群のインテリ系バラエティ担当",     marital:"未婚", spouse:null, spouseNote:null },
  "八乙女光": { born:"1992/12/2",  height:"165cm", blood:"B型",  from:"北海道",        nick:"やぁちゃん", role:"バラエティ担当",            skill:"お笑い・ゲーム",          tag:"北海道出身の毒舌バラエティ担当。鋭いツッコミで番組を盛り上げる",     marital:"未婚", spouse:null, spouseNote:null },
  "薮宏太":   { born:"1992/1/31",  height:"170cm", blood:"O型",  from:"大阪",          nick:"やぶちゃん", role:"最年長・バラエティ担当",    skill:"ギター・ゴルフ",          tag:"最年長ムードメーカー。ギターの腕前は本格派でバンド活動も",           marital:"未婚", spouse:null, spouseNote:null },

  // ══ Kis-My-Ft2 ══
  "藤ヶ谷太輔":{ born:"1985/10/28", height:"176cm", blood:"B型",  from:"埼玉",          nick:"たいすけ",   role:"センター・ビジュアル担当",  skill:"演技・ダンス",            tag:"Kis-My-Ft2の絶対的センター。甘いマスクと演技力でドラマ・映画にも活躍", marital:"未婚", spouse:null, spouseNote:null },
  "玉森裕太": { born:"1988/3/17",  height:"180cm", blood:"O型",  from:"京都",          nick:"たまちゃん", role:"ビジュアル・俳優担当",      skill:"演技・ダンス",            tag:"長身ビジュアルと繊細な演技力で人気を博す。京都出身のエレガントな佇まい", marital:"未婚", spouse:null, spouseNote:null },
  "千賀健永": { born:"1989/2/4",   height:"181cm", blood:"O型",  from:"愛知",          nick:"ちぎ",       role:"ダンス担当",                skill:"ダンス・語学",            tag:"キスマイ随一のダンス技術を誇る。語学堪能でグローバルな活動にも積極的", marital:"未婚", spouse:null, spouseNote:null },
  "宮田俊哉": { born:"1988/1/14",  height:"170cm", blood:"O型",  from:"愛知",          nick:"みやちゃん", role:"バラエティ・アニメ担当",    skill:"アニメ・声優",            tag:"キスマイの癒し系バラエティ担当。アニメと声優への愛情は本物",          marital:"未婚", spouse:null, spouseNote:null },
  "二階堂高嗣":{ born:"1988/7/14",  height:"170cm", blood:"B型",  from:"沖縄",          nick:"にかちゃん", role:"お笑い担当",                skill:"お笑い・ローラースケート",tag:"沖縄出身の天然キャラ。ローラースケートと笑いで魅了するムードメーカー", marital:"未婚", spouse:null, spouseNote:null },
  "横尾渉":   { born:"1988/12/23", height:"180cm", blood:"B型",  from:"千葉",          nick:"よこお",     role:"ファッション・バラエティ担当",skill:"ファッション・デザイン",  tag:"キスマイのファッションリーダー。独自のスタイルと個性的な発言で存在感抜群", marital:"未婚", spouse:null, spouseNote:null },

  // ══ timelesz ══
  "菊池風磨": { born:"1994/3/7",   height:"174cm", blood:"A型",  from:"東京",          nick:"ふうま",     role:"リーダー・プロデューサー",  skill:"音楽プロデュース・ラップ",tag:"timelezsのプロデューサー兼リーダー。音楽制作も手がける次世代アーティスト", marital:"未婚", spouse:null, spouseNote:null },
  "佐藤勝利": { born:"1996/3/10",  height:"174cm", blood:"A型",  from:"東京",          nick:"しょうり",   role:"ビジュアル・俳優担当",      skill:"演技・歌",                tag:"Sexy Zone時代からのビジュアルエース。演技力も高く映画・ドラマで活躍", marital:"未婚", spouse:null, spouseNote:null },
  "松島聡":   { born:"1996/7/31",  height:"168cm", blood:"B型",  from:"神奈川",        nick:"そっちゃん", role:"ダンス担当",                skill:"ダンス・アクロバット",    tag:"timelezsのダンスエース。繊細な感性と高い技術力を持つパフォーマー",   marital:"未婚", spouse:null, spouseNote:null },
  "寺西拓人": { born:"2002/1/18",  height:"178cm", blood:"O型",  from:"大阪",          nick:"てらにし",   role:"新メンバー・ボーカル担当",  skill:"歌・ダンス",              tag:"タイプロ出身の新世代。パワフルなボーカルでtimelezsに新たな風を吹き込む", marital:"未婚", spouse:null, spouseNote:null },
  "原嘉孝":   { born:"2002/9/17",  height:"171cm", blood:"A型",  from:"神奈川",        nick:"はらちゃん", role:"新メンバー・ダンス担当",    skill:"ダンス・バトル",          tag:"バトルダンス出身のタイプロ合格者。切れ味鋭いダンスで即戦力として活躍", marital:"未婚", spouse:null, spouseNote:null },
  "橋本将生": { born:"2001/4/13",  height:"175cm", blood:"O型",  from:"大阪",          nick:"まさき",     role:"新メンバー・ビジュアル担当",skill:"ダンス・ファッション",    tag:"大阪出身のタイプロ合格者。端正なビジュアルとダンスでファンを魅了",   marital:"未婚", spouse:null, spouseNote:null },
  "猪俣周杜": { born:"2003/6/6",   height:"173cm", blood:"A型",  from:"東京",          nick:"いのまた",   role:"新メンバー・歌担当",        skill:"歌・ピアノ",              tag:"透き通る歌声とピアノでtimelezsに音楽性を加える。タイプロ合格者",     marital:"未婚", spouse:null, spouseNote:null },
  "篠塚大輝": { born:"2002/7/4",   height:"176cm", blood:"B型",  from:"神奈川",        nick:"しのつか",   role:"新メンバー・ダンス担当",    skill:"ダンス・スポーツ",        tag:"タイプロ出身のパワフルなダンサー。スポーティなキャラクターで元気を届ける", marital:"未婚", spouse:null, spouseNote:null },

  // ══ A.B.C-Z ══
  "河合郁人": { born:"1984/9/29",  height:"167cm", blood:"AB型", from:"東京",          nick:"かわい",     role:"リーダー・バラエティ担当",  skill:"バラエティ・アクロバット",tag:"A.B.C-Zのムードメーカー。天才的なアクロバットとトークで15年グループを支える", marital:"未婚", spouse:null, spouseNote:null },
  "戸塚祥太": { born:"1987/3/16",  height:"177cm", blood:"A型",  from:"東京",          nick:"とっつー",   role:"歌・演技担当",              skill:"歌・ピアノ",              tag:"A.B.C-Zの歌唱担当。安定した歌声と演技力で舞台にもドラマにも活躍",   marital:"未婚", spouse:null, spouseNote:null },
  "五関晃一": { born:"1985/6/5",   height:"170cm", blood:"O型",  from:"東京",          nick:"ごかん",     role:"ダンス担当",                skill:"ダンス・振付",            tag:"A.B.C-Zの踊る哲学者。クールなダンスと深い思考で独自の世界観を構築", marital:"未婚", spouse:null, spouseNote:null },
  "橋本良亮": { born:"1991/3/31",  height:"170cm", blood:"A型",  from:"埼玉",          nick:"はしもと",   role:"ビジュアル担当",            skill:"演技・ダンス",            tag:"A.B.C-Zのビジュアルエース。ドラマ出演も多く演技派としての評価も高い", marital:"未婚", spouse:null, spouseNote:null },
  "塚田僚一": { born:"1988/7/4",   height:"167cm", blood:"A型",  from:"埼玉",          nick:"つかちゃん", role:"アクロバット担当",          skill:"アクロバット・バラエティ",tag:"驚異的なアクロバット技術でファンを魅了。明るいキャラクターでグループを盛り上げる", marital:"未婚", spouse:null, spouseNote:null },

  // ══ WEST. ══
  "重岡大毅": { born:"1993/3/17",  height:"172cm", blood:"O型",  from:"大阪",          nick:"しげちゃん", role:"リーダー・俳優担当",        skill:"演技・作詞",              tag:"WEST.の顔。俳優業でも高い評価を受け月9主演を務める大阪発のスター",   marital:"未婚", spouse:null, spouseNote:null },
  "桐山照史": { born:"1991/7/7",   height:"175cm", blood:"A型",  from:"大阪",          nick:"きりやま",   role:"バラエティ担当",            skill:"バラエティ・演技",        tag:"WEST.の天然キャラ。バラエティ番組では毎回笑いを生む愛されキャラ",   marital:"未婚", spouse:null, spouseNote:null },
  "中間淳太": { born:"1990/4/16",  height:"177cm", blood:"A型",  from:"大阪",          nick:"じゅんた",   role:"ボーカル担当",              skill:"歌・料理",                tag:"WEST.の安定したボーカル担当。料理の腕前も本格的で多才なアーティスト", marital:"未婚", spouse:null, spouseNote:null },
  "小瀧望":   { born:"1996/10/22", height:"183cm", blood:"O型",  from:"兵庫",          nick:"こたき",     role:"ビジュアル担当",            skill:"演技・ゴルフ",            tag:"長身ビジュアルと演技力を兼ね備えた次世代スター。ゴルフの腕前も本格的", marital:"未婚", spouse:null, spouseNote:null },
  "藤井流星": { born:"1993/12/8",  height:"179cm", blood:"A型",  from:"大阪",          nick:"りゅうせい", role:"ダンス担当",                skill:"ダンス・ラップ",          tag:"WEST.のダンスエース。ラップも得意でグループの音楽性を広げる存在",   marital:"未婚", spouse:null, spouseNote:null },
  "神山智洋": { born:"1994/9/30",  height:"174cm", blood:"O型",  from:"大阪",          nick:"かみちゃん", role:"バラエティ担当",            skill:"バラエティ・ゲーム",      tag:"天然の言動でファンと視聴者を沸かせるWEST.の癒し系キャラ",           marital:"未婚", spouse:null, spouseNote:null },
  "濵田崇裕": { born:"1992/2/27",  height:"172cm", blood:"A型",  from:"大阪",          nick:"はまちゃん", role:"ツッコミ担当",              skill:"お笑い・バラエティ",      tag:"WEST.のツッコミ担当。大阪仕込みの鋭いツッコミでバラエティを盛り上げる", marital:"未婚", spouse:null, spouseNote:null },

  // ══ King & Prince ══
  "髙橋海人": { born:"1996/3/17",  height:"175cm", blood:"A型",  from:"神奈川",        nick:"かいちゃん", role:"ダンス・バラエティ担当",    skill:"ダンス・スケボー",        tag:"キレのあるダンスとムードメーカーな性格でファン魅了",                 marital:"未婚", spouse:null, spouseNote:null },
  "永瀬廉":   { born:"1999/1/23",  height:"178cm", blood:"B型",  from:"埼玉",          nick:"れんくん",   role:"俳優担当",                  skill:"サッカー・演技",          tag:"ドラマ・映画で引っ張りだこの実力派俳優。サッカー好き",               marital:"未婚", spouse:null, spouseNote:null },

  // ══ SixTONES ══
  "ジェシー":  { born:"1994/5/28",  height:"183cm", blood:"O型",  from:"東京(米国出身)",nick:"じぇし",    role:"リーダー・バラエティ",      skill:"料理・英語",              tag:"日米ハーフのビッグサイズエンターテイナー。英語堪能",                 marital:"未婚", spouse:null, spouseNote:null },
  "京本大我":  { born:"1994/12/17", height:"175cm", blood:"A型",  from:"東京",          nick:"きょも",     role:"ビジュアル・演技担当",      skill:"ピアノ・演技",            tag:"クラシカルな美貌と確かな演技力で映画・舞台を席巻",                   marital:"未婚", spouse:null, spouseNote:null },
  "松村北斗":  { born:"1994/10/30", height:"178cm", blood:"B型",  from:"静岡",          nick:"ほくと",     role:"俳優・クール担当",          skill:"読書・演技",              tag:"哲学的な言葉と繊細な演技で唯一無二の世界観を構築",                   marital:"未婚", spouse:null, spouseNote:null },
  "髙地優吾":  { born:"1994/10/13", height:"174cm", blood:"O型",  from:"千葉",          nick:"こーち",     role:"バラエティ担当",            skill:"ゲーム・料理",            tag:"天然の毒舌と温かいキャラクターでグループの潤滑油",                   marital:"未婚", spouse:null, spouseNote:null },
  "田中樹":   { born:"1994/7/27",  height:"172cm", blood:"A型",  from:"大阪",          nick:"じゅり",     role:"ラップ・DJ担当",            skill:"ラップ・DJ",              tag:"圧倒的なラップスキルと音楽プロデュース力を持つ才人",                 marital:"未婚", spouse:null, spouseNote:null },
  "森本慎太郎":{ born:"1998/9/23",  height:"176cm", blood:"O型",  from:"東京",          nick:"しんたろ",   role:"末っ子・ダンス担当",        skill:"ダンス・バスケ",          tag:"末っ子ながらキレキレのダンスで存在感を放つ逸材",                     marital:"未婚", spouse:null, spouseNote:null },

  // ══ Snow Man ══
  "岩本照":   { born:"1993/9/17",  height:"178cm", blood:"B型",  from:"東京",          nick:"いわぼく",   role:"リーダー",                  skill:"アクロバット・バク転",    tag:"圧倒的な身体能力でグループを牽引する絶対的センター",                 marital:"未婚", spouse:null, spouseNote:null },
  "深澤辰哉": { born:"1994/5/5",   height:"172cm", blood:"O型",  from:"神奈川",        nick:"ふっか",     role:"バラエティ担当",            skill:"ものまね・トーク",        tag:"天然ボケと鋭いツッコミで番組を盛り上げる無限の才能",                 marital:"未婚", spouse:null, spouseNote:null },
  "ラウール":  { born:"2002/8/26",  height:"184cm", blood:"A型",  from:"東京",          nick:"ラウ",       role:"ビジュアル担当",            skill:"サッカー・ダンス",        tag:"最年少ながらパリコレにも登場する国際的なビジュアル",                 marital:"未婚", spouse:null, spouseNote:null },
  "渡辺翔太": { born:"1994/10/25", height:"175cm", blood:"O型",  from:"神奈川",        nick:"しょっぴー", role:"ファッション担当",          skill:"ファッション・料理",      tag:"Snow Man随一のファッションセンスを誇るスタイリスト",                 marital:"未婚", spouse:null, spouseNote:null },
  "向井康二": { born:"1994/6/18",  height:"170cm", blood:"B型",  from:"大阪",          nick:"こーじ",     role:"お笑い担当",                skill:"料理・ボケ",              tag:"大阪出身の天性のエンターテイナー。料理の腕前も本格派",               marital:"未婚", spouse:null, spouseNote:null },
  "阿部亮平": { born:"1993/12/7",  height:"175cm", blood:"A型",  from:"新潟",          nick:"あべちゃん", role:"頭脳担当",                  skill:"気象予報士・クイズ",      tag:"上智大学卒・気象予報士資格保持。Snow Manの知的担当",                 marital:"未婚", spouse:null, spouseNote:null },
  "佐久間大介":{ born:"1992/11/9",  height:"172cm", blood:"A型",  from:"埼玉",          nick:"さっくん",   role:"アニメ・ダンス担当",        skill:"ダンス・アニメ鑑賞",      tag:"圧倒的なダンス技術と純粋無垢なアニメ愛が魅力",                     marital:"未婚", spouse:null, spouseNote:null },
  "宮舘涼太": { born:"1994/7/25",  height:"178cm", blood:"O型",  from:"東京",          nick:"だて様",     role:"王子様担当",                skill:"乗馬・スポーツ全般",      tag:"王子様キャラで愛され続ける紳士。乗馬の腕前は本物",                   marital:"未婚", spouse:null, spouseNote:null },
  "目黒蓮":   { born:"1997/1/20",  height:"179cm", blood:"A型",  from:"東京",          nick:"れんれん",   role:"俳優・モデル担当",          skill:"バスケ・演技",            tag:"ドラマ・映画で活躍する実力派。クールな眼差しが印象的",               marital:"未婚", spouse:null, spouseNote:null },

  // ══ なにわ男子 ══
  "大西流星": { born:"2000/5/4",   height:"170cm", blood:"A型",  from:"大阪",          nick:"りゅせい",   role:"ビジュアル担当",            skill:"絵を描く・ファッション",  tag:"繊細な画力とファッションセンスを持つアーティスト気質",               marital:"未婚", spouse:null, spouseNote:null },
  "道枝駿佑": { born:"2002/7/25",  height:"174cm", blood:"A型",  from:"大阪",          nick:"みっちー",   role:"俳優担当",                  skill:"料理・演技",              tag:"子役出身の天才俳優。料理の腕前はプロ級の実力",                       marital:"未婚", spouse:null, spouseNote:null },
  "高橋恭平": { born:"1999/9/9",   height:"175cm", blood:"O型",  from:"大阪",          nick:"きょへい",   role:"お笑い担当",                skill:"お笑い・トーク",          tag:"大阪魂のボケ担当。天然と計算が混在する唯一無二のキャラ",             marital:"未婚", spouse:null, spouseNote:null },
  "西畑大吾": { born:"1998/5/20",  height:"173cm", blood:"A型",  from:"大阪",          nick:"にしきー",   role:"リーダー",                  skill:"ゴルフ・トーク",          tag:"グループを束ねる頼もしいリーダー。ゴルフの腕も本物",                 marital:"未婚", spouse:null, spouseNote:null },
  "長尾謙杜": { born:"2000/11/27", height:"179cm", blood:"O型",  from:"大阪",          nick:"ながお",     role:"ダンス担当",                skill:"バスケ・ダンス",          tag:"長身を活かしたダイナミックなダンスが圧巻の実力者",                   marital:"未婚", spouse:null, spouseNote:null },
  "藤原丈一郎":{ born:"1997/12/20", height:"177cm", blood:"O型",  from:"大阪",          nick:"じょー",     role:"バラエティ担当",            skill:"野球・トーク",            tag:"高校球児出身の熱血キャラ。バラエティではツッコミの要",               marital:"未婚", spouse:null, spouseNote:null },
  "玉川聡一": { born:"2002/3/22",  height:"180cm", blood:"B型",  from:"大阪",          nick:"たまちゃん", role:"末っ子・ギター担当",        skill:"ギター・歌",              tag:"末っ子ながら高身長と音楽センスでグループに彩りを添える",             marital:"未婚", spouse:null, spouseNote:null },

  // ══ Travis Japan ══
  "松倉海斗": { born:"1998/4/20",  height:"178cm", blood:"O型",  from:"千葉",          nick:"まつくら",   role:"リーダー",                  skill:"ダンス・料理",            tag:"ストイックな練習量と強いリーダーシップでグループを導く",             marital:"未婚", spouse:null, spouseNote:null },
  "中村海人": { born:"1999/7/11",  height:"175cm", blood:"A型",  from:"神奈川",        nick:"うみんちゅ", role:"ダンス担当",                skill:"スケートボード・ダンス",  tag:"圧倒的なダンス技術と個性的なファッションセンスが魅力",               marital:"未婚", spouse:null, spouseNote:null },
  "七五三掛龍也":{ born:"1997/8/24", height:"173cm", blood:"O型", from:"神奈川",         nick:"しめかけ",   role:"DJ・バラエティ担当",        skill:"DJ・ラップ",              tag:"音楽プロデュースにも関わる多才なDJ。バラエティでも活躍",             marital:"未婚", spouse:null, spouseNote:null },
  "川島如恵留":{ born:"1992/11/7",  height:"172cm", blood:"A型",  from:"東京",          nick:"のえる",     role:"最年長・頭脳担当",          skill:"読書・語学",              tag:"早稲田大学卒の超高学歴メンバー。冷静な判断力でチームを支える",       marital:"未婚", spouse:null, spouseNote:null },
  "宮近海斗": { born:"1997/12/12", height:"174cm", blood:"B型",  from:"広島",          nick:"ちゃか",     role:"バラエティ担当",            skill:"ゲーム・ダンス",          tag:"広島出身の爆発的なキャラ。バラエティ番組では天才的なボケ",           marital:"未婚", spouse:null, spouseNote:null },
  "吉澤閑也": { born:"1997/6/16",  height:"181cm", blood:"A型",  from:"千葉",          nick:"しずや",     role:"ビジュアル担当",            skill:"料理・ダンス",            tag:"長身ビジュアルと繊細な料理センスを兼ね備えた二刀流",                 marital:"未婚", spouse:null, spouseNote:null },
  "元太":     { born:"1997/5/22",  height:"168cm", blood:"O型",  from:"東京",          nick:"げんた",     role:"アクロバット担当",          skill:"アクロバット・ダンス",    tag:"小柄ながら最高難度のアクロバットを軽々とこなす驚異の身体能力",       marital:"未婚", spouse:null, spouseNote:null },

  // ══ Aぇ! group ══
  "末澤誠也": { born:"1995/7/8",   height:"171cm", blood:"A型",  from:"大阪",          nick:"すえちゃん", role:"リーダー",                  skill:"MC・ダンス",              tag:"Aぇ!をまとめる頼もしいリーダー。MC力と包容力でメンバーを支える",     marital:"未婚", spouse:null, spouseNote:null },
  "佐野晶哉": { born:"1999/5/19",  height:"180cm", blood:"O型",  from:"大阪",          nick:"しょうや",   role:"ビジュアル担当",            skill:"ダンス・歌",              tag:"長身のビジュアル担当。しっかりした歌声とダンスでクオリティを高める", marital:"未婚", spouse:null, spouseNote:null },
  "小島健":   { born:"1998/12/14", height:"172cm", blood:"A型",  from:"大阪",          nick:"こじけん",   role:"バラエティ担当",            skill:"バラエティ・ゲーム",      tag:"大阪仕込みのバラエティ感覚でグループのお笑い担当として活躍",         marital:"未婚", spouse:null, spouseNote:null },
  "草間リチャード敬太":{ born:"1999/2/21", height:"174cm", blood:"O型", from:"大阪(米国ルーツ)", nick:"リチャード", role:"ユニーク・バラエティ担当", skill:"バラエティ・英語", tag:"大阪×アメリカのハーフが生み出す唯一無二のキャラクター。英語も堪能", marital:"未婚", spouse:null, spouseNote:null },
  "福本大晴": { born:"2000/3/5",   height:"170cm", blood:"O型",  from:"大阪",          nick:"ふくちゃん", role:"ダンス担当",                skill:"ダンス・筋トレ",          tag:"Aぇ!のダンスエース。ストイックな練習量と高い身体能力でグループを牽引", marital:"未婚", spouse:null, spouseNote:null },
  "正門良規": { born:"1998/12/25", height:"175cm", blood:"A型",  from:"大阪",          nick:"まさかど",   role:"音楽担当",                  skill:"ギター・作曲",            tag:"Aぇ!の音楽担当。ギターと作曲の才能でグループに独自の音楽色を与える", marital:"未婚", spouse:null, spouseNote:null },

  // ══ 木村拓哉 ══
  "木村拓哉": { born:"1972/11/13", height:"176cm", blood:"A型",  from:"東京",          nick:"キムタク",   role:"ソロアーティスト・俳優",    skill:"演技・バイク・スノーボード",tag:"日本を代表するスーパースター。30年以上トップを走り続ける不屈のアイコン", marital:"既婚", spouse:"工藤静香", spouseNote:"歌手・女優" },

  // ══ Number_i ══
  "平野紫耀": { born:"1997/1/17",  height:"176cm", blood:"A型",  from:"愛知",          nick:"しょう",     role:"センター・ビジュアル",      skill:"ダンス・バク転",          tag:"Number_iのセンター。世界規模の人気を誇るビジュアルと実力を持つエース", marital:"未婚", spouse:null, spouseNote:null },
  "神宮寺勇太":{ born:"1997/10/30", height:"180cm", blood:"O型",  from:"埼玉",          nick:"じんくん",   role:"ボーカル・ビジュアル",      skill:"歌・バスケ",              tag:"甘いルックスとパワフルな歌声で魅了するNumber_iのエースボーカル",     marital:"未婚", spouse:null, spouseNote:null },
  "岸優太":   { born:"1994/9/29",  height:"178cm", blood:"O型",  from:"埼玉",          nick:"きっしー",   role:"バラエティ・トーク担当",    skill:"ゲーム・トーク",          tag:"天然全力キャラはTOBEでも健在。Number_iのムードメーカー",             marital:"未婚", spouse:null, spouseNote:null },

  // ══ IMP. ══
  "佐藤新":   { born:"2001/8/11",  height:"172cm", blood:"A型",  from:"東京",          nick:"あらちゃん", role:"センター・リーダー",        skill:"ダンス・歌",              tag:"IMP.のセンター。泣きぼくろがトレードマークの圧倒的ビジュアル担当",   marital:"未婚", spouse:null, spouseNote:null },
  "影山拓也": { born:"2001/4/3",   height:"176cm", blood:"B型",  from:"神奈川",        nick:"かげちゃん", role:"ダンス担当",                skill:"ダンス・筋トレ",          tag:"切れ味鋭いダンスとストイックな肉体美でグループを牽引する実力者",     marital:"未婚", spouse:null, spouseNote:null },
  "鈴木大河": { born:"2002/1/17",  height:"178cm", blood:"O型",  from:"東京",          nick:"たいが",     role:"ビジュアル担当",            skill:"演技・ダンス",            tag:"爽やかなビジュアルと演技力を兼ね備えた次世代マルチタレント",         marital:"未婚", spouse:null, spouseNote:null },
  "基俊介":   { born:"2000/9/4",   height:"174cm", blood:"A型",  from:"大阪",          nick:"もとっち",   role:"お笑い・バラエティ担当",    skill:"お笑い・トーク",          tag:"大阪出身の天然キャラでグループの空気を一変させる笑いの天才",         marital:"未婚", spouse:null, spouseNote:null },
  "椿泰我":   { born:"2001/10/24", height:"173cm", blood:"B型",  from:"東京",          nick:"つばき",     role:"ダンス・ラップ担当",        skill:"ラップ・ダンス",          tag:"メロウなラップと唯一無二のキャラクターでIMP.のエッジを演出",         marital:"未婚", spouse:null, spouseNote:null },
  "横原悠毅": { born:"2000/6/4",   height:"177cm", blood:"O型",  from:"大阪",          nick:"ゆうき",     role:"ビジュアル・歌担当",        skill:"歌・水泳",                tag:"伸びやかなボーカルとスタイリッシュな佇まいで魅了する実力派",         marital:"未婚", spouse:null, spouseNote:null },
  "松井奏":   { born:"2003/2/2",   height:"170cm", blood:"A型",  from:"愛知",          nick:"かなた",     role:"末っ子・ダンス担当",        skill:"ダンス・ピアノ",          tag:"IMP.最年少ながら完成度の高いダンスと音楽センスで存在感を放つ",       marital:"未婚", spouse:null, spouseNote:null },

  // ══ CLASS SEVEN ══
  "大東立樹": { born:"2008/8/4",   height:"172cm", blood:"O型",  from:"東京",          nick:"たつき",     role:"センター・俳優担当",        skill:"演技・ダンス",            tag:"劇団四季出身の実力派。CLASS SEVENのセンターとして圧倒的な表現力",    marital:"未婚", spouse:null, spouseNote:null },
  "髙野秀侑": { born:"2008/2/5",   height:"168cm", blood:"A型",  from:"神奈川",        nick:"しゅうゆ",   role:"ビジュアル担当",            skill:"ダンス・歌",              tag:"透明感あふれるビジュアルで一際目を引くCLASS SEVENの注目株",         marital:"未婚", spouse:null, spouseNote:null },
  "高田憐":   { born:"2009/2/27",  height:"166cm", blood:"B型",  from:"東京",          nick:"れん",       role:"ダンス担当",                skill:"ダンス・アクロバット",    tag:"若さと技術力を兼ね備えたダンサー。アクロバットの才能も光る",         marital:"未婚", spouse:null, spouseNote:null },
  "近藤大海": { born:"2008/5/12",  height:"170cm", blood:"O型",  from:"大阪",          nick:"たいかい",   role:"バラエティ担当",            skill:"ゲーム・お笑い",          tag:"大阪出身のムードメーカー。グループの場を和ませる天然キャラ",         marital:"未婚", spouse:null, spouseNote:null },
  "横田大雅": { born:"2004/6/8",   height:"178cm", blood:"A型",  from:"東京",          nick:"たいが",     role:"最年長・リーダー",          skill:"バスケ・ダンス",          tag:"CLASS SEVEN最年長。落ち着いた眼差しとリーダーシップでグループを導く", marital:"未婚", spouse:null, spouseNote:null },
  "星慧音":   { born:"2009/1/15",  height:"165cm", blood:"B型",  from:"埼玉",          nick:"けいと",     role:"歌・ボーカル担当",          skill:"歌・ピアノ",              tag:"繊細な歌声と音楽センスを持つCLASS SEVENのメインボーカル候補",       marital:"未婚", spouse:null, spouseNote:null },
  "中澤漣":   { born:"2008/10/3",  height:"169cm", blood:"O型",  from:"千葉",          nick:"れん",       role:"ダンス・ラップ担当",        skill:"ラップ・ダンス",          tag:"リズム感と独特のスウェグでCLASS SEVENに個性的な色を加える存在",     marital:"未婚", spouse:null, spouseNote:null },

  // ══ ソロ ══
  "三宅健":   { born:"1978/7/2",   height:"165cm", blood:"A型",  from:"東京",          nick:"けんちゃん", role:"マルチアーティスト",        skill:"ダンス・舞台",            tag:"V6元メンバー。約30年のキャリアを持つ孤高のアーティスト。TOBEの重鎮", marital:"未婚", spouse:null, spouseNote:null },
  "北山宏光": { born:"1985/9/17",  height:"170cm", blood:"A型",  from:"京都",          nick:"みっくん",   role:"アーティスト・俳優",        skill:"ローラースケート・歌",    tag:"Kis-My-Ft2元メンバー。ローラースケートダンスは唯一無二。TOBEで再出発", marital:"未婚", spouse:null, spouseNote:null },
};

export default PROFILES;
