import { NextResponse } from 'next/server';
import { processFormData } from '@/lib/form';

export async function POST(request) {
    try {
        const data = await request.json();

        // Используем логику из `lib/form.js`
        const result = processFormData(data);

        if (result.error) {
            return NextResponse.json({ error: result.error }, { status: 400 });
        }

        return NextResponse.json({ message: result.message });
    } catch (error) {
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
}
