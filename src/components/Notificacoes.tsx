import { useState } from 'react';
import { Header } from './Header';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  ArrowLeft, 
  Bell,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock,
  Trash2,
  CheckCheck
} from 'lucide-react';
import { User, Screen, Theme } from '../App';
import { toast } from 'sonner@2.0.3';

interface NotificacoesProps {
  user: User;
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
  theme: Theme;
  onToggleTheme: () => void;
}

interface Notificacao {
  id: number;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
  time: string;
  read: boolean;
  action?: {
    label: string;
    screen: Screen;
  };
}

export function Notificacoes({ user, onNavigate, onLogout, theme, onToggleTheme }: NotificacoesProps) {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  // Notificações mockadas baseadas no perfil
  const getNotificacoes = (): Notificacao[] => {
    const notificacoesGestor: Notificacao[] = [
      {
        id: 1,
        type: 'warning',
        title: 'Nova Solicitação Pendente',
        message: 'João Santos solicitou 10 horas extras para Obra Centro Comercial',
        time: '5 minutos atrás',
        read: false,
        action: { label: 'Avaliar', screen: 'aprovacao' },
      },
      {
        id: 2,
        type: 'warning',
        title: 'Solicitação Aguardando Aprovação',
        message: 'Ana Costa solicitou 8 horas extras para Obra Residencial Sul',
        time: '2 horas atrás',
        read: false,
        action: { label: 'Avaliar', screen: 'aprovacao' },
      },
      {
        id: 3,
        type: 'info',
        title: 'Prazo de Aprovação',
        message: '12 solicitações aguardando aprovação há mais de 24 horas',
        time: '3 horas atrás',
        read: false,
        action: { label: 'Ver Solicitações', screen: 'aprovacao' },
      },
      {
        id: 4,
        type: 'success',
        title: 'Aprovação Registrada',
        message: 'Você aprovou 10 horas extras para Pedro Lima',
        time: '1 dia atrás',
        read: true,
      },
      {
        id: 5,
        type: 'info',
        title: 'Relatório Mensal Disponível',
        message: 'O relatório de horas extras de outubro está disponível',
        time: '2 dias atrás',
        read: true,
        action: { label: 'Ver Relatório', screen: 'relatorios' },
      },
    ];

    const notificacoesEncarregado: Notificacao[] = [
      {
        id: 1,
        type: 'success',
        title: 'Solicitação Aprovada',
        message: 'Sua solicitação de 10 horas para Obra Centro Comercial foi aprovada',
        time: '30 minutos atrás',
        read: false,
      },
      {
        id: 2,
        type: 'warning',
        title: 'Solicitação em Análise',
        message: 'Sua solicitação de 6 horas para Obra Shopping Norte está em análise',
        time: '2 horas atrás',
        read: false,
      },
      {
        id: 3,
        type: 'error',
        title: 'Solicitação Reprovada',
        message: 'Solicitação reprovada: Falta de justificativa detalhada',
        time: '1 dia atrás',
        read: false,
      },
      {
        id: 4,
        type: 'info',
        title: 'Lembrete',
        message: 'Você tem 5 solicitações aguardando aprovação',
        time: '2 dias atrás',
        read: true,
      },
      {
        id: 5,
        type: 'success',
        title: 'Solicitação Enviada',
        message: 'Solicitação de 8 horas enviada com sucesso',
        time: '3 dias atrás',
        read: true,
      },
    ];

    const notificacoesTecnico: Notificacao[] = [
      {
        id: 1,
        type: 'success',
        title: 'Relatório Gerado',
        message: 'Relatório mensal da Obra Centro Comercial gerado com sucesso',
        time: '1 hora atrás',
        read: false,
      },
      {
        id: 2,
        type: 'info',
        title: 'Nova Aprovação Registrada',
        message: '45 horas aprovadas para Obra Residencial Sul',
        time: '3 horas atrás',
        read: false,
      },
      {
        id: 3,
        type: 'warning',
        title: 'Alerta de Horas',
        message: 'Obra Centro Comercial ultrapassou 150 horas no mês',
        time: '5 horas atrás',
        read: false,
      },
      {
        id: 4,
        type: 'success',
        title: 'Exportação Concluída',
        message: 'Dados exportados com sucesso em formato PDF',
        time: '1 dia atrás',
        read: true,
      },
      {
        id: 5,
        type: 'info',
        title: 'Atualização de Dados',
        message: 'Novos registros de horas extras disponíveis',
        time: '2 dias atrás',
        read: true,
      },
    ];

    if (user.role === 'gestor') return notificacoesGestor;
    if (user.role === 'encarregado') return notificacoesEncarregado;
    return notificacoesTecnico;
  };

  const [notificacoes, setNotificacoes] = useState<Notificacao[]>(getNotificacoes());

  const filteredNotificacoes = filter === 'all' 
    ? notificacoes 
    : notificacoes.filter(n => !n.read);

  const unreadCount = notificacoes.filter(n => !n.read).length;

  const getNotificationIcon = (type: string) => {
    const icons = {
      success: CheckCircle2,
      warning: AlertCircle,
      error: XCircle,
      info: Bell,
    };
    return icons[type as keyof typeof icons] || Bell;
  };

  const getNotificationColor = (type: string) => {
    const colors = {
      success: 'text-green-500',
      warning: 'text-yellow-500',
      error: 'text-red-500',
      info: 'text-blue-500',
    };
    return colors[type as keyof typeof colors] || 'text-blue-500';
  };

  const getNotificationBg = (type: string) => {
    const bgs = {
      success: 'bg-green-500/10',
      warning: 'bg-yellow-500/10',
      error: 'bg-red-500/10',
      info: 'bg-blue-500/10',
    };
    return bgs[type as keyof typeof bgs] || 'bg-blue-500/10';
  };

  const handleMarkAsRead = (id: number) => {
    setNotificacoes(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
    toast.success('Notificação marcada como lida');
  };

  const handleMarkAllAsRead = () => {
    setNotificacoes(prev => prev.map(n => ({ ...n, read: true })));
    toast.success('Todas as notificações foram marcadas como lidas');
  };

  const handleDelete = (id: number) => {
    setNotificacoes(prev => prev.filter(n => n.id !== id));
    toast.success('Notificação removida');
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      <Header user={user} onNavigate={onNavigate} onLogout={onLogout} theme={theme} onToggleTheme={onToggleTheme} />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => onNavigate('dashboard')}
            className="text-zinc-400 hover:text-white hover:bg-zinc-800 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Dashboard
          </Button>
          
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-white mb-2">Notificações</h2>
              <p className="text-zinc-400">
                {unreadCount > 0 
                  ? `Você tem ${unreadCount} notificação${unreadCount > 1 ? 'ões' : ''} não lida${unreadCount > 1 ? 's' : ''}`
                  : 'Todas as notificações foram lidas'
                }
              </p>
            </div>
            
            {unreadCount > 0 && (
              <Button
                onClick={handleMarkAllAsRead}
                variant="outline"
                className="bg-transparent border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
              >
                <CheckCheck className="w-4 h-4 mr-2" />
                Marcar todas como lidas
              </Button>
            )}
          </div>
        </div>

        {/* Filtros */}
        <Card className="bg-zinc-900/50 border-zinc-800 p-4 mb-6">
          <div className="flex gap-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
              className={filter === 'all' 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-transparent border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white'
              }
            >
              Todas ({notificacoes.length})
            </Button>
            <Button
              variant={filter === 'unread' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('unread')}
              className={filter === 'unread' 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-transparent border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white'
              }
            >
              Não lidas ({unreadCount})
            </Button>
          </div>
        </Card>

        {/* Lista de Notificações */}
        <div className="space-y-3">
          {filteredNotificacoes.map((notificacao) => {
            const Icon = getNotificationIcon(notificacao.type);
            const iconColor = getNotificationColor(notificacao.type);
            const bgColor = getNotificationBg(notificacao.type);

            return (
              <Card
                key={notificacao.id}
                className={`bg-zinc-900/50 border-zinc-800 p-4 hover:border-zinc-700 transition-colors ${
                  !notificacao.read ? 'border-l-4 border-l-blue-600' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-lg ${bgColor} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-5 h-5 ${iconColor}`} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="text-white">{notificacao.title}</h4>
                      {!notificacao.read && (
                        <Badge className="bg-blue-600/20 text-blue-400 border-blue-600/30 ml-2">
                          Nova
                        </Badge>
                      )}
                    </div>
                    <p className="text-zinc-400 mb-2">{notificacao.message}</p>
                    <div className="flex items-center gap-2 text-zinc-500">
                      <Clock className="w-3 h-3" />
                      <span>{notificacao.time}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {notificacao.action && (
                      <Button
                        size="sm"
                        onClick={() => onNavigate(notificacao.action!.screen)}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        {notificacao.action.label}
                      </Button>
                    )}
                    
                    {!notificacao.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleMarkAsRead(notificacao.id)}
                        className="text-zinc-400 hover:text-white hover:bg-zinc-800"
                        title="Marcar como lida"
                      >
                        <CheckCheck className="w-4 h-4" />
                      </Button>
                    )}

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(notificacao.id)}
                      className="text-zinc-400 hover:text-red-400 hover:bg-red-950"
                      title="Remover notificação"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}

          {filteredNotificacoes.length === 0 && (
            <Card className="bg-zinc-900/50 border-zinc-800 p-12 text-center">
              <Bell className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
              <p className="text-zinc-400">
                {filter === 'unread' 
                  ? 'Você não tem notificações não lidas' 
                  : 'Nenhuma notificação encontrada'
                }
              </p>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}