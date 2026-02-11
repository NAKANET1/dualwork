import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

type LayoutProps = {
  title: ReactNode;
  children: ReactNode;
  rightButtons?: ReactNode;
};

function Layout({ title, children, rightButtons }: LayoutProps) {
  const navigate = useNavigate();
  const goHome = () => navigate('/');

  return (
    <div className="min-h-screen flex flex-col ml-20 mr-20">
      {/* ヘッダー */}
      <header className="w-full flex items-center justify-between px-6 py-4 bg-white relative">
        {/* 左：ロゴ */}
        <img src="/Logo.png" alt="Logo" className="w-48 h-12 cursor-pointer flex-shrink-0" onClick={goHome} />

        {/* 中央：タイトル */}
        <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
          <h1 className="text-4xl font-bold">{title}</h1>
        </div>

        {/* 右：ボタン */}
        <div className="flex gap-2">{rightButtons}</div>
      </header>

      {/* コンテンツ */}
      <main className="flex-grow px-6 w-full">{children}</main>
    </div>
  );
}

export default Layout;
