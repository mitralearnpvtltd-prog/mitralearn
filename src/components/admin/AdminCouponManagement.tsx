import { useState } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Loader2,
  Plus,
  Edit,
  Trash2,
  Ticket,
  Calendar,
  Percent,
  DollarSign,
  MoreVertical
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
import { useAdminCoupons, CouponFormData } from "@/hooks/useCoupons";
import { useAdminCourses } from "@/hooks/useCourses";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

const defaultFormData: CouponFormData = {
  code: '',
  discount_type: 'percentage',
  discount_value: 0,
  applicable_courses: null,
  applies_to_all: true,
  minimum_order_value: 0,
  expiry_date: null,
  usage_limit: null,
  is_active: true,
};

export default function AdminCouponManagement() {
  const { coupons, isLoading, createCoupon, updateCoupon, deleteCoupon, toggleActive } = useAdminCoupons();
  const { courses } = useAdminCourses();
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<CouponFormData>(defaultFormData);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredCoupons = coupons.filter(coupon => 
    coupon.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeCoupons = coupons.filter(c => c.is_active);
  const expiredCoupons = coupons.filter(c => c.expiry_date && new Date(c.expiry_date) < new Date());

  const handleSubmit = async () => {
    if (!formData.code || formData.discount_value <= 0) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (formData.discount_type === 'percentage' && formData.discount_value > 100) {
      toast.error("Percentage discount cannot exceed 100%");
      return;
    }

    setIsSubmitting(true);
    try {
      const dataToSubmit = {
        ...formData,
        code: formData.code.toUpperCase(),
        applicable_courses: formData.applies_to_all ? null : selectedCourses,
      };

      if (isEditing && editingId) {
        await updateCoupon(editingId, dataToSubmit);
        toast.success("Coupon updated successfully");
      } else {
        await createCoupon(dataToSubmit);
        toast.success("Coupon created successfully");
      }
      setIsFormOpen(false);
      resetForm();
    } catch (error: any) {
      if (error?.message?.includes('duplicate')) {
        toast.error("Coupon code already exists");
      } else {
        toast.error(isEditing ? "Failed to update coupon" : "Failed to create coupon");
      }
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (coupon: typeof coupons[0]) => {
    setFormData({
      code: coupon.code,
      discount_type: coupon.discount_type,
      discount_value: Number(coupon.discount_value),
      applies_to_all: coupon.applies_to_all,
      minimum_order_value: Number(coupon.minimum_order_value) || 0,
      expiry_date: coupon.expiry_date ? coupon.expiry_date.split('T')[0] : null,
      usage_limit: coupon.usage_limit,
      is_active: coupon.is_active,
    });
    setSelectedCourses(coupon.applicable_courses || []);
    setEditingId(coupon.id);
    setIsEditing(true);
    setIsFormOpen(true);
  };

  const handleDelete = async (couponId: string) => {
    if (!confirm("Are you sure you want to delete this coupon?")) return;
    try {
      await deleteCoupon(couponId);
      toast.success("Coupon deleted successfully");
    } catch (error) {
      toast.error("Failed to delete coupon");
    }
  };

  const handleToggleActive = async (couponId: string, isActive: boolean) => {
    try {
      await toggleActive(couponId, isActive);
      toast.success(isActive ? "Coupon activated" : "Coupon deactivated");
    } catch (error) {
      toast.error("Failed to update coupon");
    }
  };

  const toggleCourseSelection = (courseId: string) => {
    setSelectedCourses(prev => 
      prev.includes(courseId) 
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  const resetForm = () => {
    setFormData(defaultFormData);
    setSelectedCourses([]);
    setEditingId(null);
    setIsEditing(false);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'No expiry';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isExpired = (dateString: string | null) => {
    if (!dateString) return false;
    return new Date(dateString) < new Date();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Coupon Management</h1>
          <p className="text-muted-foreground mt-1">Create and manage discount coupons</p>
        </div>
        <Dialog open={isFormOpen} onOpenChange={(open) => {
          setIsFormOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Coupon
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{isEditing ? 'Edit Coupon' : 'Create New Coupon'}</DialogTitle>
              <DialogDescription>
                {isEditing ? 'Update coupon details below' : 'Fill in the coupon details below'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="code">Coupon Code *</Label>
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value.toUpperCase() }))}
                  placeholder="e.g., SAVE20"
                  className="uppercase"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="discount_type">Discount Type *</Label>
                  <Select 
                    value={formData.discount_type} 
                    onValueChange={(v: 'percentage' | 'fixed') => setFormData(prev => ({ ...prev, discount_type: v }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage (%)</SelectItem>
                      <SelectItem value="fixed">Fixed Amount (₹)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discount_value">
                    Discount Value * {formData.discount_type === 'percentage' ? '(%)' : '(₹)'}
                  </Label>
                  <Input
                    id="discount_value"
                    type="number"
                    min="0"
                    max={formData.discount_type === 'percentage' ? 100 : undefined}
                    value={formData.discount_value}
                    onChange={(e) => setFormData(prev => ({ ...prev, discount_value: Number(e.target.value) }))}
                    placeholder={formData.discount_type === 'percentage' ? '20' : '1000'}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="minimum_order_value">Minimum Order Value (₹)</Label>
                <Input
                  id="minimum_order_value"
                  type="number"
                  min="0"
                  value={formData.minimum_order_value || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, minimum_order_value: Number(e.target.value) || 0 }))}
                  placeholder="0"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry_date">Expiry Date</Label>
                  <Input
                    id="expiry_date"
                    type="date"
                    value={formData.expiry_date || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, expiry_date: e.target.value || null }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="usage_limit">Usage Limit</Label>
                  <Input
                    id="usage_limit"
                    type="number"
                    min="1"
                    value={formData.usage_limit || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, usage_limit: e.target.value ? Number(e.target.value) : null }))}
                    placeholder="Unlimited"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="applies_to_all"
                    checked={formData.applies_to_all}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, applies_to_all: checked }))}
                  />
                  <Label htmlFor="applies_to_all">Apply to all courses</Label>
                </div>

                {!formData.applies_to_all && (
                  <div className="space-y-2">
                    <Label>Select Applicable Courses</Label>
                    <div className="border rounded-lg p-3 max-h-40 overflow-y-auto space-y-2">
                      {courses.map(course => (
                        <div key={course.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`course-${course.id}`}
                            checked={selectedCourses.includes(course.id)}
                            onCheckedChange={() => toggleCourseSelection(course.id)}
                          />
                          <Label htmlFor={`course-${course.id}`} className="text-sm font-normal cursor-pointer">
                            {course.title}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
                />
                <Label htmlFor="is_active">Active</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => { setIsFormOpen(false); resetForm(); }}>Cancel</Button>
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                {isEditing ? 'Update Coupon' : 'Create Coupon'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-none shadow-sm bg-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Coupons</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{coupons.length}</div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-green-500/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeCoupons.length}</div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-red-500/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Expired</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{expiredCoupons.length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search coupons..." 
            className="pl-9 bg-background"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Coupons Table */}
      <Card className="border-none shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Code</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Applies To</TableHead>
                <TableHead>Min. Order</TableHead>
                <TableHead>Expiry</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCoupons.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    {searchTerm ? 'No coupons found' : 'No coupons created yet'}
                  </TableCell>
                </TableRow>
              ) : (
                filteredCoupons.map((coupon) => (
                  <TableRow key={coupon.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Ticket className="h-4 w-4 text-primary" />
                        <span className="font-mono font-semibold">{coupon.code}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {coupon.discount_type === 'percentage' ? (
                          <>
                            <Percent className="h-3 w-3" />
                            <span>{coupon.discount_value}%</span>
                          </>
                        ) : (
                          <>
                            <span>₹{Number(coupon.discount_value).toLocaleString()}</span>
                          </>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {coupon.applies_to_all ? (
                        <Badge variant="secondary">All Courses</Badge>
                      ) : (
                        <Badge variant="outline">{coupon.applicable_courses?.length || 0} Courses</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {coupon.minimum_order_value ? `₹${Number(coupon.minimum_order_value).toLocaleString()}` : '-'}
                    </TableCell>
                    <TableCell>
                      <div className={`flex items-center gap-1 ${isExpired(coupon.expiry_date) ? 'text-red-500' : ''}`}>
                        <Calendar className="h-3 w-3" />
                        <span className="text-sm">{formatDate(coupon.expiry_date)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {coupon.usage_count} / {coupon.usage_limit || '∞'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Switch 
                        checked={coupon.is_active && !isExpired(coupon.expiry_date)}
                        disabled={isExpired(coupon.expiry_date)}
                        onCheckedChange={(checked) => handleToggleActive(coupon.id, checked)}
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="gap-2" onClick={() => handleEdit(coupon)}>
                            <Edit className="h-3 w-3" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="gap-2 text-destructive" 
                            onClick={() => handleDelete(coupon.id)}
                          >
                            <Trash2 className="h-3 w-3" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
