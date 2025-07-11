import React from 'react';
import { useStore } from '../../lib/store';
import Card from '../ui/Card';
import { BarChart2, Award, Zap, Calendar, TrendingUp, Check } from 'lucide-react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

const Dashboard: React.FC = () => {
  const { currentUser, challenges, setCurrentChallenge } = useStore();
  
  // Select random challenges for recommendations
  const recommendedChallenges = React.useMemo(() => {
    const shuffled = [...challenges].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  }, [challenges]);
  
  if (!currentUser) return null;
  
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Welcome back, {currentUser.username}</h1>
        <p className="text-slate-500 dark:text-slate-400">Your coding journey continues!</p>
      </div>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Rank</p>
              <p className="text-2xl font-bold mt-1"># {currentUser.rank}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center dark:bg-blue-900">
              <Award className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="text-xs text-slate-500 mt-2 dark:text-slate-400">
            Top 1% of all users
          </div>
        </Card>
        
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Points</p>
              <p className="text-2xl font-bold mt-1">{currentUser.points.toLocaleString()}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center dark:bg-green-900">
              <BarChart2 className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div className="text-xs text-slate-500 mt-2 dark:text-slate-400">
            <span className="text-green-600 dark:text-green-400">↑ 230</span> since last week
          </div>
        </Card>
        
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Solved</p>
              <p className="text-2xl font-bold mt-1">{currentUser.solvedChallenges}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center dark:bg-purple-900">
              <Check className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <div className="text-xs text-slate-500 mt-2 dark:text-slate-400">
            {Math.round(currentUser.solvedChallenges / challenges.length * 100)}% of all challenges
          </div>
        </Card>
        
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Streak</p>
              <p className="text-2xl font-bold mt-1">{currentUser.streak} days</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center dark:bg-orange-900">
              <Zap className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
          <div className="text-xs text-slate-500 mt-2 dark:text-slate-400">
            Keep going! 🔥
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <Card.Header>
              <Card.Title>Your Progress</Card.Title>
              <Card.Description>This month's coding activity</Card.Description>
            </Card.Header>
            <Card.Content>
              <div className="h-[200px] flex items-center justify-center">
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 28 }, (_, i) => (
                    <div
                      key={i}
                      className={`h-8 w-8 rounded-sm ${
                        Math.random() > 0.5 
                          ? 'bg-primary-100 dark:bg-primary-900' 
                          : Math.random() > 0.7 
                            ? 'bg-primary-300 dark:bg-primary-700' 
                            : Math.random() > 0.8 
                              ? 'bg-primary-500 dark:bg-primary-500' 
                              : 'bg-slate-100 dark:bg-slate-800'
                      }`}
                      title={`${Math.floor(Math.random() * 5)} challenges on day ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </Card.Content>
          </Card>
        </div>
        
        <div>
          <Card>
            <Card.Header>
              <Card.Title>Recommended For You</Card.Title>
              <Card.Description>Based on your solved challenges</Card.Description>
            </Card.Header>
            <Card.Content>
              <div className="space-y-3">
                {recommendedChallenges.map(challenge => (
                  <div 
                    key={challenge.id}
                    className="flex items-start gap-3 p-3 border rounded-md cursor-pointer hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
                    onClick={() => setCurrentChallenge(challenge.id)}
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{challenge.title}</h4>
                        <Badge 
                          variant={
                            challenge.difficulty === 'easy' 
                              ? 'success' 
                              : challenge.difficulty === 'medium' 
                                ? 'warning' 
                                : 'danger'
                          }
                          size="sm"
                        >
                          {challenge.difficulty}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        {challenge.points} points • {challenge.completedBy.toLocaleString()} solved
                      </p>
                    </div>
                  </div>
                ))}
                
                <Button className="w-full mt-2" variant="outline">
                  View More Challenges
                </Button>
              </div>
            </Card.Content>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;