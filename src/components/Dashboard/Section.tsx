import { useState } from "react"; // 

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";
import AvailableWallpaper from "./AvailableWallpaper";
import axios from "axios";
import { useLoadingStore } from "@/store";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";

interface SectionProps {
    heading: string;
    wallpapers: [{
        wallpaperId: string,
        githubUsername: string,
        bentoLink: string,
        backgroundImageLink: string,
    }] | undefined;
}

const Section = (props: SectionProps) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [open, setOpen] = useState(false);
    const { isLoading, setLoading } = useLoadingStore()
    const { user } = useUser()
    const userId = user?.id

    const handleSubmit = async () => {
        try {
            setLoading(true)
            const formData = new FormData()
            formData.append("username", username)
            formData.append("password", password)
            await axios.post("/api/v1/extension/handleExtensionAuth",
                { username, password, userId },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
            toast.success("Username Password Saved!")
            setOpen(false);
            //eslint-disable-next-line
        } catch (error: any) {
            if (error.response) {
                const errorMessage = error.response.data?.error || error.response.data?.message || 'An error occurred';
                toast.error(errorMessage);
            }
            else if (error.message) {
                toast.error(error.message);
            }
            else {
                toast.error('An unexpected error occurred');
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full h-full flex flex-col">
            <h1 className="font-semibold text-3xl relative mb-2 flex items-center gap-2">
                {props.heading}
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline" onClick={() => setOpen(true)}>Set Username and Password</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Set Username and Password</DialogTitle>
                            <DialogDescription>
                                {`Set a username and password for other platform logins.`}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="username" className="text-right">
                                    Username
                                </Label>
                                <Input
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="password" className="text-right">
                                    Password
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="col-span-3"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button disabled={isLoading} type="button" onClick={handleSubmit}>
                                Save changes
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </h1>

            <AvailableWallpaper platform={props.heading} wallpapers={props.wallpapers} />
        </div>
    )
}

export default Section;
