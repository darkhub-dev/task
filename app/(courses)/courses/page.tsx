import React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { courses } from "@/constants/courses";

const Page = () => {
  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center gap-8 px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-6">Courses</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
        {courses.map((course) => (
          <Card key={course.id} className="hover:shadow-lg transition-all">
            <CardHeader>
              <CardTitle>{course.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {course.description}
              </p>
              <Link href={`/courses/course-details?id=${course.id}`}>
                <Button variant="default" className="w-full">
                  View Details
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Page;
