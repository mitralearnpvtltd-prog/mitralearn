import { useAdminUsers } from "@/hooks/useAdminData";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useAdminRole } from "@/hooks/useAdminRole";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Download,
  Filter,
  Eye,
  Loader2,
  Award,
  Smartphone,
  Tablet,
  Monitor,
  Trash2,
  Users,
  UserCheck,
  Share2,
  X
} from "lucide-react";
import { getDeviceIcon } from "@/lib/deviceDetector";
import { getTotalSubmodules } from "@/data/curriculum";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { useState, useMemo, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface CandidateFilters {
  search: string;
  course: string;
  location: string;
  status: string;
  device: string;
  source: string;
  utmSource: string;
  utmCampaign: string;
  dateStart: string;
  dateEnd: string;
}

const defaultFilters: CandidateFilters = {
  search: '',
  course: 'all',
  location: 'all',
  status: 'all',
  device: 'all',
  source: 'all',
  utmSource: 'all',
  utmCampaign: 'all',
  dateStart: '',
  dateEnd: '',
};

export default function AdminCandidates() {
  const { users, isLoading, refetch } = useAdminUsers();
  const { isSuperAdmin, hasPermission } = useAdminRole();
  const canDeleteCandidates = hasPermission('candidate.delete') || isSuperAdmin;
  const [courses, setCourses] = useState<any[]>([]);
  const [filters, setFilters] = useState<CandidateFilters>(defaultFilters);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [candidateToDelete, setCandidateToDelete] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch courses for filter dropdown
  useEffect(() => {
    const fetchCourses = async () => {
      const { data } = await supabase.from('courses').select('id, title');
      setCourses(data || []);
    };
    fetchCourses();
  }, []);

  // Get unique values for filters
  const locations = useMemo(() => {
    const locs = new Set(users.map(u => u.location).filter(Boolean));
    return Array.from(locs);
  }, [users]);

  const sources = useMemo(() => {
    const srcs = new Set(users.map((u: any) => u.registration_source).filter(Boolean));
    return Array.from(srcs);
  }, [users]);

  // Get unique UTM sources and campaigns for filters
  const utmSources = useMemo(() => {
    const srcs = new Set(users.map((u: any) => u.utm_source).filter(Boolean));
    return Array.from(srcs) as string[];
  }, [users]);

  const utmCampaigns = useMemo(() => {
    const camps = new Set(users.map((u: any) => u.utm_campaign).filter(Boolean));
    return Array.from(camps) as string[];
  }, [users]);

  // Filter candidates
  const filteredCandidates = useMemo(() => {
    return users.filter((user: any) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch = 
          user.name.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower) ||
          (user.phone && user.phone.includes(filters.search));
        if (!matchesSearch) return false;
      }

      // Course filter
      if (filters.course !== 'all' && user.enrolled_course_id !== filters.course) {
        return false;
      }

      // Location filter
      if (filters.location !== 'all' && user.location !== filters.location) {
        return false;
      }

      // Status filter
      if (filters.status !== 'all') {
        const status = user.candidate_status || 'Active';
        if (status !== filters.status) return false;
      }

      // Device filter
      if (filters.device !== 'all') {
        const deviceType = getDeviceIcon(user.device_info);
        if (deviceType !== filters.device) return false;
      }

      // Source filter
      if (filters.source !== 'all') {
        const source = user.registration_source || 'direct';
        if (source !== filters.source) return false;
      }

      // UTM Source filter
      if (filters.utmSource !== 'all') {
        if ((user.utm_source || '') !== filters.utmSource) return false;
      }

      // UTM Campaign filter
      if (filters.utmCampaign !== 'all') {
        if ((user.utm_campaign || '') !== filters.utmCampaign) return false;
      }

      // Date range filter
      if (filters.dateStart || filters.dateEnd) {
        const regDate = new Date(user.registered_at);
        if (filters.dateStart && regDate < new Date(filters.dateStart)) return false;
        if (filters.dateEnd && regDate > new Date(filters.dateEnd)) return false;
      }

      return true;
    });
  }, [users, filters]);

  const clearFilters = () => {
    setFilters(defaultFilters);
  };

  const hasActiveFilters = Object.entries(filters).some(([key, value]) => {
    if (key === 'search') return value !== '';
    if (key === 'dateStart' || key === 'dateEnd') return value !== '';
    return value !== 'all';
  });

  const handleSoftDelete = async () => {
    if (!candidateToDelete || !canDeleteCandidates) return;

    setIsDeleting(true);
    try {
      const { error } = await supabase.rpc('soft_delete_candidate', {
        _user_id: candidateToDelete.user_id,
        _deleted_by: 'admin', // Will be replaced with actual admin ID
      });

      if (error) throw error;

      toast.success('Candidate deleted successfully');
      setDeleteDialogOpen(false);
      setCandidateToDelete(null);
      refetch();
    } catch (err) {
      console.error('Error deleting candidate:', err);
      toast.error('Failed to delete candidate');
    } finally {
      setIsDeleting(false);
    }
  };

  // Stats
  const totalCandidates = users.length;
  const activeCandidates = users.filter((u: any) => {
    if (!u.last_login) return false;
    const lastLogin = new Date(u.last_login);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return lastLogin > thirtyDaysAgo;
  }).length;
  const totalCertified = users.filter((u: any) => u.certificate_earned).length;
  const referralCandidates = users.filter((u: any) => u.registration_source === 'referral').length;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Candidate Management</h1>
          <p className="text-muted-foreground text-sm">Manage candidates, track progress, and monitor enrollments</p>
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="h-4 w-4" /> Export
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
        <Card className="border-none shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Users className="h-4 w-4 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">{totalCandidates}</div>
                <div className="text-xs text-muted-foreground">Total Candidates</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/10">
                <UserCheck className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{activeCandidates}</div>
                <div className="text-xs text-muted-foreground">Active (30d)</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10">
                <Award className="h-4 w-4 text-amber-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{totalCertified}</div>
                <div className="text-xs text-muted-foreground">Certified</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Share2 className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{referralCandidates}</div>
                <div className="text-xs text-muted-foreground">From Referrals</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-none shadow-sm">
        <CardHeader className="p-4 border-b">
          <div className="space-y-3">
            {/* Search and Filter Toggle */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search by name, email, phone..." 
                  className="pl-9 h-9"
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  variant={showFilters ? "secondary" : "outline"} 
                  size="sm" 
                  className="gap-2"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4" /> Filters
                  {hasActiveFilters && (
                    <Badge variant="default" className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                      !
                    </Badge>
                  )}
                </Button>
                {hasActiveFilters && (
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1">
                    <X className="h-4 w-4" /> Clear
                  </Button>
                )}
              </div>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 pt-3 border-t">
                <div className="space-y-1">
                  <Label className="text-xs">Course</Label>
                  <Select value={filters.course} onValueChange={(v) => setFilters({ ...filters, course: v })}>
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue placeholder="All Courses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Courses</SelectItem>
                      {courses.map((c: any) => (
                        <SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <Label className="text-xs">Location</Label>
                  <Select value={filters.location} onValueChange={(v) => setFilters({ ...filters, location: v })}>
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue placeholder="All Locations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      {locations.map((loc) => (
                        <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <Label className="text-xs">Status</Label>
                  <Select value={filters.status} onValueChange={(v) => setFilters({ ...filters, status: v })}>
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <Label className="text-xs">Device</Label>
                  <Select value={filters.device} onValueChange={(v) => setFilters({ ...filters, device: v })}>
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue placeholder="All Devices" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Devices</SelectItem>
                      <SelectItem value="monitor">Desktop</SelectItem>
                      <SelectItem value="smartphone">Mobile</SelectItem>
                      <SelectItem value="tablet">Tablet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <Label className="text-xs">Source</Label>
                  <Select value={filters.source} onValueChange={(v) => setFilters({ ...filters, source: v })}>
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue placeholder="All Sources" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sources</SelectItem>
                      <SelectItem value="direct">Direct</SelectItem>
                      <SelectItem value="referral">Referral</SelectItem>
                      <SelectItem value="google">Google</SelectItem>
                      <SelectItem value="facebook">Facebook</SelectItem>
                      {sources.filter(s => !['direct', 'referral', 'google', 'facebook'].includes(s)).map((src) => (
                        <SelectItem key={src} value={src}>{src}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <Label className="text-xs">UTM Source</Label>
                  <Select value={filters.utmSource} onValueChange={(v) => setFilters({ ...filters, utmSource: v })}>
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue placeholder="All UTM Sources" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All UTM Sources</SelectItem>
                      {utmSources.map((src) => (
                        <SelectItem key={src} value={src}>{src}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <Label className="text-xs">UTM Campaign</Label>
                  <Select value={filters.utmCampaign} onValueChange={(v) => setFilters({ ...filters, utmCampaign: v })}>
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue placeholder="All Campaigns" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Campaigns</SelectItem>
                      {utmCampaigns.map((camp) => (
                        <SelectItem key={camp} value={camp}>{camp}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1 col-span-2 md:col-span-1">
                  <Label className="text-xs">Registration Date</Label>
                  <div className="flex gap-1">
                    <Input 
                      type="date" 
                      className="h-8 text-xs"
                      value={filters.dateStart}
                      onChange={(e) => setFilters({ ...filters, dateStart: e.target.value })}
                    />
                    <Input 
                      type="date" 
                      className="h-8 text-xs"
                      value={filters.dateEnd}
                      onChange={(e) => setFilters({ ...filters, dateEnd: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="text-xs text-muted-foreground">
              Showing {filteredCandidates.length} of {users.length} candidates
            </div>
          </div>
        </CardHeader>

        {/* Table */}
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="w-[180px]">Candidate</TableHead>
                <TableHead className="w-[100px]">Phone</TableHead>
                <TableHead className="w-[80px]">Device</TableHead>
                <TableHead className="w-[80px]">Source</TableHead>
                <TableHead className="w-[100px]">UTM Source</TableHead>
                <TableHead className="w-[100px]">UTM Campaign</TableHead>
                <TableHead className="w-[120px]">Course</TableHead>
                <TableHead className="w-[100px]">Progress</TableHead>
                <TableHead className="w-[80px]">Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCandidates.length > 0 ? (
                filteredCandidates.map((user: any) => {
                  const totalSubmodules = getTotalSubmodules();
                  const progressPercent = Math.round((user.completed_modules_count / totalSubmodules) * 100);
                  const deviceType = getDeviceIcon(user.device_info);
                  const DeviceIcon = deviceType === 'smartphone' ? Smartphone : deviceType === 'tablet' ? Tablet : Monitor;

                  return (
                    <TableRow key={user.user_id} className="hover:bg-secondary/50">
                      <TableCell>
                        <div className="space-y-0.5">
                          <div className="font-medium text-sm">{user.name}</div>
                          <div className="text-xs text-muted-foreground">{user.email}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {user.phone || '-'}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <DeviceIcon className="h-3.5 w-3.5 text-muted-foreground" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs capitalize">
                          {user.registration_source || 'direct'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-xs text-muted-foreground">
                          {user.utm_source || '-'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-xs text-muted-foreground">
                          {user.utm_campaign || '-'}
                        </span>
                      </TableCell>
                      <TableCell>
                        {user.enrolled_course_title ? (
                          <Badge variant="default" className="text-xs max-w-[100px] truncate">
                            {user.enrolled_course_title}
                          </Badge>
                        ) : (
                          <span className="text-xs text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="w-16">
                          <Progress value={progressPercent} className="h-1.5" />
                          <div className="text-xs text-muted-foreground mt-0.5">{progressPercent}%</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {user.certificate_earned ? (
                          <Badge variant="default" className="gap-1 text-xs">
                            <Award className="h-3 w-3" />
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-xs">
                            {user.candidate_status || 'Active'}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 w-7 p-0"
                            onClick={() => setSelectedCandidate(user)}
                          >
                            <Eye className="h-3.5 w-3.5" />
                          </Button>
                          {canDeleteCandidates && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-7 w-7 p-0 text-destructive hover:text-destructive"
                              onClick={() => {
                                setCandidateToDelete(user);
                                setDeleteDialogOpen(true);
                              }}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={10} className="text-center py-8 text-muted-foreground">
                    No candidates found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Candidate Dialog */}
      <Dialog open={!!selectedCandidate} onOpenChange={(open) => !open && setSelectedCandidate(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedCandidate?.name}</DialogTitle>
            <DialogDescription>{selectedCandidate?.email}</DialogDescription>
          </DialogHeader>
          {selectedCandidate && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="font-medium">{selectedCandidate.phone || 'Not provided'}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="font-medium">{selectedCandidate.location || 'Not provided'}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Registered</p>
                  <p className="font-medium">{new Date(selectedCandidate.registered_at).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Last Login</p>
                  <p className="font-medium">
                    {selectedCandidate.last_login ? new Date(selectedCandidate.last_login).toLocaleDateString() : 'Never'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Source</p>
                  <p className="font-medium capitalize">{selectedCandidate.registration_source || 'Direct'}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">UTM Source</p>
                  <p className="font-medium">{selectedCandidate.utm_source || '-'}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">UTM Medium</p>
                  <p className="font-medium">{selectedCandidate.utm_medium || '-'}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">UTM Campaign</p>
                  <p className="font-medium">{selectedCandidate.utm_campaign || '-'}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Referred By</p>
                  <p className="font-medium">{selectedCandidate.referred_by || '-'}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Referral Code</p>
                  <p className="font-medium font-mono">{selectedCandidate.referral_code || '-'}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Referrals Made</p>
                  <p className="font-medium">{selectedCandidate.referral_count || 0}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-muted-foreground">Enrolled Course</p>
                  <p className="font-medium">{selectedCandidate.enrolled_course_title || 'Not enrolled'}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Progress</p>
                  <p className="font-medium">{selectedCandidate.completed_modules_count}/{getTotalSubmodules()} submodules</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Certificate</p>
                  <p className="font-medium">
                    {selectedCandidate.certificate_earned ? (
                      <Badge variant="default">{selectedCandidate.overall_band}</Badge>
                    ) : (
                      'Not earned'
                    )}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Candidate</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {candidateToDelete?.name}? This action will soft-delete the candidate and their data will be retained for audit purposes.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleSoftDelete}
              disabled={isDeleting}
            >
              {isDeleting && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
