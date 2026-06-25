import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Couple Vibe';

export default function OpengraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#F5F5F0',
                    fontFamily: 'sans-serif',
                }}
            >
                <div style={{ fontSize: 80, fontWeight: 700, color: '#2D2B3F', letterSpacing: '0.05em' }}>
                    Couple Vibe
                </div>
                <div style={{ fontSize: 34, color: '#97af79', marginTop: 16 }}>
                    16-Type Couple Compatibility Diagnosis
                </div>
                <div style={{ width: 120, height: 6, background: '#D4AF37', borderRadius: 9, marginTop: 28 }} />
            </div>
        ),
        size,
    );
}
