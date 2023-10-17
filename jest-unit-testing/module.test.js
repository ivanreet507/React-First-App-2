import mut from './module.js'; // MUT = Module Under Test

const portfolio = new mut.StockPortfolio();

test('empty initial portfolio', () => {
  expect(portfolio.symbols).toEqual([]);
  expect(portfolio.shares).toEqual([]);
});

test('isPortfolioEmpty works correctly for a new portfolio', () => {
  const emptyPortfolio = new mut.StockPortfolio();
  expect(emptyPortfolio.isPortfolioEmpty()).toBe(true);
});

test('countSymbols works correctly with non-empty portfolio', () => {
  const nonEmptyPortfolio = new mut.StockPortfolio();
  nonEmptyPortfolio.symbols = ['GME', 'RMLX'];
  nonEmptyPortfolio.shares = [5, 10];
  expect(nonEmptyPortfolio.countSymbols()).toBe(2);
});

test('purchasing stock updates portfolio correctly', () => {
    const purchasePortfolio = new mut.StockPortfolio();
    purchasePortfolio.purchaseStock('RBLX', 10);
    expect(purchasePortfolio.symbols[0]).toBe('RBLX');
    expect(purchasePortfolio.shares[0]).toBe(10);
    purchasePortfolio.purchaseStock('RBLX', 15);
    expect(purchasePortfolio.shares[0]).toBe(25);
})

test('selling stock updates portfolio correctly', () => {
    const sellPortfolio = new mut.StockPortfolio();
    sellPortfolio.purchaseStock('RBLX', 20);
    expect(sellPortfolio.shares[0]).toBe(20);
    sellPortfolio.sellStock('RBLX', 10);
    expect(sellPortfolio.shares[0]).toBe(10);
});

test('selling stock method throws an error for non-existing ticker symbol', () => {
    const sellErrorPortfolio = new mut.StockPortfolio();
    expect(() => sellErrorPortfolio.sellStock('GME', 5)).toThrowError('Ticker symbol does not exist in Portfolio');
});


test('getShares works correctly after transactions', () => {
    const getSharesPortfolio = new mut.StockPortfolio();
    getSharesPortfolio.purchaseStock('RBLX', 20);
    expect(getSharesPortfolio.getShares('RBLX')).toBe(20);
    getSharesPortfolio.sellStock('RBLX', 5);
    expect(getSharesPortfolio.getShares('RBLX')).toBe(15);
});


test('portfolio ownership is updated correctly after transactions', () => {
    const ownershipPortfolio = new mut.StockPortfolio();
    ownershipPortfolio.purchaseStock('RBLX', 20);
    ownershipPortfolio.purchaseStock('GME', 5);
    ownershipPortfolio.sellStock('RBLX', 20);
    expect(ownershipPortfolio.symbols).toEqual(['GME']);
    expect(ownershipPortfolio.shares).toEqual([5]);
});

test('selling more shares than owned throws an exception', () => {
    const exceptionPortfolio = new mut.StockPortfolio();
    exceptionPortfolio.purchaseStock('RBLX', 20);
    expect(() => exceptionPortfolio.sellStock('RBLX', 21)).toThrowError(mut.ShareSaleException);
});
