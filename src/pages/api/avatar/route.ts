import { NextRequest, NextResponse } from 'next/server';

async function imageBlob(url: string) {
	const response = await fetch(url);
	const blob = await response.blob();
	return blob;
}

export async function GET(request: NextRequest) {
	const type = request.nextUrl.searchParams.get('type') ?? '';

	if (['shittruyen', 'me'].includes(type) === false) {
		const image =
			'https://img.freepik.com/free-vector/hand-drawn-no-data-illustration_23-2150696467.jpg?w=360&t=st=1721030372~exp=1721030972~hmac=c2cbd963b9d5a0ae2574821325ed201ad45eea32988d334cc300d6ba6f2ef821';

		const blob = await imageBlob(image);

		return new NextResponse(blob);
	} else {
		const image =
			type === 'shittruyen'
				? 'https://graph.facebook.com/CuuTruyenTranh/picture?type=large'
				: 'https://graph.facebook.com/100076630297282/picture?type=large&access_token=5984119371651106|SNlkc02G9lTwkapFEivPRDhop7s';

		const blob = await imageBlob(image);

		return new NextResponse(blob);
	}
}
