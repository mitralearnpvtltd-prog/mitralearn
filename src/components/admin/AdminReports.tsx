import { useAdminStats, useAdminUsers, useAdminCertificates } from "@/hooks/useAdminData";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
  Area,
  AreaChart
} from "recharts";
import { Download, Calendar, Users, Award, BookOpen, TrendingUp, Loader2 } from "lucide-react";

const COLORS = ['hsl(var(--primary))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

export default function AdminReports() {
  const { stats, isLoading: statsLoading } = useAdminStats();
  const { users, isLoading: usersLoading } = useAdminUsers();
  const { certificates, isLoading: certsLoading } = useAdminCertificates();

  // Calculate real metrics from data
  const calculateMetrics = () => {
    const enrolledUsers = users.filter(u => u.course_opted).length;
    const completedUsers = users.filter(u => u.certificate_earned).length;
    const avgModulesCompleted = users.length > 0 
      ? users.reduce((acc, u) => acc + (u.completed_modules_count || 0), 0) / users.length 
      : 0;
    
    return {
      totalUsers: users.length,
      enrolledUsers,
      completedUsers,
      avgModulesCompleted: avgModulesCompleted.toFixed(1),
      completionRate: enrolledUsers > 0 ? ((completedUsers / enrolledUsers) * 100).toFixed(1) : 0,
    };
  };

  // Monthly registration data
  const getMonthlyData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentYear = new Date().getFullYear();
    
    return months.map((month, index) => {
      const registrations = users.filter(user => {
        const date = new Date(user.registered_at);
        return date.getFullYear() === currentYear && date.getMonth() === index;
      }).length;
      
      const certificatesIssued = certificates.filter(cert => {
        const date = new Date(cert.completion_date);
        return date.getFullYear() === currentYear && date.getMonth() === index;
      }).length;
      
      return { month, registrations, certificates: certificatesIssued };
    });
  };

  // Course progress distribution
  const getProgressDistribution = () => {
    const ranges = [
      { name: '0-25%', min: 0, max: 7.5, value: 0 },
      { name: '26-50%', min: 7.5, max: 15, value: 0 },
      { name: '51-75%', min: 15, max: 22.5, value: 0 },
      { name: '76-100%', min: 22.5, max: 30, value: 0 },
    ];

    users.forEach(user => {
      const progress = user.completed_modules_count || 0;
      if (progress <= 7.5) ranges[0].value++;
      else if (progress <= 15) ranges[1].value++;
      else if (progress <= 22.5) ranges[2].value++;
      else ranges[3].value++;
    });

    return ranges;
  };

  // Certificate band distribution
  const getCertificateBandDistribution = () => {
    const bands: Record<string, number> = {};
    
    certificates.forEach(cert => {
      if (cert.overall_band) {
        bands[cert.overall_band] = (bands[cert.overall_band] || 0) + 1;
      }
    });

    return Object.entries(bands).map(([name, value]) => ({ name, value }));
  };

  // User activity by registration date
  const getWeeklyActivity = () => {
    const weeks: Record<string, number> = {};
    const now = new Date();
    
    // Last 8 weeks
    for (let i = 7; i >= 0; i--) {
      const weekStart = new Date(now);
      weekStart.setDate(weekStart.getDate() - (i * 7));
      const weekLabel = `Week ${8 - i}`;
      weeks[weekLabel] = 0;
    }

    users.forEach(user => {
      const regDate = new Date(user.registered_at);
      const diffDays = Math.floor((now.getTime() - regDate.getTime()) / (1000 * 60 * 60 * 24));
      const weekIndex = Math.floor(diffDays / 7);
      
      if (weekIndex >= 0 && weekIndex < 8) {
        const weekLabel = `Week ${8 - weekIndex}`;
        if (weeks[weekLabel] !== undefined) {
          weeks[weekLabel]++;
        }
      }
    });

    return Object.entries(weeks).map(([week, users]) => ({ week, users }));
  };

  const metrics = calculateMetrics();
  const monthlyData = getMonthlyData();
  const progressDistribution = getProgressDistribution();
  const bandDistribution = getCertificateBandDistribution();

  if (statsLoading || usersLoading || certsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
          <p className="text-muted-foreground mt-1">Real-time insights from your platform data</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" /> This Month
          </Button>
          <Button className="gap-2">
            <Download className="h-4 w-4" /> Export All Reports
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-none shadow-sm p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">Total Users</div>
              <div className="text-2xl font-bold">{metrics.totalUsers}</div>
            </div>
          </div>
        </Card>
        <Card className="border-none shadow-sm p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-secondary/50 rounded-lg flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">Enrolled Users</div>
              <div className="text-2xl font-bold">{metrics.enrolledUsers}</div>
            </div>
          </div>
        </Card>
        <Card className="border-none shadow-sm p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <Award className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">Certificates Issued</div>
              <div className="text-2xl font-bold">{certificates.length}</div>
            </div>
          </div>
        </Card>
        <Card className="border-none shadow-sm p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">Completion Rate</div>
              <div className="text-2xl font-bold">{metrics.completionRate}%</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-none shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>User Registrations & Certificates</CardTitle>
                <CardDescription>Monthly trend this year</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="gap-2 h-8">
                <Download className="h-3 w-3" /> Export
              </Button>
            </div>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{fill: 'transparent'}}
                  contentStyle={{ backgroundColor: 'hsl(var(--popover))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                />
                <Legend />
                <Area type="monotone" dataKey="registrations" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} name="Registrations" />
                <Area type="monotone" dataKey="certificates" stroke="hsl(var(--chart-2))" fill="hsl(var(--chart-2))" fillOpacity={0.3} name="Certificates" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>Progress Distribution</CardTitle>
            <CardDescription>User completion levels</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={progressDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, value }) => value > 0 ? `${name}: ${value}` : ''}
                >
                  {progressDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--popover))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4 text-xs text-muted-foreground flex-wrap">
              {progressDistribution.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  {entry.name} ({entry.value})
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Certificate Bands & Recent Completions */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>Certificate Band Distribution</CardTitle>
            <CardDescription>Performance levels of certified users</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            {bandDistribution.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={bandDistribution} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
                  <XAxis type="number" stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
                  <YAxis type="category" dataKey="name" stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} width={80} />
                  <Tooltip 
                    cursor={{fill: 'transparent'}}
                    contentStyle={{ backgroundColor: 'hsl(var(--popover))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                  />
                  <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} name="Count" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                No certificates issued yet
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Certificates</CardTitle>
              <CardDescription>Latest achievements</CardDescription>
            </div>
            <Badge variant="secondary">{certificates.length} total</Badge>
          </CardHeader>
          <CardContent>
            {certificates.length > 0 ? (
              <div className="space-y-3 max-h-[250px] overflow-auto">
                {certificates.slice(0, 10).map((cert) => (
                  <div key={cert.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <Award className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium text-sm">{cert.student_name}</p>
                        <p className="text-xs text-muted-foreground">{cert.course_name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={cert.status === 'VALID' ? 'default' : 'secondary'}>
                        {cert.overall_band}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(cert.completion_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-[250px] text-muted-foreground">
                No certificates issued yet
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* User Details Table */}
      <Card className="border-none shadow-sm">
        <CardHeader className="p-4 border-b flex flex-row items-center justify-between">
          <div>
            <CardTitle>User Progress Overview</CardTitle>
            <CardDescription>Detailed view of all user progress</CardDescription>
          </div>
          <Button variant="ghost" size="sm" className="gap-2 h-8">
            <Download className="h-3 w-3" /> Export CSV
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="max-h-[400px] overflow-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Registered</TableHead>
                  <TableHead>Modules Completed</TableHead>
                  <TableHead>Quiz Score</TableHead>
                  <TableHead>Certificate</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => {
                  const quizScores = user.completed_quizzes ? Object.values(user.completed_quizzes) : [];
                  const avgQuizScore = quizScores.length > 0 
                    ? (quizScores.reduce((a, b) => Number(a) + Number(b), 0) / quizScores.length).toFixed(0)
                    : '-';
                  
                  return (
                    <TableRow key={user.user_id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{user.email}</TableCell>
                      <TableCell className="text-sm">
                        {new Date(user.registered_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-secondary rounded-full h-2 w-16">
                            <div 
                              className="bg-primary rounded-full h-2 transition-all"
                              style={{ width: `${Math.min((user.completed_modules_count / 30) * 100, 100)}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground">{user.completed_modules_count}/30</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{avgQuizScore}%</TableCell>
                      <TableCell>
                        {user.certificate_earned ? (
                          <Badge variant="default" className="bg-green-600">
                            {user.overall_band || 'Earned'}
                          </Badge>
                        ) : (
                          <Badge variant="outline">In Progress</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.course_opted ? 'default' : 'secondary'}>
                          {user.course_opted ? 'Enrolled' : 'Not Enrolled'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
