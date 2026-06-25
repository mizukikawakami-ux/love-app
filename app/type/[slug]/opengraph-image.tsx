import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ALL_SLUGS } from '@/lib/slug';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Couple Vibe';

export function generateStaticParams() {
    return ALL_SLUGS.map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const imgData = await readFile(join(process.cwd(), 'public', 'images', 'animals', `${slug}.png`));
    const imgSrc = `data:image/png;base64,${(imgData as Buffer).toString('base64')}`;

    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', background: '#F5F5F0', fontFamily: 'sans-serif',
                }}
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imgSrc} width={320} height={320} style={{ borderRadius: 9999, border: '12px solid #fff', objectFit: 'cover' }} alt="" />
                <div style={{ fontSize: 44, fontWeight: 700, color: '#2D2B3F', marginTop: 30, letterSpacing: '0.1em' }}>Couple Vibe</div>
                <div style={{ fontSize: 28, color: '#97af79', marginTop: 4 }}>Your Type</div>
            </div>
        ),
        size,
    );
}
