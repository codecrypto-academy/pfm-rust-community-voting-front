
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useWallet } from '@solana/wallet-adapter-react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Button from '../components/Button';
import FormField from '../components/FormField';
import { useToast } from '@/hooks/use-toast';

const Admin = () => {
  const { connected, publicKey } = useWallet();
  const { toast } = useToast();
  
  const [communityName, setCommunityName] = useState('');
  const [communityDescription, setCommunityDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInitializeCommunity = async () => {
    if (!connected || !publicKey) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to continue",
        variant: "destructive"
      });
      return;
    }

    if (!communityName.trim() || !communityDescription.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call - in real implementation, this would call the Anchor program
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Community initialized!",
        description: `${communityName} has been successfully created`,
      });
      
      setCommunityName('');
      setCommunityDescription('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to initialize community. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const mockPendingMembers = [
    { address: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU', joinedAt: new Date() },
    { address: '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM', joinedAt: new Date() },
  ];

  if (!connected) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[80vh]">
          <Card className="text-center max-w-md">
            <h2 className="text-2xl font-bold text-charcoal mb-4">
              Admin Access Required
            </h2>
            <p className="text-gray-600 mb-6">
              Please connect your wallet to access the admin dashboard
            </p>
            <div className="w-12 h-12 bg-accent-purple/10 rounded-full mx-auto animate-pulse"></div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-charcoal mb-4">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Manage communities, approve memberships, and oversee governance
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Initialize Community */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <h2 className="text-2xl font-semibold text-charcoal mb-6">
                Initialize New Community
              </h2>
              
              <div className="space-y-6">
                <FormField
                  label="Community Name"
                  value={communityName}
                  onChange={setCommunityName}
                  placeholder="Enter community name"
                  required
                />
                
                <div className="form-floating">
                  <textarea
                    value={communityDescription}
                    onChange={(e) => setCommunityDescription(e.target.value)}
                    placeholder="Community Description"
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-purple focus:border-transparent transition-all resize-none"
                  />
                  <label className="text-gray-600">
                    Community Description *
                  </label>
                </div>
                
                <Button
                  onClick={handleInitializeCommunity}
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? 'Initializing...' : 'Initialize Community'}
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Pending Members */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <h2 className="text-2xl font-semibold text-charcoal mb-6">
                Pending Members
              </h2>
              
              {mockPendingMembers.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                  </div>
                  <p className="text-gray-600">No pending membership requests</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {mockPendingMembers.map((member, index) => (
                    <motion.div
                      key={member.address}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                    >
                      <div>
                        <p className="font-mono text-sm text-charcoal">
                          {member.address.slice(0, 8)}...{member.address.slice(-8)}
                        </p>
                        <p className="text-xs text-gray-500">
                          Requested: {member.joinedAt.toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toast({ title: "Member rejected" })}
                        >
                          Reject
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => toast({ title: "Member approved!" })}
                        >
                          Approve
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </Card>
          </motion.div>
        </div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8"
        >
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="text-center">
              <h3 className="text-3xl font-bold text-accent-purple mb-2">3</h3>
              <p className="text-gray-600">Active Communities</p>
            </Card>
            <Card className="text-center">
              <h3 className="text-3xl font-bold text-accent-purple mb-2">247</h3>
              <p className="text-gray-600">Total Members</p>
            </Card>
            <Card className="text-center">
              <h3 className="text-3xl font-bold text-accent-purple mb-2">12</h3>
              <p className="text-gray-600">Active Polls</p>
            </Card>
            <Card className="text-center">
              <h3 className="text-3xl font-bold text-accent-purple mb-2">1,543</h3>
              <p className="text-gray-600">Total Votes Cast</p>
            </Card>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Admin;
