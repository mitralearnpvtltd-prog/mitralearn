import { useStore } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Download,
  Send,
  Award,
  Eye
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function AdminCertificates() {
  const { certificates, users, courses, issueCertificate } = useStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [isIssueOpen, setIsIssueOpen] = useState(false);

  const filteredCerts = certificates.filter(cert => 
    cert.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.certificateId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleIssue = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const userId = formData.get('userId') as string;
    const courseId = formData.get('courseId') as string;
    
    const user = users.find(u => u.id === userId);
    const course = courses.find(c => c.id === courseId);
    
    if (user && course) {
      issueCertificate({
        userId: user.id,
        userName: user.name,
        courseId: course.id,
        courseName: course.title,
        type: 'Manual'
      });
      setIsIssueOpen(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Certificate Management</h1>
          <p className="text-muted-foreground mt-1">Track and manage course completion certificates</p>
        </div>
        <Dialog open={isIssueOpen} onOpenChange={setIsIssueOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Award className="h-4 w-4" /> Issue Certificate
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Issue New Certificate</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleIssue} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="userId">Select User</Label>
                <Select name="userId" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select user" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map(user => (
                      <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="courseId">Select Course</Label>
                <Select name="courseId" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map(course => (
                      <SelectItem key={course.id} value={course.id}>{course.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsIssueOpen(false)}>Cancel</Button>
                <Button type="submit">Issue Certificate</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Issued</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{certificates.length}</div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">{certificates.filter(c => c.status === 'Pending').length}</div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Auto Issued</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{certificates.filter(c => c.type === 'Auto').length}</div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Manual Issued</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{certificates.filter(c => c.type === 'Manual').length}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader className="p-4 border-b">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by user, course, or certificate ID..." 
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="issued">Issued</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Certificate ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Issue Type</TableHead>
                <TableHead>Issued Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCerts.map((cert) => (
                <TableRow key={cert.id}>
                  <TableCell className="font-mono text-sm font-medium">{cert.certificateId}</TableCell>
                  <TableCell className="font-medium">{cert.userName}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{cert.courseName}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-normal">
                      {cert.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{cert.issueDate}</TableCell>
                  <TableCell>
                    <Badge variant="default" className="bg-foreground text-background hover:bg-foreground/90">
                      {cert.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 text-sm gap-1">
                            <Eye className="h-3 w-3" /> View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Certificate</DialogTitle>
                          </DialogHeader>
                          <div className="border rounded-lg p-8 bg-gradient-to-br from-blue-50 to-indigo-50 text-center space-y-6">
                            <div className="space-y-2">
                              <Award className="h-12 w-12 mx-auto text-primary" />
                              <h2 className="text-3xl font-bold text-foreground">Certificate of Completion</h2>
                            </div>
                            <div className="border-t border-b py-6 space-y-4">
                              <p className="text-lg text-muted-foreground">This is to certify that</p>
                              <p className="text-4xl font-bold text-foreground">{cert.userName}</p>
                              <p className="text-lg text-muted-foreground">has successfully completed the course</p>
                              <p className="text-2xl font-semibold text-primary">{cert.courseName}</p>
                              <p className="text-sm text-muted-foreground">on {cert.issueDate}</p>
                            </div>
                            <div className="space-y-2">
                              <p className="font-mono text-sm font-medium">Certificate ID: <span className="font-bold">{cert.certificateId}</span></p>
                            </div>
                          </div>
                          <div className="flex gap-2 justify-end mt-4">
                            <Button variant="outline" className="gap-2">
                              <Download className="h-4 w-4" /> Download PDF
                            </Button>
                            <Button className="gap-2">
                              <Send className="h-4 w-4" /> Send to Student
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
