import { ApplyThemes } from '@/lib/themes';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	try {
		await ApplyThemes();
		return NextResponse.json({ updated: true }, { status: 200 });
	} catch (e) {
		return NextResponse.json({ updated: false, error: e }, { status: 500 });
	}
}
