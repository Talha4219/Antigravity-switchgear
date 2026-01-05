'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useData } from '@/hooks/use-data';
import Link from 'next/link';
import { Product } from '@/models/Product'; // or define locally if strictly needed on client

interface ApiResponse {
  success: boolean;
  data: Product[];
}

export default function AdminProductsPage() {
  const { data: response, loading } = useData<ApiResponse>('/api/products');
  const products = response?.data || [];

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Products</CardTitle>
            <CardDescription>Manage your product catalog.</CardDescription>
          </div>
          <Button size="sm" className="gap-1" asChild>
            <Link href="/admin/product/new">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                New Product
              </span>
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Specs</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading && <TableRow><TableCell colSpan={4} className="text-center">Loading...</TableCell></TableRow>}
              {!loading && products.length === 0 && <TableRow><TableCell colSpan={4} className="text-center">No products found.</TableCell></TableRow>}
              {products.map((product: any) => (
                <TableRow key={product._id}>
                  <TableCell className="font-medium">{product.title || product.name}</TableCell>
                  <TableCell className="truncate max-w-[200px]">
                    {product.specs}
                  </TableCell>
                  <TableCell>
                    {product.category}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
