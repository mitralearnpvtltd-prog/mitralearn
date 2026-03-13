import { useAdminStats, useAdminUsers, useAdminCertificates } from "@/hooks/useAdminData";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, BookOpen, Award, TrendingUp, ArrowUpRight, Eye, Loader2 } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover border border-border p-3 rounded-lg shadow-lg">
        <p className="font-semibold mb-1">{label}</p>
        <p className="text-sm text-muted-foreground">
          Users: <span className="text-primary font-medium">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function AdminDashboard() {
  const { stats, isLoading: statsLoading } = useAdminStats();
  const { users, isLoading: usersLoading } = useAdminUsers();
  const { certificates, isLoading: certsLoading } = useAdminCertificates();

  // Generate monthly data from users
  const getMonthlyData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentYear = new Date().getFullYear();
    
    const monthlyRegistrations = months.map((month, index) => {
      const count = users.filter(user => {
        const date = new Date(user.registered_at);
        return date.getFullYear() === currentYear && date.getMonth() === index;
      }).length;
      return { month, users: count };
    });

    return monthlyRegistrations;
  };

  const recentUsers = users.slice(0, 5);

  const statCards = [
    {
      title: "Total Users",
      value: stats?.totalUsers || 0,
      change: `${users.filter(u => u.course_opted).length} enrolled`,
      trend: "up",
      icon: Users,
    },
    {
      title: "Active Users",
      value: stats?.activeUsers || 0,
      change: "Last 30 days",
      trend: "neutral",
      icon: TrendingUp,
    },
    {
      title: "Certificates Issued",
      value: stats?.totalCertificates || 0,
      change: "Total valid certificates",
      trend: "neutral",
      icon: Award,
    },
    {
      title: "Completion Rate",
      value: `${stats?.completionRate || 0}%`,
      change: "Average across all users",
      trend: "neutral",
      icon: BookOpen,
    },
  ];

  if (statsLoading || usersLoading || certsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-1">Monitor your platform's performance and key metrics</p>
      </div>

      <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.title} className="overflow-hidden border shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between pb-1">
                <p className="text-xs font-medium text-muted-foreground">{stat.title}</p>
                <div className="h-8 w-8 bg-secondary/50 rounded-md flex items-center justify-center text-primary">
                  <stat.icon className="h-4 w-4" />
                </div>
              </div>
              <div className="text-xl font-bold">{stat.value}</div>
              <div className="flex items-center text-[10px] text-muted-foreground mt-0.5">
                {stat.trend === 'up' && <ArrowUpRight className="h-3 w-3 text-emerald-500 mr-0.5" />}
                <span className={stat.trend === 'up' ? 'text-emerald-500 font-medium' : ''}>{stat.change}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 border-none shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>User Registrations</CardTitle>
                <CardDescription>Monthly new user registrations</CardDescription>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{stats?.totalUsers || 0}</div>
                <div className="text-xs text-muted-foreground">Total Users</div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={getMonthlyData()} barSize={45}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="month" 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    dy={10}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                  />
                  <Tooltip cursor={{fill: 'transparent'}} content={<CustomTooltip />} />
                  <Bar 
                    dataKey="users" 
                    fill="hsl(var(--primary))" 
                    radius={[4, 4, 0, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3 border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle>Recent Users</CardTitle>
              <CardDescription>Latest registered users</CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 gap-1">
                  <Eye className="h-3 w-3" /> View All
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>All Users</DialogTitle>
                </DialogHeader>
                <div className="border rounded-lg max-h-[60vh] overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Registered</TableHead>
                        <TableHead>Progress</TableHead>
                        <TableHead>Certificate</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.user_id}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell className="text-sm">{user.email}</TableCell>
                          <TableCell className="text-sm">
                            {new Date(user.registered_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">
                              {user.completed_modules_count} modules
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {user.certificate_earned ? (
                              <Badge variant="default">Earned</Badge>
                            ) : (
                              <Badge variant="outline">In Progress</Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUsers.length > 0 ? (
                recentUsers.map((user) => (
                  <div key={user.user_id} className="flex items-center justify-between group hover:bg-secondary/30 p-2 rounded transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                        {user.name.charAt(0)}
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none group-hover:text-primary transition-colors">{user.name}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1">{user.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary" className="text-[10px] h-5 px-1.5 font-normal">
                        {new Date(user.registered_at).toLocaleDateString()}
                      </Badge>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-8">No users yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Certificates Section */}
      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle>Recent Certificates</CardTitle>
          <CardDescription>Latest issued certificates</CardDescription>
        </CardHeader>
        <CardContent>
          {certificates.length > 0 ? (
            <div className="space-y-3">
              {certificates.slice(0, 5).map((cert) => (
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
            <p className="text-sm text-muted-foreground text-center py-8">No certificates issued yet</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
