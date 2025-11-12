import { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { Dashboard } from './components/Dashboard';
import { SolicitacaoHoraExtra } from './components/SolicitacaoHoraExtra';
import { AprovacaoHoraExtra } from './components/AprovacaoHoraExtra';
import { RelatoriosHoras } from './components/RelatoriosHoras';
import { Notificacoes } from './components/Notificacoes';
import { Toaster } from './components/ui/sonner';

export type Screen = 'login' | 'dashboard' | 'solicitacao' | 'aprovacao' | 'relatorios' | 'notificacoes';
export type UserRole = 'gestor' | 'encarregado' | 'tecnico';
export type Theme = 'light' | 'dark';

export interface User {
  name: string;
  role: UserRole;
  email: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [theme, setTheme] = useState<Theme>('dark');

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentScreen('login');
  };

  const navigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className={theme === 'dark' ? 'min-h-screen bg-zinc-950' : 'min-h-screen bg-gray-50'}>
      {currentScreen === 'login' && (
        <LoginScreen onLogin={handleLogin} theme={theme} onToggleTheme={toggleTheme} />
      )}
      
      {currentScreen === 'dashboard' && currentUser && (
        <Dashboard user={currentUser} onNavigate={navigate} onLogout={handleLogout} theme={theme} onToggleTheme={toggleTheme} />
      )}
      
      {currentScreen === 'solicitacao' && currentUser && (
        <SolicitacaoHoraExtra user={currentUser} onNavigate={navigate} onLogout={handleLogout} theme={theme} onToggleTheme={toggleTheme} />
      )}
      
      {currentScreen === 'aprovacao' && currentUser && (
        <AprovacaoHoraExtra user={currentUser} onNavigate={navigate} onLogout={handleLogout} theme={theme} onToggleTheme={toggleTheme} />
      )}
      
      {currentScreen === 'relatorios' && currentUser && (
        <RelatoriosHoras user={currentUser} onNavigate={navigate} onLogout={handleLogout} theme={theme} onToggleTheme={toggleTheme} />
      )}
      
      {currentScreen === 'notificacoes' && currentUser && (
        <Notificacoes user={currentUser} onNavigate={navigate} onLogout={handleLogout} theme={theme} onToggleTheme={toggleTheme} />
      )}
      
      <Toaster />
    </div>
  );
}