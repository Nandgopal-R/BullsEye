import { useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Company {
  name: string;
  symbol: string;
}

interface SidebarProps {
  companies: Company[];
  selectedCompany: string | null;
  onSelectCompany: (symbol: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ 
  companies, 
  selectedCompany, 
  onSelectCompany, 
  isOpen, 
  onClose 
}: SidebarProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCompanies = companies.filter(
    (company) =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      <aside className={cn(
        "fixed md:static top-0 left-0 h-screen w-80 bg-card border-r border-border z-50 transition-smooth transform",
        "md:transform-none md:h-[calc(100vh-4rem)]",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Companies</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="md:hidden hover:bg-primary/10"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background/50 border-border focus:border-primary transition-smooth"
              />
            </div>
          </div>

          {/* Companies list */}
          <div className="flex-1 overflow-y-auto p-2">
            <div className="space-y-1">
              {filteredCompanies.map((company) => (
                <button
                  key={company.symbol}
                  onClick={() => {
                    onSelectCompany(company.symbol);
                    onClose();
                  }}
                  className={cn(
                    "w-full text-left p-3 rounded-lg transition-smooth hover:bg-primary/10",
                    "border border-transparent hover:border-primary/20",
                    selectedCompany === company.symbol && 
                    "bg-primary/20 border-primary/30 shadow-glow"
                  )}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-foreground truncate">
                        {company.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {company.symbol}
                      </p>
                    </div>
                    {selectedCompany === company.symbol && (
                      <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;