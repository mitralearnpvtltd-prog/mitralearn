import { useStore, REVENUE_DATA } from "@/lib/mockData";
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
  Cell
} from "recharts";
import { Download, Calendar } from "lucide-react";

const COLORS = ['hsl(var(--primary))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'];

const PIE_DATA = [
  { name: 'Full Stack', value: 400 },
  { name: 'Data Science', value: 300 },
  { name: 'Design', value: 300 },
  { name: 'Marketing', value: 200 },
];

export default function AdminReports() {
  const { coupons } = useStore();

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
          <p className="text-muted-foreground mt-1">Comprehensive insights and data analysis</p>
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

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-none shadow-sm p-4">
            <div className="text-sm font-medium text-muted-foreground">Total Revenue</div>
            <div className="text-3xl font-bold mt-2">₹207,891</div>
            <div className="text-xs text-muted-foreground mt-1">From 9 enrollments</div>
        </Card>
        <Card className="border-none shadow-sm p-4">
            <div className="text-sm font-medium text-muted-foreground">With Coupons</div>
            <div className="text-3xl font-bold mt-2">₹122,894</div>
            <div className="text-xs text-muted-foreground mt-1">6 enrollments (59.1%)</div>
        </Card>
        <Card className="border-none shadow-sm p-4">
            <div className="text-sm font-medium text-muted-foreground">Without Coupons</div>
            <div className="text-3xl font-bold mt-2">₹84,997</div>
            <div className="text-xs text-muted-foreground mt-1">3 enrollments (40.9%)</div>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-none shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Monthly Revenue Trend</CardTitle>
                <CardDescription>Revenue growth over time</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="gap-2 h-8">
                <Download className="h-3 w-3" /> Export
              </Button>
            </div>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={REVENUE_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value/1000}k`} />
                <Tooltip 
                    cursor={{fill: 'transparent'}}
                    contentStyle={{ backgroundColor: 'hsl(var(--popover))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                />
                <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>Enrollment Distribution</CardTitle>
            <CardDescription>Popularity by course category</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={PIE_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {PIE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--popover))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4 text-xs text-muted-foreground">
              {PIE_DATA.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  {entry.name}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader className="p-4 border-b flex items-center justify-between">
          <div>
            <CardTitle>Coupon Performance</CardTitle>
            <CardDescription>Track coupon usage and effectiveness</CardDescription>
          </div>
          <Button variant="ghost" size="sm" className="gap-2 h-8">
            <Download className="h-3 w-3" /> Export
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Coupon Code</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coupons.map((coupon) => (
                <TableRow key={coupon.id}>
                  <TableCell className="font-mono font-medium text-sm">{coupon.code}</TableCell>
                  <TableCell className="font-medium">
                    {coupon.discountType === 'Percentage' ? `${coupon.value}%` : `₹${coupon.value}`}
                  </TableCell>
                  <TableCell className="text-sm">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-secondary rounded-full h-2">
                        <div 
                          className="bg-primary rounded-full h-2 transition-all"
                          style={{ width: `${Math.min((coupon.usage / coupon.limit) * 100, 100)}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground min-w-fit">{coupon.usage} / {coupon.limit}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={coupon.status === 'Active' ? 'default' : 'secondary'}
                      className={coupon.status === 'Active' ? 'bg-green-600 hover:bg-green-700' : ''}
                    >
                      {coupon.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
