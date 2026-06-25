import type { MBTIType } from '@/data/data';

/**
 * MBTI 4文字コードは商標のためユーザーに一切見せない。
 * URL・OGP・表示はすべて動物名ベースのslugを使い、コードは内部キーとしてのみ使用する。
 */
export const TYPE_SLUGS: Record<MBTIType, string> = {
    INTJ: 'black-panther',
    INTP: 'owl',
    ENTJ: 'lion',
    ENTP: 'fox',
    INFJ: 'swan',
    INFP: 'rabbit',
    ENFJ: 'dolphin',
    ENFP: 'sea-otter',
    ISTJ: 'beaver',
    ISFJ: 'penguin',
    ESTJ: 'shepherd',
    ESFJ: 'golden-retriever',
    ISTP: 'cat',
    ISFP: 'koala',
    ESTP: 'cheetah',
    ESFP: 'peacock',
};

const SLUG_TO_ID = Object.fromEntries(
    (Object.entries(TYPE_SLUGS) as [MBTIType, string][]).map(([id, slug]) => [slug, id]),
) as Record<string, MBTIType>;

export const ALL_SLUGS: string[] = Object.values(TYPE_SLUGS);

export function idToSlug(id: MBTIType): string {
    return TYPE_SLUGS[id];
}

export function slugToId(slug: string): MBTIType | null {
    return SLUG_TO_ID[slug] ?? null;
}
