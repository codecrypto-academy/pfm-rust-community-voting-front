
import { PublicKey } from '@solana/web3.js';

export const SOLANA_CLUSTER = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:8899' 
  : 'https://api.devnet.solana.com';

export const PROGRAM_ID = new PublicKey(
  process.env.NODE_ENV === 'development' 
    ? 'CgEPCH2sZKj5Zi7Ms2pJsvi4KKVde76GYbSRnfePGHtn'
    : 'CgEPCH2sZKj5Zi7Ms2pJsvi4KKVde76GYbSRnfePGHtn'
);

export const COMMUNITY_SEED = 'community';
export const MEMBERSHIP_SEED = 'membership';
export const POLL_SEED = 'poll';
export const VOTE_SEED = 'vote';
