import ResultBox from './ResultBox';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

const testCasesFromPLNToUSD = [
    { amount: '100.00', result: '28.57', },
    { amount: '755.00', result: '215.71', },
    { amount: '350.00', result: '100.00', },
    { amount: '687.00', result: '196.29', },
]

const testCasesFromUSDToPLN = [
    { amount: '100.00', result: '350.00', },
    { amount: '647.00', result: '2,264.50', },
    { amount: '35.00', result: '122.50', },
    { amount: '124.00', result: '434.00', },
]

const testCasesSameCurrency = [
    { from: 'USD', to: 'USD', amount: '100.00', result: '100.00', currency: '$'},
    { from: 'USD', to: 'USD', amount: '647.00', result: '647.00', currency: '$'},
    { from: 'PLN', to: 'PLN', amount: '350.00', result: '350.00', currency: 'PLN '},
    { from: 'PLN', to: 'PLN', amount: '224.00', result: '224.00', currency: 'PLN '},
]

const testCasesNegativeValues = [
    { from: 'USD', to: 'USD', amount: '-100.00', result: 'Wrong value...', },
    { from: 'USD', to: 'USD', amount: '-647.00', result: 'Wrong value...', },
    { from: 'PLN', to: 'PLN', amount: '-350.00', result: 'Wrong value...', },
    { from: 'PLN', to: 'PLN', amount: '-224.00', result: 'Wrong value...', },
]
		
  describe('Component ResultBox', () => {
    it('should render without crashing', () => {
        render(<ResultBox from="PLN" to="USD" amount={100} />)
    });
    for(const testObj of testCasesFromPLNToUSD){
    	it('should render proper info about conversion when PLN -> USD', () => {
        render(<ResultBox from="PLN" to="USD" amount={parseInt(testObj.amount)} />);
        const result = screen.getByTestId('result');
        expect(result).toHaveTextContent(`PLN ${testObj.amount} = $${testObj.result}`);
    	});
		  // unmount component
		  cleanup();
		};
		for(const testObj of testCasesFromUSDToPLN){
    	it('should render proper info about conversion when USD -> PLN', () => {
        render(<ResultBox from="USD" to="PLN" amount={parseInt(testObj.amount)} />);
        const result = screen.getByTestId('result');
        expect(result).toHaveTextContent(`$${testObj.amount} = PLN ${testObj.result}`);
    	});
		  // unmount component
		  cleanup();
		};
		for(const testObj of testCasesSameCurrency){
			it('should render proper info if currency is the same', () => {
				render(<ResultBox from={testObj.from} to={testObj.to} amount={testObj.amount} />);
				const result = screen.getByTestId('result');
				expect(result).toHaveTextContent(`${testObj.currency}${testObj.amount} = ${testObj.currency}${testObj.result}`)
			});
			// unmount component
		  cleanup();
		};
		for(const testObj of testCasesNegativeValues){
			it('should return "Wrong value..." if number is negative', () => {
				render(<ResultBox from={testObj.from} to={testObj.to} amount={testObj.amount} />);
				const result = screen.getByTestId('result');
				expect(result).toHaveTextContent(`${testObj.result}`);
			});
			// unmount component
		  cleanup();
		};
});