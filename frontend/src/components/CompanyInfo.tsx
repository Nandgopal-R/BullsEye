import { TrendingUp, TrendingDown, BarChart3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StockInfo {
  weekHigh52: number;
  weekLow52: number;
  avgVolume: number;
}

interface CompanyInfoProps {
  companyName: string;
  symbol: string;
  currentPrice: number;
  priceChange: number;
  priceChangePercent: number;
  stockInfo: StockInfo;
}

const CompanyInfo = ({
  companyName,
  symbol,
  currentPrice,
  priceChange,
  priceChangePercent,
  stockInfo
}: CompanyInfoProps) => {
  const isPositive = priceChange >= 0;

  const formatNumber = (num: number) => {
    if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="space-y-6">
      {/* Company header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{companyName}</h1>
          <p className="text-lg text-muted-foreground">{symbol}</p>
        </div>
        
        <div className="text-right">
          <div className="text-3xl font-bold text-foreground">
            ${currentPrice.toFixed(2)}
          </div>
          <div className={`flex items-center gap-1 justify-end ${
            isPositive ? 'text-success' : 'text-danger'
          }`}>
            {isPositive ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            <span className="font-medium">
              {isPositive ? '+' : ''}{priceChange.toFixed(2)} 
              ({isPositive ? '+' : ''}{priceChangePercent.toFixed(2)}%)
            </span>
          </div>
        </div>
      </div>

      {/* Stock metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="gradient-card border-border/50 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-success/20 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">52W High</p>
                <p className="text-lg font-bold text-foreground">
                  ${stockInfo.weekHigh52.toFixed(2)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border-border/50 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-danger/20 flex items-center justify-center">
                <TrendingDown className="h-5 w-5 text-danger" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">52W Low</p>
                <p className="text-lg font-bold text-foreground">
                  ${stockInfo.weekLow52.toFixed(2)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border-border/50 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Volume</p>
                <p className="text-lg font-bold text-foreground">
                  {formatNumber(stockInfo.avgVolume)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompanyInfo;