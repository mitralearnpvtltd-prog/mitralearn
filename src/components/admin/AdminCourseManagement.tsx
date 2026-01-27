import { useState, useRef } from "react";
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
  Database,
  Brain,
  Code,
  TrendingUp,
  Loader2,
  Plus,
  Trash2,
  Edit,
  Eye,
  EyeOff,
  MoreVertical,
  Upload,
  ImageIcon,
  X
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger, 
  DialogFooter, 
  DialogDescription 
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAdminCourses, CourseFormData, Course, uploadCourseImage, validateCourseData } from "@/hooks/useCourses";
import { useAdminRole } from "@/hooks/useAdminRole";
import { CourseCard } from "@/components/CourseCard";
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
  status: 'active',
  is_published: true, // Default to published so it shows on landing page
};

export default function AdminCourseManagement() {
  const { 
    courses, 
    isLoading, 
    createCourse, 
    updateCourse, 
    deleteCourse, 
    togglePublish, 
    updateStatus 
  } = useAdminCourses();
  const { permissions } = useAdminRole();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [formData, setFormData] = useState<CourseFormData>(defaultFormData);
  const [conceptInput, setConceptInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.course_code?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeCount = courses.filter(c => c.status === 'active').length;
  const publishedCount = courses.filter(c => c.is_published).length;

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
    // Validate required fields
    const validation = validateCourseData(formData);
    if (!validation.valid) {
      validation.errors.forEach(error => toast.error(error));
      return;
    }

    setIsSubmitting(true);
    try {
      let imageUrl = formData.image_url;
      
      // Upload image if selected
      if (imageFile) {
        try {
          imageUrl = await uploadCourseImage(imageFile, editingCourseId || undefined);
        } catch (uploadError) {
          console.error('Image upload failed:', uploadError);
          toast.error("Failed to upload image, but proceeding with course save");
        }
      }

      const courseData: CourseFormData = { 
        ...formData, 
        image_url: imageUrl || undefined 
      };

      if (isEditing && editingCourseId) {
        await updateCourse(editingCourseId, courseData);
        toast.success("Course updated successfully!");
      } else {
        const newCourse = await createCourse(courseData);
        toast.success(`Course "${newCourse.title}" created successfully!`);
      }
      
      setIsFormOpen(false);
      resetForm();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      toast.error(isEditing ? `Failed to update: ${errorMessage}` : `Failed to create: ${errorMessage}`);
      console.error('Course save error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (course: Course) => {
    if (!permissions['course.edit']) {
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
      badge: course.badge || '',
      badge_color: course.badge_color || '#7C3AED',
      icon_bg: course.icon_bg || '#7C3AED',
      icon_type: course.icon_type || 'database',
      image_url: course.image_url || undefined,
      status: course.status,
      is_published: course.is_published,
    });
    setImagePreview(course.image_url || null);
    setEditingCourseId(course.id);
    setIsEditing(true);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (courseId: string) => {
    if (!permissions['course.delete']) {
      toast.error("You don't have permission to delete courses");
      return;
    }
    setCourseToDelete(courseId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!courseToDelete) return;
    try {
      await deleteCourse(courseToDelete);
      toast.success("Course deleted");
    } catch (error) {
      toast.error("Failed to delete course");
    } finally {
      setDeleteDialogOpen(false);
      setCourseToDelete(null);
    }
  };

  const handleTogglePublish = async (courseId: string, currentStatus: boolean) => {
    if (!permissions['course.publish']) {
      toast.error("You don't have permission to publish/unpublish courses");
      return;
    }
    try {
      await togglePublish(courseId, !currentStatus);
      toast.success(!currentStatus ? "Course published to landing page" : "Course unpublished");
    } catch (error) {
      toast.error("Failed to update course");
    }
  };

  const handleStatusChange = async (courseId: string, status: 'active' | 'coming_soon' | 'draft') => {
    try {
      await updateStatus(courseId, status);
      toast.success(`Status changed to ${status.replace('_', ' ')}`);
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const resetForm = () => {
    setFormData(defaultFormData);
    setEditingCourseId(null);
    setIsEditing(false);
    setConceptInput("");
    setImageFile(null);
    setImagePreview(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Course Management</h1>
          <p className="text-muted-foreground">
            Changes sync to landing page in real-time
          </p>
        </div>
        <Dialog open={isFormOpen} onOpenChange={(open) => {
          setIsFormOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button className="gap-2" disabled={!permissions['course.create']}>
              <Plus className="h-4 w-4" />
              Add Course
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{isEditing ? 'Edit Course' : 'Add New Course'}</DialogTitle>
              <DialogDescription>
                Fill in the course details. Published courses appear on the landing page.
              </DialogDescription>
            </DialogHeader>
            <CourseForm 
              formData={formData}
              setFormData={setFormData}
              conceptInput={conceptInput}
              setConceptInput={setConceptInput}
              onAddConcept={handleAddConcept}
              onRemoveConcept={handleRemoveConcept}
              isEditing={isEditing}
              imageFile={imageFile}
              setImageFile={setImageFile}
              imagePreview={imagePreview}
              setImagePreview={setImagePreview}
            />
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsFormOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                {isEditing ? 'Update Course' : 'Create Course'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{courses.length}</div>
          </CardContent>
        </Card>
        <Card className="bg-green-50 border-green-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeCount}</div>
          </CardContent>
        </Card>
        <Card className="bg-blue-50 border-blue-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Published</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{publishedCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search courses..." 
          className="pl-9"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Course Grid - Using shared CourseCard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <CourseCard 
            key={course.id} 
            course={course}
            showAdminControls
            adminActions={
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" size="icon" className="h-8 w-8 bg-white/90 hover:bg-white">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleEdit(course)}>
                    <Edit className="h-4 w-4 mr-2" /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleTogglePublish(course.id, course.is_published)}>
                    {course.is_published ? (
                      <><EyeOff className="h-4 w-4 mr-2" /> Unpublish</>
                    ) : (
                      <><Eye className="h-4 w-4 mr-2" /> Publish</>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleStatusChange(course.id, 'active')}>
                    Set Active
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleStatusChange(course.id, 'coming_soon')}>
                    Set Coming Soon
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleStatusChange(course.id, 'draft')}>
                    Set Draft
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => handleDeleteClick(course.id)}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-2" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            }
          />
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          {searchTerm ? 'No courses match your search' : 'No courses yet. Click "Add Course" to create one.'}
        </div>
      )}

      {/* Delete Confirmation */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Course?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this course. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// Extracted Form Component
function CourseForm({
  formData,
  setFormData,
  conceptInput,
  setConceptInput,
  onAddConcept,
  onRemoveConcept,
  isEditing,
  imageFile,
  setImageFile,
  imagePreview,
  setImagePreview,
}: {
  formData: CourseFormData;
  setFormData: React.Dispatch<React.SetStateAction<CourseFormData>>;
  conceptInput: string;
  setConceptInput: (value: string) => void;
  onAddConcept: () => void;
  onRemoveConcept: (index: number) => void;
  isEditing: boolean;
  imageFile: File | null;
  setImageFile: (file: File | null) => void;
  imagePreview: string | null;
  setImagePreview: (url: string | null) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image must be less than 5MB");
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setFormData(prev => ({ ...prev, image_url: undefined }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const currentImage = imagePreview || formData.image_url;
  return (
    <div className="grid gap-4 py-4">
      {/* Course Image Upload */}
      <div className="space-y-2">
        <Label>Course Image</Label>
        <div className="flex items-start gap-4">
          <div className="relative w-32 h-24 rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center overflow-hidden bg-muted/50">
            {currentImage ? (
              <>
                <img 
                  src={currentImage} 
                  alt="Course preview" 
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-0.5 hover:bg-destructive/90"
                >
                  <X className="h-3 w-3" />
                </button>
              </>
            ) : (
              <ImageIcon className="h-8 w-8 text-muted-foreground/50" />
            )}
          </div>
          <div className="flex flex-col gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageSelect}
              accept="image/*"
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="gap-2"
            >
              <Upload className="h-4 w-4" />
              {currentImage ? 'Change Image' : 'Upload Image'}
            </Button>
            <p className="text-xs text-muted-foreground">
              Recommended: 800x600px, max 5MB
            </p>
          </div>
        </div>
      </div>

      {/* Course Code */}
      <div className="space-y-2">
        <Label htmlFor="course_code">Course Code (e.g., DE-FND-001)</Label>
        <Input
          id="course_code"
          value={formData.course_code}
          onChange={(e) => setFormData(prev => ({ ...prev, course_code: e.target.value.toUpperCase() }))}
          placeholder="DE-FND-001"
        />
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

      {/* Category */}
      <div className="space-y-2">
        <Label htmlFor="category">Category *</Label>
        <Input
          id="category"
          value={formData.category}
          onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
          placeholder="e.g., DATA ENGINEERING"
        />
      </div>

      {/* Badge */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="badge">Badge Text</Label>
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

      {/* Concepts/Tags */}
      <div className="space-y-2">
        <Label>Technologies/Keywords (tags)</Label>
        <div className="flex gap-2">
          <Input
            value={conceptInput}
            onChange={(e) => setConceptInput(e.target.value)}
            placeholder="e.g., Python, SQL..."
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), onAddConcept())}
          />
          <Button type="button" onClick={onAddConcept} variant="outline">Add</Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.concepts.map((concept, idx) => (
            <Badge key={idx} variant="secondary" className="gap-1">
              {concept}
              <button onClick={() => onRemoveConcept(idx)} className="ml-1 hover:text-destructive">×</button>
            </Badge>
          ))}
        </div>
      </div>

      {/* Extra concepts count */}
      <div className="space-y-2">
        <Label htmlFor="extra_concepts_count">Extra Topics (+N shown)</Label>
        <Input
          id="extra_concepts_count"
          type="number"
          min="0"
          value={formData.extra_concepts_count}
          onChange={(e) => setFormData(prev => ({ ...prev, extra_concepts_count: Number(e.target.value) }))}
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

      {/* Card Background Color */}
      <div className="space-y-2">
        <Label>Card Background Color</Label>
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

      {/* Publish Toggle - Prominent */}
      <div className="p-4 rounded-lg border-2 border-dashed border-primary/30 bg-primary/5">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="is_published" className="text-base font-semibold">
              Show on Landing Page
            </Label>
            <p className="text-sm text-muted-foreground mt-1">
              {formData.is_published 
                ? "✅ This course will appear on the public landing page" 
                : "⚠️ This course is hidden from the landing page"}
            </p>
          </div>
          <Switch
            id="is_published"
            checked={formData.is_published}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_published: checked }))}
            className="scale-125"
          />
        </div>
      </div>

      {/* Status */}
      <div className="space-y-2">
        <Label>Course Status</Label>
        <Select 
          value={formData.status} 
          onValueChange={(v: 'active' | 'coming_soon' | 'draft') => setFormData(prev => ({ ...prev, status: v }))}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active (Enrollable)</SelectItem>
            <SelectItem value="coming_soon">Coming Soon</SelectItem>
            <SelectItem value="draft">Draft (Internal Only)</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">
          Active courses show "Explore Course" button, Coming Soon shows disabled button
        </p>
      </div>
    </div>
  );
}
