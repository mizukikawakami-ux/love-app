import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ALL_SLUGS } from '@/lib/slug';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Couple Vibe — Compatibility';

export function generateStaticParams() {
    const params: { a: string; b: string }[] = [];
    for (const a of ALL_SLUGS) for (const b of ALL_SLUGS) params.push({ a, b });
    return params;
}

async function toDataUri(slug: string) {
    const data = await readFile(join(process.cwd(), 'public', 'images', 'animals', `${slug}.png`));
    return `data:image/png;base64,${(data as Buffer).toString('base64')}`;
}

export default async function Image({ params }: { params: Promise<{ a: string; b: string }> }) {
    const { a, b } = await params;
    const [imgA, imgB] = await Promise.all([toDataUri(a), toDataUri(b)]);

    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', background: '#F5F5F0', fontFamily: 'sans-serif',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={imgA} width={280} height={280} style={{ borderRadius: 9999, border: '12px solid #fff', objectFit: 'cover' }} alt="" />
                    <div style={{ fontSize: 64, color: '#D4AF37', fontWeight: 700 }}>×</div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={imgB} width={280} height={280} style={{ borderRadius: 9999, border: '12px solid #fff', objectFit: 'cover' }} alt="" />
                </div>
                <div style={{ fontSize: 44, fontWeight: 700, color: '#2D2B3F', marginTop: 36, letterSpacing: '0.1em' }}>Couple Vibe</div>
                <div style={{ fontSize: 28, color: '#97af79', marginTop: 4 }}>Compatibility</div>
            </div>
        ),
        size,
    );
}
