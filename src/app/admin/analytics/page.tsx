'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, ShoppingCart, MessageSquare, Package } from 'lucide-react';
import { useData } from '@/hooks/use-data';

export default function AdminAnalyticsPage() {
  const { data: users } = useData<any>('/api/users');
  const { data: products } = useData<any>('/api/products');
  const { data: orders } = useData<any>('/api/orders');
  const { data: messages } = useData<any>('/api/messages');

  const stats = [
    {
      title: 'Total Users',
      value: users?.length || 0,
      icon: Users,
      description: 'Registered accounts',
    },
    {
      title: 'Total Products',
      value: products?.length || 0,
      icon: Package,
      description: 'Active items in catalog',
    },
    {
      title: 'Total Orders',
      value: orders?.length || 0,
      icon: ShoppingCart,
      description: 'All time orders',
    },
    {
      title: 'Total Messages',
      value: messages?.length || 0,
      icon: MessageSquare,
      description: 'Inquiries received',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
