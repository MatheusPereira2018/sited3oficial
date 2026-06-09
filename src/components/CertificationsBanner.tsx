import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Award } from "lucide-react";

import azureAiFundamentals from "@/assets/certifications/azure-ai-fundamentals.png";
import dataAnalystAssociate from "@/assets/certifications/data-analyst-associate.png";
import powerBiAnalyst from "@/assets/certifications/power-bi-analyst.jpg";
import microsoftAssociate from "@/assets/certifications/microsoft-associate.png";

const certifications = [
  { src: azureAiFundamentals, alt: "Microsoft Azure AI Fundamentals" },
  { src: dataAnalystAssociate, alt: "Microsoft Data Analyst Associate" },
  { src: powerBiAnalyst, alt: "Microsoft Power BI Data Analyst" },
  { src: microsoftAssociate, alt: "Microsoft Certified Associate" },
];

export const CertificationsBanner = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="py-12 relative overflow-hidden" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium mb-6">
            <Award className="w-4 h-4 text-primary" />
            <span>Time com certificações Microsoft</span>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.alt}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group"
              >
                <img
                  src={cert.src}
                  alt={cert.alt}
                  className="h-16 md:h-20 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                  title={cert.alt}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
