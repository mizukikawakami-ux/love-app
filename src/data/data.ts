export type MBTIType =
    | 'INTJ' | 'INTP' | 'ENTJ' | 'ENTP'
    | 'INFJ' | 'INFP' | 'ENFJ' | 'ENFP'
    | 'ISTJ' | 'ISFJ' | 'ESTJ' | 'ESFJ'
    | 'ISTP' | 'ISFP' | 'ESTP' | 'ESFP';

export type Dimension = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';

export interface Question {
    id: number;
    text: string;
    category?: 'General' | 'Intimacy';
    dimension: {
        axis: 'EI' | 'SN' | 'TF' | 'JP'; // Which axis this question scores
        options: [
            { text: string; value: Dimension }, // Option A
            { text: string; value: Dimension }  // Option B
        ]
    };
}

export type LoveLanguageType = 'Acts' | 'Words' | 'Time' | 'Touch' | 'Gifts';

export interface AnimalType {
    id: MBTIType;
    name: string; // Display Name (Animal)
    catchCopy: string; // Catchphrase
    description: {
        daily: string;
        obsession: string;
        night: string; // Locked content
        reconcile: string; // Locked content
    };
    loveLanguage: {
        type: LoveLanguageType;
        advice: string;
    };
    image: string;
}

export const ANIMAL_TYPES: Record<MBTIType, AnimalType> = {
    'INTJ': {
        id: 'INTJ',
        catchCopy: '計画通りに進めたいドSな参謀',
        name: 'ブラックパンサー',
        description: {
            daily: '効率が全て。無駄話はスルー。興味ある話題だけ早口になる。',
            obsession: '論理的整合性',
            night: 'サプライズ嫌い。夜も最適化しがちだが技術向上心は高い。',
            reconcile: '感情論NG。「私が悪かった点はAとB」と論理的に説明せよ。'
        },
        loveLanguage: { type: 'Acts', advice: '「口先だけの愛は不要。黙って皿洗いをするか、彼らのタスクを減らせ。それが最大の求愛だ。」' },
        image: '/images/animals/INTJ.png'
    },
    'INTP': {
        id: 'INTP',
        catchCopy: '脳内会議が止まらない博士',
        name: 'フクロウ',
        description: {
            daily: '基本部屋の隅にいる。反応が薄い時は宇宙の真理を考えている。',
            obsession: '一人の時間',
            night: '行為中も思考停止しない。マニアックな知識と実験が好き。',
            reconcile: '放置推奨。美味しいご飯を黙って置けば自分から戻ってくる。'
        },
        loveLanguage: { type: 'Time', advice: '「スマホを置け。1日10分、目を見て話を聞くか、ただ同じ空間で過ごせ。その『質の高い時間』だけが愛としてカウントされる。」' },
        image: '/images/animals/INTP.png'
    },
    'ENTJ': {
        id: 'ENTJ',
        catchCopy: '家庭内のCEO',
        name: 'ライオン',
        description: {
            daily: '家事もデートも指揮したい。パートナーを部下だと思っている節がある。',
            obsession: '有能であること',
            night: '支配欲の塊。「私の指示に従えば幸せになれる」と信じている。',
            reconcile: '「結論から言うと私が悪い。改善策はこれ」とプレゼンせよ。'
        },
        loveLanguage: { type: 'Words', advice: '「察してはいけない。思っていることの10倍『好き』『すごい』と言葉にしろ。称賛のシャワーだけが彼らを安心させる。」' },
        image: '/images/animals/ENTJ.png'
    },
    'ENTP': {
        id: 'ENTP',
        catchCopy: '口喧嘩はスポーツだと思ってる策士',
        name: 'キツネ',
        description: {
            daily: '「逆に言うと」が口癖。平穏な会話に波風を立てて楽しむ。',
            obsession: '知的な刺激',
            night: 'マンネリ大敵。議論を吹っかけるが新しい玩具への食いつきは良い。',
            reconcile: '「面白い話があるんだけど」と別の話題で笑わせればリセット。'
        },
        loveLanguage: { type: 'Time', advice: '「スマホを置け。1日10分、目を見て話を聞くか、ただ同じ空間で過ごせ。その『質の高い時間』だけが愛としてカウントされる。」' },
        image: '/images/animals/ENTP.png'
    },
    'INFJ': {
        id: 'INFJ',
        catchCopy: '愛が重めの預言者',
        name: 'ハクチョウ',
        description: {
            daily: '何も言わずに察してくるエスパー。基本優しいが突然絶縁する癖あり。',
            obsession: '精神的な誠実さ',
            night: '身体以上に心の合一重視。一度スイッチが入ると一番ディープ。',
            reconcile: 'ひたすら誠意を見せる。言い訳せず感情を込めた手紙を書け。'
        },
        loveLanguage: { type: 'Time', advice: '「スマホを置け。1日10分、目を見て話を聞くか、ただ同じ空間で過ごせ。その『質の高い時間』だけが愛としてカウントされる。」' },
        image: '/images/animals/INFJ.png'
    },
    'INFP': {
        id: 'INFP',
        catchCopy: '妄想で生きてる不思議ちゃん',
        name: 'ウサギ',
        description: {
            daily: '現実より脳内ファンタジーに住んでいる。急にポエムを送ってくる。',
            obsession: '自分らしさ',
            night: '繊細なロマンチスト。脳内で壮大なファンタジーを展開中。',
            reconcile: '大声NG。「悲しませてごめん」と優しくハグ＆スイーツ。'
        },
        loveLanguage: { type: 'Words', advice: '「察してはいけない。思っていることの10倍『好き』『すごい』と言葉にしろ。称賛のシャワーだけが彼らを安心させる。」' },
        image: '/images/animals/INFP.png'
    },
    'ENFJ': {
        id: 'ENFJ',
        catchCopy: '愛の押し売りカウンセラー',
        name: 'イルカ',
        description: {
            daily: '頼まれてないのに世話を焼く。全人類と仲良くしたい。',
            obsession: '調和と感謝',
            night: '尽くす自分が好き。相手の反応が燃料。「気持ちいい？」と聞きすぎ。',
            reconcile: '「君がいないとダメだ」と依存せよ。必要とされれば許す。'
        },
        loveLanguage: { type: 'Words', advice: '「察してはいけない。思っていることの10倍『好き』『すごい』と言葉にしろ。称賛のシャワーだけが彼らを安心させる。」' },
        image: '/images/animals/ENFJ.png'
    },
    'ENFP': {
        id: 'ENFP',
        catchCopy: '3秒で気が散る甘えん坊',
        name: 'ラッコ',
        description: {
            daily: '常に何か忘れている。真面目な話中に「あ、猫！」と脱線する。',
            obsession: 'ワクワク感',
            night: '常にくっついていたい。深刻なムードより遊び心のある夜が好き。',
            reconcile: '「ごめん！これあげる！」とハグして楽しい場所へ連れ出せ。'
        },
        loveLanguage: { type: 'Touch', advice: '「理屈じゃない。喧嘩した時こそハグをしろ。手をつなぐ、肩に触れる、その体温だけで機嫌は直る。」' },
        image: '/images/animals/ENFP.png'
    },
    'ISTJ': {
        id: 'ISTJ',
        catchCopy: '歩く取扱説明書',
        name: 'ビーバー',
        description: {
            daily: '決まった時間に起きる。冷蔵庫の配置が変わるとソワソワする。',
            obsession: 'ルールと秩序',
            night: 'ルーティン命。「いつもと同じ」が安心。急な変更にフリーズする。',
            reconcile: '「今後は再発防止のためにこうする」と具体的対策を約束せよ。'
        },
        loveLanguage: { type: 'Acts', advice: '「口先だけの愛は不要。黙って皿洗いをするか、彼らのタスクを減らせ。それが最大の求愛だ。」' },
        image: '/images/animals/ISTJ.png'
    },
    'ISFJ': {
        id: 'ISFJ',
        catchCopy: '断れない平和主義者',
        name: 'ペンギン',
        description: {
            daily: '「なんでもいいよ」は嘘。我慢ポイントを貯めて突然爆発する。',
            obsession: '平穏な日常',
            night: '相手に合わせすぎて疲れる。自分の快楽より相手の満足を優先。',
            reconcile: 'とにかく謝る。理屈抜きで「辛い思いをさせてごめん」と共感せよ。'
        },
        loveLanguage: { type: 'Acts', advice: '「口先だけの愛は不要。黙って皿洗いをするか、彼らのタスクを減らせ。それが最大の求愛だ。」' },
        image: '/images/animals/ISFJ.png'
    },
    'ESTJ': {
        id: 'ESTJ',
        catchCopy: '正論パンチの鬼軍曹',
        name: 'シェパード',
        description: {
            daily: '家の中でも管理職。「靴下脱ぎっぱなし！」と小言が多い。',
            obsession: '責任遂行',
            night: 'ムード中も「鍵かけた？」と確認。愛情表現はストレート。',
            reconcile: '「言われた通りにする」と従順な姿勢を見せよ。口答えは厳禁。'
        },
        loveLanguage: { type: 'Acts', advice: '「口先だけの愛は不要。黙って皿洗いをするか、彼らのタスクを減らせ。それが最大の求愛だ。」' },
        image: '/images/animals/ESTJ.png'
    },
    'ESFJ': {
        id: 'ESFJ',
        catchCopy: '褒められて伸びる学級委員長',
        name: 'G.レトリバー',
        description: {
            daily: 'SNSに家族写真を上げがち。「見て見て！」と共感を強要する。',
            obsession: '仲間はずれ禁止',
            night: '承認欲求の塊。「かわいい」「好き」の言葉がないと不安になる。',
            reconcile: 'プレゼント攻撃と褒めちぎり。「世界一大事」とチヤホヤせよ。'
        },
        loveLanguage: { type: 'Gifts', advice: '「高価な物は要らない。コンビニスイーツでも『君が好きそうだから』と渡せ。自分が愛されている証拠を常に求めている。」' },
        image: '/images/animals/ESFJ.png'
    },
    'ISTP': {
        id: 'ISTP',
        catchCopy: '都合のいい時だけ懐くツンデレ',
        name: 'ネコ',
        description: {
            daily: '基本話を聞いていない。壊れた家電を直す時だけカッコいい。',
            obsession: '自由',
            night: '束縛嫌い。言葉より体の反応を見る。道具への適応力が高い。',
            reconcile: '放置一択。追うと逃げる。放っておけば寂しくなって擦り寄る。'
        },
        loveLanguage: { type: 'Touch', advice: '「理屈じゃない。喧嘩した時こそハグをしろ。手をつなぐ、肩に触れる、その体温だけで機嫌は直る。」' },
        image: '/images/animals/ISTP.png'
    },
    'ISFP': {
        id: 'ISFP',
        catchCopy: '空気感が全てなマイペース芸術家',
        name: 'コアラ',
        description: {
            daily: 'ソファと同化している。センスが良いので部屋着はおしゃれ。',
            obsession: '美意識',
            night: '「なんか違う」で拒否する気分屋。肌触りや匂いに弱い。',
            reconcile: '議論NG。美味しいスイーツと良い香りの入浴剤で無言で癒やせ。'
        },
        loveLanguage: { type: 'Time', advice: '「スマホを置け。1日10分、目を見て話を聞くか、ただ同じ空間で過ごせ。その『質の高い時間』だけが愛としてカウントされる。」' },
        image: '/images/animals/ISFP.png'
    },
    'ESTP': {
        id: 'ESTP',
        catchCopy: '後先考えないスピード狂',
        name: 'チーター',
        description: {
            daily: '「とりあえず行ってみよう」でトラブルになるが何とかなる。',
            obsession: 'スリルと今',
            night: '刺激ジャンキー。「今夜どう？」の前に襲ってくる。短期集中型。',
            reconcile: '「ごめん！飲みに行こう！」で解決。食べて愛し合えば忘れる。'
        },
        loveLanguage: { type: 'Touch', advice: '「理屈じゃない。喧嘩した時こそハグをしろ。手をつなぐ、肩に触れる、その体温だけで機嫌は直る。」' },
        image: '/images/animals/ESTP.png'
    },
    'ESFP': {
        id: 'ESFP',
        catchCopy: '人生がミュージカルなパリピ',
        name: 'クジャク',
        description: {
            daily: '声が大きい。何でもイベントにしたがる。サプライズ大好き。',
            obsession: '注目されること',
            night: '自分が主役のステージ。ドラマチックな演出やシチュエーションに弱い。',
            reconcile: '花束を渡して跪くくらいドラマチックな演出で謝罪せよ。'
        },
        loveLanguage: { type: 'Gifts', advice: '「高価な物は要らない。コンビニスイーツでも『君が好きそうだから』と渡せ。自分が愛されている証拠を常に求めている。」' },
        image: '/images/animals/ESFP.png'
    },
};

export const QUESTIONS: Question[] = [
    // EI - Energy Source (5 questions)
    { id: 1, text: "休日の過ごし方でリフレッシュできるのは？", category: 'General', dimension: { axis: 'EI', options: [{ text: "友人と会ってワイワイ騒ぐ", value: 'E' }, { text: "家で一人、趣味に没頭する", value: 'I' }] } },
    { id: 2, text: "パーティーなどの社交場では？", category: 'General', dimension: { axis: 'EI', options: [{ text: "色々な人と積極的に話す", value: 'E' }, { text: "知っている人と静かに過ごす", value: 'I' }] } },
    { id: 3, text: "悩み事がある時は？", category: 'General', dimension: { axis: 'EI', options: [{ text: "誰かに話してスッキリしたい", value: 'E' }, { text: "一人でじっくり考えたい", value: 'I' }] } },
    { id: 4, text: "仕事や活動での役割は？", category: 'General', dimension: { axis: 'EI', options: [{ text: "チームを引っ張るリーダー", value: 'E' }, { text: "裏方で支えるサポーター", value: 'I' }] } },
    { id: 5, text: "新しい環境に入った時", category: 'General', dimension: { axis: 'EI', options: [{ text: "すぐに自分から話しかける", value: 'E' }, { text: "様子を見てから動く", value: 'I' }] } },

    // SN - Information Gathering (5 questions, includes Q1 Sexual)
    { id: 6, text: "物事を説明する時は？", category: 'General', dimension: { axis: 'SN', options: [{ text: "具体的な事実や詳細から", value: 'S' }, { text: "全体像や抽象的なイメージから", value: 'N' }] } },
    { id: 7, text: "興味があるのは？", category: 'General', dimension: { axis: 'SN', options: [{ text: "「今、何が起きているか」", value: 'S' }, { text: "「将来、どうなる可能性があるか」", value: 'N' }] } },
    { id: 8, text: "旅行の計画を立てるなら？", category: 'General', dimension: { axis: 'SN', options: [{ text: "観光スポットを効率よく回る", value: 'S' }, { text: "面白そうな路地に迷い込む", value: 'N' }] } },
    { id: 9, text: "指示を受けるなら？", category: 'General', dimension: { axis: 'SN', options: [{ text: "手順が明確なマニュアル", value: 'S' }, { text: "自由度の高い大まかな指針", value: 'N' }] } },
    // Sexual Q1 (S vs N)
    {
        id: 10,
        text: "夜の営みにおいて、より興奮するのは？",
        category: 'Intimacy',
        dimension: {
            axis: 'SN',
            options: [
                { text: "肌触り、匂い、視覚的な刺激（物理的快感）", value: 'S' },
                { text: "ムード、ストーリー性、精神的な繋がり（雰囲気と想像）", value: 'N' }
            ]
        }
    },

    // TF - Decision Making (5 questions, includes Q3 Sexual)
    { id: 11, text: "判断を下す時に重視するのは？", category: 'General', dimension: { axis: 'TF', options: [{ text: "論理的かどうか", value: 'T' }, { text: "相手の気持ちや調和", value: 'F' }] } },
    { id: 12, text: "友人から相談されたら？", category: 'General', dimension: { axis: 'TF', options: [{ text: "解決策を提案する", value: 'T' }, { text: "共感して話を聞く", value: 'F' }] } },
    { id: 13, text: "批判的な意見に対しては？", category: 'General', dimension: { axis: 'TF', options: [{ text: "正しければ受け入れる", value: 'T' }, { text: "傷つくし、反発したくなる", value: 'F' }] } },
    { id: 14, text: "「嘘」については？", category: 'General', dimension: { axis: 'TF', options: [{ text: "どんな時でも真実が良い", value: 'T' }, { text: "相手を傷つけない優しい嘘も必要", value: 'F' }] } },
    // Sexual Q3 (T vs F)
    {
        id: 15,
        text: "行為が終わった直後、頭に浮かびがちなのは？",
        category: 'Intimacy',
        dimension: {
            axis: 'TF',
            options: [
                { text: "「今の動きは良かったか？」等の技術的な振り返り", value: 'T' },
                { text: "「愛されているなぁ」等の満たされた感情", value: 'F' }
            ]
        }
    },

    // JP - Lifestyle (5 questions, includes Q2 Sexual)
    { id: 16, text: "日常生活では？", category: 'General', dimension: { axis: 'JP', options: [{ text: "計画を立ててスケジュール通りに", value: 'J' }, { text: "その時の気分で柔軟に", value: 'P' }] } },
    { id: 17, text: "部屋の片付けは？", category: 'General', dimension: { axis: 'JP', options: [{ text: "常に整理整頓されている", value: 'J' }, { text: "散らかっていても気にならない", value: 'P' }] } },
    { id: 18, text: "締め切りに対しては？", category: 'General', dimension: { axis: 'JP', options: [{ text: "余裕を持って完了させる", value: 'J' }, { text: "ギリギリになってから本気を出す", value: 'P' }] } },
    { id: 19, text: "決断のスピードは？", category: 'General', dimension: { axis: 'JP', options: [{ text: "素早く決めて、次へ進む", value: 'J' }, { text: "情報を集めて、選択肢を残しておく", value: 'P' }] } },
    // Sexual Q2 (J vs P)
    {
        id: 20,
        text: "理想的な夜の流れは？",
        category: 'Intimacy',
        dimension: {
            axis: 'JP',
            options: [
                { text: "ある程度決まったルーティンがあると安心", value: 'J' },
                { text: "その場のノリや、ハプニング的な展開を楽しみたい", value: 'P' }
            ]
        }
    },
];
