
import React from 'react';
import { motion } from 'framer-motion';
import { useWallet } from '@solana/wallet-adapter-react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Button from '../components/Button';
import PollCard from '../components/PollCard';

const Index = () => {
  const { connected } = useWallet();

  // Mock data for demonstration
  const mockPolls = [
    {
      id: '1',
      question: 'Should we implement a new rewards system for active community members?',
      options: ['Yes, with token rewards', 'Yes, with NFT rewards', 'No, keep current system', 'Need more discussion'],
      endTime: new Date(Date.now() + 86400000), // 24 hours from now
      isActive: true
    },
    {
      id: '2',
      question: 'What should be our next community event?',
      options: ['Virtual meetup', 'AMA session', 'Workshop', 'Gaming tournament'],
      endTime: new Date(Date.now() + 172800000), // 48 hours from now
      isActive: true
    },
    {
      id: '3',
      question: 'Community governance voting mechanism',
      options: ['Quadratic voting', 'One person one vote', 'Token-weighted voting'],
      endTime: new Date(Date.now() - 86400000), // 24 hours ago
      isActive: false
    }
  ];

  const handleJoinCommunity = () => {
    // Navigate to community page
    window.location.href = '/community/main';
  };

  const handleViewPoll = (pollId: string) => {
    window.location.href = `/poll/${pollId}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-charcoal mb-6">
            Decentralized Community Management
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Connect your wallet to join communities, create polls, and participate in decentralized governance. 
            Built on Solana for fast, secure, and transparent decision-making.
          </p>
          
          {!connected ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-accent-purple/10 border border-accent-purple/20 rounded-2xl p-8 max-w-md mx-auto"
            >
              <h3 className="text-lg font-semibold text-charcoal mb-3">
                Get Started
              </h3>
              <p className="text-gray-600 mb-4">
                Connect your Solana wallet to access community features
              </p>
              <div className="w-8 h-8 bg-accent-purple rounded-full mx-auto animate-pulse"></div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Button 
                size="lg"
                onClick={handleJoinCommunity}
                className="mb-4"
              >
                Join Main Community
              </Button>
              <p className="text-gray-600">
                Welcome back! Ready to participate in governance?
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Features Section */}
        {connected && (
          <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-charcoal text-center mb-12">
              Community Features
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-8 h-8 bg-accent-purple rounded-full"></div>
                  </div>
                  <h3 className="text-xl font-semibold text-charcoal mb-3">
                    Join Communities
                  </h3>
                  <p className="text-gray-600">
                    Connect with like-minded individuals and participate in decentralized communities
                  </p>
                </div>
              </Card>

              <Card>
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-8 h-8 bg-accent-purple rounded-full"></div>
                  </div>
                  <h3 className="text-xl font-semibold text-charcoal mb-3">
                    Create Polls
                  </h3>
                  <p className="text-gray-600">
                    Propose ideas and create polls for community members to vote on important decisions
                  </p>
                </div>
              </Card>

              <Card>
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-8 h-8 bg-accent-purple rounded-full"></div>
                  </div>
                  <h3 className="text-xl font-semibold text-charcoal mb-3">
                    Vote & Govern
                  </h3>
                  <p className="text-gray-600">
                    Cast your vote on community proposals and help shape the future of the community
                  </p>
                </div>
              </Card>
            </div>
          </motion.section>
        )}

        {/* Active Polls Section */}
        {connected && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-charcoal">
                Active Polls
              </h2>
              <Button variant="outline" onClick={() => window.location.href = '/admin'}>
                Admin Dashboard
              </Button>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockPolls.map((poll, index) => (
                <motion.div
                  key={poll.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <PollCard
                    {...poll}
                    onView={() => handleViewPoll(poll.id)}
                    onVote={poll.isActive ? () => handleViewPoll(poll.id) : undefined}
                  />
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </main>
    </div>
  );
};

export default Index;
