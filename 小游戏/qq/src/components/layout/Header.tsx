import { ArrowLeft, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title: string;
  showBack?: boolean;
}

export const Header = ({ title, showBack = false }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            onClick={() => navigate('/')}
            className="p-2 rounded-full bg-white/50 hover:bg-white/80 transition-all duration-300 shadow-soft"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
        )}
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Sparkles className="w-7 h-7" />
          {title}
        </h1>
      </div>
    </header>
  );
};
