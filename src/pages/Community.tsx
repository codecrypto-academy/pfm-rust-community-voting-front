import { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Button from '../components/Button';
import FormField from '../components/FormField';
import PollCard from '../components/PollCard';
import { useToast } from '@/hooks/use-toast';
import { communityService } from '@/lib/communityService';
import { useWalletExt } from '@/hooks/useAnchorWalletAdapter';


const Community = () => {
  const { id } = useParams();
  console.log('id: ', id);
  const { connected, publicKey, anchorWallet } = useWalletExt();
  const { toast } = useToast();
  
  const [isMember, setIsMember] = useState(false);
  const [showNewPollForm, setShowNewPollForm] = useState(false);
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState(['', '']);
  const [pollEndTime, setPollEndTime] = useState('');

  const handleJoinCommunity = async () => {
    if (!connected || !publicKey) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to join",
        variant: "destructive"
      });
      return;
    }

    try {
      // Simulate joining community
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsMember(true);
      toast({
        title: "Welcome to the community!",
        description: "You can now participate in polls and governance",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to join community. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleCreatePoll = async () => {
    if (!pollQuestion.trim() || pollOptions.some(opt => !opt.trim()) || !pollEndTime) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    try {
      // Simulate creating poll
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Poll created!",
        description: "Your poll is now live for community voting",
      });
      
      setPollQuestion('');
      setPollOptions(['', '']);
      setPollEndTime('');
      setShowNewPollForm(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create poll. Please try again.",
        variant: "destructive"
      });
    }
  };

  const addPollOption = () => {
    setPollOptions([...pollOptions, '']);
  };

  const updatePollOption = (index: number, value: string) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    setPollOptions(newOptions);
  };

  const removePollOption = (index: number) => {
    if (pollOptions.length > 2) {
      setPollOptions(pollOptions.filter((_, i) => i !== index));
    }
  };

  // Mock community data
  const communityData = {
    name: 'Main Community',
    description: 'A decentralized community focused on governance and collaboration',
    memberCount: 247,
    activePolls: 3
  };

  const mockPolls = [
    {
      id: '1',
      question: 'Should we implement a new rewards system?',
      options: ['Yes, with tokens', 'Yes, with NFTs', 'No', 'Need discussion'],
      endTime: new Date(Date.now() + 86400000),
      isActive: true
    },
    {
      id: '2',
      question: 'Next community event?',
      options: ['Virtual meetup', 'AMA session', 'Workshop'],
      endTime: new Date(Date.now() + 172800000),
      isActive: true
    }
  ];

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
              Please connect your wallet to view this community
            </p>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Community Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-charcoal mb-3">
                  {communityData.name}
                </h1>
                <p className="text-gray-600 mb-4">
                  {communityData.description}
                </p>
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <span>{communityData.memberCount} members</span>
                  <span>{communityData.activePolls} active polls</span>
                </div>
              </div>
              
              <div className="flex space-x-3">
                {!isMember ? (
                  <Button onClick={handleJoinCommunity}>
                    Join Community
                  </Button>
                ) : (
                  <div className="flex space-x-3">
                    <Button
                      variant="outline"
                      onClick={() => setShowNewPollForm(!showNewPollForm)}
                    >
                      {showNewPollForm ? 'Cancel' : 'New Poll'}
                    </Button>
                    <div className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      Member
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* New Poll Form */}
        {showNewPollForm && isMember && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8"
          >
            <Card>
              <h2 className="text-2xl font-semibold text-charcoal mb-6">
                Create New Poll
              </h2>
              
              <div className="space-y-6">
                <FormField
                  label="Poll Question"
                  value={pollQuestion}
                  onChange={setPollQuestion}
                  placeholder="What would you like to ask the community?"
                  required
                />
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Poll Options *
                  </label>
                  <div className="space-y-3">
                    {pollOptions.map((option, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <FormField
                          label={`Option ${index + 1}`}
                          value={option}
                          onChange={(value) => updatePollOption(index, value)}
                          placeholder={`Option ${index + 1}`}
                          className="flex-1"
                        />
                        {pollOptions.length > 2 && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removePollOption(index)}
                            className="text-red-600 hover:bg-red-50"
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={addPollOption}
                    className="mt-3"
                  >
                    Add Option
                  </Button>
                </div>
                
                <FormField
                  label="End Time"
                  type="datetime-local"
                  value={pollEndTime}
                  onChange={setPollEndTime}
                  required
                />
                
                <div className="flex space-x-3">
                  <Button onClick={handleCreatePoll} className="flex-1">
                    Create Poll
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowNewPollForm(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Community Polls */}
        {isMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-charcoal mb-6">
              Community Polls
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockPolls.map((poll, index) => (
                <motion.div
                  key={poll.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <PollCard
                    {...poll}
                    onView={() => window.location.href = `/poll/${poll.id}`}
                    onVote={poll.isActive ? () => window.location.href = `/poll/${poll.id}` : undefined}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Community;
