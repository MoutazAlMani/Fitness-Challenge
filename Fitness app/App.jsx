import React, { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Progress } from '@/components/ui/progress.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { 
  Activity, 
  Trophy, 
  Users, 
  Calendar, 
  Target,
  Plus,
  ArrowRight,
  Home,
  Award,
  User
} from 'lucide-react';
import './App.css';

// بيانات وهمية للتحديات
const mockChallenges = [
  {
    id: 1,
    title: 'تحدي المشي',
    description: '10,000 خطوة يومياً لمدة 30 يوماً',
    participants: 18,
    duration: 30,
    daysLeft: 5,
    progress: 75,
    type: 'walking',
    icon: Activity
  },
  {
    id: 2,
    title: 'تحدي تمارين الضغط',
    description: '50 تمرين ضغط يومياً',
    participants: 12,
    duration: 14,
    daysLeft: 8,
    progress: 60,
    type: 'pushups',
    icon: Target
  },
  {
    id: 3,
    title: 'تحدي اليوغا',
    description: '30 دقيقة يوغا يومياً',
    participants: 25,
    duration: 21,
    daysLeft: 15,
    progress: 30,
    type: 'yoga',
    icon: Activity
  }
];

const userStats = {
  totalDistance: 3.2,
  dailyProgress: 45,
  activeChallenges: 2,
  completedChallenges: 5
};

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [userChallenges, setUserChallenges] = useState([1, 2]); // التحديات التي انضم إليها المستخدم

  const joinChallenge = (challengeId) => {
    if (!userChallenges.includes(challengeId)) {
      setUserChallenges([...userChallenges, challengeId]);
    }
  };

  const renderHomeScreen = () => (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-slate-700 text-white p-6 rounded-b-3xl">
        <h1 className="text-2xl font-bold text-center mb-6">التحديات</h1>
        
        {/* Active Challenges */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">التحديات النشطة</h2>
          {mockChallenges.filter(challenge => userChallenges.includes(challenge.id)).map(challenge => (
            <Card key={challenge.id} className="bg-white/10 border-white/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <challenge.icon className="w-6 h-6" />
                    <div>
                      <h3 className="font-semibold">{challenge.title}</h3>
                      <p className="text-sm text-white/80">يوم {challenge.daysLeft} من {challenge.duration}</p>
                    </div>
                  </div>
                </div>
                <Progress value={challenge.progress} className="h-2 bg-white/20" />
                <p className="text-sm text-white/80 mt-2">{challenge.progress}% مكتمل</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Daily Progress */}
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">التقدم اليومي</h2>
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-slate-700">{userStats.totalDistance}</div>
              <div className="text-sm text-gray-600">كم</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="relative w-16 h-16 mx-auto">
                <svg className="w-16 h-16 transform -rotate-90">
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="transparent"
                    className="text-gray-200"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 28}`}
                    strokeDashoffset={`${2 * Math.PI * 28 * (1 - userStats.dailyProgress / 100)}`}
                    className="text-green-500"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-semibold">{userStats.dailyProgress}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <Button 
            variant="outline" 
            className="h-20 flex-col gap-2 bg-orange-500 text-white border-orange-500 hover:bg-orange-600"
            onClick={() => setCurrentView('challenges')}
          >
            <ArrowRight className="w-6 h-6" />
            <span className="text-sm">تمارين</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-20 flex-col gap-2 bg-orange-500 text-white border-orange-500 hover:bg-orange-600"
          >
            <Plus className="w-6 h-6" />
            <span className="text-sm">تحدي</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-20 flex-col gap-2 bg-orange-500 text-white border-orange-500 hover:bg-orange-600"
          >
            <Activity className="w-6 h-6" />
            <span className="text-sm">سجل</span>
          </Button>
        </div>
      </div>
    </div>
  );

  const renderChallengesScreen = () => (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-slate-700 text-white p-6 rounded-b-3xl">
        <h1 className="text-2xl font-bold text-center">التحديات</h1>
      </div>

      {/* Challenges List */}
      <div className="p-6 space-y-4">
        {mockChallenges.map(challenge => (
          <Card key={challenge.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <challenge.icon className="w-8 h-8 text-slate-700" />
                  <div>
                    <h3 className="font-bold text-lg">{challenge.title}</h3>
                    <p className="text-gray-600 text-sm">{challenge.description}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{challenge.participants} متشارك</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{challenge.daysLeft} أيام متبقية</span>
                </div>
              </div>

              <Progress value={challenge.progress} className="mb-4" />
              
              <Button 
                className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                onClick={() => joinChallenge(challenge.id)}
                disabled={userChallenges.includes(challenge.id)}
              >
                {userChallenges.includes(challenge.id) ? 'منضم بالفعل' : 'انضمام'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderLeaderboard = () => (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-slate-700 text-white p-6 rounded-b-3xl">
        <h1 className="text-2xl font-bold text-center">لوحة الصدارة</h1>
      </div>
      
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              تحدي المشي - الأسبوع الحالي
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'أحمد محمد', steps: 12500, rank: 1 },
                { name: 'فاطمة علي', steps: 11800, rank: 2 },
                { name: 'محمد سالم', steps: 10200, rank: 3 },
                { name: 'أنت', steps: 9800, rank: 4 },
              ].map((user, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Badge variant={user.rank <= 3 ? 'default' : 'secondary'}>
                      #{user.rank}
                    </Badge>
                    <span className={user.name === 'أنت' ? 'font-bold' : ''}>{user.name}</span>
                  </div>
                  <span className="font-semibold">{user.steps.toLocaleString()} خطوة</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-slate-700 text-white p-6 rounded-b-3xl">
        <h1 className="text-2xl font-bold text-center">الملف الشخصي</h1>
      </div>
      
      <div className="p-6 space-y-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-20 h-20 bg-slate-700 rounded-full mx-auto mb-4 flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-xl font-bold">محمد أحمد</h2>
            <p className="text-gray-600">عضو منذ يناير 2024</p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-slate-700">{userStats.activeChallenges}</div>
              <div className="text-sm text-gray-600">تحديات نشطة</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-slate-700">{userStats.completedChallenges}</div>
              <div className="text-sm text-gray-600">تحديات مكتملة</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>الإنجازات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <Award className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <p className="text-xs">أول تحدي</p>
              </div>
              <div className="text-center">
                <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <p className="text-xs">5 تحديات</p>
              </div>
              <div className="text-center opacity-50">
                <Award className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-xs">10 تحديات</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderCurrentView = () => {
    switch (currentView) {
      case 'challenges':
        return renderChallengesScreen();
      case 'leaderboard':
        return renderLeaderboard();
      case 'profile':
        return renderProfile();
      default:
        return renderHomeScreen();
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen relative">
      {renderCurrentView()}
      
      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200">
        <div className="grid grid-cols-4 py-2">
          <Button
            variant="ghost"
            className={`flex-col gap-1 h-16 ${currentView === 'home' ? 'text-orange-500' : 'text-gray-600'}`}
            onClick={() => setCurrentView('home')}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs">الرئيسية</span>
          </Button>
          <Button
            variant="ghost"
            className={`flex-col gap-1 h-16 ${currentView === 'challenges' ? 'text-orange-500' : 'text-gray-600'}`}
            onClick={() => setCurrentView('challenges')}
          >
            <Target className="w-5 h-5" />
            <span className="text-xs">التحديات</span>
          </Button>
          <Button
            variant="ghost"
            className={`flex-col gap-1 h-16 ${currentView === 'leaderboard' ? 'text-orange-500' : 'text-gray-600'}`}
            onClick={() => setCurrentView('leaderboard')}
          >
            <Trophy className="w-5 h-5" />
            <span className="text-xs">الصدارة</span>
          </Button>
          <Button
            variant="ghost"
            className={`flex-col gap-1 h-16 ${currentView === 'profile' ? 'text-orange-500' : 'text-gray-600'}`}
            onClick={() => setCurrentView('profile')}
          >
            <User className="w-5 h-5" />
            <span className="text-xs">الملف</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;

