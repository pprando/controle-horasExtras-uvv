import { useState } from 'react';
import { Header } from './Header';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { 
  ArrowLeft, 
  PlusCircle, 
  Calendar,
  Clock,
  FileText,
  CheckCircle2,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { User, Screen, Theme } from '../App';
import { toast } from 'sonner@2.0.3';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { getThemeClasses } from './theme-utils';

interface SolicitacaoHoraExtraProps {
  user: User;
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
  theme: Theme;
  onToggleTheme: () => void;
}

interface Solicitacao {
  id: number;
  obra: string;
  data: string;
  horas: number;
  justificativa: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export function SolicitacaoHoraExtra({ user, onNavigate, onLogout, theme, onToggleTheme }: SolicitacaoHoraExtraProps) {
  const [showForm, setShowForm] = useState(false);
  const [obra, setObra] = useState('');
  const [data, setData] = useState('');
  const [horas, setHoras] = useState('');
  const [justificativa, setJustificativa] = useState('');
  
  const t = getThemeClasses(theme);

  // Solicitações mockadas
  const [solicitacoes] = useState<Solicitacao[]>([
    {
      id: 1,
      obra: 'Obra Centro Comercial',
      data: '2025-11-10',
      horas: 10,
      justificativa: 'Necessário conclusão de fundação antes do período de chuvas',
      status: 'approved',
      createdAt: '2025-11-09',
    },
    {
      id: 2,
      obra: 'Obra Shopping Norte',
      data: '2025-11-12',
      horas: 6,
      justificativa: 'Instalações elétricas urgentes para vistoria',
      status: 'pending',
      createdAt: '2025-11-11',
    },
    {
      id: 3,
      obra: 'Obra Residencial Sul',
      data: '2025-11-05',
      horas: 8,
      justificativa: 'Falta de detalhamento',
      status: 'rejected',
      createdAt: '2025-11-04',
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!obra || !data || !horas || !justificativa) {
      toast.error('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    if (parseInt(horas) <= 0) {
      toast.error('A quantidade de horas deve ser maior que zero');
      return;
    }

    // Simulação de envio
    toast.success('Solicitação enviada com sucesso!', {
      description: 'Sua solicitação será analisada pelo gestor responsável.',
    });

    // Resetar formulário
    setObra('');
    setData('');
    setHoras('');
    setJustificativa('');
    setShowForm(false);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { 
        label: 'Em Análise', 
        icon: Clock, 
        className: 'bg-yellow-600/20 text-yellow-400 border-yellow-600/30' 
      },
      approved: { 
        label: 'Aprovado', 
        icon: CheckCircle2, 
        className: 'bg-green-600/20 text-green-400 border-green-600/30' 
      },
      rejected: { 
        label: 'Reprovado', 
        icon: XCircle, 
        className: 'bg-red-600/20 text-red-400 border-red-600/30' 
      },
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config.icon;
    
    return (
      <Badge className={`${config.className} flex items-center gap-1`}>
        <Icon className="w-3 h-3" />
        {config.label}
      </Badge>
    );
  };

  return (
    <div className={`min-h-screen ${t.bg}`}>
      <Header user={user} onNavigate={onNavigate} onLogout={onLogout} theme={theme} onToggleTheme={onToggleTheme} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => onNavigate('dashboard')}
            className={`${t.button} mb-4`}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Dashboard
          </Button>
          
          <div className="flex items-center justify-between">
            <div>
              <h2 className={`${t.text} mb-2`}>Solicitação de Hora Extra</h2>
              <p className={t.textMuted}>Registre e acompanhe suas solicitações de horas extras</p>
            </div>
            
            {!showForm && (
              <Button
                onClick={() => setShowForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <PlusCircle className="w-5 h-5 mr-2" />
                Nova Solicitação
              </Button>
            )}
          </div>
        </div>

        {/* Formulário de Nova Solicitação */}
        {showForm && (
          <Card className={`${t.card} p-6 mb-8`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={t.text}>Nova Solicitação</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowForm(false)}
                className={t.button}
              >
                Cancelar
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="obra" className={t.textMuted}>
                    Obra <span className="text-red-500">*</span>
                  </Label>
                  <Select value={obra} onValueChange={setObra}>
                    <SelectTrigger className={t.input}>
                      <SelectValue placeholder="Selecione a obra" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Obra Centro Comercial">Obra Centro Comercial</SelectItem>
                      <SelectItem value="Obra Shopping Norte">Obra Shopping Norte</SelectItem>
                      <SelectItem value="Obra Residencial Sul">Obra Residencial Sul</SelectItem>
                      <SelectItem value="Obra Industrial Leste">Obra Industrial Leste</SelectItem>
                      <SelectItem value="Obra Hospital Central">Obra Hospital Central</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="data" className={t.textMuted}>
                    Data <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Calendar className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${t.iconColor} pointer-events-none`} />
                    <Input
                      id="data"
                      type="date"
                      value={data}
                      onChange={(e) => setData(e.target.value)}
                      className={`pl-10 ${t.input}`}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="horas" className={t.textMuted}>
                  Quantidade de Horas <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Clock className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${t.iconColor} pointer-events-none`} />
                  <Input
                    id="horas"
                    type="number"
                    min="1"
                    max="24"
                    value={horas}
                    onChange={(e) => setHoras(e.target.value)}
                    placeholder="Ex: 8"
                    className={`pl-10 ${t.input}`}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="justificativa" className={t.textMuted}>
                  Justificativa <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="justificativa"
                  value={justificativa}
                  onChange={(e) => setJustificativa(e.target.value)}
                  placeholder="Descreva detalhadamente o motivo da solicitação de hora extra..."
                  className={`min-h-32 ${t.input}`}
                  required
                />
                <p className={t.textSubtle}>Mínimo de 20 caracteres para uma justificativa clara</p>
              </div>

              <div className="flex items-center gap-4 p-4 bg-blue-600/10 border border-blue-600/30 rounded-lg">
                <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <p className="text-blue-300">
                  Certifique-se de que todos os dados estão corretos antes de enviar. 
                  A solicitação será enviada para aprovação do gestor.
                </p>
              </div>

              <div className="flex gap-4">
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Enviar Solicitação
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                  className={t.buttonOutline}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Lista de Solicitações */}
        <Card className={`${t.card} p-6`}>
          <h3 className={`${t.text} mb-6`}>Minhas Solicitações</h3>
          
          <div className="space-y-4">
            {solicitacoes.map((solicitacao) => (
              <div
                key={solicitacao.id}
                className={`p-4 ${t.bgSubtle} rounded-lg ${t.border} border ${t.cardHover} transition-colors`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className={t.text}>{solicitacao.obra}</h4>
                      {getStatusBadge(solicitacao.status)}
                    </div>
                    <div className={`flex items-center gap-4 ${t.textMuted}`}>
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
                </div>
                
                <div className={`p-3 ${theme === 'dark' ? 'bg-zinc-900/50' : 'bg-white'} rounded border ${t.border}`}>
                  <div className="flex items-start gap-2">
                    <FileText className={`w-4 h-4 ${t.textSubtle} mt-0.5 flex-shrink-0`} />
                    <div>
                      <p className={`${t.textSubtle} mb-1`}>Justificativa:</p>
                      <p className={t.textMuted}>{solicitacao.justificativa}</p>
                    </div>
                  </div>
                </div>

                <p className={`${t.textSubtle} mt-3`}>
                  Criado em {new Date(solicitacao.createdAt).toLocaleDateString('pt-BR')}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </main>
    </div>
  );
}