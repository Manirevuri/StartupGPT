import { motion } from "framer-motion";
import { ExternalLink, Building2 } from "lucide-react";

interface Company {
  name: string;
  location: string;
  founders: string[];
  website: string;
  industry: string;
  funding: number;
}

interface CompanyCardProps {
  companies: Company[];
}

const CompanyCard: React.FC<CompanyCardProps> = ({ companies }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-lg border border-gray-100 w-full overflow-hidden"
    >
      <div className="grid divide-y divide-gray-100">
        {companies.map((company, index) => (
          <motion.div
            key={company.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-4 space-y-2">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg">
                    <Building2 className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{company.name}</h3>
                    <p className="text-gray-500 text-sm">{company.location}</p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-4">
                <div className="space-y-3">
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800">
                    {company.industry}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600 font-medium">Funding:</span>
                    <span className="text-blue-600 font-bold">${company.funding}M</span>
                  </div>
                </div>
              </div>

              <div className="md:col-span-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm font-medium">Founders:</span>
                    <a
                      href={`https://${company.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-600 transition-colors flex items-center space-x-1"
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {company.founders.map((founder, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border border-blue-100"
                      >
                        {founder}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default CompanyCard;