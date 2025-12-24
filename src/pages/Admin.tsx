import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/clerk-react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import {
  Search,
  Users,
  Award,
  Eye,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
  Lock,
} from "lucide-react";
import { toast } from "sonner";

interface AdminUserData {
  user_id: string;
  name: string;
  email: string;
  email_verified: boolean | null;
  course_opted: boolean | null;
  last_login: string | null;
  registered_at: string;
  completed_days: number[] | null;
  completed_quizzes: unknown | null;
  final_assessment_score: number | null;
  final_project_submitted: boolean | null;
  certificate_earned: boolean | null;
  certificate_id: string | null;
  cert_id: string | null;
  certificate_status: string | null;
  completion_date: string | null;
  overall_band: string | null;
  completed_modules_count: number;
}

const ITEMS_PER_PAGE = 10;
const TOTAL_MODULES = 7;

const Admin = () => {
  const { user: clerkUser } = useUser();
  const navigate = useNavigate();
  const [users, setUsers] = useState<AdminUserData[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<AdminUserData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<"all" | "completed" | "in_progress">("all");

  useEffect(() => {
    if (clerkUser) {
      fetchAdminData();
    }
  }, [clerkUser]);

  useEffect(() => {
    filterUsers();
  }, [searchTerm, statusFilter, users]);

  const fetchAdminData = async () => {
    setIsLoading(true);
    const { data, error } = await supabase.rpc('get_admin_dashboard_data');

    if (error) {
      console.error('Error fetching admin data:', error);
      toast.error("Failed to load admin data");
    } else {
      setUsers(data || []);
    }
    setIsLoading(false);
  };

  const filterUsers = () => {
    let filtered = [...users];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (u) =>
          u.name?.toLowerCase().includes(term) ||
          u.email?.toLowerCase().includes(term) ||
          u.certificate_id?.toLowerCase().includes(term)
      );
    }

    if (statusFilter === "completed") {
      filtered = filtered.filter((u) => u.certificate_earned);
    } else if (statusFilter === "in_progress") {
      filtered = filtered.filter((u) => !u.certificate_earned);
    }

    setFilteredUsers(filtered);
    setCurrentPage(1);
  };

  const getCourseProgress = (user: AdminUserData): number => {
    const completed = user.completed_modules_count || 0;
    return Math.round((completed / TOTAL_MODULES) * 100);
  };

  const getProgressColor = (progress: number): string => {
    if (progress === 100) return "bg-green-500";
    if (progress >= 50) return "bg-amber-500";
    return "bg-muted";
  };

  const handleViewCertificate = (certificateId: string) => {
    navigate(`/verify-certificate/${certificateId}`);
  };

  const handleResendCertificate = async (user: AdminUserData) => {
    // This would trigger certificate generation/resend logic
    toast.info(`Certificate resend requested for ${user.name}`);
  };

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const formatDate = (dateStr: string | null): string => {
    if (!dateStr) return "Never";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Auth Required for Non-Signed In Users */}
        <SignedOut>
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6 shadow-glow">
              <Lock className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-display font-bold mb-4">Admin Dashboard</h1>
            <p className="text-muted-foreground mb-8 max-w-md">
              Sign in to access the admin dashboard and manage users.
            </p>
            <SignInButton mode="modal">
              <Button size="lg">Login to Continue</Button>
            </SignInButton>
          </div>
        </SignedOut>

        {/* Admin Dashboard for Signed In Users */}
        <SignedIn>
          <div className="mb-8">
            <h1 className="text-3xl font-display font-bold text-foreground mb-2">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage users, track progress, and issue certificates
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{users.length}</p>
                    <p className="text-sm text-muted-foreground">Total Users</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-green-500/10">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {users.filter((u) => u.certificate_earned).length}
                    </p>
                    <p className="text-sm text-muted-foreground">Completed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-amber-500/10">
                    <RefreshCw className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {users.filter((u) => !u.certificate_earned && u.completed_modules_count > 0).length}
                    </p>
                    <p className="text-sm text-muted-foreground">In Progress</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {users.filter((u) => u.cert_id).length}
                    </p>
                    <p className="text-sm text-muted-foreground">Certificates Issued</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, email, or certificate ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={statusFilter === "all" ? "default" : "outline"}
                    onClick={() => setStatusFilter("all")}
                    size="sm"
                  >
                    All
                  </Button>
                  <Button
                    variant={statusFilter === "completed" ? "default" : "outline"}
                    onClick={() => setStatusFilter("completed")}
                    size="sm"
                  >
                    Completed
                  </Button>
                  <Button
                    variant={statusFilter === "in_progress" ? "default" : "outline"}
                    onClick={() => setStatusFilter("in_progress")}
                    size="sm"
                  >
                    In Progress
                  </Button>
                </div>
                <Button variant="outline" onClick={fetchAdminData} size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Users Table */}
          <Card>
            <CardHeader>
              <CardTitle>Users ({filteredUsers.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8 text-muted-foreground">
                  Loading users...
                </div>
              ) : filteredUsers.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No users found
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Email Verified</TableHead>
                          <TableHead>Course Opted</TableHead>
                          <TableHead>Progress</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Certificate ID</TableHead>
                          <TableHead>Last Login</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {paginatedUsers.map((user) => {
                          const progress = getCourseProgress(user);
                          return (
                            <TableRow key={user.user_id}>
                              <TableCell className="font-medium">{user.name}</TableCell>
                              <TableCell>{user.email}</TableCell>
                              <TableCell>
                                {user.email_verified ? (
                                  <CheckCircle className="w-5 h-5 text-green-500" />
                                ) : (
                                  <XCircle className="w-5 h-5 text-muted-foreground" />
                                )}
                              </TableCell>
                              <TableCell>
                                {user.course_opted ? (
                                  <Badge variant="default">Opted</Badge>
                                ) : (
                                  <Badge variant="secondary">No</Badge>
                                )}
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <div className="w-20 h-2 rounded-full bg-muted overflow-hidden">
                                    <div
                                      className={`h-full ${getProgressColor(progress)}`}
                                      style={{ width: `${progress}%` }}
                                    />
                                  </div>
                                  <span className="text-sm text-muted-foreground">
                                    {progress}%
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell>
                                {user.certificate_earned ? (
                                  <Badge className="bg-green-500">Completed</Badge>
                                ) : (
                                  <Badge variant="secondary">In Progress</Badge>
                                )}
                              </TableCell>
                              <TableCell>
                                {user.cert_id || user.certificate_id ? (
                                  <code className="text-xs bg-muted px-2 py-1 rounded">
                                    {user.cert_id || user.certificate_id}
                                  </code>
                                ) : (
                                  <span className="text-muted-foreground">—</span>
                                )}
                              </TableCell>
                              <TableCell className="text-sm text-muted-foreground">
                                {formatDate(user.last_login)}
                              </TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  {(user.cert_id || user.certificate_id) && (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() =>
                                        handleViewCertificate(
                                          user.cert_id || user.certificate_id!
                                        )
                                      }
                                    >
                                      <Eye className="w-4 h-4" />
                                    </Button>
                                  )}
                                  {!user.cert_id &&
                                    progress === 100 &&
                                    user.email_verified && (
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleResendCertificate(user)}
                                      >
                                        <Award className="w-4 h-4" />
                                      </Button>
                                    )}
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-between mt-6">
                      <p className="text-sm text-muted-foreground">
                        Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
                        {Math.min(currentPage * ITEMS_PER_PAGE, filteredUsers.length)} of{" "}
                        {filteredUsers.length} users
                      </p>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                          disabled={currentPage === 1}
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <span className="px-4 py-2 text-sm">
                          Page {currentPage} of {totalPages}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                          disabled={currentPage === totalPages}
                        >
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </SignedIn>
      </main>
    </div>
  );
};

export default Admin;
