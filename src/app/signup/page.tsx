'use client'

import { SignUp } from "@clerk/nextjs";
import { NavBar } from "@/components/ui/tubelight-navbar";

export default function SignUpPage() {
    return (
        <div className="min-h-screen bg-background">
            <NavBar />
            <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
                <SignUp
                    appearance={{
                        elements: {
                            formButtonPrimary:
                                'bg-primary text-primary-foreground hover:bg-primary/90',
                            card: 'bg-background border border-border',
                            headerTitle: 'text-foreground',
                            headerSubtitle: 'text-muted-foreground',
                            socialButtonsBlockButton:
                                'border border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground',
                            formFieldLabel: 'text-foreground',
                            formFieldInput:
                                'bg-background border border-border text-foreground',
                            footerActionLink: 'text-primary hover:text-primary/90',
                        },
                    }}
                />
            </div>
        </div>
    );
} 