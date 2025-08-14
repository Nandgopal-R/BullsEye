import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import StockChart from "@/components/StockChart";
import CompanyInfo from "@/components/CompanyInfo";
import { stockService, Company, StockDataPoint, StockInfo } from "@/services/stockService";

const Index = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [stockData, setStockData] = useState<StockDataPoint[]>([]);
  const [stockInfo, setStockInfo] = useState<StockInfo | null>(null);
  const [isLoadingStocks, setIsLoadingStocks] = useState(false);
  const [isLoadingCompanies, setIsLoadingCompanies] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { toast } = useToast();

  // Load companies on component mount
  useEffect(() => {
    const loadCompanies = async () => {
      try {
        setIsLoadingCompanies(true);
        const data = await stockService.getCompanies();
        setCompanies(data);
        
        // Auto-select first company for better UX
        if (data.length > 0) {
          handleSelectCompany(data[0].symbol);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load companies';
        setError(errorMessage);
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      } finally {
        setIsLoadingCompanies(false);
      }
    };

    loadCompanies();
  }, [toast]);

  const handleSelectCompany = async (symbol: string) => {
    if (symbol === selectedCompany) return;

    try {
      setIsLoadingStocks(true);
      setError(null);
      setSelectedCompany(symbol);
      
      const response = await stockService.getStockData(symbol);
      setStockData(response.data);
      setStockInfo(response.info);
      
      toast({
        title: "Success",
        description: `Loaded data for ${symbol}`,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load stock data';
      setError(errorMessage);
      setStockData([]);
      setStockInfo(null);
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoadingStocks(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const getSelectedCompanyData = () => {
    return companies.find(company => company.symbol === selectedCompany);
  };

  const getCurrentPrice = () => {
    return stockData.length > 0 ? stockData[stockData.length - 1].price : 0;
  };

  const getPriceChange = () => {
    if (stockData.length < 2) return { change: 0, changePercent: 0 };
    
    const current = stockData[stockData.length - 1].price;
    const previous = stockData[stockData.length - 2].price;
    const change = current - previous;
    const changePercent = (change / previous) * 100;
    
    return { change, changePercent };
  };

  const selectedCompanyData = getSelectedCompanyData();
  const { change, changePercent } = getPriceChange();

  if (isLoadingCompanies) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onToggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      
      <div className="flex">
        <Sidebar
          companies={companies}
          selectedCompany={selectedCompany}
          onSelectCompany={handleSelectCompany}
          isOpen={isSidebarOpen}
          onClose={closeSidebar}
        />
        
        <main className="flex-1 p-6 md:ml-0">
          <div className="max-w-7xl mx-auto space-y-6">
            {selectedCompanyData && stockInfo && (
              <CompanyInfo
                companyName={selectedCompanyData.name}
                symbol={selectedCompanyData.symbol}
                currentPrice={getCurrentPrice()}
                priceChange={change}
                priceChangePercent={changePercent}
                stockInfo={stockInfo}
              />
            )}
            
            <StockChart
              data={stockData}
              isLoading={isLoadingStocks}
              error={error}
              companySymbol={selectedCompany || ''}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;