import { useStore } from "@/lib/mockData";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Search, 
  Download,
  Filter,
  Eye,
  Plus,
  Trash2,
  Calendar
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function AdminUsers() {
  const { users, courses, enrollments, toggleUserStatus, addEnrollment } = useStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState<{ start: string; end: string }>({ start: '', end: '' });
  const [isEnrollDialogOpen, setIsEnrollDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedUserName, setSelectedUserName] = useState<string | null>(null);

  const filteredUsers = users.filter(user => {
    const nameMatch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!nameMatch) return false;

    if (dateFilter.start || dateFilter.end) {
      const userDate = new Date(user.registrationDate);
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

  const getUserEnrollments = (userId: string) => {
    return enrollments.filter(e => e.userId === userId);
  };

  const getAvailableCoursesForUser = (userId: string) => {
    const userEnrollmentCourseIds = getUserEnrollments(userId).map(e => e.courseId);
    return courses.filter(c => !userEnrollmentCourseIds.includes(c.id));
  };

  const handleAddEnrollment = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const courseId = formData.get('courseId') as string;
    
    if (courseId && selectedUserId) {
      const selectedCourse = courses.find(c => c.id === courseId);
      if (selectedCourse && selectedUserName) {
        addEnrollment({
          userId: selectedUserId,
          userName: selectedUserName,
          courseId: courseId,
          courseName: selectedCourse.title,
          enrollmentDate: new Date().toISOString().split('T')[0],
          isPaid: false,
          amountPaid: 0,
          progress: 0,
          status: 'Active'
        });
        setIsEnrollDialogOpen(false);
      }
    }
  };

  const openEnrollDialog = (userId: string, userName: string) => {
    setSelectedUserId(userId);
    setSelectedUserName(userName);
    setIsEnrollDialogOpen(true);
  };

  const clearFilters = () => {
    setDateFilter({ start: '', end: '' });
    setSearchTerm('');
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground mt-1">Manage users, track enrollments, and monitor progress</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" /> Export Data
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-none shadow-sm">
          <CardContent className="p-6">
            <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Total Users</div>
            <div className="text-3xl font-bold mt-2">{filteredUsers.length}</div>
            <div className="text-xs text-muted-foreground mt-1">{filteredUsers.filter(u => u.status === 'Active').length} active</div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardContent className="p-6">
            <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Total Enrollments</div>
            <div className="text-3xl font-bold mt-2">{enrollments.length}</div>
            <div className="text-xs text-muted-foreground mt-1">{enrollments.filter(e => e.status === 'Completed').length} completed</div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardContent className="p-6">
            <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Total Revenue</div>
            <div className="text-3xl font-bold mt-2">₹207,891</div>
            <div className="text-xs text-muted-foreground mt-1">From all users</div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardContent className="p-6">
            <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Completion Rate</div>
            <div className="text-3xl font-bold mt-2">33%</div>
            <div className="text-xs text-muted-foreground mt-1">Average progress</div>
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
                <TableHead>Enrollments</TableHead>
                <TableHead className="w-[200px]">Progress</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => {
                const userEnrollments = getUserEnrollments(user.id);
                const avgProgress = userEnrollments.length > 0 
                  ? Math.round(userEnrollments.reduce((sum, e) => sum + e.progress, 0) / userEnrollments.length)
                  : 0;

                return (
                  <TableRow key={user.id} className="hover:bg-secondary/50">
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium text-sm">{user.name}</div>
                        <div className="text-xs text-muted-foreground">{user.location}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{user.email}</TableCell>
                    <TableCell className="text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        {new Date(user.registrationDate).toLocaleDateString('en-US', { 
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs">
                            <Eye className="h-3 w-3" /> 
                            {userEnrollments.length}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>{user.name}'s Enrollments</DialogTitle>
                            <DialogDescription>Courses and progress for this user</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            {userEnrollments.length > 0 ? (
                              <div className="space-y-3">
                                {userEnrollments.map((enrollment) => (
                                  <div key={enrollment.id} className="border rounded-lg p-4 space-y-2">
                                    <div className="flex items-start justify-between">
                                      <div>
                                        <p className="font-medium text-sm">{enrollment.courseName}</p>
                                        <p className="text-xs text-muted-foreground">Enrolled: {enrollment.enrollmentDate}</p>
                                      </div>
                                      <Badge variant={enrollment.status === 'Completed' ? 'default' : enrollment.status === 'Active' ? 'secondary' : 'outline'}>
                                        {enrollment.status}
                                      </Badge>
                                    </div>
                                    <div className="space-y-1">
                                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                                        <span>Progress</span>
                                        <span className="font-medium text-foreground">{enrollment.progress}%</span>
                                      </div>
                                      <Progress value={enrollment.progress} className="h-2" />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="text-center py-8 text-muted-foreground">
                                No courses enrolled yet
                              </div>
                            )}

                            {getAvailableCoursesForUser(user.id).length > 0 && (
                              <Dialog open={isEnrollDialogOpen} onOpenChange={setIsEnrollDialogOpen}>
                                <DialogTrigger asChild>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="w-full gap-2 mt-4"
                                    onClick={() => openEnrollDialog(user.id, user.name)}
                                  >
                                    <Plus className="h-3 w-3" /> Add Course Enrollment
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Enroll {user.name} in Course</DialogTitle>
                                  </DialogHeader>
                                  <form onSubmit={handleAddEnrollment} className="space-y-4 py-4">
                                    <div className="space-y-2">
                                      <Label>Select Course</Label>
                                      <Select name="courseId" required>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Choose a course" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          {getAvailableCoursesForUser(user.id).map(course => (
                                            <SelectItem key={course.id} value={course.id}>
                                              {course.title} (₹{course.price.toLocaleString()})
                                            </SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <DialogFooter>
                                      <Button type="button" variant="outline" onClick={() => setIsEnrollDialogOpen(false)}>Cancel</Button>
                                      <Button type="submit">Enroll</Button>
                                    </DialogFooter>
                                  </form>
                                </DialogContent>
                              </Dialog>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-muted-foreground mb-1">
                          <span>Avg Progress</span>
                          <span className="font-medium text-foreground">{avgProgress}%</span>
                        </div>
                        <Progress value={avgProgress} className="h-2" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch 
                          checked={user.status === 'Active'}
                          onCheckedChange={() => toggleUserStatus(user.id)}
                        />
                        <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
                          {user.status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2m0 7a1 1 0 110-2 1 1 0 010 2m0 7a1 1 0 110-2 1 1 0 010 2" />
                            </svg>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="gap-2">
                            <Eye className="h-3 w-3" /> View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Plus className="h-3 w-3" /> Add Enrollment
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 text-destructive">
                            <Trash2 className="h-3 w-3" /> Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
