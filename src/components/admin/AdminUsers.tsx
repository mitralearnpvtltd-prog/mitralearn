import { useAdminUsers } from "@/hooks/useAdminData";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Download,
  Filter,
  Eye,
  Calendar,
  Loader2,
  Award,
  CheckCircle2
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function AdminUsers() {
  const { users, isLoading } = useAdminUsers();
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState<{ start: string; end: string }>({ start: '', end: '' });

  const filteredUsers = users.filter(user => {
    const nameMatch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!nameMatch) return false;

    if (dateFilter.start || dateFilter.end) {
      const userDate = new Date(user.registered_at);
      if (dateFilter.start) {
        const startDate = new Date(dateFilter.start);
        if (userDate < startDate) return false;
      }
      if (dateFilter.end) {
        const endDate = new Date(dateFilter.end);
        if (userDate > endDate) return false;
      }
    }

    return true;
  });

  const clearFilters = () => {
    setDateFilter({ start: '', end: '' });
    setSearchTerm('');
  };

  const totalCompleted = users.filter(u => u.certificate_earned).length;
  const activeUsers = users.filter(u => {
    if (!u.last_login) return false;
    const lastLogin = new Date(u.last_login);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return lastLogin > thirtyDaysAgo;
  }).length;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground mt-1">Manage users, track progress, and monitor completions</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" /> Export Data
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-none shadow-sm">
          <CardContent className="p-6">
            <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Total Users</div>
            <div className="text-3xl font-bold mt-2">{users.length}</div>
            <div className="text-xs text-muted-foreground mt-1">{users.filter(u => u.course_opted).length} enrolled in course</div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardContent className="p-6">
            <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Active Users</div>
            <div className="text-3xl font-bold mt-2">{activeUsers}</div>
            <div className="text-xs text-muted-foreground mt-1">Last 30 days</div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardContent className="p-6">
            <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Completed Course</div>
            <div className="text-3xl font-bold mt-2">{totalCompleted}</div>
            <div className="text-xs text-muted-foreground mt-1">Earned certificate</div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardContent className="p-6">
            <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Completion Rate</div>
            <div className="text-3xl font-bold mt-2">
              {users.length > 0 ? Math.round((totalCompleted / users.length) * 100) : 0}%
            </div>
            <div className="text-xs text-muted-foreground mt-1">Overall</div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader className="p-4 border-b">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search by name, email..." 
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={clearFilters} className="gap-2">
                  <Filter className="h-4 w-4" /> Clear Filters
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-end">
              <div className="space-y-2 flex-1">
                <Label className="text-xs text-muted-foreground">From Registration Date</Label>
                <Input 
                  type="date" 
                  value={dateFilter.start}
                  onChange={(e) => setDateFilter({ ...dateFilter, start: e.target.value })}
                  className="h-9"
                />
              </div>
              <div className="space-y-2 flex-1">
                <Label className="text-xs text-muted-foreground">To Registration Date</Label>
                <Input 
                  type="date" 
                  value={dateFilter.end}
                  onChange={(e) => setDateFilter({ ...dateFilter, end: e.target.value })}
                  className="h-9"
                />
              </div>
              <div className="text-sm text-muted-foreground text-center">
                {filteredUsers.length} results
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="w-[180px]">User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="w-[140px]">Registration</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Certificate</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => {
                  const progressPercent = Math.round((user.completed_modules_count / 30) * 100);

                  return (
                    <TableRow key={user.user_id} className="hover:bg-secondary/50">
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium text-sm">{user.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {user.email_verified ? (
                              <span className="flex items-center gap-1 text-success">
                                <CheckCircle2 className="h-3 w-3" /> Verified
                              </span>
                            ) : (
                              <span className="text-muted-foreground">Not verified</span>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{user.email}</TableCell>
                      <TableCell className="text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          {new Date(user.registered_at).toLocaleDateString('en-US', { 
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1 w-32">
                          <div className="flex justify-between text-xs text-muted-foreground mb-1">
                            <span>Modules</span>
                            <span className="font-medium text-foreground">{user.completed_modules_count}/30</span>
                          </div>
                          <Progress value={progressPercent} className="h-2" />
                        </div>
                      </TableCell>
                      <TableCell>
                        {user.certificate_earned ? (
                          <Badge variant="default" className="gap-1">
                            <Award className="h-3 w-3" />
                            {user.overall_band || 'Earned'}
                          </Badge>
                        ) : (
                          <Badge variant="outline">In Progress</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 gap-1">
                              <Eye className="h-3 w-3" /> View
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>{user.name}</DialogTitle>
                              <DialogDescription>{user.email}</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-xs text-muted-foreground">Registered</p>
                                  <p className="font-medium">{new Date(user.registered_at).toLocaleDateString()}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground">Last Login</p>
                                  <p className="font-medium">
                                    {user.last_login ? new Date(user.last_login).toLocaleDateString() : 'Never'}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground">Modules Completed</p>
                                  <p className="font-medium">{user.completed_modules_count}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground">Quizzes Completed</p>
                                  <p className="font-medium">
                                    {user.completed_quizzes ? Object.keys(user.completed_quizzes).length : 0}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground">Final Assessment</p>
                                  <p className="font-medium">
                                    {user.final_assessment_score !== null ? `${user.final_assessment_score}%` : 'Not taken'}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground">Certificate</p>
                                  <p className="font-medium">
                                    {user.certificate_earned ? (
                                      <Badge variant="default">{user.overall_band}</Badge>
                                    ) : (
                                      <Badge variant="outline">Not earned</Badge>
                                    )}
                                  </p>
                                </div>
                              </div>
                              {user.cert_id && (
                                <div className="border-t pt-4">
                                  <p className="text-xs text-muted-foreground mb-1">Certificate ID</p>
                                  <code className="text-sm bg-muted px-2 py-1 rounded">{user.cert_id}</code>
                                </div>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No users found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
