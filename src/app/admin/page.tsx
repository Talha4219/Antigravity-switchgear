'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Users,
  DollarSign,
  CreditCard,
  Activity,
  ShoppingCart,
  CheckCircle2,
  AlertCircle,
  Package,
  MessageSquare,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  Search,
  User
} from 'lucide-react';
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useData } from '@/hooks/use-data';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';

// Mock Data for charts (keep these for visual appeal as we don't have historical data APIs yet)
const revenueData = [
  { name: 'Jan', total: 2400 },
  { name: 'Feb', total: 1398 },
  { name: 'Mar', total: 9800 },
  { name: 'Apr', total: 3908 },
  { name: 'May', total: 4800 },
  { name: 'Jun', total: 3800 },
  { name: 'Jul', total: 4300 },
];

const distributionData = [
  { name: 'Direct', value: 400 },
  { name: 'Social', value: 300 },
  { name: 'Organic', value: 300 },
  { name: 'Referral', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

import { motion } from 'framer-motion';

export default function AdminDashboardPage() {
  const { data: users } = useData<any>('/api/users');
  const { data: products } = useData<any>('/api/products');
  const { data: orders } = useData<any>('/api/orders');
  const { data: messages } = useData<any>('/api/messages');

  const totalRevenue = orders?.reduce((acc: number, order: any) => acc + (order.totalAmount || 0), 0) || 0;
  const recentOrders = orders?.slice(0, 5) || [];

  const kpis = [
    {
      label: 'Total Revenue',
      value: `$${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'blue',
      trend: '+12.5%',
      trendUp: true,
      description: 'Lifetime volume'
    },
    {
      label: 'Active Users',
      value: users?.length || '0',
      icon: Users,
      color: 'violet',
      trend: '+3.2%',
      trendUp: true, description: 'Registered accounts'
    },
    {
      label: 'Products',
      value: products?.length || '0',
      icon: Package,
      color: 'pink',
      trend: '+4.1%',
      trendUp: true, description: 'Active items'
    },
    {
      label: 'Messages',
      value: messages?.length || '0',
      icon: MessageSquare,
      color: 'orange',
      trend: '+5.7%',
      trendUp: true, description: 'Inquiries received'
    },
  ];

  return (
    <div className="flex-1 space-y-8 pb-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard Overview</h2>
          <p className="text-slate-500 mt-1">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl border-slate-200 hover:bg-slate-50">
            <Activity className="mr-2 h-4 w-4" />
            Audit Logs
          </Button>
          <Button className="rounded-xl shadow-lg shadow-primary/20">
            Download Report
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="relative overflow-hidden group hover:shadow-xl hover:shadow-slate-200 transition-all duration-300 border-slate-200/60 rounded-2xl">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold text-slate-500">{kpi.label}</CardTitle>
                <div className={`p-2 rounded-xl bg-${kpi.color}-50 text-${kpi.color}-500 group-hover:scale-110 transition-transform`}>
                  <kpi.icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900 tracking-tight">{kpi.value}</div>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`text-xs font-bold px-1.5 py-0.5 rounded-lg bg-emerald-50 text-emerald-600 flex items-center`}>
                    <ArrowUpRight className="h-3 w-3 mr-0.5" />
                    {kpi.trend}
                  </span>
                  <p className="text-xs text-slate-400 font-medium">{kpi.description}</p>
                </div>
              </CardContent>
              {/* Subtle background decoration */}
              <div className={`absolute -right-4 -bottom-4 h-24 w-24 rounded-full bg-${kpi.color}-500/5 group-hover:scale-150 transition-transform duration-500`} />
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Revenue Trend (Area Chart) */}
        <Card className="col-span-4 rounded-2xl border-slate-200/60 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-bold">Revenue Overview</CardTitle>
                <CardDescription>Monthly revenue trends with area highlights.</CardDescription>
              </div>
              <Badge variant="outline" className="rounded-lg text-xs font-semibold">Active</Badge>
            </div>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={revenueData}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="name"
                  stroke="#94a3b8"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tick={{ dy: 10 }}
                />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                  cursor={{ stroke: '#f1f5f9', strokeWidth: 2 }}
                  contentStyle={{
                    borderRadius: '16px',
                    border: '1px solid #f1f5f9',
                    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
                    padding: '12px'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="hsl(var(--primary))"
                  strokeWidth={4}
                  dot={{ r: 6, fill: "#fff", stroke: "hsl(var(--primary))", strokeWidth: 2 }}
                  activeDot={{ r: 8, strokeWidth: 0 }}
                  animationDuration={1500}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Traffic Distribution (Stylish Pie) */}
        <Card className="col-span-3 rounded-2xl border-slate-200/60 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Traffic Source</CardTitle>
            <CardDescription>Distribution across main channels.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={95}
                  paddingAngle={8}
                  dataKey="value"
                  animationDuration={1500}
                >
                  {distributionData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      className="hover:opacity-80 transition-opacity cursor-pointer"
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: '12px',
                    border: 'none',
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-6 space-y-3">
              {distributionData.map((entry, index) => (
                <div key={entry.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2.5">
                    <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                    <span className="font-medium text-slate-600">{entry.name}</span>
                  </div>
                  <span className="font-bold text-slate-900">{((entry.value / 1200) * 100).toFixed(0)}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders & Activity */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">

        {/* Recent Orders Table */}
        <Card className="col-span-4 lg:col-span-5 rounded-2xl border-slate-200/60 shadow-sm overflow-hidden">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-bold">Recent Orders</CardTitle>
                <CardDescription>Latest transactions from your store.</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
                  <Input placeholder="Search orders..." className="h-9 w-[150px] lg:w-[220px] pl-8 rounded-xl bg-white border-slate-200" />
                </div>
                <Button variant="ghost" size="sm" className="rounded-lg text-xs font-semibold hover:bg-white hover:shadow-sm transition-all">View All</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {recentOrders.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 mb-3">
                  <ShoppingCart size={24} />
                </div>
                <p className="text-slate-500 font-medium">No recent orders found.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50/30 hover:bg-slate-50/30 border-b border-slate-100">
                      <TableHead className="w-[120px] py-4 pl-6 text-xs uppercase tracking-wider font-bold text-slate-500">Order ID</TableHead>
                      <TableHead className="py-4 text-xs uppercase tracking-wider font-bold text-slate-500">Customer</TableHead>
                      <TableHead className="py-4 text-xs uppercase tracking-wider font-bold text-slate-500">Status</TableHead>
                      <TableHead className="text-right py-4 text-xs uppercase tracking-wider font-bold text-slate-500">Amount</TableHead>
                      <TableHead className="text-right py-4 pr-6 text-xs uppercase tracking-wider font-bold text-slate-500">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentOrders.map((order: any) => (
                      <TableRow key={order._id} className="group hover:bg-slate-50/50 transition-colors border-b border-slate-100/60">
                        <TableCell className="font-bold text-slate-900 py-4 pl-6">
                          <span className="text-slate-400 font-medium">#</span>{order._id.substring(0, 8).toUpperCase()}
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
                              {order.customerName?.charAt(0) || 'C'}
                            </div>
                            <span className="font-semibold text-slate-700">{order.customerName}</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          <Badge className={`
                             rounded-lg px-2.5 py-0.5 border-none font-bold text-[10px] uppercase tracking-wider
                             ${order.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}
                           `}>
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-bold text-slate-900 py-4">${order.totalAmount?.toLocaleString()}</TableCell>
                        <TableCell className="text-right py-4 pr-6">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0 rounded-lg hover:bg-white hover:shadow-sm">
                                <span className="sr-only">Open menu</span>
                                <MoreVertical className="h-4 w-4 text-slate-400" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="rounded-xl border-slate-200">
                              <DropdownMenuItem className="rounded-lg text-sm font-medium">View details</DropdownMenuItem>
                              <DropdownMenuItem className="rounded-lg text-sm font-medium">Update status</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity Feed */}
        <Card className="col-span-3 lg:col-span-2 rounded-2xl border-slate-200/60 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Activity Feed</CardTitle>
            <CardDescription>Latest system events.</CardDescription>
          </CardHeader>
          <CardContent className="px-6">
            <div className="relative space-y-6 before:absolute before:left-4 before:top-2 before:h-[calc(100%-16px)] before:w-0.5 before:bg-slate-100">
              {/* Activity Items */}
              {[
                { title: 'New Order Received', desc: 'Order #EG-7829', time: 'Just now', icon: ShoppingCart, color: 'blue' },
                { title: 'User Registered', desc: 'Sarah Johnson joined', time: '2h ago', icon: User, color: 'violet' },
                { title: 'System Updated', desc: 'Maintenance completed', time: '5h ago', icon: Activity, color: 'emerald' },
                { title: 'Message Received', desc: 'New inquiry from Peter', time: 'Yesterday', icon: MessageSquare, color: 'orange' },
              ].map((item, i) => (
                <div key={i} className="relative pl-10 group">
                  <div className={`absolute left-0 p-1.5 rounded-full bg-${item.color}-100 text-${item.color}-600 ring-4 ring-white z-10 group-hover:scale-110 transition-transform`}>
                    <item.icon size={16} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-slate-900 leading-none">{item.title}</p>
                    <p className="text-xs text-slate-500 font-medium">{item.desc}</p>
                    <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter mt-1">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-8 rounded-xl border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50">
              Clear All Activity
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
