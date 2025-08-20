import React, { useState, useMemo, useCallback } from 'react';
import type { FormData, CalculationResults } from '../types.ts';

// --- HELPER UI COMPONENTS (Defined outside main component to prevent re-creation on re-render) ---

// ICONS
const FuelIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v-4.707l-2.646 2.647a.5.5 0 01-.708-.708l3.5-3.5a.5.5 0 01.708 0l3.5 3.5a.5.5 0 01-.708.708L10 9.293V14a1 1 0 01-2 0zM5.06 5.06a8 8 0 1111.88 11.88" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8h.01M3.5 12H2a1 1 0 00-1 1v1a1 1 0 001 1h1.5M19 12h1.5a1 1 0 011 1v1a1 1 0 01-1 1H19M7.757 18.243l-1.414 1.414M16.243 18.243l1.414 1.414M12 20.5V22" />
  </svg>
);
const LightningIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
    </svg>
);
const WrenchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
const RoadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.369l3.43 1.638a1 1 0 01.57.92V15a1 1 0 01-1 1h-1.328a1 1 0 01-.948-.684l-1.03-3.089a1 1 0 00-.948-.684H8.755a1 1 0 00-.948.684l-1.03 3.09A1 1 0 015.828 16H4.5a1 1 0 01-1-1V5.927a1 1 0 01.57-.92L7 3.37V3a1 1 0 011-1h2zm1 11.236l1.03 3.09.001.001H14.5V6.86L11 5.23v8.006zm-4.03-3.09L6 14.325V6.859l3-1.428v8.006H7.97z" clipRule="evenodd" />
    </svg>
);
const MoneyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
        <path d="M8.433 7.418c.158-.103.346-.196.567-.267v1.698a2.5 2.5 0 00-1.162-.328 2.5 2.5 0 00-1.162.328V7.151c.22-.07.409-.164.567-.267C8.07 7.758 8.25 8 8.5 8s.43-.242.567-.582z" />
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.5 4.5 0 00-1.879 1.545C6.44 6.94 6 7.646 6 8.5c0 .854.44 1.56.977 1.863A4.502 4.502 0 008.5 11.5c.396 0 .784-.055 1.157-.162l.14.35a.5.5 0 00.916-.364V5z" clipRule="evenodd" />
    </svg>
);
const TicketIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
        <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 100 4v2a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm14 2v2a1 1 0 11-2 0V8a1 1 0 112 0zm-4 0v2a1 1 0 11-2 0V8a1 1 0 112 0zM8 8v2a1 1 0 11-2 0V8a1 1 0 112 0zM4 8v2a1 1 0 11-2 0V8a1 1 0 112 0z" />
    </svg>
);
const HomeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
    </svg>
);


// CARD COMPONENT
interface CardProps {
  children: React.ReactNode;
  className?: string;
}
const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`bg-white text-slate-900 rounded-xl shadow-md p-6 ${className}`}>
    {children}
  </div>
);

// INPUT GROUP COMPONENT
interface InputGroupProps {
  label: string;
  name: keyof Omit<FormData, 'rentalPeriod'>;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  unit: string;
  placeholder: string;
  icon: React.ReactNode;
}
const InputGroup: React.FC<InputGroupProps> = ({ label, name, value, onChange, unit, placeholder, icon }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-slate-700">{label}</label>
    <div className="mt-1 relative rounded-md shadow-sm">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        {icon}
      </div>
      <input
        type="number"
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className="block w-full pl-10 pr-12 border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-slate-50 text-slate-900 placeholder:text-slate-400"
        placeholder={placeholder}
        min="0"
        step="0.01"
      />
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <span className="text-slate-500 sm:text-sm">{unit}</span>
      </div>
    </div>
  </div>
);

// BUTTON COMPONENT
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger';
    children: React.ReactNode;
}
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ variant = 'primary', children, className = '', ...props }, ref) => {
    const baseClasses = "inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 transition-colors";
    const variantClasses = {
        primary: 'text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
        secondary: 'text-slate-700 bg-slate-200 hover:bg-slate-300 focus:ring-slate-400',
        danger: 'text-white bg-red-600 hover:bg-red-700 focus:ring-red-500'
    };
    return (
        <button ref={ref} className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
            {children}
        </button>
    );
});


// --- MAIN CALCULATOR COMPONENT ---

const initialFormData: FormData = {
  fuelConsumption: '12',
  fuelPrice: '5.80',
  maintenance: '1000',
  tires: '800',
  insurance: '2000',
  oilChange: '400',
  distance: '200',
  earnings: '300',
  alimentation: '0',
  rentalCost: '0',
  rentalPeriod: 'daily',
  tolls: '0',
  accommodation: '0',
};

const Calculator: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [results, setResults] = useState<CalculationResults | null>(null);
  const [vehicleType, setVehicleType] = useState<'combustion' | 'electric'>('combustion');
  const [tripType, setTripType] = useState<'daily' | 'long'>('daily');
  const [isRoundTrip, setIsRoundTrip] = useState<boolean>(false);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);
  
  const handlePeriodChange = useCallback((period: 'daily' | 'weekly' | 'monthly') => {
    setFormData(prev => ({ ...prev, rentalPeriod: period }));
  }, []);

  const parsedData = useMemo(() => {
    const data: any = {};
    for (const key in formData) {
      if (key !== 'rentalPeriod') {
        data[key] = parseFloat(String(formData[key as keyof FormData]).replace(',', '.')) || 0;
      }
    }
    return data as { [K in keyof Omit<FormData, 'rentalPeriod'>]: number };
  }, [formData]);

  const handleCalculate = useCallback(() => {
    const {
      fuelConsumption, fuelPrice, maintenance, tires, insurance, oilChange,
      distance, earnings, rentalCost, alimentation, tolls, accommodation
    } = parsedData;

    if (fuelConsumption <= 0) {
      alert("O consumo de combustível deve ser maior que zero.");
      return;
    }
     if (distance <= 0) {
      alert("A distância deve ser maior que zero para calcular.");
      return;
    }
    
    const tripDistance = isRoundTrip && tripType === 'long' ? distance * 2 : distance;

    // Calcula o custo diário da locação, normalizando os valores semanais e mensais.
    let dailyRentalCost = 0;
    if (rentalCost > 0) {
        switch (formData.rentalPeriod) {
            case 'daily':
                dailyRentalCost = rentalCost;
                break;
            case 'weekly':
                dailyRentalCost = rentalCost / 7; // Custo semanal dividido por 7 dias
                break;
            case 'monthly':
                dailyRentalCost = rentalCost / 30; // Custo mensal dividido por 30 dias
                break;
        }
    }
    const totalRentalCost = dailyRentalCost * (tripType === 'long' ? 1 : 1); // Logic can be expanded for multi-day trips

    const totalFuelCost = (tripDistance / fuelConsumption) * fuelPrice;
    const expensesPer10kKm = maintenance + tires + insurance + oilChange;
    const otherExpensesPerKm = expensesPer10kKm / 10000;
    const otherExpenses = otherExpensesPerKm * tripDistance;
    
    const totalExpenses = totalFuelCost + otherExpenses + totalRentalCost + alimentation + tolls + accommodation;
    const netProfit = earnings - totalExpenses;
    
    const costPerKm = tripDistance > 0 ? totalExpenses / tripDistance : 0;
    const profitMargin = earnings > 0 ? (netProfit / earnings) * 100 : 0;
    const breakevenEarnings = totalExpenses;

    setResults({
      totalFuelCost,
      otherExpenses,
      totalRentalCost,
      alimentationCost: alimentation,
      totalTolls: tolls,
      totalAccommodation: accommodation,
      totalExpenses,
      netProfit,
      costPerKm,
      breakevenEarnings,
      profitMargin
    });
  }, [parsedData, formData.rentalPeriod, isRoundTrip, tripType]);
  
  const handleReset = useCallback(() => {
    setFormData(initialFormData);
    setResults(null);
    setVehicleType('combustion');
    setTripType('daily');
    setIsRoundTrip(false);
  }, []);

  const handlePrint = () => {
    window.print();
  };
  
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  // Dynamic labels, placeholders, and icons based on vehicle type
  const isElectric = vehicleType === 'electric';
  const consumptionLabel = isElectric ? "Consumo (Km/kWh)" : "Consumo (Km/L)";
  const consumptionUnit = isElectric ? "Km/kWh" : "Km/L";
  const consumptionPlaceholder = isElectric ? "6.5" : "12.5";
  const priceLabel = isElectric ? "Preço da Energia" : "Preço do Combustível";
  const priceUnit = isElectric ? "R$/kWh" : "R$/L";
  const pricePlaceholder = isElectric ? "0.95" : "5.80";
  const energyIcon = isElectric ? <LightningIcon /> : <FuelIcon />;
  const energyCostLabel = isElectric ? "Custo com Energia" : "Custo com Combustível";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      {/* Form Section */}
      <div className="lg:col-span-2 print:hidden">
        <form onSubmit={(e) => { e.preventDefault(); handleCalculate(); }}>
          <Card className="flex flex-col gap-6">
             <fieldset>
              <legend className="block text-sm font-medium text-slate-700 mb-1">Tipo de Cálculo</legend>
              <div className="grid grid-cols-2 gap-2 rounded-md bg-slate-100 p-1">
                {(['daily', 'long'] as const).map(type => {
                    const labels = { daily: 'Jornada Diária', long: 'Viagem Longa' };
                    return (
                        <button key={type} type="button" onClick={() => setTripType(type)}
                            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 ${
                                tripType === type ? 'bg-white text-blue-600 shadow-sm' : 'bg-transparent text-slate-600 hover:bg-slate-200'
                            }`}
                        >
                            {labels[type]}
                        </button>
                    );
                })}
              </div>
            </fieldset>

             <fieldset>
              <legend className="block text-sm font-medium text-slate-700 mb-1">Tipo de Veículo</legend>
              <div className="grid grid-cols-2 gap-2 rounded-md bg-slate-100 p-1">
                {(['combustion', 'electric'] as const).map(type => {
                    const labels = { combustion: 'Combustão', electric: 'Elétrico' };
                    return (
                        <button
                            key={type} type="button" onClick={() => setVehicleType(type)}
                            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 ${
                                vehicleType === type ? 'bg-white text-blue-600 shadow-sm' : 'bg-transparent text-slate-600 hover:bg-slate-200'
                            }`}
                        >
                            {labels[type]}
                        </button>
                    );
                })}
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-lg font-semibold text-slate-800 mb-2">Veículo e {isElectric ? 'Energia' : 'Combustível'}</legend>
              <div className="bg-slate-50 p-4 rounded-lg">
                <div className="space-y-4">
                  <InputGroup label={consumptionLabel} name="fuelConsumption" value={formData.fuelConsumption} onChange={handleInputChange} unit={consumptionUnit} placeholder={consumptionPlaceholder} icon={energyIcon} />
                  <InputGroup label={priceLabel} name="fuelPrice" value={formData.fuelPrice} onChange={handleInputChange} unit={priceUnit} placeholder={pricePlaceholder} icon={<MoneyIcon />} />
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-lg font-semibold text-slate-800 mb-2">Despesas (a cada 10.000 Km)</legend>
              <div className="bg-slate-50 p-4 rounded-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputGroup label="Manutenção" name="maintenance" value={formData.maintenance} onChange={handleInputChange} unit="R$" placeholder="1000" icon={<WrenchIcon />} />
                  <InputGroup label="Pneus" name="tires" value={formData.tires} onChange={handleInputChange} unit="R$" placeholder="800" icon={<WrenchIcon />} />
                  <InputGroup label="Seguro/IPVA" name="insurance" value={formData.insurance} onChange={handleInputChange} unit="R$" placeholder="2000" icon={<WrenchIcon />} />
                  <InputGroup label="Óleo" name="oilChange" value={formData.oilChange} onChange={handleInputChange} unit="R$" placeholder="400" icon={<WrenchIcon />} />
                </div>
              </div>
            </fieldset>
            
            <fieldset>
              <legend className="text-lg font-semibold text-slate-800 mb-2">Locação (Opcional)</legend>
              <div className="bg-slate-50 p-4 rounded-lg">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Período da Locação</label>
                        <div className="grid grid-cols-3 gap-2 rounded-md bg-slate-100 p-1">
                            {(['daily', 'weekly', 'monthly'] as const).map(period => {
                                const labels = { daily: 'Diário', weekly: 'Semanal', monthly: 'Mensal' };
                                return (
                                    <button
                                        key={period} type="button" onClick={() => handlePeriodChange(period)}
                                        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 ${
                                            formData.rentalPeriod === period ? 'bg-white text-blue-600 shadow-sm' : 'bg-transparent text-slate-600 hover:bg-slate-200'
                                        }`}
                                    >
                                        {labels[period]}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    <InputGroup label="Custo da Locação" name="rentalCost" value={formData.rentalCost} onChange={handleInputChange} unit="R$" placeholder="100" icon={<MoneyIcon />} />
                </div>
              </div>
            </fieldset>

            {tripType === 'long' && (
                <fieldset>
                    <legend className="text-lg font-semibold text-slate-800 mb-2">Custos da Viagem</legend>
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <div className="space-y-4">
                          <InputGroup label="Pedágios" name="tolls" value={formData.tolls} onChange={handleInputChange} unit="R$" placeholder="50" icon={<TicketIcon />} />
                          <InputGroup label="Hospedagem" name="accommodation" value={formData.accommodation} onChange={handleInputChange} unit="R$" placeholder="250" icon={<HomeIcon />} />
                      </div>
                    </div>
                </fieldset>
            )}

            <fieldset>
              <legend className="text-lg font-semibold text-slate-800 mb-2">{tripType === 'long' ? 'Detalhes da Viagem' : 'Jornada Diária'}</legend>
              <div className="bg-slate-50 p-4 rounded-lg">
                <div className="space-y-4">
                  <InputGroup label={tripType === 'long' ? 'Distância (apenas ida)' : 'Distância Total do Dia'} name="distance" value={formData.distance} onChange={handleInputChange} unit="Km" placeholder="200" icon={<RoadIcon />} />
                   {tripType === 'long' && (
                      <div className="flex items-center">
                          <input id="roundTrip" name="roundTrip" type="checkbox" checked={isRoundTrip} onChange={(e) => setIsRoundTrip(e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"/>
                          <label htmlFor="roundTrip" className="ml-2 block text-sm text-slate-900">Viagem de Ida e Volta?</label>
                      </div>
                   )}
                  <InputGroup label={tripType === 'long' ? 'Ganhos Totais da Viagem' : 'Ganhos Totais do Dia'} name="earnings" value={formData.earnings} onChange={handleInputChange} unit="R$" placeholder="300" icon={<MoneyIcon />} />
                  <InputGroup label="Alimentação" name="alimentation" value={formData.alimentation} onChange={handleInputChange} unit="R$" placeholder="30" icon={<MoneyIcon />} />
                </div>
              </div>
            </fieldset>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Button type="submit" className="w-full">Calcular</Button>
                <Button type="button" variant="secondary" onClick={handleReset} className="w-full">Resetar</Button>
            </div>
          </Card>
        </form>
      </div>

      {/* Results Section */}
      <div className="lg:col-span-3">
        <div className="print:block" id="results-section">
            <div className="hidden print:block mb-4">
                <h2 className="text-xl font-bold">Relatório de Viabilidade</h2>
                <p className="text-sm text-gray-600">Gerado em: {new Date().toLocaleString('pt-BR')}</p>
            </div>

            {!results ? (
                <Card className="flex items-center justify-center h-full min-h-[300px] print:hidden">
                    <p className="text-slate-500 text-center">Preencha os dados e clique em "Calcular" para ver a análise.</p>
                </Card>
            ) : (
                <div className="space-y-6">
                    <Card className={results.netProfit >= 0 ? 'bg-green-50' : 'bg-red-50'}>
                        <h2 className="text-lg font-medium text-slate-600 text-center">{tripType === 'long' ? 'Resultado da Viagem' : 'Resultado do Dia'}</h2>
                        <p className={`text-4xl font-bold text-center mt-2 ${results.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {formatCurrency(results.netProfit)}
                        </p>
                        <p className="text-center text-sm text-slate-500 mt-1">
                            {results.netProfit >= 0 ? 'Lucro Líquido' : 'Prejuízo Líquido'}
                        </p>
                    </Card>

                    <Card>
                        <h3 className="text-lg font-semibold text-slate-800 mb-4">Resumo Financeiro</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center"><span className="text-slate-600">Ganhos Brutos</span><span className="font-medium text-slate-800">{formatCurrency(parsedData.earnings)}</span></div>
                            <div className="flex justify-between items-center"><span className="text-slate-600">Custo Total</span><span className="font-medium text-red-500">{formatCurrency(results.totalExpenses)}</span></div>
                            <hr />
                             <div className="flex justify-between items-center text-lg"><span className="font-semibold text-slate-800">Lucro/Prejuízo Líquido</span><span className={`font-bold ${results.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>{formatCurrency(results.netProfit)}</span></div>
                        </div>
                    </Card>

                    <Card>
                        <h3 className="text-lg font-semibold text-slate-800 mb-4">Detalhamento de Custos</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center"><span className="text-slate-600">{energyCostLabel}</span><span className="font-medium">{formatCurrency(results.totalFuelCost)}</span></div>
                            {results.totalRentalCost > 0 && (
                                <div className="flex justify-between items-center"><span className="text-slate-600">Custo com Locação</span><span className="font-medium">{formatCurrency(results.totalRentalCost)}</span></div>
                            )}
                             {results.totalTolls > 0 && (
                                <div className="flex justify-between items-center"><span className="text-slate-600">Custo com Pedágios</span><span className="font-medium">{formatCurrency(results.totalTolls)}</span></div>
                            )}
                             {results.totalAccommodation > 0 && (
                                <div className="flex justify-between items-center"><span className="text-slate-600">Custo com Hospedagem</span><span className="font-medium">{formatCurrency(results.totalAccommodation)}</span></div>
                            )}
                            <div className="flex justify-between items-center"><span className="text-slate-600">Despesas (Manutenção, Pneus, etc.)</span><span className="font-medium">{formatCurrency(results.otherExpenses)}</span></div>
                             {results.alimentationCost > 0 && (
                                <div className="flex justify-between items-center"><span className="text-slate-600">Custo com Alimentação</span><span className="font-medium">{formatCurrency(results.alimentationCost)}</span></div>
                            )}
                            <hr/>
                            <div className="flex justify-between items-center"><span className="font-semibold text-slate-800">Custo Total</span><span className="font-bold">{formatCurrency(results.totalExpenses)}</span></div>
                        </div>
                    </Card>

                    <Card>
                        <h3 className="text-lg font-semibold text-slate-800 mb-4">Métricas Adicionais</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-center">
                            <div>
                                <p className="text-sm text-slate-500">Custo por Km</p>
                                <p className="text-xl font-bold text-blue-600">{formatCurrency(results.costPerKm)}</p>
                            </div>
                             <div>
                                <p className="text-sm text-slate-500">Margem de Lucro</p>
                                <p className={`text-xl font-bold ${results.profitMargin >= 0 ? 'text-green-600' : 'text-red-600'}`}>{results.profitMargin.toFixed(2)}%</p>
                            </div>
                             <div>
                                <p className="text-sm text-slate-500">Ponto de Equilíbrio (Ganhos)</p>
                                <p className="text-xl font-bold text-slate-800">{formatCurrency(results.breakevenEarnings)}</p>
                            </div>
                        </div>
                    </Card>
                    
                    <div className="mt-6 text-center print:hidden">
                        <Button onClick={handlePrint}>
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v3a2 2 0 002 2h6a2 2 0 002-2v-3h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
                            </svg>
                            Imprimir Relatório
                        </Button>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
