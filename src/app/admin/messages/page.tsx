'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useData } from '@/hooks/use-data';
import { Mail, Calendar, User, Phone, Building, FileText, Send, UserCheck } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';

export default function AdminMessagesPage() {
  const { data: messages, loading } = useData<any>('/api/messages');

  const contactMessages = messages?.filter((m: any) => m.type === 'contact' || !m.type) || [];
  const quoteRequests = messages?.filter((m: any) => m.type === 'quote') || [];
  const newsletterSubs = messages?.filter((m: any) => m.type === 'newsletter') || [];

  const MessageList = ({ data, emptyMessage }: { data: any[], emptyMessage: string }) => (
    <div className="space-y-4">
      {data.length === 0 && <div className="text-center py-12 text-muted-foreground">{emptyMessage}</div>}
      {data.map((msg: any) => (
        <div key={msg.id || msg._id} className="border rounded-xl p-6 hover:bg-muted/30 transition-all border-border/50 group">
          <div className="flex justify-between items-start mb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 font-bold text-lg">
                <User className="h-4 w-4 text-primary" />
                {msg.name}
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5" />
                  {msg.email}
                </div>
                {msg.phone && (
                  <div className="flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5" />
                    {msg.phone}
                  </div>
                )}
                {msg.company && (
                  <div className="flex items-center gap-1.5">
                    <Building className="h-3.5 w-3.5" />
                    {msg.company}
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Badge variant="outline" className="bg-background/50 font-mono text-[10px]">
                <Calendar className="h-3 w-3 mr-1" />
                {new Date(msg.createdAt).toLocaleDateString()}
              </Badge>
              {msg.type && (
                <Badge className="capitalize text-[10px] h-5">
                  {msg.type}
                </Badge>
              )}
            </div>
          </div>

          {(msg.subject || msg.message) && (
            <div className="bg-card/50 border border-border/50 rounded-lg p-4 group-hover:border-primary/20 transition-colors">
              {msg.subject && <h4 className="text-sm font-bold mb-2 flex items-center gap-2">
                <FileText className="h-3.5 w-3.5 text-primary" />
                {msg.subject}
              </h4>}
              {msg.message && <p className="text-sm text-foreground/80 whitespace-pre-wrap leading-relaxed">{msg.message}</p>}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-headline font-bold">Message Center</h1>
          <p className="text-muted-foreground">Manage inquiries, quotes, and newsletter subscribers.</p>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full max-w-2xl grid-cols-4 h-12 bg-muted/50 p-1">
          <TabsTrigger value="all" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
            All leads <Badge variant="secondary" className="ml-2 h-5 min-w-[20px] px-1">{messages?.length || 0}</Badge>
          </TabsTrigger>
          <TabsTrigger value="contact">Contacts</TabsTrigger>
          <TabsTrigger value="quotes">Quotes</TabsTrigger>
          <TabsTrigger value="newsletter">Newsletter</TabsTrigger>
        </TabsList>

        <Card className="mt-6 border-none shadow-none bg-transparent">
          <CardContent className="p-0">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Send className="h-8 w-8 text-primary animate-pulse" />
                <p className="text-muted-foreground font-medium">Fetching messages...</p>
              </div>
            ) : (
              <>
                <TabsContent value="all" className="mt-0">
                  <MessageList data={messages || []} emptyMessage="No messages yet." />
                </TabsContent>
                <TabsContent value="contact" className="mt-0">
                  <MessageList data={contactMessages} emptyMessage="No contact inquiries found." />
                </TabsContent>
                <TabsContent value="quotes" className="mt-0">
                  <MessageList data={quoteRequests} emptyMessage="No quote requests received." />
                </TabsContent>
                <TabsContent value="newsletter" className="mt-0">
                  <MessageList data={newsletterSubs} emptyMessage="No newsletter subscribers yet." />
                </TabsContent>
              </>
            )}
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
}
