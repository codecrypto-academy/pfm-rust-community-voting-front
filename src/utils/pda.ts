
import { PublicKey } from '@solana/web3.js';
import { PROGRAM_ID, COMMUNITY_SEED, MEMBERSHIP_SEED, POLL_SEED, VOTE_SEED } from './constants';

export const getCommunityPDA = (communityId: string) => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from(COMMUNITY_SEED), Buffer.from(communityId)],
    PROGRAM_ID
  );
};

export const getMembershipPDA = (community: PublicKey, member: PublicKey) => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from(MEMBERSHIP_SEED), community.toBuffer(), member.toBuffer()],
    PROGRAM_ID
  );
};

export const getPollPDA = (community: PublicKey, pollId: string) => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from(POLL_SEED), community.toBuffer(), Buffer.from(pollId)],
    PROGRAM_ID
  );
};

export const getVotePDA = (poll: PublicKey, voter: PublicKey) => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from(VOTE_SEED), poll.toBuffer(), voter.toBuffer()],
    PROGRAM_ID
  );
};
