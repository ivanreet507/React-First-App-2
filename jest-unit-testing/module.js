class ShareSaleException extends Error {
    constructor(message) {
      super(message);
    }
  }
  
  class StockPortfolio {
    constructor() {
      this.symbols = [];
      this.shares = [];
    }
  
    countSymbols() {
      return this.symbols.length;
    }
  
    isPortfolioEmpty() {
      return this.countSymbols() === 0;
    }
  
    purchaseStock(symbol, shares) {
      if (shares <= 0) {
        throw new ShareSaleException('The quantity of shares must exceed zero');
      }
      const index = this.symbols.indexOf(symbol);
      if (index !== -1) {
        this.shares[index] += shares;
      } else {
        this.symbols.push(symbol);
        this.shares.push(shares);
      }
    }

    getShares(symbol) {
      const index = this.symbols.indexOf(symbol);
      return index !== -1 ? this.shares[index] : 0;
    }
  
    sellStock(symbol, shares) {
      const index = this.symbols.indexOf(symbol);
      if (index === -1) {
        throw new Error('Ticker symbol does not exist in Portfolio');
      }
      if (shares > this.shares[index]) {
        throw new ShareSaleException('Insufficient quantity of shares for selling');
      }
      this.shares[index] -= shares;
      if (this.shares[index] === 0) {
        this.symbols.splice(index, 1);
        this.shares.splice(index, 1);
      }
    }
  }
  
  export default { StockPortfolio, ShareSaleException };
