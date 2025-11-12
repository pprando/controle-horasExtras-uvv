import { Building2, Bell, LogOut, User as UserIcon, Sun, Moon } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { User, Screen } from '../App';
import { Theme } from '../App';

interface HeaderProps {
  user: User;
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
  notificationCount?: number;
  theme: Theme;
  onToggleTheme: () => void;
}

const getRoleLabel = (role: string) => {
  const labels = {
    gestor: 'Gestor',
    encarregado: 'Encarregado',
    tecnico: 'Técnico',
  };
  return labels[role as keyof typeof labels] || role;
};

export function Header({ user, onNavigate, onLogout, notificationCount = 3, theme, onToggleTheme }: HeaderProps) {
  return (
    <header className={theme === 'dark' 
      ? 'bg-zinc-900/50 border-b border-zinc-800 backdrop-blur-sm sticky top-0 z-50'
      : 'bg-white/50 border-b border-gray-200 backdrop-blur-sm sticky top-0 z-50'
    }>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button 
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <h1 className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Fortes Engenharia</h1>
              <p className={theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}>Controle de Horas Extras</p>
            </div>
          </button>

          <div className="flex items-center gap-4">
            <button
              onClick={onToggleTheme}
              className={theme === 'dark'
                ? 'p-2 hover:bg-zinc-800 rounded-lg transition-colors'
                : 'p-2 hover:bg-gray-100 rounded-lg transition-colors'
              }
              aria-label="Alternar tema"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-zinc-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>

            <button
              onClick={() => onNavigate('notificacoes')}
              className={theme === 'dark'
                ? 'relative p-2 hover:bg-zinc-800 rounded-lg transition-colors'
                : 'relative p-2 hover:bg-gray-100 rounded-lg transition-colors'
              }
              aria-label="Notificações"
            >
              <Bell className={theme === 'dark' ? 'w-5 h-5 text-zinc-400' : 'w-5 h-5 text-gray-600'} />
              {notificationCount > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-red-600 hover:bg-red-600 text-white">
                  {notificationCount}
                </Badge>
              )}
            </button>

            <div className={theme === 'dark'
              ? 'flex items-center gap-3 px-4 py-2 bg-zinc-800/50 rounded-lg'
              : 'flex items-center gap-3 px-4 py-2 bg-gray-100 rounded-lg'
            }>
              <div className="w-8 h-8 bg-blue-600/20 rounded-full flex items-center justify-center">
                <UserIcon className="w-4 h-4 text-blue-400" />
              </div>
              <div className="text-left">
                <p className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>{user.name}</p>
                <p className={theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}>{getRoleLabel(user.role)}</p>
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              className={theme === 'dark'
                ? 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}