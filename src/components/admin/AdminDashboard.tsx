import { useStore, REVENUE_DATA } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, BookOpen, DollarSign, Ticket, TrendingUp, ArrowUpRight, ArrowDownRight, Eye } from "lucide-react";
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
          Revenue: <span className="text-primary font-medium">₹{payload[0].value.toLocaleString()}</span>
        </p>
        <p className="text-sm text-muted-foreground">
          Enrollments: <span className="text-foreground font-medium">{payload[0].payload.enrollments}</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function AdminDashboard() {
  const { users, courses, coupons, enrollments, getPaidEnrollments, getActiveUsers, getInactiveUsers } = useStore();

  const totalRevenue = 207492;
  const paidEnrollments = getPaidEnrollments();
  const activeUsers = getActiveUsers();
  const inactiveUsers = getInactiveUsers();
  const totalEnrollments = enrollments.length;
  const completedEnrollments = enrollments.filter(e => e.status === 'Completed').length;
  const completionRate = Math.round((completedEnrollments / totalEnrollments) * 100);

  const stats = [
    {
      title: "Total Users",
      value: users.length,
      change: "+12.5% vs last month",
      trend: "up",
      icon: Users,
    },
    {
      title: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
      change: "+8.2% vs last month",
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "Paid Enrollments",
      value: paidEnrollments,
      change: "Total paid enrollments",
      trend: "neutral",
      icon: TrendingUp,
    },
    {
      title: "Completion Rate",
      value: `${completionRate}%`,
      change: "Average across all courses",
      trend: "neutral",
      icon: BookOpen,
    },
    {
      title: "Active Coupons",
      value: coupons.filter(c => c.status === 'Active').length,
      change: "Currently available",
      trend: "neutral",
      icon: Ticket,
    },
    {
      title: "Active Users",
      value: activeUsers,
      change: `${inactiveUsers} inactive`,
      trend: "neutral",
      icon: Users,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-1">Monitor your platform's performance and key metrics</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <div className="h-10 w-10 bg-secondary/50 rounded-lg flex items-center justify-center text-primary">
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
              <div className="flex items-baseline space-x-2">
                <div className="text-2xl font-bold">{stat.value}</div>
              </div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                {stat.trend === 'up' && <ArrowUpRight className="h-3 w-3 text-emerald-500 mr-1" />}
                {stat.trend === 'down' && <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />}
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
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>Monthly revenue and enrollments</CardDescription>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Total Revenue</div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={REVENUE_DATA} barSize={45}>
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
                    tickFormatter={(value) => `₹${value/1000}k`}
                  />
                  <Tooltip cursor={{fill: 'transparent'}} content={<CustomTooltip />} />
                  <Bar 
                    dataKey="revenue" 
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
              <CardTitle>Recent Enrollments</CardTitle>
              <CardDescription>Latest student registrations</CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 gap-1">
                  <Eye className="h-3 w-3" /> View All
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>All Enrollments</DialogTitle>
                </DialogHeader>
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead>Student</TableHead>
                        <TableHead>Course</TableHead>
                        <TableHead>Enrolled Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Coupon</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {enrollments.map((enrollment) => (
                        <TableRow key={enrollment.id}>
                          <TableCell className="font-medium">{enrollment.userName}</TableCell>
                          <TableCell className="text-sm">{enrollment.courseName}</TableCell>
                          <TableCell className="text-sm">{enrollment.enrollmentDate}</TableCell>
                          <TableCell className="font-medium">₹{enrollment.amountPaid.toLocaleString()}</TableCell>
                          <TableCell className="text-sm">{enrollment.couponCode ? <Badge variant="secondary" className="font-mono text-xs">{enrollment.couponCode}</Badge> : '-'}</TableCell>
                          <TableCell><Badge variant={enrollment.status === 'Active' ? 'default' : enrollment.status === 'Completed' ? 'secondary' : 'outline'}>{enrollment.status}</Badge></TableCell>
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
              {enrollments.slice(-5).reverse().map((enrollment) => (
                <div key={enrollment.id} className="flex items-center justify-between group hover:bg-secondary/30 p-2 rounded transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                      {enrollment.userName.charAt(0)}
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none group-hover:text-primary transition-colors">{enrollment.userName}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1">{enrollment.courseName}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">₹{enrollment.amountPaid.toLocaleString()}</p>
                    <Badge variant="secondary" className="text-[10px] h-5 px-1.5 font-normal">{enrollment.enrollmentDate}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
