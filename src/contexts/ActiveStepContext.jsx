import { createContext, useContext, useState } from 'react';

const ActiveStepContext = createContext(undefined);

const ActiveStepProvider = ({ children }) => {
  const [activeStep, setActiveStep] = useState(0);
  return (
    <ActiveStepContext.Provider value={{ activeStep, setActiveStep }}>
      {children}
    </ActiveStepContext.Provider>
  );
};

export function useActiveStep() {
  const context = useContext(ActiveStepContext);
  if (context === undefined) {
    throw new Error('useActiveStep must be used within a ActiveStepProvider');
  }
  return context;
}

export default ActiveStepProvider;
