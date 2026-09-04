import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, MapPin, ArrowRight, Calendar, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { submitFormToN8N, submitLeadToGoogleSheets, validateContactInfo } from "@/lib/formSubmission";
export const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [position, setPosition] = useState<string>("");
  const [segment, setSegment] = useState<string>("");
  const [employees, setEmployees] = useState<string>("");
  const [interest, setInterest] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.target as HTMLFormElement);

      // Preparar dados de contato
      const contactInfo = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string || "",
        company: formData.get('company') as string,
      };

      // Validar dados de contato
      const validation = validateContactInfo(contactInfo);
      if (!validation.isValid) {
        toast({
          title: "Dados inválidos",
          description: validation.errors.join(", "),
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Preparar dados adicionais
      const additionalInfo = {
        origem: 'contato_site',
        position: position || formData.get('position') || "",
        segment: segment || formData.get('segment') || "",
        employees: employees || formData.get('employees') || "",
        interest: interest || formData.get('interest') || "",
        concerns: formData.get('concerns') || "",
        timestamp: new Date().toISOString()
      };

      // Enviar para o painel de leads (banco) e para a planilha Google
      const result = await submitFormToN8N(contactInfo, additionalInfo);
      await submitLeadToGoogleSheets({
        nome: contactInfo.name,
        email: contactInfo.email,
        telefone: contactInfo.phone,
        empresa: contactInfo.company,
        cargo: String(additionalInfo.position || ""),
        interesse: String(additionalInfo.interest || ""),
        mensagem: String(additionalInfo.concerns || ""),
      });

      if (result.success) {
        toast({
          title: "Recebemos seu contato!",
          description: "Em breve entraremos em contato. Obrigado!",
        });
        (e.target as HTMLFormElement).reset();
        setPosition("");
        setSegment("");
        setEmployees("");
        setInterest("");
      } else {
        toast({
          title: "Erro ao enviar",
          description: result.message || "Tente novamente mais tarde.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Erro no envio:', error);
      toast({
        title: "Erro ao enviar",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    }

    setIsSubmitting(false);
  };

  return (
    <section id="contato" className="py-16 sm:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10" ref={ref}>
        {/* CTA Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 px-2">
            Cansado de decidir{" "}
            <span className="gradient-text">no escuro?</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-lg max-w-2xl mx-auto px-4">
            Uma conversa direta para entender seu cenário atual. 
            Sem jargão técnico, sem compromisso. Só clareza sobre o que é possível.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12 max-w-6xl mx-auto w-full">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6 w-full min-w-0"
          >
            <motion.div 
              className="glass-card p-5 sm:p-6 rounded-2xl w-full min-w-0"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-5 h-5 text-accent" />
                <h3 className="font-display text-lg font-semibold">
                  O que esperar da conversa
                </h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Entendimento do seu cenário atual",
                  "Diagnóstico inicial dos gargalos",
                  "Visão honesta do que é viável",
                  "Próximos passos claros, se fizer sentido",
                ].map((item, index) => (
                  <motion.li 
                    key={item} 
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  >
                    <ArrowRight className="w-4 h-4 text-primary mt-1 shrink-0" />
                    <span className="text-muted-foreground text-sm">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {[
                { 
                  href: null, 
                  icon: MapPin, 
                  iconColor: "text-primary",
                  bgColor: "bg-primary/10",
                  hoverBg: "",
                  label: "Localização",
                  value: "Ribeirão Preto, SP",
                  delay: 0.6
                }
              ].map((contact, index) => {
                const Icon = contact.icon;
                const content = (
                  <div className="glass-card p-4 sm:p-5 rounded-xl flex items-center gap-3 sm:gap-4 hover:border-primary/50 transition-colors group pointer-events-auto w-full min-w-0">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${contact.bgColor} flex items-center justify-center ${contact.hoverBg} transition-colors flex-shrink-0`}>
                      <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${contact.iconColor}`} />
                    </div>
                    <div className="min-w-0 flex-1 overflow-hidden">
                      <p className="text-xs text-muted-foreground mb-0.5">{contact.label}</p>
                      <p className="font-display font-semibold text-sm sm:text-base truncate">{contact.value}</p>
                    </div>
                  </div>
                );
                
                return contact.href ? (
                  <motion.a
                    key={contact.label}
                    href={contact.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: contact.delay }}
                  >
                    {content}
                  </motion.a>
                ) : (
                  <motion.div
                    key={contact.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: contact.delay }}
                  >
                    {content}
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3 w-full min-w-0"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
            <form onSubmit={handleSubmit} className="glass-card p-5 sm:p-6 lg:p-8 rounded-2xl space-y-4 sm:space-y-5 w-full min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <MessageSquare className="w-5 h-5 text-accent" />
                <h3 className="font-display text-lg font-semibold">
                  Quero sair do caos
                </h3>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Nome *</label>
                  <Input 
                    name="name"
                    required
                    placeholder="Seu nome completo"
                    className="bg-background/50 border-border focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">E-mail corporativo *</label>
                  <Input 
                    name="email"
                    type="email"
                    required
                    placeholder="seu@empresa.com"
                    className="bg-background/50 border-border focus:border-primary"
                  />
                </div>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Telefone *</label>
                  <Input 
                    name="phone"
                    type="tel"
                    required
                    placeholder="(11) 99999-9999"
                    className="bg-background/50 border-border focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Empresa *</label>
                  <Input 
                    name="company"
                    required
                    placeholder="Nome da empresa"
                    className="bg-background/50 border-border focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Cargo</label>
                  <Select value={position} onValueChange={setPosition}>
                    <SelectTrigger className="bg-background/50 border-border focus:border-primary">
                      <SelectValue placeholder="Selecione seu cargo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ceo">CEO / Proprietário</SelectItem>
                      <SelectItem value="diretor">Diretor</SelectItem>
                      <SelectItem value="gerente">Gerente</SelectItem>
                      <SelectItem value="coordenador">Coordenador</SelectItem>
                      <SelectItem value="analista">Analista</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Segmento</label>
                  <Select value={segment} onValueChange={setSegment}>
                    <SelectTrigger className="bg-background/50 border-border focus:border-primary">
                      <SelectValue placeholder="Selecione o segmento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="agroindustria">Agroindústria</SelectItem>
                      <SelectItem value="industria">Indústria</SelectItem>
                      <SelectItem value="varejo">Varejo</SelectItem>
                      <SelectItem value="servicos">Serviços</SelectItem>
                      <SelectItem value="financas">Finanças</SelectItem>
                      <SelectItem value="saude">Saúde</SelectItem>
                      <SelectItem value="logistica">Logística</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Número de funcionários</label>
                  <Select value={employees} onValueChange={setEmployees}>
                    <SelectTrigger className="bg-background/50 border-border focus:border-primary">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-50">Menos de 50</SelectItem>
                      <SelectItem value="51-200">50 a 200</SelectItem>
                      <SelectItem value="201-500">200 a 500</SelectItem>
                      <SelectItem value="501-1000">500 a 1.000</SelectItem>
                      <SelectItem value="1000+">Mais de 1.000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Área de interesse</label>
                  <Select value={interest} onValueChange={setInterest}>
                    <SelectTrigger className="bg-background/50 border-border focus:border-primary">
                      <SelectValue placeholder="Selecione a área" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bi">BI & Analytics</SelectItem>
                      <SelectItem value="integracao">Integração de Dados</SelectItem>
                      <SelectItem value="governanca">Governança de Dados</SelectItem>
                      <SelectItem value="automacao">Automação de Processos</SelectItem>
                      <SelectItem value="consultoria">Consultoria Estratégica</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  O que mais te incomoda hoje sobre seus dados?
                </label>
                <Textarea 
                  name="concerns"
                  placeholder="Números que não batem? Decisões lentas? Dependência de planilhas? Conte brevemente..."
                  rows={3}
                  className="bg-background/50 border-border focus:border-primary resize-none"
                />
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl px-6 py-3 hover:scale-[1.02] hover:shadow-[0_10px_30px_hsl(var(--primary)/0.4)] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 pointer-events-auto"
              >
                {isSubmitting ? (
                  "Enviando..."
                ) : (
                  <>
                    Quero clareza nos meus dados
                    <Send className="w-5 h-5" />
                  </>
                )}
              </Button>
              
              <motion.p 
                className="text-center text-muted-foreground text-xs"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.9 }}
              >
                Respondemos em até 24 horas úteis. Sem spam, sem insistência.
              </motion.p>
            </form>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};