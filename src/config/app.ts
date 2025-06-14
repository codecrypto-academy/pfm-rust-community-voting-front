
export interface AppConfig {
  useMockData: boolean;
  solana: {
    cluster: string;
    programId: string;
  };
}

export const getAppConfig = (): AppConfig => {
  const useMockData = process.env.VITE_USE_MOCK_DATA === 'true';
  
  return {
    useMockData,
    solana: {
      cluster: process.env.VITE_SOLANA_CLUSTER || 'http://localhost:8899',
      programId: process.env.VITE_PROGRAM_ID || 'CgEPCH2sZKj5Zi7Ms2pJsvi4KKVde76GYbSRnfePGHtn'
    }
  };
};

export const appConfig = getAppConfig();
