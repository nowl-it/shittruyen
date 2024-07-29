import { BackgroundBeams } from '@/components/ui/background-beams';
import { Spotlight } from '@/components/ui/spotlight';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/welcome')({
	component: Welcome
});

export default function Welcome() {
	return (
		<main className="default/dark relative flex h-screen w-full items-center justify-center overflow-hidden bg-black antialiased">
			<Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="white" />
			<div className="text-center text-primary">
				<h1 className="mb-6 text-7xl font-bold">
					ShitTruyen <span className="text-sm">beta</span>
				</h1>
				<p className="mx-auto mt-2 w-3/5 text-lg text-primary">
					ShitTruyen đơn giản là một desktop app đa nền tảng của web Cứt Truyện nhưng nhiều tính năng hơn.
				</p>
				<span className="text-sm text-gray-400">
					Đây là dự án mã nguồn mở (
					<a className="text-sky-500" href="https://github.com/huyhoangg9owl/shittruyen" target="_blank">
						open source
					</a>
					)
				</span>

				<h2 className="mx-auto mt-4 w-2/3 italic text-gray-500">
					Hiện tại dự án đang trong quá trình phát triển, vui lòng kiên nhẫn chờ đợi.
					<br />
					Bạn có thể{' '}
					<a href="https://www.facebook.com/9owlsama" className="text-sky-400" target="_blank">
						liên hệ với tôi
					</a>{' '}
					để nhận thông báo khi ứng dụng hoàn thiện.
				</h2>
			</div>
			<BackgroundBeams />
		</main>
	);
}
