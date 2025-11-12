import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Building2, Lock, Mail, AlertCircle, Sun, Moon } from 'lucide-react';
import { User, UserRole, Theme } from '../App';
import { Alert, AlertDescription } from './ui/alert';

interface LoginScreenProps {
  onLogin: (user: User) => void;
  theme: Theme;
  onToggleTheme: () => void;
}

export function LoginScreen({ onLogin, theme, onToggleTheme }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Usuários mock para demonstração
  const mockUsers: Record<string, { password: string; name: string; role: UserRole }> = {
    'gestor@fortesengenharia.com': { password: 'gestor123', name: 'Carlos Silva', role: 'gestor' },
    'encarregado@fortesengenharia.com': { password: 'enc123', name: 'João Santos', role: 'encarregado' },
    'tecnico@fortesengenharia.com': { password: 'tec123', name: 'Maria Oliveira', role: 'tecnico' },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const user = mockUsers[email.toLowerCase()];
    
    if (!user || user.password !== password) {
      setError('Email ou senha inválidos. Tente novamente.');
      return;
    }

    onLogin({
      name: user.name,
      role: user.role,
      email: email,
    });
  };

  return (
    <div className={theme === 'dark'
      ? 'min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black'
      : 'min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200'
    }>
      <div className="absolute top-4 right-4">
        <button
          onClick={onToggleTheme}
          className={theme === 'dark'
            ? 'p-3 hover:bg-zinc-800 rounded-lg transition-colors bg-zinc-900/50 border border-zinc-800'
            : 'p-3 hover:bg-gray-100 rounded-lg transition-colors bg-white border border-gray-200'
          }
          aria-label="Alternar tema"
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-zinc-400" />
          ) : (
            <Moon className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>

      <Card className={theme === 'dark'
        ? 'w-full max-w-md p-8 bg-zinc-900/50 border-zinc-800 backdrop-blur-sm'
        : 'w-full max-w-md p-8 bg-white border-gray-200 shadow-xl'
      }>
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-4">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className={theme === 'dark' ? 'text-center text-white mb-2' : 'text-center text-gray-900 mb-2'}>
            Controle de Horas Extras
          </h1>
          <p className={theme === 'dark' ? 'text-zinc-400 text-center' : 'text-gray-600 text-center'}>
            Fortes Engenharia
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive" className={theme === 'dark'
              ? 'bg-red-950/50 border-red-900'
              : 'bg-red-50 border-red-200'
            }>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
              Email
            </Label>
            <div className="relative">
              <Mail className={theme === 'dark'
                ? 'absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500'
                : 'absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400'
              } />
              <Input
                id="email"
                type="email"
                placeholder="seu.email@fortesengenharia.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={theme === 'dark'
                  ? 'pl-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-blue-600'
                  : 'pl-10 bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-blue-600'
                }
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
              Senha
            </Label>
            <div className="relative">
              <Lock className={theme === 'dark'
                ? 'absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500'
                : 'absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400'
              } />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={theme === 'dark'
                  ? 'pl-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-blue-600'
                  : 'pl-10 bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-blue-600'
                }
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Entrar no Sistema
          </Button>
        </form>

        <div className={theme === 'dark'
          ? 'mt-6 p-4 bg-zinc-800/30 rounded-lg border border-zinc-800'
          : 'mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200'
        }>
          <p className={theme === 'dark' ? 'text-zinc-400 mb-2' : 'text-gray-600 mb-2'}>
            Usuários de demonstração:
          </p>
          <div className={theme === 'dark' ? 'space-y-1 text-zinc-500' : 'space-y-1 text-gray-500'}>
            <p>• Gestor: gestor@fortesengenharia.com / gestor123</p>
            <p>• Encarregado: encarregado@fortesengenharia.com / enc123</p>
            <p>• Técnico: tecnico@fortesengenharia.com / tec123</p>
          </div>
        </div>
      </Card>
    </div>
  );
}