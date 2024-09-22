"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  HeartIcon,
  MessageCircleIcon,
  RepeatIcon,
  ShareIcon,
} from "lucide-react";

export interface TweetProps {
  id: number;
  name: string;
  username: string;
  profileImage: string;
  content: string;
  timestamp: string;
  likes: number;
  retweets: number;
  replies: number;
}

export function CustomTweet({
  name = "",
  username = "",
  profileImage = "",
  content = "",
  timestamp = "",
  likes = 0,
  retweets = 0,
  replies = 0,
}: TweetProps) {
  const safeGetInitial = (str: string) =>
    str && typeof str === "string" ? str.charAt(0) : "?";

  return (
    <Card className="w-full max-w-xl">
      <CardHeader className="flex flex-row items-center gap-4 p-4">
        <Avatar className="w-12 h-12">
          <AvatarImage alt={name || "User"} src={profileImage} />
          <AvatarFallback>{safeGetInitial(name)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="font-semibold">{name || "Anonymous"}</p>
          <p className="text-sm text-gray-500">@{username || "user"}</p>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-base mb-2">{content || "No content"}</p>
        <p className="text-sm text-gray-500">{timestamp || "No timestamp"}</p>
      </CardContent>
      <CardFooter className="flex justify-between p-4 border-t">
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-500 hover:text-blue-500"
        >
          <MessageCircleIcon className="w-4 h-4 mr-2" />
          {replies}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-500 hover:text-green-500"
        >
          <RepeatIcon className="w-4 h-4 mr-2" />
          {retweets}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-500 hover:text-red-500"
        >
          <HeartIcon className="w-4 h-4 mr-2" />
          {likes}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-500 hover:text-blue-500"
        >
          <ShareIcon className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
