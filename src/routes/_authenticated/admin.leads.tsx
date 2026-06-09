import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import {
  LogOut,
  RefreshCw,
  Mail,
  Phone,
  MessageCircle,
  Eye,
  CheckCircle2,
  Circle,
  ShieldAlert,
  Search,
  Download,
} from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/leads")({
  component: AdminLeadsPage,
  head: () => ({ meta: [{ title: "Leads — Admin D3 Data" }] }),
});

type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  origem: string;
  form_type: string | null;
  payload: Record<string, any>;
  notes: string | null;
  contacted: boolean;
  created_at: string;
};

function AdminLeadsPage() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [search, setSearch] = useState("");
  const [origemFilter, setOrigemFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selected, setSelected] = useState<Lead | null>(null);

  const checkRoleAndLoad = async () => {
    setLoading(true);
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) {
      navigate({ to: "/auth" });
      return;
    }

    const { data: roleRow } = await (supabase as any)
      .from("user_roles")
      .select("role")
      .eq("user_id", userData.user.id)
      .eq("role", "admin")
      .maybeSingle();

    const adminOk = !!roleRow;
    setIsAdmin(adminOk);

    if (adminOk) {
      const { data, error } = await (supabase as any)
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) {
        toast({ title: "Erro ao carregar", description: error.message, variant: "destructive" });
      } else {
        setLeads((data ?? []) as Lead[]);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    checkRoleAndLoad();
  }, []);

  const origens = useMemo(
    () => Array.from(new Set(leads.map((l) => l.origem))).sort(),
    [leads],
  );

  const filtered = useMemo(() => {
    return leads.filter((l) => {
      if (origemFilter !== "all" && l.origem !== origemFilter) return false;
      if (statusFilter === "pending" && l.contacted) return false;
      if (statusFilter === "contacted" && !l.contacted) return false;
      if (search) {
        const q = search.toLowerCase();
        const hay = [l.name, l.email, l.phone, l.company, l.origem]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [leads, search, origemFilter, statusFilter]);

  const stats = useMemo(
    () => ({
      total: leads.length,
      pending: leads.filter((l) => !l.contacted).length,
      contacted: leads.filter((l) => l.contacted).length,
      last7: leads.filter(
        (l) => Date.now() - new Date(l.created_at).getTime() < 7 * 24 * 60 * 60 * 1000,
      ).length,
    }),
    [leads],
  );

  const toggleContacted = async (lead: Lead) => {
    const { error } = await supabase
      .from("leads")
      .update({ contacted: !lead.contacted })
      .eq("id", lead.id);
    if (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
      return;
    }
    setLeads((prev) =>
      prev.map((l) => (l.id === lead.id ? { ...l, contacted: !l.contacted } : l)),
    );
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  };

  const exportCSV = () => {
    const headers = ["Data", "Nome", "E-mail", "Telefone", "Empresa", "Origem", "Contatado"];
    const rows = filtered.map((l) => [
      new Date(l.created_at).toLocaleString("pt-BR"),
      l.name,
      l.email,
      l.phone ?? "",
      l.company ?? "",
      l.origem,
      l.contacted ? "Sim" : "Não",
    ]);
    const csv = [headers, ...rows]
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-d3-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <RefreshCw className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md text-center space-y-4">
          <ShieldAlert className="w-12 h-12 text-destructive mx-auto" />
          <h1 className="text-2xl font-bold">Sem permissão</h1>
          <p className="text-muted-foreground">
            Esta conta não tem perfil de administrador. Faça login com o e-mail admin
            ou peça acesso.
          </p>
          <div className="flex justify-center gap-2">
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" /> Sair
            </Button>
            <Button asChild>
              <Link to="/">Voltar ao site</Link>
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-xl font-bold">Leads</h1>
            <p className="text-xs text-muted-foreground">Painel administrativo D3 Data</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={checkRoleAndLoad}>
              <RefreshCw className="w-4 h-4 mr-2" /> Atualizar
            </Button>
            <Button variant="outline" size="sm" onClick={exportCSV}>
              <Download className="w-4 h-4 mr-2" /> CSV
            </Button>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" /> Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Total" value={stats.total} />
          <StatCard label="Últimos 7 dias" value={stats.last7} />
          <StatCard label="Pendentes" value={stats.pending} accent="text-amber-600" />
          <StatCard label="Contatados" value={stats.contacted} accent="text-emerald-600" />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, e-mail, empresa..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={origemFilter} onValueChange={setOrigemFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Origem" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as origens</SelectItem>
              {origens.map((o) => (
                <SelectItem key={o} value={o}>
                  {o}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="pending">Pendentes</SelectItem>
              <SelectItem value="contacted">Contatados</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="border border-border rounded-xl overflow-hidden bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px]"></TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead>Empresa</TableHead>
                <TableHead>Origem</TableHead>
                <TableHead>Data</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground py-12">
                    Nenhum lead encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((lead) => (
                  <TableRow key={lead.id} className={lead.contacted ? "opacity-60" : ""}>
                    <TableCell>
                      <button
                        onClick={() => toggleContacted(lead)}
                        title={lead.contacted ? "Marcar como pendente" : "Marcar como contatado"}
                      >
                        {lead.contacted ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        ) : (
                          <Circle className="w-5 h-5 text-muted-foreground hover:text-primary" />
                        )}
                      </button>
                    </TableCell>
                    <TableCell className="font-medium">{lead.name}</TableCell>
                    <TableCell>
                      <div className="text-sm space-y-0.5">
                        <div>{lead.email}</div>
                        {lead.phone && (
                          <div className="text-muted-foreground text-xs">{lead.phone}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{lead.company ?? "—"}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{lead.origem}</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                      {new Date(lead.created_at).toLocaleString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          asChild
                          title="Enviar e-mail"
                        >
                          <a href={`mailto:${lead.email}`}>
                            <Mail className="w-4 h-4" />
                          </a>
                        </Button>
                        {lead.phone && (
                          <>
                            <Button variant="ghost" size="icon" asChild title="Ligar">
                              <a href={`tel:${lead.phone}`}>
                                <Phone className="w-4 h-4" />
                              </a>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              asChild
                              title="WhatsApp"
                            >
                              <a
                                href={`https://wa.me/${lead.phone.replace(/\D/g, "")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <MessageCircle className="w-4 h-4 text-emerald-600" />
                              </a>
                            </Button>
                          </>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setSelected(lead)}
                          title="Ver detalhes"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          Mostrando {filtered.length} de {leads.length} leads
        </p>
      </div>

      {/* Detail dialog */}
      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selected?.name}</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4 text-sm">
              <Field label="E-mail" value={selected.email} />
              <Field label="Telefone" value={selected.phone ?? "—"} />
              <Field label="Empresa" value={selected.company ?? "—"} />
              <Field label="Origem" value={selected.origem} />
              <Field
                label="Data"
                value={new Date(selected.created_at).toLocaleString("pt-BR")}
              />
              <div>
                <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                  Dados do formulário
                </div>
                <pre className="bg-muted/50 border border-border rounded-lg p-3 text-xs overflow-x-auto">
                  {JSON.stringify(selected.payload, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: string;
}) {
  return (
    <div className="bg-card border border-border rounded-xl p-4">
      <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className={`text-3xl font-bold mt-1 ${accent ?? ""}`}>{value}</div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
      <div>{value}</div>
    </div>
  );
}
