import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Trash2,
  Star,
  ArrowRight
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
import { useAdminRole } from "@/hooks/useAdminRole";
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
  course_code: '',
  title: '',
  description: '',
  category: '',
  category_badge: '',
  concepts: [],
  extra_concepts_count: 0,
  duration: '',
  price: 0,
  students_count: '0',
  rating: 4.5,
  reviews_count: '0',
  badge: 'Project + Internship',
  badge_color: '#7C3AED',
  icon_bg: '#7C3AED',
  icon_type: 'database',
  status: 'coming_soon',
  is_published: false,
};

export default function AdminCourseManagement() {
  const { courses, isLoading, createCourse, updateCourse, deleteCourse, togglePublish, updateStatus } = useAdminCourses();
  const { users } = useAdminUsers();
  const { permissions } = useAdminRole();
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
    if (courseTitle.toLowerCase().includes('data engineer')) {
      return enrolledUsers;
    }
    return [];
  };

  const selectedCourse = courses.find(c => c.id === selectedCourseId);
  const selectedCourseEnrollments = selectedCourse 
    ? getCourseEnrollments(selectedCourse.id, selectedCourse.title) 
    : [];

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
    if (!formData.course_code || !formData.title || !formData.description || !formData.category || !formData.duration) {
      toast.error("Please fill in all required fields including Course Code");
      return;
    }
    
    // Validate course_code format (e.g., DE-FND-001)
    const codePattern = /^[A-Z]{2,4}-[A-Z]{2,8}-\d{3}$/;
    if (!codePattern.test(formData.course_code)) {
      toast.error("Course code must follow format: XX-XXX-000 (e.g., DE-FND-001)");
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
    if (!permissions.canEditCourse) {
      toast.error("You don't have permission to edit courses");
      return;
    }
    setFormData({
      course_code: course.course_code || '',
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
      rating: Number(course.rating) || 4.5,
      reviews_count: course.reviews_count || '0',
      badge: course.badge || 'Project + Internship',
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
    if (!permissions.canDeleteCourse) {
      toast.error("You don't have permission to delete courses");
      return;
    }
    try {
      await deleteCourse(courseId);
      toast.success("Course disabled successfully");
    } catch (error) {
      toast.error("Failed to disable course");
    }
  };

  const handleTogglePublish = async (courseId: string, isPublished: boolean) => {
    if (!permissions.canPublishCourse) {
      toast.error("You don't have permission to publish/unpublish courses");
      return;
    }
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
          <p className="text-muted-foreground mt-1">Manage courses - changes sync to landing page automatically</p>
        </div>
        <Dialog open={isFormOpen} onOpenChange={(open) => {
          setIsFormOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button className="gap-2" disabled={!permissions.canCreateCourse}>
              <Plus className="h-4 w-4" />
              Add Course
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{isEditing ? 'Edit Course' : 'Add New Course'}</DialogTitle>
              <DialogDescription>
                {isEditing ? 'Update course details - same fields as landing page cards' : 'Create a course with all card fields'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {/* Course Code */}
              <div className="space-y-2">
                <Label htmlFor="course_code">Course Code * (e.g., DE-FND-001)</Label>
                <Input
                  id="course_code"
                  value={formData.course_code}
                  onChange={(e) => setFormData(prev => ({ ...prev, course_code: e.target.value.toUpperCase() }))}
                  placeholder="DE-FND-001"
                  disabled={isEditing}
                  className={isEditing ? "bg-muted" : ""}
                />
                {isEditing && (
                  <p className="text-xs text-muted-foreground">Course code cannot be changed after creation</p>
                )}
              </div>

              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Course Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., Data Engineering"
                />
              </div>
              
              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Build scalable data pipelines..."
                  rows={2}
                />
              </div>

              {/* Badge (top-left on card image) */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="badge">Badge Text (on image)</Label>
                  <Input
                    id="badge"
                    value={formData.badge}
                    onChange={(e) => setFormData(prev => ({ ...prev, badge: e.target.value }))}
                    placeholder="e.g., Project + Internship"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="badge_color">Badge Color</Label>
                  <Select value={formData.badge_color} onValueChange={(v) => setFormData(prev => ({ ...prev, badge_color: v }))}>
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
              </div>

              {/* Keywords/Concepts (tags shown below title) */}
              <div className="space-y-2">
                <Label>Keywords / Technologies (tags on card)</Label>
                <div className="flex gap-2">
                  <Input
                    value={conceptInput}
                    onChange={(e) => setConceptInput(e.target.value)}
                    placeholder="e.g., Python, SQL, ETL..."
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddConcept())}
                  />
                  <Button type="button" onClick={handleAddConcept} variant="outline">Add</Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.concepts.map((concept, idx) => (
                    <span 
                      key={idx} 
                      className="text-xs px-3 py-1 rounded-full border flex items-center gap-1"
                      style={{ borderColor: '#E5E7EB', color: '#475569' }}
                    >
                      {concept}
                      <button onClick={() => handleRemoveConcept(idx)} className="ml-1 hover:text-destructive font-bold">×</button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Extra concepts count */}
              <div className="space-y-2">
                <Label htmlFor="extra_concepts_count">Extra Topics Count (+N shown on card)</Label>
                <Input
                  id="extra_concepts_count"
                  type="number"
                  min="0"
                  value={formData.extra_concepts_count}
                  onChange={(e) => setFormData(prev => ({ ...prev, extra_concepts_count: Number(e.target.value) }))}
                  placeholder="0"
                />
              </div>

              {/* Duration & Students */}
              <div className="grid grid-cols-2 gap-4">
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
                  <Label htmlFor="students_count">Students Count</Label>
                  <Input
                    id="students_count"
                    value={formData.students_count}
                    onChange={(e) => setFormData(prev => ({ ...prev, students_count: e.target.value }))}
                    placeholder="e.g., 12,543"
                  />
                </div>
              </div>

              {/* Rating & Reviews */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rating">Rating (0-5)</Label>
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
                  <Label htmlFor="reviews_count">Reviews Count</Label>
                  <Input
                    id="reviews_count"
                    value={formData.reviews_count}
                    onChange={(e) => setFormData(prev => ({ ...prev, reviews_count: e.target.value }))}
                    placeholder="e.g., 2.4k"
                  />
                </div>
              </div>

              {/* Price */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (₹)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
                    placeholder="24999"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="icon_bg">Card Background Color</Label>
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
              </div>

              {/* Category (internal) */}
              <div className="space-y-2">
                <Label htmlFor="category">Category (internal) *</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value.toUpperCase() }))}
                  placeholder="e.g., DATA ENGINEERING"
                />
              </div>

              {/* Status & Published */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status (CTA button)</Label>
                  <Select value={formData.status} onValueChange={(v: 'active' | 'coming_soon' | 'draft') => setFormData(prev => ({ ...prev, status: v }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active (Explore Course)</SelectItem>
                      <SelectItem value="coming_soon">Coming Soon</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 flex flex-col justify-end">
                  <div className="flex items-center space-x-2 h-10">
                    <Switch
                      id="is_published"
                      checked={formData.is_published}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_published: checked }))}
                    />
                    <Label htmlFor="is_published">Show on Landing Page</Label>
                  </div>
                </div>
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
            <CardTitle className="text-sm font-medium text-muted-foreground">Published</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{courses.filter(c => c.is_published).length}</div>
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

      {/* Course Cards Grid - EXACT SAME DESIGN AS LANDING PAGE */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {filteredCourses.map((course) => {
          const enrollments = getCourseEnrollments(course.id, course.title);
          
          return (
            <div 
              key={course.id}
              className={`group bg-white relative transition-all duration-200 hover:shadow-xl overflow-hidden ${!course.is_published ? 'opacity-70' : ''}`}
              style={{ 
                borderRadius: '16px',
                border: '1px solid #E5E7EB',
              }}
            >
              {/* Admin Controls Overlay */}
              <div className="absolute top-3 right-3 z-20 flex gap-1">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="secondary" size="icon" className="h-8 w-8 bg-white/90 hover:bg-white shadow-sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem 
                      className="gap-2" 
                      onClick={() => handleEdit(course)}
                      disabled={!permissions.canEditCourse}
                    >
                      <Edit className="h-3 w-3" /> Edit Course
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="gap-2 text-destructive" 
                      onClick={() => handleDelete(course.id)}
                      disabled={!permissions.canDeleteCourse}
                    >
                      <Trash2 className="h-3 w-3" /> Disable Course
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Image Section */}
              <div 
                className="relative h-48 w-full overflow-hidden"
                style={{ backgroundColor: course.icon_bg }}
              >
                {course.image_url ? (
                  <img 
                    src={course.image_url} 
                    alt={course.title}
                    className="w-full h-full object-cover object-center"
                  />
                ) : (
                  <div 
                    className="w-full h-full"
                    style={{ 
                      background: `linear-gradient(135deg, ${course.icon_bg}cc 0%, ${course.icon_bg} 100%)`,
                    }}
                  />
                )}
                
                {/* Badge (top-left) */}
                {course.badge && (
                  <div className="absolute top-3 left-3">
                    <span 
                      className="text-white text-xs font-semibold px-3 py-1.5 rounded-md"
                      style={{ backgroundColor: course.badge_color }}
                    >
                      {course.badge}
                    </span>
                  </div>
                )}

                {/* Published/Draft indicator */}
                {!course.is_published && (
                  <div className="absolute bottom-3 left-3">
                    <Badge variant="secondary" className="bg-white/90">Draft</Badge>
                  </div>
                )}
              </div>
              
              {/* Content Section */}
              <div className="p-5">
                {/* Course Code */}
                {course.course_code && (
                  <div className="mb-2">
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground">
                      {course.course_code}
                    </span>
                  </div>
                )}
                
                {/* Title */}
                <h3 
                  className="text-lg font-bold mb-3"
                  style={{ color: '#0F172A' }}
                >
                  {course.title}
                </h3>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {course.concepts?.map((concept, i) => (
                    <span 
                      key={i} 
                      className="text-xs px-3 py-1 rounded-full border"
                      style={{ borderColor: '#E5E7EB', color: '#475569' }}
                    >
                      {concept}
                    </span>
                  ))}
                  {course.extra_concepts_count && course.extra_concepts_count > 0 && (
                    <span 
                      className="text-xs px-3 py-1 rounded-full border"
                      style={{ borderColor: '#E5E7EB', color: '#475569' }}
                    >
                      +{course.extra_concepts_count}
                    </span>
                  )}
                </div>
                
                {/* Duration & Students */}
                <div className="flex items-center gap-4 mb-4 text-sm" style={{ color: '#64748B' }}>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="h-4 w-4" />
                    <span>{course.students_count || '0'}</span>
                  </div>
                </div>
                
                {/* Rating & Level */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1.5">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold" style={{ color: '#0F172A' }}>{course.rating}</span>
                    <span className="text-sm" style={{ color: '#64748B' }}>({course.reviews_count || '0'})</span>
                  </div>
                  <span 
                    className="text-xs font-medium px-2.5 py-1 rounded-full"
                    style={{ 
                      backgroundColor: '#EDE9FE',
                      color: '#7C3AED',
                    }}
                  >
                    Beginner to Advanced
                  </span>
                </div>
                
                {/* Admin Status Controls */}
                <div className="flex items-center justify-between gap-2 mb-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={course.is_published}
                      onCheckedChange={(checked) => handleTogglePublish(course.id, checked)}
                      disabled={!permissions.canPublishCourse}
                    />
                    <span className={`text-xs font-medium ${course.is_published ? 'text-green-600' : 'text-muted-foreground'}`}>
                      {course.is_published ? 'Published' : 'Hidden'}
                    </span>
                  </div>
                  <Select 
                    value={course.status} 
                    onValueChange={(v: 'active' | 'coming_soon' | 'draft') => handleStatusChange(course.id, v)}
                    disabled={!permissions.canEditCourse}
                  >
                    <SelectTrigger className="h-7 w-28 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="coming_soon">Coming Soon</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* CTA Button (same as landing page) */}
                {course.status === 'active' ? (
                  <button 
                    className="w-full py-3 rounded-lg text-white font-semibold flex items-center justify-center gap-2 transition-all hover:opacity-90"
                    style={{ 
                      background: 'linear-gradient(90deg, #7C3AED 0%, #06B6D4 100%)',
                    }}
                    onClick={() => handleEdit(course)}
                  >
                    Explore Course <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button 
                    className="w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
                    style={{ 
                      backgroundColor: '#F1F5F9',
                      color: '#64748B',
                    }}
                    onClick={() => handleEdit(course)}
                  >
                    <Clock className="h-4 w-4" /> Coming Soon
                  </button>
                )}

                {/* Enrollments info */}
                <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{enrollments.length} enrolled</span>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 text-xs gap-1" 
                        onClick={() => setSelectedCourseId(course.id)}
                      >
                        <Eye className="h-3 w-3" /> View Enrollments
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
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
