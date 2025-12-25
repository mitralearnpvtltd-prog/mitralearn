import { create } from 'zustand';

export const REVENUE_DATA = [
  { month: 'Jan', revenue: 15000, enrollments: 2 },
  { month: 'Feb', revenue: 22000, enrollments: 3 },
  { month: 'Mar', revenue: 18000, enrollments: 2 },
  { month: 'Apr', revenue: 32000, enrollments: 4 },
  { month: 'May', revenue: 28000, enrollments: 3 },
  { month: 'Jun', revenue: 45000, enrollments: 5 },
  { month: 'Jul', revenue: 47492, enrollments: 4 },
];

interface User {
  id: string;
  name: string;
  email: string;
  registrationDate: string;
  status: 'Active' | 'Inactive';
  location: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  status: 'Active' | 'Inactive';
  instructor: string;
  duration: string;
  category: string;
  startDate: string;
}

interface Coupon {
  id: string;
  code: string;
  discountType: 'Percentage' | 'Flat';
  value: number;
  usage: number;
  limit: number;
  status: 'Active' | 'Expired';
  courseId?: string;
}

interface Enrollment {
  id: string;
  userId: string;
  userName: string;
  courseId: string;
  courseName: string;
  enrollmentDate: string;
  isPaid: boolean;
  amountPaid: number;
  couponCode?: string;
  progress: number;
  status: 'Active' | 'Completed' | 'Dropped';
}

interface Certificate {
  id: string;
  userId: string;
  userName: string;
  courseId: string;
  courseName: string;
  certificateId: string;
  issueDate: string;
  status: 'Issued' | 'Pending';
  type: 'Auto' | 'Manual';
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  timestamp: string;
}

interface StoreState {
  users: User[];
  courses: Course[];
  coupons: Coupon[];
  enrollments: Enrollment[];
  certificates: Certificate[];
  notifications: Notification[];
  
  // Actions
  toggleUserStatus: (userId: string) => void;
  addEnrollment: (enrollment: Omit<Enrollment, 'id'>) => void;
  addCourse: (course: Omit<Course, 'id'>) => void;
  updateCourseStatus: (courseId: string, status: 'Active' | 'Inactive') => void;
  addCoupon: (coupon: Omit<Coupon, 'id'>) => void;
  issueCertificate: (data: { userId: string; userName: string; courseId: string; courseName: string; type: 'Auto' | 'Manual' }) => void;
  markNotificationAsRead: (id: string) => void;
  clearNotifications: () => void;
  
  // Computed
  getPaidEnrollments: () => number;
  getActiveUsers: () => number;
  getInactiveUsers: () => number;
  getUnreadNotificationCount: () => number;
}

const initialUsers: User[] = [
  { id: '1', name: 'Rahul Sharma', email: 'rahul@example.com', registrationDate: '2024-01-15', status: 'Active', location: 'Mumbai' },
  { id: '2', name: 'Priya Patel', email: 'priya@example.com', registrationDate: '2024-02-20', status: 'Active', location: 'Delhi' },
  { id: '3', name: 'Amit Kumar', email: 'amit@example.com', registrationDate: '2024-03-10', status: 'Inactive', location: 'Bangalore' },
  { id: '4', name: 'Sneha Gupta', email: 'sneha@example.com', registrationDate: '2024-04-05', status: 'Active', location: 'Chennai' },
  { id: '5', name: 'Vikram Singh', email: 'vikram@example.com', registrationDate: '2024-05-12', status: 'Active', location: 'Pune' },
];

const initialCourses: Course[] = [
  { id: '1', title: 'Full Stack Development', description: 'Master modern web development with React and Node.js', price: 29999, status: 'Active', instructor: 'John Doe', duration: '12 weeks', category: 'Development', startDate: '2024-01-01' },
  { id: '2', title: 'Data Science Fundamentals', description: 'Learn Python, ML, and data analysis', price: 24999, status: 'Active', instructor: 'Jane Smith', duration: '10 weeks', category: 'Data Science', startDate: '2024-02-01' },
  { id: '3', title: 'UI/UX Design Masterclass', description: 'Design beautiful user experiences', price: 19999, status: 'Active', instructor: 'Mike Johnson', duration: '8 weeks', category: 'Design', startDate: '2024-03-01' },
];

const initialCoupons: Coupon[] = [
  { id: '1', code: 'WELCOME20', discountType: 'Percentage', value: 20, usage: 15, limit: 50, status: 'Active' },
  { id: '2', code: 'FLAT5000', discountType: 'Flat', value: 5000, usage: 8, limit: 20, status: 'Active' },
  { id: '3', code: 'SUMMER25', discountType: 'Percentage', value: 25, usage: 20, limit: 20, status: 'Expired' },
];

const initialEnrollments: Enrollment[] = [
  { id: '1', userId: '1', userName: 'Rahul Sharma', courseId: '1', courseName: 'Full Stack Development', enrollmentDate: '2024-01-20', isPaid: true, amountPaid: 23999, couponCode: 'WELCOME20', progress: 75, status: 'Active' },
  { id: '2', userId: '2', userName: 'Priya Patel', courseId: '2', courseName: 'Data Science Fundamentals', enrollmentDate: '2024-02-25', isPaid: true, amountPaid: 24999, progress: 100, status: 'Completed' },
  { id: '3', userId: '3', userName: 'Amit Kumar', courseId: '1', courseName: 'Full Stack Development', enrollmentDate: '2024-03-15', isPaid: true, amountPaid: 24999, couponCode: 'FLAT5000', progress: 30, status: 'Active' },
  { id: '4', userId: '4', userName: 'Sneha Gupta', courseId: '3', courseName: 'UI/UX Design Masterclass', enrollmentDate: '2024-04-10', isPaid: true, amountPaid: 19999, progress: 50, status: 'Active' },
  { id: '5', userId: '5', userName: 'Vikram Singh', courseId: '2', courseName: 'Data Science Fundamentals', enrollmentDate: '2024-05-20', isPaid: true, amountPaid: 18999, couponCode: 'SUMMER25', progress: 100, status: 'Completed' },
  { id: '6', userId: '1', userName: 'Rahul Sharma', courseId: '3', courseName: 'UI/UX Design Masterclass', enrollmentDate: '2024-06-01', isPaid: true, amountPaid: 14999, couponCode: 'SUMMER25', progress: 20, status: 'Active' },
  { id: '7', userId: '2', userName: 'Priya Patel', courseId: '1', courseName: 'Full Stack Development', enrollmentDate: '2024-06-15', isPaid: true, amountPaid: 29999, progress: 10, status: 'Active' },
  { id: '8', userId: '4', userName: 'Sneha Gupta', courseId: '2', courseName: 'Data Science Fundamentals', enrollmentDate: '2024-07-01', isPaid: true, amountPaid: 19999, couponCode: 'WELCOME20', progress: 5, status: 'Active' },
  { id: '9', userId: '5', userName: 'Vikram Singh', courseId: '3', courseName: 'UI/UX Design Masterclass', enrollmentDate: '2024-07-10', isPaid: true, amountPaid: 29999, couponCode: 'FLAT5000', progress: 100, status: 'Completed' },
];

const initialCertificates: Certificate[] = [
  { id: '1', userId: '2', userName: 'Priya Patel', courseId: '2', courseName: 'Data Science Fundamentals', certificateId: 'CERT-2024-001', issueDate: '2024-05-01', status: 'Issued', type: 'Auto' },
  { id: '2', userId: '5', userName: 'Vikram Singh', courseId: '2', courseName: 'Data Science Fundamentals', certificateId: 'CERT-2024-002', issueDate: '2024-07-25', status: 'Issued', type: 'Auto' },
  { id: '3', userId: '5', userName: 'Vikram Singh', courseId: '3', courseName: 'UI/UX Design Masterclass', certificateId: 'CERT-2024-003', issueDate: '2024-08-15', status: 'Issued', type: 'Auto' },
];

const initialNotifications: Notification[] = [
  { id: '1', title: 'New Enrollment', message: 'Rahul Sharma enrolled in Full Stack Development', type: 'success', read: false, timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString() },
  { id: '2', title: 'Course Completed', message: 'Priya Patel completed Data Science Fundamentals', type: 'info', read: false, timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString() },
  { id: '3', title: 'Low Coupon Stock', message: 'SUMMER25 coupon has reached its limit', type: 'warning', read: true, timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() },
];

export const useStore = create<StoreState>((set, get) => ({
  users: initialUsers,
  courses: initialCourses,
  coupons: initialCoupons,
  enrollments: initialEnrollments,
  certificates: initialCertificates,
  notifications: initialNotifications,
  
  toggleUserStatus: (userId) => set((state) => ({
    users: state.users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' }
        : user
    )
  })),
  
  addEnrollment: (enrollment) => set((state) => ({
    enrollments: [...state.enrollments, { ...enrollment, id: String(state.enrollments.length + 1) }]
  })),
  
  addCourse: (course) => set((state) => ({
    courses: [...state.courses, { ...course, id: String(state.courses.length + 1) }]
  })),
  
  updateCourseStatus: (courseId, status) => set((state) => ({
    courses: state.courses.map(course => 
      course.id === courseId ? { ...course, status } : course
    )
  })),
  
  addCoupon: (coupon) => set((state) => ({
    coupons: [...state.coupons, { ...coupon, id: String(state.coupons.length + 1) }]
  })),
  
  issueCertificate: (data) => set((state) => ({
    certificates: [...state.certificates, {
      id: String(state.certificates.length + 1),
      ...data,
      certificateId: `CERT-${new Date().getFullYear()}-${String(state.certificates.length + 1).padStart(3, '0')}`,
      issueDate: new Date().toISOString().split('T')[0],
      status: 'Issued'
    }]
  })),
  
  markNotificationAsRead: (id) => set((state) => ({
    notifications: state.notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    )
  })),
  
  clearNotifications: () => set((state) => ({
    notifications: state.notifications.map(n => ({ ...n, read: true }))
  })),
  
  getPaidEnrollments: () => get().enrollments.filter(e => e.isPaid).length,
  getActiveUsers: () => get().users.filter(u => u.status === 'Active').length,
  getInactiveUsers: () => get().users.filter(u => u.status === 'Inactive').length,
  getUnreadNotificationCount: () => get().notifications.filter(n => !n.read).length,
}));
