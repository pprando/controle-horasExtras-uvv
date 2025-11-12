import { Header } from './Header';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  FileText, 
  PlusCircle,
  TrendingUp,
  Calendar,
  ArrowRight
} from 'lucide-react';
import { User, Screen, Theme } from '../App';

interface DashboardProps {
  user: User;
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
  theme: Theme;
  onToggleTheme: () => void;
}

export function Dashboard({ user, onNavigate, onLogout, theme, onToggleTheme }: DashboardProps) {
  // Dados mockados baseados no perfil do usuário
  const stats = {
    gestor: [
      { label: 'Pendentes de Aprovação', value: 12, icon: Clock, color: 'text-yellow-500', bgColor: 'bg-yellow-500/10' },
      { label: 'Aprovadas no Mês', value: 45, icon: CheckCircle2, color: 'text-green-500', bgColor: 'bg-green-500/10' },
      { label: 'Reprovadas no Mês', value: 3, icon: XCircle, color: 'text-red-500', bgColor: 'bg-red-500/10' },
      { label: 'Total de Horas (Mês)', value: 342, icon: TrendingUp, color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
    ],
    encarregado: [
      { label: 'Solicitações Pendentes', value: 5, icon: Clock, color: 'text-yellow-500', bgColor: 'bg-yellow-500/10' },
      { label: 'Aprovadas no Mês', value: 18, icon: CheckCircle2, color: 'text-green-500', bgColor: 'bg-green-500/10' },
      { label: 'Reprovadas no Mês', value: 1, icon: XCircle, color: 'text-red-500', bgColor: 'bg-red-500/10' },
      { label: 'Horas Solicitadas (Mês)', value: 124, icon: TrendingUp, color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
    ],
    tecnico: [
      { label: 'Total de Obras', value: 8, icon: FileText, color: 'text-purple-500', bgColor: 'bg-purple-500/10' },
      { label: 'Horas Aprovadas (Mês)', value: 342, icon: CheckCircle2, color: 'text-green-500', bgColor: 'bg-green-500/10' },
      { label: 'Obras Ativas', value: 6, icon: AlertCircle, color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
      { label: 'Relatórios Gerados', value: 15, icon: FileText, color: 'text-cyan-500', bgColor: 'bg-cyan-500/10' },
    ],
  };

  const recentActivities = {
    gestor: [
      { id: 1, text: 'Nova solicitação de João Santos - Obra Centro Comercial', time: '5 min atrás', status: 'pending' },
      { id: 2, text: 'Solicitação aprovada para Pedro Lima - 8 horas', time: '1 hora atrás', status: 'approved' },
      { id: 3, text: 'Nova solicitação de Ana Costa - Obra Residencial Sul', time: '2 horas atrás', status: 'pending' },
    ],
    encarregado: [
      { id: 1, text: 'Solicitação aprovada - 10 horas para Obra Centro Comercial', time: '30 min atrás', status: 'approved' },
      { id: 2, text: 'Solicitação em análise - 6 horas para Obra Shopping Norte', time: '2 horas atrás', status: 'pending' },
      { id: 3, text: 'Solicitação reprovada - Falta de justificativa', time: '1 dia atrás', status: 'rejected' },
    ],
    tecnico: [
      { id: 1, text: 'Relatório mensal da Obra Centro Comercial gerado', time: '1 hora atrás', status: 'approved' },
      { id: 2, text: 'Nova aprovação registrada - 45 horas Obra Residencial Sul', time: '3 horas atrás', status: 'approved' },
      { id: 3, text: 'Exportação de dados realizada com sucesso', time: '1 dia atrás', status: 'approved' },
    ],
  };

  const quickActions = {
    gestor: [
      { label: 'Aprovar Solicitações', screen: 'aprovacao' as Screen, icon: CheckCircle2, color: 'bg-green-600 hover:bg-green-700' },
      { label: 'Ver Relatórios', screen: 'relatorios' as Screen, icon: FileText, color: 'bg-blue-600 hover:bg-blue-700' },
    ],
    encarregado: [
      { label: 'Nova Solicitação', screen: 'solicitacao' as Screen, icon: PlusCircle, color: 'bg-blue-600 hover:bg-blue-700' },
      { label: 'Minhas Solicitações', screen: 'solicitacao' as Screen, icon: FileText, color: 'bg-purple-600 hover:bg-purple-700' },
    ],
    tecnico: [
      { label: 'Gerar Relatório', screen: 'relatorios' as Screen, icon: FileText, color: 'bg-blue-600 hover:bg-blue-700' },
      { label: 'Ver por Obra', screen: 'relatorios' as Screen, icon: Calendar, color: 'bg-purple-600 hover:bg-purple-700' },
    ],
  };

  const currentStats = stats[user.role];
  const currentActivities = recentActivities[user.role];
  const currentActions = quickActions[user.role];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'Pendente', variant: 'default' as const, className: 'bg-yellow-600/20 text-yellow-400 border-yellow-600/30' },
      approved: { label: 'Aprovado', variant: 'default' as const, className: 'bg-green-600/20 text-green-400 border-green-600/30' },
      rejected: { label: 'Reprovado', variant: 'default' as const, className: 'bg-red-600/20 text-red-400 border-red-600/30' },
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge variant={config.variant} className={config.className}>{config.label}</Badge>;
  };

  return (
    <div className={theme === 'dark' ? 'min-h-screen bg-zinc-950' : 'min-h-screen bg-gray-50'}>
      <Header user={user} onNavigate={onNavigate} onLogout={onLogout} theme={theme} onToggleTheme={onToggleTheme} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className={theme === 'dark' ? 'text-white mb-2' : 'text-gray-900 mb-2'}>Bem-vindo, {user.name}</h2>
          <p className={theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}>Aqui está um resumo das suas atividades</p>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {currentStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className={theme === 'dark' ? 'bg-zinc-900/50 border-zinc-800 p-6' : 'bg-white border-gray-200 p-6'}>
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
                <p className={theme === 'dark' ? 'text-zinc-400 mb-1' : 'text-gray-600 mb-1'}>{stat.label}</p>
                <p className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>{stat.value}</p>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Atividades Recentes */}
          <Card className={theme === 'dark' ? 'lg:col-span-2 bg-zinc-900/50 border-zinc-800 p-6' : 'lg:col-span-2 bg-white border-gray-200 p-6'}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Atividades Recentes</h3>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onNavigate('notificacoes')}
                className="text-blue-400 hover:text-blue-300 hover:bg-blue-600/10"
              >
                Ver todas
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            <div className="space-y-4">
              {currentActivities.map((activity) => (
                <div key={activity.id} className={theme === 'dark' 
                  ? 'flex items-start gap-4 p-4 bg-zinc-800/30 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors'
                  : 'flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors'
                }>
                  <div className="flex-1">
                    <p className={theme === 'dark' ? 'text-white mb-1' : 'text-gray-900 mb-1'}>{activity.text}</p>
                    <p className={theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}>{activity.time}</p>
                  </div>
                  {getStatusBadge(activity.status)}
                </div>
              ))}
            </div>
          </Card>

          {/* Ações Rápidas */}
          <Card className={theme === 'dark' ? 'bg-zinc-900/50 border-zinc-800 p-6' : 'bg-white border-gray-200 p-6'}>
            <h3 className={theme === 'dark' ? 'text-white mb-6' : 'text-gray-900 mb-6'}>Ações Rápidas</h3>
            <div className="space-y-3">
              {currentActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Button
                    key={index}
                    onClick={() => onNavigate(action.screen)}
                    className={`w-full justify-start ${action.color} text-white`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {action.label}
                  </Button>
                );
              })}
              
              <div className={theme === 'dark' ? 'pt-4 mt-4 border-t border-zinc-800' : 'pt-4 mt-4 border-t border-gray-200'}>
                <Button
                  variant="outline"
                  onClick={() => onNavigate('notificacoes')}
                  className={theme === 'dark' 
                    ? 'w-full justify-start bg-transparent border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white'
                    : 'w-full justify-start bg-transparent border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }
                >
                  <AlertCircle className="w-5 h-5 mr-3" />
                  Notificações
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}