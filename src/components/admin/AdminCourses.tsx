import { useStore } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Search, 
  Plus, 
  MoreVertical, 
  Users, 
  Eye,
  Ticket,
  Edit,
  Trash
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function AdminCourses() {
  const { courses, coupons, addCourse, updateCourseStatus, addCoupon, enrollments } = useStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isCouponOpen, setIsCouponOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [isEnrollmentOpen, setIsEnrollmentOpen] = useState(false);

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    addCourse({
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      price: Number(formData.get('price')),
      status: 'Active',
      instructor: formData.get('instructor') as string,
      duration: formData.get('duration') as string,
      category: formData.get('category') as string,
      startDate: new Date().toISOString().split('T')[0]
    });
    
    setIsCreateOpen(false);
  };

  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    addCoupon({
      code: formData.get('code') as string,
      discountType: formData.get('discountType') as 'Percentage' | 'Flat',
      value: Number(formData.get('value')),
      usage: 0,
      limit: Number(formData.get('limit')),
      status: 'Active',
      courseId: selectedCourseId || undefined
    });
    
    setIsCouponOpen(false);
  };

  const openCouponDialog = (courseId: string) => {
    setSelectedCourseId(courseId);
    setIsCouponOpen(true);
  };

  const openEnrollmentDialog = (courseId: string) => {
    setSelectedCourseId(courseId);
    setIsEnrollmentOpen(true);
  };

  const courseEnrollments = selectedCourseId ? enrollments.filter(e => e.courseId === selectedCourseId) : [];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Course Management</h1>
          <p className="text-muted-foreground mt-1">Create, edit, and manage your courses</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 shadow-lg hover:shadow-xl transition-all">
              <Plus className="h-4 w-4" /> Create Course
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Course</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateCourse} className="space-y-4 py-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Course Title</Label>
                  <Input id="title" name="title" placeholder="e.g. Full Stack Development" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select name="category" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Development">Development</SelectItem>
                      <SelectItem value="Data Science">Data Science</SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Business">Business</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price (₹)</Label>
                  <Input id="price" name="price" type="number" placeholder="29999" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instructor">Instructor</Label>
                  <Input id="instructor" name="instructor" placeholder="Instructor Name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input id="duration" name="duration" placeholder="e.g. 12 weeks" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" placeholder="Course description..." rows={3} />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
                <Button type="submit">Create Course</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
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
        <Card className="border-none shadow-sm bg-red-500/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Inactive</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{courses.filter(c => c.status === 'Inactive').length}</div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-blue-500/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Enrollments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{enrollments.length}</div>
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
        <div className="flex gap-2">
           <Select defaultValue="all">
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
           <Select defaultValue="all">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="dev">Development</SelectItem>
              <SelectItem value="data">Data Science</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all group flex flex-col">
            <div className="h-2 w-full bg-primary/20 group-hover:bg-primary transition-colors" />
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-1">
                  <Badge variant="secondary" className="mb-2">{course.category}</Badge>
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
                    <DropdownMenuItem onClick={() => openCouponDialog(course.id)} className="gap-2">
                      <Ticket className="h-3 w-3" /> Manage Coupons
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 text-destructive">
                      <Trash className="h-3 w-3" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardDescription className="line-clamp-2 mt-2">
                {course.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 flex-1">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <div className="text-muted-foreground text-xs">Price</div>
                  <div className="font-medium">₹{course.price.toLocaleString()}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-muted-foreground text-xs">Enrollments</div>
                  <div className="font-medium flex items-center gap-1">
                    <Users className="h-4 w-4" /> {enrollments.filter(e => e.courseId === course.id).length}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-secondary/20 flex items-center justify-between py-3 gap-2">
              <div className="flex items-center gap-2">
                <Switch 
                  checked={course.status === 'Active'}
                  onCheckedChange={(checked) => updateCourseStatus(course.id, checked ? 'Active' : 'Inactive')}
                />
                <span className={`text-xs font-medium ${course.status === 'Active' ? 'text-green-600' : 'text-muted-foreground'}`}>
                  {course.status}
                </span>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 gap-1" onClick={() => openEnrollmentDialog(course.id)}>
                    <Eye className="h-3 w-3" /> View All
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <DialogHeader>
                    <DialogTitle>Course Enrollments - {course.title}</DialogTitle>
                  </DialogHeader>
                  {courseEnrollments.length > 0 ? (
                    <div className="border rounded-lg">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-muted/50">
                            <TableHead>Student</TableHead>
                            <TableHead>Enrollment Date</TableHead>
                            <TableHead>Amount Paid</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Progress</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {courseEnrollments.map((enrollment) => (
                            <TableRow key={enrollment.id}>
                              <TableCell className="font-medium">{enrollment.userName}</TableCell>
                              <TableCell className="text-sm">{enrollment.enrollmentDate}</TableCell>
                              <TableCell className="font-medium">₹{enrollment.amountPaid.toLocaleString()}</TableCell>
                              <TableCell><Badge variant={enrollment.status === 'Active' ? 'default' : enrollment.status === 'Completed' ? 'secondary' : 'outline'}>{enrollment.status}</Badge></TableCell>
                              <TableCell className="text-sm">{enrollment.progress}%</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">No enrollments yet</div>
                  )}
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Coupon Dialog */}
      <Dialog open={isCouponOpen} onOpenChange={setIsCouponOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Manage Coupons</DialogTitle>
            <DialogDescription>
              Create a coupon for {courses.find(c => c.id === selectedCourseId)?.title}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="border rounded-md p-4 bg-secondary/20">
              <h4 className="text-sm font-medium mb-2">Active Coupons</h4>
              <div className="space-y-2">
                {coupons.filter(c => c.courseId === selectedCourseId).length > 0 ? (
                  coupons.filter(c => c.courseId === selectedCourseId).map(coupon => (
                    <div key={coupon.id} className="flex items-center justify-between text-sm bg-background p-2 rounded border">
                      <div className="flex items-center gap-2">
                        <Ticket className="h-3 w-3 text-primary" />
                        <span className="font-mono font-medium">{coupon.code}</span>
                        <span className="text-muted-foreground text-xs">
                          ({coupon.discountType === 'Flat' ? '₹' : ''}{coupon.value}{coupon.discountType === 'Percentage' ? '%' : ''} off)
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">{coupon.usage}/{coupon.limit} used</span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-muted-foreground italic">No active coupons for this course.</p>
                )}
              </div>
            </div>

            <form onSubmit={handleAddCoupon} className="space-y-4 border-t pt-4">
              <div className="grid gap-4 grid-cols-2">
                 <div className="space-y-2">
                  <Label htmlFor="code">Coupon Code</Label>
                  <Input id="code" name="code" placeholder="SUMMER25" required />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="discountType">Type</Label>
                  <Select name="discountType" defaultValue="Percentage">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Percentage">Percentage (%)</SelectItem>
                      <SelectItem value="Flat">Flat Amount (₹)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="value">Discount Value</Label>
                  <Input id="value" name="value" type="number" placeholder="20" required />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="limit">Usage Limit</Label>
                  <Input id="limit" name="limit" type="number" placeholder="50" required />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsCouponOpen(false)}>Cancel</Button>
                <Button type="submit">Add Coupon</Button>
              </DialogFooter>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
