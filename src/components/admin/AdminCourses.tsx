import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Search, 
  Users, 
  Eye,
  MoreVertical,
  Edit,
  Database,
  Brain,
  Code,
  TrendingUp,
  Clock,
  Loader2
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { useAdminUsers } from "@/hooks/useAdminData";

// Courses from landing page
const websiteCourses = [
  {
    id: "1",
    category: "DATA ENGINEERING",
    title: "Data Engineer",
    description: "Build scalable data pipelines and infrastructures for big data processing.",
    concepts: ["ETL Pipelines", "Data Warehousing", "Apache Spark", "SQL & NoSQL", "Cloud Platforms"],
    duration: "5 Months",
    status: "Active" as const,
    badge: "Project + Internship",
    iconBg: "#7C3AED",
    icon: Database,
    price: 24999,
  },
  {
    id: "2",
    category: "ARTIFICIAL INTELLIGENCE",
    title: "AI Engineer",
    description: "Master NLP, chatbots, and build intelligent systems with cutting-edge technologies.",
    concepts: ["Machine Learning", "Deep Learning", "Neural Networks", "NLP", "Computer Vision"],
    duration: "6 Months",
    status: "Coming Soon" as const,
    badge: "Project + Internship",
    iconBg: "#F97316",
    icon: Brain,
    price: 29999,
  },
  {
    id: "3",
    category: "WEB DEVELOPMENT",
    title: "Fullstack Developer",
    description: "Build complete web applications from frontend to backend with modern frameworks.",
    concepts: ["React", "Node.js", "REST APIs", "Databases"],
    duration: "5 Months",
    status: "Coming Soon" as const,
    badge: "Project + Internship",
    iconBg: "#06B6D4",
    icon: Code,
    price: 24999,
  },
  {
    id: "4",
    category: "AI & PYTHON",
    title: "Python AI Engineer",
    description: "Specialize in Python for AI, machine learning, and data science applications.",
    concepts: ["Python Programming", "TensorFlow", "PyTorch", "Data Analysis", "Model Deployment"],
    duration: "6 Months",
    status: "Coming Soon" as const,
    badge: "Project + Internship",
    iconBg: "#6366F1",
    icon: Brain,
    price: 29999,
  },
  {
    id: "5",
    category: "ENTERPRISE DEVELOPMENT",
    title: "Java Fullstack",
    description: "Build enterprise-grade applications with Java and Spring ecosystem.",
    concepts: ["Java", "Spring Boot", "Microservices", "Hibernate", "Angular/React"],
    duration: "5 Months",
    status: "Coming Soon" as const,
    badge: "Advanced",
    iconBg: "#F97316",
    icon: Code,
    price: 29999,
  },
  {
    id: "6",
    category: "MARKETING & GROWTH",
    title: "Product Marketing",
    description: "Drive product adoption, market positioning, and growth strategies.",
    concepts: ["Go-to-Market Strategy", "Customer Research", "Positioning", "Content Marketing", "Analytics"],
    duration: "4 Months",
    status: "Coming Soon" as const,
    badge: "Project + Internship",
    iconBg: "#EC4899",
    icon: TrendingUp,
    price: 19999,
  },
];

export default function AdminCourses() {
  const { users, isLoading } = useAdminUsers();
  const [searchTerm, setSearchTerm] = useState("");
  const [courses, setCourses] = useState(websiteCourses);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  // Get enrolled users (users who opted for the course)
  const enrolledUsers = users.filter(u => u.course_opted);

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const updateCourseStatus = (courseId: string, status: "Active" | "Coming Soon") => {
    setCourses(prev => prev.map(c => 
      c.id === courseId ? { ...c, status } : c
    ));
  };

  // Get enrollments for a course (for now, Data Engineer is the only active one)
  const getCourseEnrollments = (courseId: string) => {
    if (courseId === "1") {
      return enrolledUsers;
    }
    return [];
  };

  const selectedCourse = courses.find(c => c.id === selectedCourseId);
  const selectedCourseEnrollments = selectedCourseId ? getCourseEnrollments(selectedCourseId) : [];

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
          <h1 className="text-3xl font-bold tracking-tight">Course Management</h1>
          <p className="text-muted-foreground mt-1">Manage courses and track enrollments</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-none shadow-sm bg-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{courses.length}</div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-green-500/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{courses.filter(c => c.status === 'Active').length}</div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-amber-500/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Coming Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{courses.filter(c => c.status === 'Coming Soon').length}</div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-blue-500/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Enrollments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{enrolledUsers.length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search courses..." 
            className="pl-9 bg-background"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map((course) => {
          const IconComponent = course.icon;
          const enrollments = getCourseEnrollments(course.id);
          
          return (
            <Card key={course.id} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all group flex flex-col">
              <div 
                className="h-2 w-full transition-colors" 
                style={{ backgroundColor: course.iconBg + '40' }}
              />
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: course.iconBg + '20' }}
                      >
                        <IconComponent className="h-4 w-4" style={{ color: course.iconBg }} />
                      </div>
                      <Badge variant="secondary" className="text-xs">{course.category}</Badge>
                    </div>
                    <CardTitle className="line-clamp-2 text-lg">{course.title}</CardTitle>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="-mr-2 h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="gap-2">
                        <Edit className="h-3 w-3" /> Edit Course
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardDescription className="line-clamp-2 mt-2">
                  {course.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 flex-1">
                <div className="flex flex-wrap gap-1">
                  {course.concepts.slice(0, 3).map((concept, i) => (
                    <Badge key={i} variant="outline" className="text-xs font-normal">
                      {concept}
                    </Badge>
                  ))}
                  {course.concepts.length > 3 && (
                    <Badge variant="outline" className="text-xs font-normal">
                      +{course.concepts.length - 3} more
                    </Badge>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <div className="text-muted-foreground text-xs">Duration</div>
                    <div className="font-medium flex items-center gap-1">
                      <Clock className="h-4 w-4" /> {course.duration}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-muted-foreground text-xs">Enrollments</div>
                    <div className="font-medium flex items-center gap-1">
                      <Users className="h-4 w-4" /> {enrollments.length}
                    </div>
                  </div>
                </div>
                <div className="text-sm">
                  <div className="text-muted-foreground text-xs">Price</div>
                  <div className="font-semibold text-lg">₹{course.price.toLocaleString()}</div>
                </div>
              </CardContent>
              <CardFooter className="bg-secondary/20 flex items-center justify-between py-3 gap-2">
                <div className="flex items-center gap-2">
                  <Switch 
                    checked={course.status === 'Active'}
                    onCheckedChange={(checked) => updateCourseStatus(course.id, checked ? 'Active' : 'Coming Soon')}
                  />
                  <span className={`text-xs font-medium ${course.status === 'Active' ? 'text-green-600' : 'text-amber-600'}`}>
                    {course.status}
                  </span>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 gap-1" 
                      onClick={() => setSelectedCourseId(course.id)}
                    >
                      <Eye className="h-3 w-3" /> View All
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>Course Enrollments - {selectedCourse?.title}</DialogTitle>
                    </DialogHeader>
                    {selectedCourseEnrollments.length > 0 ? (
                      <div className="border rounded-lg">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-muted/50">
                              <TableHead>Student</TableHead>
                              <TableHead>Email</TableHead>
                              <TableHead>Registered</TableHead>
                              <TableHead>Progress</TableHead>
                              <TableHead>Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {selectedCourseEnrollments.map((user) => {
                              const progressPercent = Math.round((user.completed_modules_count / 30) * 100);
                              
                              return (
                                <TableRow key={user.user_id}>
                                  <TableCell className="font-medium">{user.name}</TableCell>
                                  <TableCell className="text-sm text-muted-foreground">{user.email}</TableCell>
                                  <TableCell className="text-sm">
                                    {new Date(user.registered_at).toLocaleDateString('en-US', { 
                                      month: 'short',
                                      day: 'numeric',
                                      year: 'numeric'
                                    })}
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex items-center gap-2">
                                      <Progress value={progressPercent} className="h-2 w-20" />
                                      <span className="text-xs">{progressPercent}%</span>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <Badge variant={user.certificate_earned ? "default" : "outline"}>
                                      {user.certificate_earned ? 'Completed' : 'In Progress'}
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
                        {course.status === 'Coming Soon' 
                          ? 'This course is coming soon. No enrollments yet.'
                          : 'No enrollments yet'
                        }
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