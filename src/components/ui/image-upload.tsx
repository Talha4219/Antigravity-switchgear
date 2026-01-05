
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Upload, X } from 'lucide-react';
import Image from 'next/image';

interface ImageUploadProps {
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
}

export function ImageUpload({ value, onChange, disabled }: ImageUploadProps) {
    const [loading, setLoading] = useState(false);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setLoading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) throw new Error('Upload failed');

            const data = await res.json();
            onChange(data.url); // Use the returned relative URL
        } catch (error) {
            console.error(error);
            alert('Failed to upload image');
        } finally {
            setLoading(false);
        }
    };

    const handleRemove = () => {
        onChange('');
    };

    return (
        <div className="space-y-4 w-full flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 hover:bg-muted/50 transition-colors">
            {value ? (
                <div className="relative w-full h-64 overflow-hidden rounded-md group">
                    <div className="absolute top-2 right-2 z-10">
                        <Button
                            type="button"
                            onClick={handleRemove}
                            variant="destructive"
                            size="icon"
                            disabled={disabled}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                    <Image
                        fill
                        className="object-contain"
                        alt="Upload"
                        src={value}
                    />
                </div>
            ) : (
                <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {loading ? (
                            <Loader2 className="h-10 w-10 text-muted-foreground animate-spin mb-4" />
                        ) : (
                            <Upload className="h-10 w-10 text-muted-foreground mb-4" />
                        )}
                        <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-muted-foreground">SVG, PNG, JPG or GIF</p>
                    </div>
                    <Input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        disabled={loading || disabled}
                        onChange={handleUpload}
                    />
                </label>
            )}
        </div>
    );
}
