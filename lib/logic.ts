import { ANIMAL_TYPES, type AnimalType, type Dimension, type MBTIType } from '../data/data';

export const calculateScores = (answers: Dimension[]): Record<Dimension, number> => {
    const scores: Record<Dimension, number> = {
        E: 0, I: 0,
        S: 0, N: 0,
        T: 0, F: 0,
        J: 0, P: 0
    };

    answers.forEach((dim) => {
        scores[dim]++;
    });

    return scores;
};

export const determineAnimalType = (scores: Record<Dimension, number>): AnimalType => {
    // Determine each axis
    const ei = scores.E >= scores.I ? 'E' : 'I';
    const sn = scores.S >= scores.N ? 'S' : 'N';
    const tf = scores.T >= scores.F ? 'T' : 'F';
    const jp = scores.J >= scores.P ? 'J' : 'P';

    const mbti: MBTIType = `${ei}${sn}${tf}${jp}` as MBTIType;

    return ANIMAL_TYPES[mbti];
};

export interface CompatibilityResult {
    title: string;
    harmony: string[];
    friction: string[];
    solution: string;
    nightStrategy: string;
    reconcileStrategy: string;
}

export const calculateCompatibility = (userType: AnimalType, partnerType: AnimalType): CompatibilityResult => {
    const userCodes = userType.id.split('');
    const partnerCodes = partnerType.id.split('');

    const diffs = {
        EI: userCodes[0] !== partnerCodes[0],
        SN: userCodes[1] !== partnerCodes[1],
        TF: userCodes[2] !== partnerCodes[2],
        JP: userCodes[3] !== partnerCodes[3],
    };

    const harmony: string[] = [];
    const friction: string[] = [];
    let title = `${userType.name} × ${partnerType.name}`;

    // Dynamic Logic
    if (diffs.EI) {
        harmony.push('お互いの世界を広げ合える「外交」と「内向」の補完関係です。');
        friction.push('「人付き合いの頻度」や「休日の過ごし方」で疲れを感じるかもしれません。');
    } else {
        harmony.push('エネルギーの向け方が似ており、一緒にいて居心地が良いペアです。');
    }

    if (diffs.SN) {
        harmony.push('「現実的な視点」と「未来のビジョン」を共有し、最強のタッグになれます。');
        friction.push('話が噛み合わない時、「具体性が足りない」か「夢がない」と感じがちです。');
    } else {
        harmony.push('情報の受け取り方が似ており、言葉にしなくても通じ合う感覚があります。');
    }

    if (diffs.TF) {
        harmony.push('「論理」と「感情」のバランスが良く、お互いの見落としをカバーできます。');
        friction.push('議論になった時、「冷たい」または「感情的すぎる」と反発しやすいです。');
    } else {
        harmony.push('判断基準が似ており、大きな決断をする際にスムーズに進みます。');
    }

    if (diffs.JP) {
        harmony.push('「計画性」と「柔軟性」の役割分担ができれば、生活が上手く回ります。');
        friction.push('旅行や家事の進め方で、ペースの乱れを感じてイライラするかもしれません。');
    } else {
        harmony.push('生活リズムや計画へのスタンスが似ており、ストレスなく過ごせます。');
    }

    // Generate Solution based on friction, prioritizing the most conflicting axis
    let solution = "お互いの違いを「間違い」ではなく「特性」として認め合うことが第一歩です。";
    if (diffs.TF) {
        solution = "「正論」と「共感」はどちらも正解です。議論の前にまず『相手の気持ち』を受け止め、その後に『解決策』を提案するサンドイッチ話法を試してください。";
    } else if (diffs.JP) {
        solution = "「きちんとする」側が「まあいいか」側に歩み寄るには、最低限のルールを1つだけ決め（例：靴だけは揃える）、それ以外は目をつぶる『聖域』を作ることです。";
    } else if (diffs.SN) {
        solution = "具体的な事実を大切にする側と、意味や可能性を重視する側です。話が通じない時は、『具体例』と『目的』の両方をセットで話すように意識してください。";
    } else if (diffs.EI) {
        solution = "充電方法は人それぞれです。一方が一人になりたい時、それは『拒絶』ではなく『回復』の時間です。別々の部屋で過ごす時間をポジティブに捉えましょう。";
    }

    // Dynamic Night Strategy (Based on S/N mainly)
    let nightStrategy = "";
    if (diffs.SN) {
        // S (Physical) vs N (Mental)
        nightStrategy = "感覚派（S）と妄想派（N）の組み合わせです。S側は『肌触り・匂い・直接的な刺激』を重視し、N側は『ムード・ストーリー・焦らし』を重視します。前戯ではN側のための雰囲気作りを、本番ではS側のための物理的な刺激を意識すると、双方が深く満たされます。";
    } else if (userCodes[1] === 'S') {
        // Both S
        nightStrategy = "お互いに身体の感覚に敏感な『感覚派』同士です。言葉よりも、マッサージやアロマオイルなど、五感を直接刺激するアイテムを取り入れると相乗効果で盛り上がります。新しいおもちゃや場所の変化も効果的です。";
    } else {
        // Both N
        nightStrategy = "精神的な繋がりを重視する『ロマンチスト』同士です。行為そのものより、その前後の会話や、愛を囁き合う時間が重要です。少しドラマチックなシチュエーションや、コスプレなどのロールプレイも意外とハマる可能性があります。";
    }

    // Dynamic Reconcile Strategy (Based on T/F mainly)
    let reconcileStrategy = "";
    if (diffs.TF) {
        // T (Logic) vs F (Emotion)
        reconcileStrategy = "論理（T）と感情（F）のすれ違いが起きやすいペアです。T側は『解決策』を急がず、まず「辛かったね」と共感を示してください。F側は感情を爆発させる前に、「私はこう感じて悲しかった」と『I（私）メッセージ』で冷静に伝える努力が必要です。";
    } else if (userCodes[2] === 'T') {
        // Both T
        reconcileStrategy = "お互いに理屈で解決しようとするため、冷戦になりがちです。「どちらが正しいか」の議論は泥沼化します。「二人の目的（仲直り）にとって最適な行動は何か」という視点で、建設的な妥協点を提示し合うとスムーズです。";
    } else {
        // Both F
        reconcileStrategy = "お互いに傷つきやすく、感情が共鳴して共倒れになりやすいです。一度距離を置き、クールダウンしてから話し合いましょう。手紙やLINEなど、顔を見合わせない手段で気持ちを整理して伝えると、冷静さを取り戻せます。";
    }

    // Catchy Title Generation
    const sameCount = Object.values(diffs).filter(d => !d).length;
    if (sameCount === 4) title = "鏡のようなソウルメイト";
    else if (sameCount === 3) title = "似た者同士の安心感";
    else if (sameCount === 2) title = "補い合う成長のパートナー";
    else if (sameCount === 1) title = "自分にない魅力を持つ二人";
    else title = "正反対だからこそ惹かれ合う奇跡";

    return { title, harmony, friction, solution, nightStrategy, reconcileStrategy };
};
