import { useState } from 'react';
import { Header } from './Header';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { 
  ArrowLeft, 
  Calendar,
  Download,
  Filter,
  Building2,
  Clock,
  TrendingUp,
  FileText
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

interface RelatoriosHorasProps {
  user: User;
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
  theme: Theme;
  onToggleTheme: () => void;
}

interface HorasPorObra {
  obra: string;
  totalHoras: number;
  aprovadas: number;
  pendentes: number;
  funcionarios: number;
}

interface RegistroHora {
  id: number;
  solicitante: string;
  obra: string;
  data: string;
  horas: number;
  status: string;
}

export function RelatoriosHoras({ user, onNavigate, onLogout, theme, onToggleTheme }: RelatoriosHorasProps) {
  const [obraFilter, setObraFilter] = useState('todas');
  const [dataInicio, setDataInicio] = useState('2025-11-01');
  const [dataFim, setDataFim] = useState('2025-11-30');

  // Dados mockados
  const horasPorObra: HorasPorObra[] = [
    { obra: 'Obra Centro Comercial', totalHoras: 156, aprovadas: 142, pendentes: 14, funcionarios: 12 },
    { obra: 'Obra Shopping Norte', totalHoras: 98, aprovadas: 85, pendentes: 13, funcionarios: 8 },
    { obra: 'Obra Residencial Sul', totalHoras: 124, aprovadas: 110, pendentes: 14, funcionarios: 10 },
    { obra: 'Obra Industrial Leste', totalHoras: 87, aprovadas: 87, pendentes: 0, funcionarios: 7 },
    { obra: 'Obra Hospital Central', totalHoras: 145, aprovadas: 130, pendentes: 15, funcionarios: 11 },
  ];

  const registros: RegistroHora[] = [
    { id: 1, solicitante: 'João Santos', obra: 'Obra Centro Comercial', data: '2025-11-10', horas: 10, status: 'approved' },
    { id: 2, solicitante: 'Pedro Lima', obra: 'Obra Shopping Norte', data: '2025-11-11', horas: 8, status: 'approved' },
    { id: 3, solicitante: 'Ana Costa', obra: 'Obra Residencial Sul', data: '2025-11-12', horas: 12, status: 'approved' },
    { id: 4, solicitante: 'Carlos Souza', obra: 'Obra Industrial Leste', data: '2025-11-08', horas: 6, status: 'approved' },
    { id: 5, solicitante: 'Mariana Alves', obra: 'Obra Hospital Central', data: '2025-11-09', horas: 8, status: 'approved' },
    { id: 6, solicitante: 'Ricardo Mendes', obra: 'Obra Centro Comercial', data: '2025-11-13', horas: 10, status: 'pending' },
    { id: 7, solicitante: 'Juliana Rocha', obra: 'Obra Shopping Norte', data: '2025-11-13', horas: 6, status: 'pending' },
  ];

  const filteredData = obraFilter === 'todas' 
    ? horasPorObra 
    : horasPorObra.filter(h => h.obra === obraFilter);

  const filteredRegistros = obraFilter === 'todas'
    ? registros
    : registros.filter(r => r.obra === obraFilter);

  const totalHoras = filteredData.reduce((sum, h) => sum + h.totalHoras, 0);
  const totalAprovadas = filteredData.reduce((sum, h) => sum + h.aprovadas, 0);
  const totalPendentes = filteredData.reduce((sum, h) => sum + h.pendentes, 0);

  const handleExport = () => {
    toast.success('Relatório exportado com sucesso!', {
      description: 'O arquivo foi salvo em formato PDF',
    });
  };

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
              <h2 className="text-white mb-2">Relatórios de Horas</h2>
              <p className="text-zinc-400">Acompanhe as horas extras por obra e período</p>
            </div>
            
            <Button
              onClick={handleExport}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Download className="w-5 h-5 mr-2" />
              Exportar Relatório
            </Button>
          </div>
        </div>

        {/* Filtros */}
        <Card className="bg-zinc-900/50 border-zinc-800 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-zinc-400" />
            <h3 className="text-white">Filtros</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="obra" className="text-zinc-300">Obra</Label>
              <Select value={obraFilter} onValueChange={setObraFilter}>
                <SelectTrigger className="bg-zinc-800/50 border-zinc-700 text-white">
                  <SelectValue placeholder="Selecione a obra" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas as Obras</SelectItem>
                  <SelectItem value="Obra Centro Comercial">Obra Centro Comercial</SelectItem>
                  <SelectItem value="Obra Shopping Norte">Obra Shopping Norte</SelectItem>
                  <SelectItem value="Obra Residencial Sul">Obra Residencial Sul</SelectItem>
                  <SelectItem value="Obra Industrial Leste">Obra Industrial Leste</SelectItem>
                  <SelectItem value="Obra Hospital Central">Obra Hospital Central</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dataInicio" className="text-zinc-300">Data Início</Label>
              <Input
                id="dataInicio"
                type="date"
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
                className="bg-zinc-800/50 border-zinc-700 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dataFim" className="text-zinc-300">Data Fim</Label>
              <Input
                id="dataFim"
                type="date"
                value={dataFim}
                onChange={(e) => setDataFim(e.target.value)}
                className="bg-zinc-800/50 border-zinc-700 text-white"
              />
            </div>
          </div>
        </Card>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-zinc-900/50 border-zinc-800 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-500" />
              </div>
            </div>
            <p className="text-zinc-400 mb-1">Total de Horas</p>
            <p className="text-white">{totalHoras}h</p>
          </Card>

          <Card className="bg-zinc-900/50 border-zinc-800 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-500" />
              </div>
            </div>
            <p className="text-zinc-400 mb-1">Horas Aprovadas</p>
            <p className="text-white">{totalAprovadas}h</p>
          </Card>

          <Card className="bg-zinc-900/50 border-zinc-800 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-500" />
              </div>
            </div>
            <p className="text-zinc-400 mb-1">Horas Pendentes</p>
            <p className="text-white">{totalPendentes}h</p>
          </Card>
        </div>

        {/* Tabela de Horas por Obra */}
        <Card className="bg-zinc-900/50 border-zinc-800 p-6 mb-6">
          <h3 className="text-white mb-6">Horas por Obra</h3>
          
          <div className="space-y-4">
            {filteredData.map((item, index) => (
              <div
                key={index}
                className="p-4 bg-zinc-800/30 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-white">{item.obra}</h4>
                      <p className="text-zinc-500">{item.funcionarios} funcionários</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white">{item.totalHoras}h</p>
                    <p className="text-zinc-500">total</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-green-600/10 rounded-lg border border-green-600/20">
                    <p className="text-green-400 mb-1">Aprovadas</p>
                    <p className="text-white">{item.aprovadas}h</p>
                  </div>
                  <div className="p-3 bg-yellow-600/10 rounded-lg border border-yellow-600/20">
                    <p className="text-yellow-400 mb-1">Pendentes</p>
                    <p className="text-white">{item.pendentes}h</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Histórico Detalhado */}
        <Card className="bg-zinc-900/50 border-zinc-800 p-6">
          <h3 className="text-white mb-6">Histórico Detalhado</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left py-3 px-4 text-zinc-400">Data</th>
                  <th className="text-left py-3 px-4 text-zinc-400">Solicitante</th>
                  <th className="text-left py-3 px-4 text-zinc-400">Obra</th>
                  <th className="text-left py-3 px-4 text-zinc-400">Horas</th>
                  <th className="text-left py-3 px-4 text-zinc-400">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredRegistros.map((registro) => (
                  <tr key={registro.id} className="border-b border-zinc-800 hover:bg-zinc-800/30 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2 text-zinc-300">
                        <Calendar className="w-4 h-4 text-zinc-500" />
                        {new Date(registro.data).toLocaleDateString('pt-BR')}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-white">{registro.solicitante}</td>
                    <td className="py-4 px-4 text-zinc-300">{registro.obra}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2 text-white">
                        <Clock className="w-4 h-4 text-zinc-500" />
                        {registro.horas}h
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge 
                        className={
                          registro.status === 'approved' 
                            ? 'bg-green-600/20 text-green-400 border-green-600/30'
                            : 'bg-yellow-600/20 text-yellow-400 border-yellow-600/30'
                        }
                      >
                        {registro.status === 'approved' ? 'Aprovado' : 'Pendente'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredRegistros.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
              <p className="text-zinc-400">Nenhum registro encontrado para os filtros selecionados</p>
            </div>
          )}
        </Card>
      </main>
    </div>
  );
}