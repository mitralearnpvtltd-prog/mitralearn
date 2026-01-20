import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  Loader2,
  Plus,
  Trash2
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { useAdminCourses, CourseFormData } from "@/hooks/useCourses";
import { useAdminUsers } from "@/hooks/useAdminData";
import { toast } from "sonner";

const iconOptions = [
  { value: 'database', label: 'Database', icon: Database },
  { value: 'brain', label: 'Brain/AI', icon: Brain },
  { value: 'code', label: 'Code', icon: Code },
  { value: 'trending-up', label: 'Trending', icon: TrendingUp },
];

const colorOptions = [
  { value: '#7C3AED', label: 'Purple' },
  { value: '#F97316', label: 'Orange' },
  { value: '#06B6D4', label: 'Cyan' },
  { value: '#6366F1', label: 'Indigo' },
  { value: '#EC4899', label: 'Pink' },
  { value: '#10B981', label: 'Green' },
];

const defaultFormData: CourseFormData = {
  title: '',
  description: '',
  category: '',
  category_badge: '',
  concepts: [],
  extra_concepts_count: 0,
  duration: '',
  price: 0,
  students_count: '0',
  rating: 0,
  reviews_count: '0',
  badge: 'Project + Internship',
  badge_color: '#7C3AED',
  icon_bg: '#7C3AED',
  icon_type: 'database',
  status: 'draft',
  is_published: false,
};

export default function AdminCourseManagement() {
  const { courses, isLoading, createCourse, updateCourse, deleteCourse, togglePublish, updateStatus } = useAdminCourses();
  const { users } = useAdminUsers();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<CourseFormData>(defaultFormData);
  const [conceptInput, setConceptInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const enrolledUsers = users.filter(u => u.course_opted);

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCourseEnrollments = (courseId: string, courseTitle: string) => {
    // Match enrollments based on course title containing "Data Engineer" for now
    if (courseTitle.toLowerCase().includes('data engineer')) {
      return enrolledUsers;
    }
    return [];
  };

  const selectedCourse = courses.find(c => c.id === selectedCourseId);
  const selectedCourseEnrollments = selectedCourse 
    ? getCourseEnrollments(selectedCourse.id, selectedCourse.title) 
    : [];

  const getIconComponent = (iconType: string) => {
    const icon = iconOptions.find(i => i.value === iconType);
    return icon?.icon || Database;
  };

  const handleAddConcept = () => {
    if (conceptInput.trim()) {
      setFormData(prev => ({
        ...prev,
        concepts: [...prev.concepts, conceptInput.trim()]
      }));
      setConceptInput("");
    }
  };

  const handleRemoveConcept = (index: number) => {
    setFormData(prev => ({
      ...prev,
      concepts: prev.concepts.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.description || !formData.category || !formData.duration || formData.price <= 0) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      if (isEditing && selectedCourseId) {
        await updateCourse(selectedCourseId, formData);
        toast.success("Course updated successfully");
      } else {
        await createCourse(formData);
        toast.success("Course created successfully");
      }
      setIsFormOpen(false);
      resetForm();
    } catch (error) {
      toast.error(isEditing ? "Failed to update course" : "Failed to create course");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (course: typeof courses[0]) => {
    setFormData({
      title: course.title,
      description: course.description,
      category: course.category,
      category_badge: course.category_badge || '',
      concepts: course.concepts || [],
      extra_concepts_count: course.extra_concepts_count || 0,
      duration: course.duration,
      price: Number(course.price),
      original_price: course.original_price ? Number(course.original_price) : undefined,
      students_count: course.students_count || '0',
      rating: Number(course.rating) || 0,
      reviews_count: course.reviews_count || '0',
      badge: course.badge || '',
      badge_color: course.badge_color || '#7C3AED',
      icon_bg: course.icon_bg || '#7C3AED',
      icon_type: course.icon_type || 'database',
      status: course.status,
      is_published: course.is_published,
    });
    setSelectedCourseId(course.id);
    setIsEditing(true);
    setIsFormOpen(true);
  };

  const handleDelete = async (courseId: string) => {
    try {
      await deleteCourse(courseId);
      toast.success("Course disabled successfully");
    } catch (error) {
      toast.error("Failed to disable course");
    }
  };

  const handleTogglePublish = async (courseId: string, isPublished: boolean) => {
    try {
      await togglePublish(courseId, isPublished);
      toast.success(isPublished ? "Course published" : "Course unpublished");
    } catch (error) {
      toast.error("Failed to update course");
    }
  };

  const handleStatusChange = async (courseId: string, status: 'active' | 'coming_soon' | 'draft') => {
    try {
      await updateStatus(courseId, status);
      toast.success("Course status updated");
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const resetForm = () => {
    setFormData(defaultFormData);
    setSelectedCourseId(null);
    setIsEditing(false);
    setConceptInput("");
  };

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
        <Dialog open={isFormOpen} onOpenChange={(open) => {
          setIsFormOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Course
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{isEditing ? 'Edit Course' : 'Add New Course'}</DialogTitle>
              <DialogDescription>
                {isEditing ? 'Update course details below' : 'Fill in the course details below'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Data Engineering"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value.toUpperCase() }))}
                    placeholder="e.g., DATA ENGINEERING"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Course description..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category_badge">Category Badge</Label>
                  <Input
                    id="category_badge"
                    value={formData.category_badge}
                    onChange={(e) => setFormData(prev => ({ ...prev, category_badge: e.target.value }))}
                    placeholder="e.g., Tech Fundamentals"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="badge">Badge</Label>
                  <Input
                    id="badge"
                    value={formData.badge}
                    onChange={(e) => setFormData(prev => ({ ...prev, badge: e.target.value }))}
                    placeholder="e.g., Project + Internship"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Concepts/Technologies</Label>
                <div className="flex gap-2">
                  <Input
                    value={conceptInput}
                    onChange={(e) => setConceptInput(e.target.value)}
                    placeholder="Add a concept..."
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddConcept())}
                  />
                  <Button type="button" onClick={handleAddConcept} variant="outline">Add</Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.concepts.map((concept, idx) => (
                    <Badge key={idx} variant="secondary" className="gap-1">
                      {concept}
                      <button onClick={() => handleRemoveConcept(idx)} className="ml-1 hover:text-destructive">×</button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration *</Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                    placeholder="e.g., 12 weeks"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price (₹) *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
                    placeholder="24999"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="original_price">Original Price (₹)</Label>
                  <Input
                    id="original_price"
                    type="number"
                    value={formData.original_price || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, original_price: e.target.value ? Number(e.target.value) : undefined }))}
                    placeholder="29999"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="students_count">Students</Label>
                  <Input
                    id="students_count"
                    value={formData.students_count}
                    onChange={(e) => setFormData(prev => ({ ...prev, students_count: e.target.value }))}
                    placeholder="12,543"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rating">Rating</Label>
                  <Input
                    id="rating"
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={formData.rating}
                    onChange={(e) => setFormData(prev => ({ ...prev, rating: Number(e.target.value) }))}
                    placeholder="4.8"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reviews_count">Reviews</Label>
                  <Input
                    id="reviews_count"
                    value={formData.reviews_count}
                    onChange={(e) => setFormData(prev => ({ ...prev, reviews_count: e.target.value }))}
                    placeholder="2.4k"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="icon_type">Icon</Label>
                  <Select value={formData.icon_type} onValueChange={(v) => setFormData(prev => ({ ...prev, icon_type: v }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select icon" />
                    </SelectTrigger>
                    <SelectContent>
                      {iconOptions.map(opt => (
                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="icon_bg">Icon Color</Label>
                  <Select value={formData.icon_bg} onValueChange={(v) => setFormData(prev => ({ ...prev, icon_bg: v }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                      {colorOptions.map(opt => (
                        <SelectItem key={opt.value} value={opt.value}>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded" style={{ backgroundColor: opt.value }} />
                            {opt.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(v: 'active' | 'coming_soon' | 'draft') => setFormData(prev => ({ ...prev, status: v }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="coming_soon">Coming Soon</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_published"
                  checked={formData.is_published}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_published: checked }))}
                />
                <Label htmlFor="is_published">Published (visible on landing page)</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => { setIsFormOpen(false); resetForm(); }}>Cancel</Button>
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                {isEditing ? 'Update Course' : 'Create Course'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
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
            <div className="text-2xl font-bold text-green-600">{courses.filter(c => c.status === 'active').length}</div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-amber-500/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Coming Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{courses.filter(c => c.status === 'coming_soon').length}</div>
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

      {/* Course Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map((course) => {
          const IconComponent = getIconComponent(course.icon_type);
          const enrollments = getCourseEnrollments(course.id, course.title);
          
          return (
            <Card key={course.id} className={`overflow-hidden border-none shadow-md hover:shadow-lg transition-all group flex flex-col ${!course.is_published ? 'opacity-60' : ''}`}>
              <div 
                className="h-2 w-full transition-colors" 
                style={{ backgroundColor: course.icon_bg + '40' }}
              />
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: course.icon_bg + '20' }}
                      >
                        <IconComponent className="h-4 w-4" style={{ color: course.icon_bg }} />
                      </div>
                      <Badge variant="secondary" className="text-xs">{course.category}</Badge>
                      {!course.is_published && <Badge variant="outline" className="text-xs">Draft</Badge>}
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
                      <DropdownMenuItem className="gap-2" onClick={() => handleEdit(course)}>
                        <Edit className="h-3 w-3" /> Edit Course
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="gap-2 text-destructive" 
                        onClick={() => handleDelete(course.id)}
                      >
                        <Trash2 className="h-3 w-3" /> Disable Course
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
                  {course.concepts?.slice(0, 3).map((concept, i) => (
                    <Badge key={i} variant="outline" className="text-xs font-normal">
                      {concept}
                    </Badge>
                  ))}
                  {course.concepts && course.concepts.length > 3 && (
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
                  <div className="font-semibold text-lg">₹{Number(course.price).toLocaleString()}</div>
                </div>
              </CardContent>
              <CardFooter className="bg-secondary/20 flex items-center justify-between py-3 gap-2">
                <div className="flex items-center gap-2">
                  <Switch 
                    checked={course.is_published}
                    onCheckedChange={(checked) => handleTogglePublish(course.id, checked)}
                  />
                  <span className={`text-xs font-medium ${course.is_published ? 'text-green-600' : 'text-muted-foreground'}`}>
                    {course.is_published ? 'Published' : 'Unpublished'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Select 
                    value={course.status} 
                    onValueChange={(v: 'active' | 'coming_soon' | 'draft') => handleStatusChange(course.id, v)}
                  >
                    <SelectTrigger className="h-8 w-28 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="coming_soon">Coming Soon</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 gap-1" 
                        onClick={() => setSelectedCourseId(course.id)}
                      >
                        <Eye className="h-3 w-3" /> View
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
                          {course.status === 'coming_soon' 
                            ? 'This course is coming soon. No enrollments yet.'
                            : 'No enrollments yet'
                          }
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
