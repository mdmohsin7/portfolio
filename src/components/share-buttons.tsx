"use client";

import { Check, Copy, Linkedin, Share2, Twitter } from "lucide-react";
import { useEffect, useState } from "react";

interface ShareButtonsProps {
    url: string;
    title: string;
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
    const [copied, setCopied] = useState(false);
    const [canNativeShare, setCanNativeShare] = useState(false);

    useEffect(() => {
        if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
            setCanNativeShare(true);
        }
    }, []);

    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    const shareLinks = {
        twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    };

    const nativeShare = async () => {
        try {
            await navigator.share({ title, url });
        } catch (err) {
            // Ignore user-cancelled shares; log everything else.
            if ((err as Error).name !== "AbortError") {
                console.error("Native share failed:", err);
            }
        }
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    return (
        <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Share:</span>
            {canNativeShare && (
                <button
                    onClick={nativeShare}
                    className="p-2 rounded-md hover:bg-muted transition-colors"
                    title="Share via..."
                    aria-label="Share via system share sheet"
                >
                    <Share2 className="size-4" />
                </button>
            )}
            <a
                href={shareLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md hover:bg-muted transition-colors"
                title="Share on X (Twitter)"
            >
                <Twitter className="size-4" />
            </a>
            <a
                href={shareLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md hover:bg-muted transition-colors"
                title="Share on LinkedIn"
            >
                <Linkedin className="size-4" />
            </a>
            <button
                onClick={copyToClipboard}
                className="p-2 rounded-md hover:bg-muted transition-colors"
                title="Copy link"
            >
                {copied ? (
                    <Check className="size-4 text-green-500" />
                ) : (
                    <Copy className="size-4" />
                )}
            </button>
        </div>
    );
}
