import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ROIQuiz from "@/components/quiz/ROIQuiz";

export const ROICTASection = () => {
  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: "-50px" });
  const [showROIQuiz, setShowROIQuiz] = useState(false);

  return (
    <>
      <motion.section
        ref={ctaRef}
        initial={{ opacity: 0, y: 40 }}
        animate={ctaInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="py-24 relative overflow-hidden"
      >
        <div className="container mx-auto px-6">
          <div className="relative rounded-3xl bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 border border-primary/20 p-8 md:p-12">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1 text-center lg:text-left">
                <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                  Quanto você está{" "}
                  <span className="text-red-500">perdendo</span>
                  {" "}sem dados?
                </h2>
                <p className="text-muted-foreground text-lg max-w-xl">
                  Responda 3 perguntas e descubra uma estimativa do impacto financeiro 
                  da falta de organização de dados na sua empresa.
                </p>
              </div>
              
              <div className="shrink-0">
                <Button 
                  size="lg" 
                  onClick={() => setShowROIQuiz(true)}
                  className="btn-success-animated group text-base px-8 py-6 rounded-xl bg-success hover:bg-success/90 text-success-foreground"
                >
                  Fazer o quiz
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ROI Quiz Modal */}
      <Dialog open={showROIQuiz} onOpenChange={setShowROIQuiz}>
        <DialogContent className="max-w-lg p-6 md:p-8">
          <ROIQuiz onClose={() => setShowROIQuiz(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
};

