"use client";

import React, { useState } from "react";
import courseData from "@/constants/courseDetails.json";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import {
  VideoPlayer,
  VideoPlayerContent,
  VideoPlayerControlBar,
  VideoPlayerFullScreenButton,
  VideoPlayerMuteButton,
  VideoPlayerPlayButton,
  VideoPlayerSeekBackwardButton,
  VideoPlayerSeekForwardButton,
  VideoPlayerTimeDisplay,
  VideoPlayerTimeRange,
  VideoPlayerVolumeRange,
  VideoPlayerWideButton,
} from "@/components/kibo-ui/video-player";
import { Textarea } from "@/components/ui/textarea";
import { Eye, LockKeyhole } from "lucide-react";
import { User, Clock, Users, Globe, LibraryBig } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


const iconsMap: Record<string, React.ElementType> = {
  User,
  Clock,
  LibraryBig,
  Users,
  Globe,
};

const CourseDetailsPage = () => {

  const [formData, setFormData] = useState({
    name: "Pedro Duarte",
    username: "@peduarte",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted:", formData);
  };

  const course = courseData;
  const [isWide, setIsWide] = useState(false);

  const toggleWide = () => {
    setIsWide((prev) => !prev);
  };

  return (
    <section className="w-full min-h-screen px-4 md:px-10 py-10 flex flex-col gap-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">{course.title}</h1>

      {/* ====== Video + Topics Section ====== */}
      <div
        className={`flex flex-col gap-10 transition-all duration-500 ${
          isWide ? "md:flex-col" : "md:flex-row"
        }`}
      >
        {/* 🎬 Video Section */}
        <div className={`transition-all duration-500`}>
          <VideoPlayer
            className={`overflow-hidden rounded-lg border transition-all duration-500 ${
              isWide ? "w-full " : "w-full"
            }`}
          >
            <VideoPlayerContent
              crossOrigin=""
              muted
              preload="auto"
              slot="media"
              src="https://stream.mux.com/DS00Spx1CV902MCtPj5WknGlR102V5HFkDe/high.mp4"
            />
            <VideoPlayerControlBar>
              <VideoPlayerPlayButton />
              <VideoPlayerSeekBackwardButton />
              <VideoPlayerSeekForwardButton />
              <VideoPlayerTimeRange />
              <VideoPlayerTimeDisplay showDuration />
              <VideoPlayerMuteButton />
              <VideoPlayerVolumeRange />
              <VideoPlayerWideButton
                isWide={isWide}
                onToggleWide={toggleWide}
              />
              <VideoPlayerFullScreenButton />
            </VideoPlayerControlBar>
          </VideoPlayer>

          {/* -------- Course Materials -------- */}
          <section className="flex flex-row-reverse gap-10 w-full">
            <div className={`${isWide ? "block max-xl:hidden" : "hidden"}`}>
              <Card>
                <CardHeader>
                  <CardTitle>Topics for This Course</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">Progress</p>
                  <Progress value={course.progress} className="mb-6" />

                  <div className="flex flex-col gap-6">
                    {course.topics.map((topic, i) => (
                      <div key={i} className="border-l-2 border-muted pl-4">
                        <h3 className="font-semibold">{topic.title}</h3>
                        <p className="text-xs text-muted-foreground mb-2">
                          {topic.description}
                        </p>
                        <ul className="space-y-1">
                          {topic.lessons.map((lesson, j) => (
                            <li
                              key={j}
                              className=" text-sm text-muted-foreground items-start border-b pb-1 w-full flex flex-row justify-between"
                            >
                              <span className="flex gap-2 items-start justify-between w-full">
                                {lesson.title}
                                {lesson.locked && <LockKeyhole size={14} />}
                              </span>
                              {lesson.time && (
                                <div className="flex flex-col gap-2 items-start justify-center">
                                  <span className="text-xs text-green-600 min-w-24">
                                    {lesson.time}
                                  </span>
                                  <Dialog>
                                    <form onSubmit={handleSubmit}>
                                      <DialogTrigger asChild>
                                        <Button
                                          variant="outline"
                                          className="text-xs"
                                        >
                                          2 questions
                                        </Button>
                                      </DialogTrigger>
                                      <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                          <DialogTitle>
                                            Edit profile
                                          </DialogTitle>
                                          <DialogDescription>
                                            Make changes to your profile here.
                                            Click save when you&apos;re done.
                                          </DialogDescription>
                                        </DialogHeader>

                                        <div className="grid gap-4">
                                          <div className="grid gap-3">
                                            <Label htmlFor="name">Name</Label>
                                            <Input
                                              id="name"
                                              name="name"
                                              value={formData.name}
                                              onChange={handleChange}
                                            />
                                          </div>

                                          <div className="grid gap-3">
                                            <Label htmlFor="username">
                                              Username
                                            </Label>
                                            <Input
                                              id="username"
                                              name="username"
                                              value={formData.username}
                                              onChange={handleChange}
                                            />
                                          </div>
                                        </div>

                                        <DialogFooter>
                                          <DialogClose asChild>
                                            <Button variant="outline">
                                              Cancel
                                            </Button>
                                          </DialogClose>
                                          <Button type="submit">
                                            Save changes
                                          </Button>
                                        </DialogFooter>
                                      </DialogContent>
                                    </form>
                                  </Dialog>
                                </div>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="flex-1 flex flex-col gap-10">
              <h2 className="text-2xl font-semibold mb-4">Course Materials</h2>
              <Card className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {course.materials.map((item, i) => {
                    const Icon = iconsMap[item.icon as keyof typeof iconsMap];

                    return (
                      <div key={i} className="flex items-center gap-3">
                        {Icon && <Icon className="text-xl text-primary" />}
                        <p className="text-sm">
                          <strong>{item.label}:</strong> {item.value}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </Card>

              <div className="flex flex-col gap-6 max-xl:flex-row-reverse max-md:flex-col">
                <Card className="xl:hidden block max-lg:min-w-2xs">
                  <CardHeader>
                    <CardTitle>Topics for This Course</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      Progress
                    </p>
                    <Progress value={course.progress} className="mb-6" />

                    <div className="flex flex-col gap-6">
                      {course.topics.map((topic, i) => (
                        <div key={i} className="border-l-2 border-muted pl-4">
                          <h3 className="font-semibold">{topic.title}</h3>
                          <p className="text-xs text-muted-foreground mb-2">
                            {topic.description}
                          </p>
                          <ul className="space-y-1">
                            {topic.lessons.map((lesson, j) => (
                              <li
                                key={j}
                                className=" text-sm text-muted-foreground items-start border-b pb-1 w-full flex flex-row justify-between"
                              >
                                <span className="flex gap-2 items-start justify-between w-full">
                                  {lesson.title}
                                  {lesson.locked && <LockKeyhole size={14} />}
                                </span>
                                {lesson.time && (
                                  <div className="flex flex-col gap-2 items-start justify-center">
                                    <span className="text-xs text-green-600 min-w-24">
                                      {lesson.time}
                                    </span>
                                    <Dialog>
                                      <form onSubmit={handleSubmit}>
                                        <DialogTrigger asChild>
                                          <Button
                                            variant="outline"
                                            className="text-xs"
                                          >
                                            2 questions
                                          </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px]">
                                          <DialogHeader>
                                            <DialogTitle>
                                              Edit profile
                                            </DialogTitle>
                                            <DialogDescription>
                                              Make changes to your profile here.
                                              Click save when you&apos;re done.
                                            </DialogDescription>
                                          </DialogHeader>

                                          <div className="grid gap-4">
                                            <div className="grid gap-3">
                                              <Label htmlFor="name">Name</Label>
                                              <Input
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                              />
                                            </div>

                                            <div className="grid gap-3">
                                              <Label htmlFor="username">
                                                Username
                                              </Label>
                                              <Input
                                                id="username"
                                                name="username"
                                                value={formData.username}
                                                onChange={handleChange}
                                              />
                                            </div>
                                          </div>

                                          <DialogFooter>
                                            <DialogClose asChild>
                                              <Button variant="outline">
                                                Cancel
                                              </Button>
                                            </DialogClose>
                                            <Button type="submit">
                                              Save changes
                                            </Button>
                                          </DialogFooter>
                                        </DialogContent>
                                      </form>
                                    </Dialog>
                                  </div>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* -------- Comments -------- */}
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Comments</h2>
                  <div className="flex flex-col gap-6">
                    {course.comments.map((comment, i) => (
                      <div key={i} className="flex gap-4">
                        <Image
                          src={comment.avatar}
                          alt={comment.name}
                          width={50}
                          height={50}
                          className="rounded-full w-16 h-16 object-cover"
                        />
                        <div>
                          <p className="font-semibold">{comment.name}</p>
                          <p className="text-xs text-muted-foreground mb-1">
                            {comment.date}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {comment.comment}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add Comment Form */}
                  <div className="mt-8">
                    <Textarea
                      className="w-full border rounded-lg p-3 min-h-[120px] focus:outline-none focus:ring focus:ring-primary/20"
                      placeholder="Write a comment..."
                    ></Textarea>
                    <Button className="mt-4 cursor-pointer">
                      Submit Review →
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Topics (Right Sidebar OR Below) */}
        <aside
          className={`transition-all duration-500${
            isWide ? "w-full hidden" : "w-full md:w-2xl"
          }`}
        >
          <Card>
            <CardHeader>
              <CardTitle>Topics for This Course</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">Progress</p>
              <Progress value={course.progress} className="mb-6" />

              <div className="flex flex-col gap-6">
                {course.topics.map((topic, i) => (
                  <div key={i} className="border-l-2 border-muted pl-4">
                    <h3 className="font-semibold">{topic.title}</h3>
                    <p className="text-xs text-muted-foreground mb-2">
                      {topic.description}
                    </p>
                    <ul className="space-y-1">
                      {topic.lessons.map((lesson, j) => (
                        <li
                          key={j}
                          className=" text-sm text-muted-foreground items-start border-b pb-1 w-full flex flex-row justify-between"
                        >
                          <span className="flex gap-2 items-start justify-between w-full">
                            {lesson.title}
                            {lesson.locked && <LockKeyhole size={14} />}
                          </span>
                          {lesson.time && (
                            <div className="flex flex-col gap-2 items-start justify-center">
                              <span className="text-xs text-green-600 min-w-24">
                                {lesson.time}
                              </span>
                              <Dialog>
                                <form onSubmit={handleSubmit}>
                                  <DialogTrigger asChild>
                                    <Button
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      2 questions
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                      <DialogTitle>Edit profile</DialogTitle>
                                      <DialogDescription>
                                        Make changes to your profile here. Click
                                        save when you&apos;re done.
                                      </DialogDescription>
                                    </DialogHeader>

                                    <div className="grid gap-4">
                                      <div className="grid gap-3">
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                          id="name"
                                          name="name"
                                          value={formData.name}
                                          onChange={handleChange}
                                        />
                                      </div>

                                      <div className="grid gap-3">
                                        <Label htmlFor="username">
                                          Username
                                        </Label>
                                        <Input
                                          id="username"
                                          name="username"
                                          value={formData.username}
                                          onChange={handleChange}
                                        />
                                      </div>
                                    </div>

                                    <DialogFooter>
                                      <DialogClose asChild>
                                        <Button variant="outline">
                                          Cancel
                                        </Button>
                                      </DialogClose>
                                      <Button type="submit">
                                        Save changes
                                      </Button>
                                    </DialogFooter>
                                  </DialogContent>
                                </form>
                              </Dialog>
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </section>
  );
};

export default CourseDetailsPage;
