import { useState } from 'react';
import { Header } from './Header';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { 
  ArrowLeft, 
  Calendar,
  Clock,
  FileText,
  CheckCircle2,
  XCircle,
  User as UserIcon,
  AlertTriangle
} from 'lucide-react';
import { User, Screen, Theme } from '../App';
import { toast } from 'sonner@2.0.3';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from './ui/label';

interface AprovacaoHoraExtraProps {
  user: User;
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
  theme: Theme;
  onToggleTheme: () => void;
}

interface Solicitacao {
  id: number;
  solicitante: string;
  obra: string;
  data: string;
  horas: number;
  justificativa: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export function AprovacaoHoraExtra({ user, onNavigate, onLogout, theme, onToggleTheme }: AprovacaoHoraExtraProps) {
  const [selectedSolicitacao, setSelectedSolicitacao] = useState<Solicitacao | null>(null);
  const [showApprovalDialog, setShowApprovalDialog] = useState(false);
  const [showRejectionDialog, setShowRejectionDialog] = useState(false);
  const [motivoRejeicao, setMotivoRejeicao] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');

  // Solicitações mockadas
  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>([
    {
      id: 1,
      solicitante: 'João Santos',
      obra: 'Obra Centro Comercial',
      data: '2025-11-12',
      horas: 10,
      justificativa: 'Necessário conclusão de fundação antes do período de chuvas. A previsão meteorológica indica chuvas intensas a partir da próxima semana.',
      status: 'pending',
      createdAt: '2025-11-11',
    },
    {
      id: 2,
      solicitante: 'Pedro Lima',
      obra: 'Obra Shopping Norte',
      data: '2025-11-13',
      horas: 6,
      justificativa: 'Instalações elétricas urgentes para vistoria do corpo de bombeiros agendada.',
      status: 'pending',
      createdAt: '2025-11-11',
    },
    {
      id: 3,
      solicitante: 'Ana Costa',
      obra: 'Obra Residencial Sul',
      data: '2025-11-14',
      horas: 8,
      justificativa: 'Acabamento de fachada para entrega parcial ao cliente conforme contrato.',
      status: 'pending',
      createdAt: '2025-11-12',
    },
    {
      id: 4,
      solicitante: 'Carlos Souza',
      obra: 'Obra Industrial Leste',
      data: '2025-11-08',
      horas: 12,
      justificativa: 'Montagem de estrutura metálica conforme cronograma',
      status: 'approved',
      createdAt: '2025-11-07',
    },
    {
      id: 5,
      solicitante: 'Mariana Alves',
      obra: 'Obra Hospital Central',
      data: '2025-11-06',
      horas: 4,
      justificativa: 'Falta de detalhamento suficiente',
      status: 'rejected',
      createdAt: '2025-11-05',
    },
  ]);

  const handleApprove = (solicitacao: Solicitacao) => {
    setSelectedSolicitacao(solicitacao);
    setShowApprovalDialog(true);
  };

  const handleReject = (solicitacao: Solicitacao) => {
    setSelectedSolicitacao(solicitacao);
    setShowRejectionDialog(true);
  };

  const confirmApproval = () => {
    if (selectedSolicitacao) {
      setSolicitacoes(prev =>
        prev.map(s =>
          s.id === selectedSolicitacao.id ? { ...s, status: 'approved' as const } : s
        )
      );
      toast.success('Solicitação aprovada com sucesso!', {
        description: `${selectedSolicitacao.horas} horas aprovadas para ${selectedSolicitacao.solicitante}`,
      });
      setShowApprovalDialog(false);
      setSelectedSolicitacao(null);
    }
  };

  const confirmRejection = () => {
    if (!motivoRejeicao.trim()) {
      toast.error('Por favor, informe o motivo da rejeição');
      return;
    }

    if (selectedSolicitacao) {
      setSolicitacoes(prev =>
        prev.map(s =>
          s.id === selectedSolicitacao.id 
            ? { ...s, status: 'rejected' as const, justificativa: motivoRejeicao } 
            : s
        )
      );
      toast.success('Solicitação reprovada', {
        description: 'O solicitante será notificado sobre a decisão',
      });
      setShowRejectionDialog(false);
      setSelectedSolicitacao(null);
      setMotivoRejeicao('');
    }
  };

  const filteredSolicitacoes = solicitacoes.filter(s => 
    filterStatus === 'all' ? true : s.status === filterStatus
  );

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { 
        label: 'Pendente', 
        className: 'bg-yellow-600/20 text-yellow-400 border-yellow-600/30' 
      },
      approved: { 
        label: 'Aprovado', 
        className: 'bg-green-600/20 text-green-400 border-green-600/30' 
      },
      rejected: { 
        label: 'Reprovado', 
        className: 'bg-red-600/20 text-red-400 border-red-600/30' 
      },
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    
    return (
      <Badge className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const pendingCount = solicitacoes.filter(s => s.status === 'pending').length;

  return (
    <div className="min-h-screen bg-zinc-950">
      <Header user={user} onNavigate={onNavigate} onLogout={onLogout} theme={theme} onToggleTheme={onToggleTheme} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
              <h2 className="text-white mb-2">Aprovação de Horas Extras</h2>
              <p className="text-zinc-400">
                Analise e aprove as solicitações da sua equipe
                {pendingCount > 0 && ` • ${pendingCount} pendente${pendingCount > 1 ? 's' : ''}`}
              </p>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <Card className="bg-zinc-900/50 border-zinc-800 p-4 mb-6">
          <div className="flex gap-2">
            <Button
              variant={filterStatus === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterStatus('all')}
              className={filterStatus === 'all' 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-transparent border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white'
              }
            >
              Todas ({solicitacoes.length})
            </Button>
            <Button
              variant={filterStatus === 'pending' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterStatus('pending')}
              className={filterStatus === 'pending' 
                ? 'bg-yellow-600 hover:bg-yellow-700 text-white' 
                : 'bg-transparent border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white'
              }
            >
              Pendentes ({solicitacoes.filter(s => s.status === 'pending').length})
            </Button>
            <Button
              variant={filterStatus === 'approved' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterStatus('approved')}
              className={filterStatus === 'approved' 
                ? 'bg-green-600 hover:bg-green-700 text-white' 
                : 'bg-transparent border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white'
              }
            >
              Aprovadas ({solicitacoes.filter(s => s.status === 'approved').length})
            </Button>
            <Button
              variant={filterStatus === 'rejected' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterStatus('rejected')}
              className={filterStatus === 'rejected' 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-transparent border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white'
              }
            >
              Reprovadas ({solicitacoes.filter(s => s.status === 'rejected').length})
            </Button>
          </div>
        </Card>

        {/* Lista de Solicitações */}
        <div className="space-y-4">
          {filteredSolicitacoes.map((solicitacao) => (
            <Card
              key={solicitacao.id}
              className="bg-zinc-900/50 border-zinc-800 p-6 hover:border-zinc-700 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-white">{solicitacao.obra}</h3>
                    {getStatusBadge(solicitacao.status)}
                  </div>
                  <div className="flex items-center gap-4 text-zinc-400">
                    <span className="flex items-center gap-1">
                      <UserIcon className="w-4 h-4" />
                      {solicitacao.solicitante}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(solicitacao.data).toLocaleDateString('pt-BR')}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {solicitacao.horas} horas
                    </span>
                  </div>
                </div>

                {solicitacao.status === 'pending' && (
                  <div className="flex gap-2 ml-4">
                    <Button
                      onClick={() => handleApprove(solicitacao)}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Aprovar
                    </Button>
                    <Button
                      onClick={() => handleReject(solicitacao)}
                      variant="outline"
                      className="bg-transparent border-red-700 text-red-400 hover:bg-red-950 hover:text-red-300"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Reprovar
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="p-4 bg-zinc-800/30 rounded-lg border border-zinc-800">
                <div className="flex items-start gap-2">
                  <FileText className="w-4 h-4 text-zinc-500 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-zinc-500 mb-1">Justificativa:</p>
                    <p className="text-zinc-300">{solicitacao.justificativa}</p>
                  </div>
                </div>
              </div>

              <p className="text-zinc-500 mt-4">
                Solicitado em {new Date(solicitacao.createdAt).toLocaleDateString('pt-BR')}
              </p>
            </Card>
          ))}

          {filteredSolicitacoes.length === 0 && (
            <Card className="bg-zinc-900/50 border-zinc-800 p-12 text-center">
              <FileText className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
              <p className="text-zinc-400">Nenhuma solicitação encontrada</p>
            </Card>
          )}
        </div>
      </main>

      {/* Dialog de Aprovação */}
      <Dialog open={showApprovalDialog} onOpenChange={setShowApprovalDialog}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              Confirmar Aprovação
            </DialogTitle>
            <DialogDescription className="text-zinc-400">
              Você está aprovando a seguinte solicitação:
            </DialogDescription>
          </DialogHeader>
          
          {selectedSolicitacao && (
            <div className="space-y-3 py-4">
              <div className="p-4 bg-zinc-800/50 rounded-lg border border-zinc-800">
                <p className="text-zinc-400">Solicitante</p>
                <p className="text-white">{selectedSolicitacao.solicitante}</p>
              </div>
              <div className="p-4 bg-zinc-800/50 rounded-lg border border-zinc-800">
                <p className="text-zinc-400">Obra</p>
                <p className="text-white">{selectedSolicitacao.obra}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 bg-zinc-800/50 rounded-lg border border-zinc-800">
                  <p className="text-zinc-400">Data</p>
                  <p className="text-white">{new Date(selectedSolicitacao.data).toLocaleDateString('pt-BR')}</p>
                </div>
                <div className="p-4 bg-zinc-800/50 rounded-lg border border-zinc-800">
                  <p className="text-zinc-400">Horas</p>
                  <p className="text-white">{selectedSolicitacao.horas}h</p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowApprovalDialog(false)}
              className="bg-transparent border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
            >
              Cancelar
            </Button>
            <Button
              onClick={confirmApproval}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Confirmar Aprovação
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de Rejeição */}
      <Dialog open={showRejectionDialog} onOpenChange={setShowRejectionDialog}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              Reprovar Solicitação
            </DialogTitle>
            <DialogDescription className="text-zinc-400">
              Informe o motivo da reprovação para o solicitante.
            </DialogDescription>
          </DialogHeader>
          
          {selectedSolicitacao && (
            <div className="space-y-4 py-4">
              <div className="p-4 bg-zinc-800/50 rounded-lg border border-zinc-800">
                <p className="text-zinc-400 mb-1">Solicitação</p>
                <p className="text-white">{selectedSolicitacao.obra} - {selectedSolicitacao.solicitante}</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="motivo" className="text-zinc-300">
                  Motivo da Reprovação <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="motivo"
                  value={motivoRejeicao}
                  onChange={(e) => setMotivoRejeicao(e.target.value)}
                  placeholder="Explique o motivo da reprovação..."
                  className="min-h-32 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500"
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowRejectionDialog(false);
                setMotivoRejeicao('');
              }}
              className="bg-transparent border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
            >
              Cancelar
            </Button>
            <Button
              onClick={confirmRejection}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Confirmar Reprovação
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}