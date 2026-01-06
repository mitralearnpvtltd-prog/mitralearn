import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Users, 
  Eye,
  BookOpen,
  Clock,
  Loader2,
  CheckCircle2,
  Calendar
} from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { modules, submodules } from "@/data/curriculum";
import { useAdminUsers } from "@/hooks/useAdminData";

export default function AdminCourses() {
  const { users, isLoading } = useAdminUsers();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedModuleId, setSelectedModuleId] = useState<number | null>(null);

  // Get enrolled users (users who opted for the course)
  const enrolledUsers = users.filter(u => u.course_opted);

  // Filter modules based on search
  const filteredModules = modules.filter(module => 
    module.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get users who completed a specific module
  const getModuleEnrollees = (moduleNumber: number) => {
    return enrolledUsers.filter(user => {
      if (!user.completed_days) return false;
      // Check if user has completed any day in this module (e.g., 11, 12 for module 1)
      return user.completed_days.some(day => Math.floor(day / 10) === moduleNumber);
    });
  };

  // Get users who completed all submodules in a module
  const getModuleCompletedUsers = (moduleNumber: number) => {
    const moduleSubmodules = submodules.filter(s => s.moduleNumber === moduleNumber);
    const requiredDays = moduleSubmodules.map(s => {
      const [mod, sub] = s.submodule.split('.').map(Number);
      return mod * 10 + sub;
    });
    
    return enrolledUsers.filter(user => {
      if (!user.completed_days) return false;
      return requiredDays.every(day => user.completed_days?.includes(day));
    });
  };

  // Get module progress for a user
  const getUserModuleProgress = (user: typeof enrolledUsers[0], moduleNumber: number) => {
    const moduleSubmodules = submodules.filter(s => s.moduleNumber === moduleNumber);
    const requiredDays = moduleSubmodules.map(s => {
      const [mod, sub] = s.submodule.split('.').map(Number);
      return mod * 10 + sub;
    });
    
    if (!user.completed_days) return 0;
    const completed = requiredDays.filter(day => user.completed_days?.includes(day)).length;
    return Math.round((completed / requiredDays.length) * 100);
  };

  const selectedModule = modules.find(m => m.module === selectedModuleId);
  const selectedModuleEnrollees = selectedModuleId ? getModuleEnrollees(selectedModuleId) : [];

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
          <h1 className="text-3xl font-bold tracking-tight">Course Modules</h1>
          <p className="text-muted-foreground mt-1">View curriculum modules and student progress</p>
        </div>
        <Badge variant="outline" className="gap-2 px-4 py-2 text-sm">
          <BookOpen className="h-4 w-4" />
          Data Engineering Fundamentals
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-none shadow-sm bg-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Modules</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{modules.length}</div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-green-500/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Submodules</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{submodules.length}</div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-blue-500/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Enrolled Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{enrolledUsers.length}</div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-purple-500/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Course Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {users.filter(u => u.certificate_earned).length}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search modules..." 
            className="pl-9 bg-background"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredModules.map((module) => {
          const moduleSubmodules = submodules.filter(s => s.moduleNumber === module.module);
          const enrollees = getModuleEnrollees(module.module);
          const completedUsers = getModuleCompletedUsers(module.module);
          
          return (
            <Card key={module.module} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all group flex flex-col">
              <div className="h-2 w-full bg-primary/20 group-hover:bg-primary transition-colors" />
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1">
                    <Badge variant="secondary" className="mb-2">Module {module.module}</Badge>
                    <CardTitle className="line-clamp-2 text-lg">{module.title}</CardTitle>
                  </div>
                </div>
                <CardDescription className="line-clamp-2 mt-2">
                  {moduleSubmodules.length} submodules • {module.assessment?.type === 'project' ? 'Capstone Project' : 'Quiz Assessment'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 flex-1">
                <div className="space-y-2">
                  <div className="text-xs text-muted-foreground font-medium">Submodules</div>
                  <div className="space-y-1">
                    {moduleSubmodules.map(sub => (
                      <div key={sub.submodule} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-3 w-3 text-primary" />
                        <span className="truncate">{sub.submodule}: {sub.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm pt-2 border-t">
                  <div className="space-y-1">
                    <div className="text-muted-foreground text-xs">Students Started</div>
                    <div className="font-medium flex items-center gap-1">
                      <Users className="h-4 w-4" /> {enrollees.length}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-muted-foreground text-xs">Completed</div>
                    <div className="font-medium flex items-center gap-1">
                      <CheckCircle2 className="h-4 w-4 text-green-600" /> {completedUsers.length}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-secondary/20 flex items-center justify-between py-3 gap-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  Pass: {module.assessment?.passingScore}%
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 gap-1"
                      onClick={() => setSelectedModuleId(module.module)}
                    >
                      <Eye className="h-3 w-3" /> View Students
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>Module {selectedModule?.module}: {selectedModule?.title}</DialogTitle>
                    </DialogHeader>
                    {selectedModuleEnrollees.length > 0 ? (
                      <div className="border rounded-lg">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-muted/50">
                              <TableHead>Student</TableHead>
                              <TableHead>Email</TableHead>
                              <TableHead>Progress</TableHead>
                              <TableHead>Quiz Score</TableHead>
                              <TableHead>Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {selectedModuleEnrollees.map((user) => {
                              const progress = getUserModuleProgress(user, selectedModuleId!);
                              const quizKey = selectedModule?.submodules[0];
                              const quizScore = quizKey && user.completed_quizzes 
                                ? (user.completed_quizzes as Record<string, number>)[quizKey] 
                                : null;
                              
                              return (
                                <TableRow key={user.user_id}>
                                  <TableCell className="font-medium">{user.name}</TableCell>
                                  <TableCell className="text-sm text-muted-foreground">{user.email}</TableCell>
                                  <TableCell>
                                    <div className="flex items-center gap-2">
                                      <Progress value={progress} className="h-2 w-20" />
                                      <span className="text-xs">{progress}%</span>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    {quizScore !== null && quizScore !== undefined ? (
                                      <Badge variant={quizScore >= 70 ? "default" : "destructive"}>
                                        {quizScore}%
                                      </Badge>
                                    ) : (
                                      <span className="text-xs text-muted-foreground">Not taken</span>
                                    )}
                                  </TableCell>
                                  <TableCell>
                                    <Badge variant={progress === 100 ? "default" : "outline"}>
                                      {progress === 100 ? 'Completed' : 'In Progress'}
                                    </Badge>
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        No students have started this module yet
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}