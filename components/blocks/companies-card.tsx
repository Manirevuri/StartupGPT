import { motion } from "framer-motion";
import  CompanyCard  from "@/components/company-card"

const CompanyBlock = (companies: any) => {
  return (
    <div className="px-18 lg:px-24">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-[1400px] mx-auto"
      >
        <CompanyCard companies={companies.data} />
      </motion.div>
    </div>
  );
};

export default CompanyBlock;