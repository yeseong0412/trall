import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BarChart3 } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24 space-y-8 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-red-500">
          캐릭터 클릭 배틀!
        </h1>
        <p className="text-xl text-gray-300 max-w-lg mx-auto">
          캐릭터를 선택하고 클릭하여 승리를 도와주세요!
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 mt-8 w-full max-w-3xl justify-center">
        <Link href="/a" className="w-full md:w-auto">
          <Button
            className="w-full h-40 md:h-60 md:w-60 bg-gradient-to-br from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300 text-white shadow-lg rounded-xl transition-all duration-300 hover:scale-105 overflow-hidden"
          >
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-32 h-32 rounded-full overflow-hidden">
                <Image
                    src="https://cdn.gukjenews.com/news/photo/202504/3251416_3361998_523.png"
                  alt="트랄라레로 트랄랄라"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-lg font-medium">트랄라레로 트랄랄라</span>
            </div>
          </Button>
        </Link>

        <div className="flex items-center justify-center">
          <div className="bg-white/10 p-4 rounded-full">
            <span className="text-2xl font-bold">VS</span>
          </div>
        </div>

        <Link href="/b" className="w-full md:w-auto">
          <Button
            className="w-full h-40 md:h-60 md:w-60 bg-gradient-to-br from-red-600 to-red-400 hover:from-red-500 hover:to-red-300 text-white shadow-lg rounded-xl transition-all duration-300 hover:scale-105 overflow-hidden"
          >
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-32 h-32 rounded-full overflow-hidden">
                <Image
                    src="https://i1.sndcdn.com/artworks-qJ5IFyKat8H70Vkz-tYUbnQ-t1080x1080.jpg"
                  alt="퉁퉁퉁퉁 사후라"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-lg font-medium">퉁퉁퉁퉁 사후라</span>
            </div>
          </Button>
        </Link>
      </div>

      <Link href="/leaderboard" className="mt-8">
        <Button
          variant="outline"
          className="gap-2 border-gray-600 text-gray-300 hover:bg-gray-800"
        >
          <BarChart3 className="w-4 h-4" />
          순위표 보기
        </Button>
      </Link>
    </main>
  );
}