
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Button from '../components/Button';
import { useToast } from '@/hooks/use-toast';

const Poll = () => {
  const { id } = useParams();
  const { connected, publicKey } = useWallet();
  const { toast } = useToast();
  
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [isVoting, setIsVoting] = useState(false);

  // Mock poll data
  const pollData = {
    id: id || '1',
    question: 'Should we implement a new rewards system for active community members?',
    description: 'This poll will determine the future of our community rewards program. Please consider the long-term implications of your choice.',
    options: [
      { text: 'Yes, with token rewards', votes: 142 },
      { text: 'Yes, with NFT rewards', votes: 87 },
      { text: 'No, keep current system', votes: 34 },
      { text: 'Need more discussion', votes: 23 }
    ],
    totalVotes: 286,
    endTime: new Date(Date.now() + 86400000), // 24 hours from now
    isActive: true,
    createdBy: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
    createdAt: new Date(Date.now() - 172800000) // 2 days ago
  };

  const handleVote = async () => {
    if (!connected || !publicKey) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to vote",
        variant: "destructive"
      });
      return;
    }

    if (selectedOption === null) {
      toast({
        title: "No option selected",
        description: "Please select an option before voting",
        variant: "destructive"
      });
      return;
    }

    setIsVoting(true);
    
    try {
      // Simulate voting
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setHasVoted(true);
      toast({
        title: "Vote cast successfully!",
        description: "Your vote has been recorded on the blockchain",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to cast vote. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsVoting(false);
    }
  };

  const handleClosePoll = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast({
        title: "Poll closed",
        description: "This poll has been closed by the admin",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to close poll",
        variant: "destructive"
      });
    }
  };

  const timeLeft = pollData.endTime.getTime() - new Date().getTime();
  const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

  const getVotePercentage = (votes: number) => {
    return pollData.totalVotes > 0 ? (votes / pollData.totalVotes) * 100 : 0;
  };

  if (!connected) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[80vh]">
          <Card className="text-center max-w-md">
            <h2 className="text-2xl font-bold text-charcoal mb-4">
              Connect Wallet
            </h2>
            <p className="text-gray-600 mb-6">
              Please connect your wallet to view and vote on this poll
            </p>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Poll Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card>
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-charcoal mb-4">
                  {pollData.question}
                </h1>
                <p className="text-gray-600 mb-4">
                  {pollData.description}
                </p>
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <span>Created by: {pollData.createdBy.slice(0, 8)}...{pollData.createdBy.slice(-8)}</span>
                  <span>Created: {pollData.createdAt.toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  pollData.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                }`}>
                  {pollData.isActive ? 'Active' : 'Closed'}
                </span>
                {/* Admin only button - in real app, check if user is admin */}
                {pollData.isActive && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleClosePoll}
                    className="text-red-600 hover:bg-red-50"
                  >
                    Close Poll
                  </Button>
                )}
              </div>
            </div>

            {pollData.isActive && (
              <div className="bg-accent-purple/10 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-charcoal">
                    Time remaining: {hoursLeft}h {minutesLeft}m
                  </span>
                  <span className="text-sm text-gray-600">
                    {pollData.totalVotes} total votes
                  </span>
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-accent-purple h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min((timeLeft / (7 * 24 * 60 * 60 * 1000)) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            )}
          </Card>
        </motion.div>

        {/* Voting Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card>
            <h2 className="text-2xl font-semibold text-charcoal mb-6">
              {hasVoted ? 'Your Vote' : 'Cast Your Vote'}
            </h2>
            
            <div className="space-y-4">
              {pollData.options.map((option, index) => {
                const percentage = getVotePercentage(option.votes);
                const isSelected = selectedOption === index;
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className={`relative overflow-hidden border-2 rounded-xl transition-all cursor-pointer ${
                      isSelected 
                        ? 'border-accent-purple bg-accent-purple/5' 
                        : 'border-gray-200 hover:border-gray-300'
                    } ${hasVoted ? 'cursor-default' : ''}`}
                    onClick={() => !hasVoted && pollData.isActive && setSelectedOption(index)}
                  >
                    {/* Progress bar background */}
                    <div 
                      className="absolute inset-0 bg-accent-purple/10 transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                    
                    <div className="relative p-4 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full border-2 transition-all ${
                          isSelected 
                            ? 'border-accent-purple bg-accent-purple' 
                            : 'border-gray-300'
                        }`}>
                          {isSelected && (
                            <div className="w-full h-full rounded-full bg-white scale-50"></div>
                          )}
                        </div>
                        <span className="font-medium text-charcoal">
                          {option.text}
                        </span>
                      </div>
                      
                      <div className="text-right">
                        <div className="font-semibold text-charcoal">
                          {option.votes} votes
                        </div>
                        <div className="text-sm text-gray-500">
                          {percentage.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            
            {!hasVoted && pollData.isActive && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-6 pt-6 border-t border-gray-200"
              >
                <Button
                  onClick={handleVote}
                  disabled={selectedOption === null || isVoting}
                  className="w-full"
                >
                  {isVoting ? 'Casting Vote...' : 'Cast Vote'}
                </Button>
              </motion.div>
            )}
            
            {hasVoted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 pt-6 border-t border-gray-200 text-center"
              >
                <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full inline-block font-medium">
                  ✓ Vote recorded successfully
                </div>
              </motion.div>
            )}
          </Card>
        </motion.div>

        {/* Back to Community */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Button
            variant="outline"
            onClick={() => window.location.href = '/community/main'}
          >
            ← Back to Community
          </Button>
        </motion.div>
      </main>
    </div>
  );
};

export default Poll;
