import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = () => {
  return (
    <section className="w-full min-h-screen flex flex-col justify-center items-center text-center gap-6 px-4">
      <h1 className="text-4xl font-bold">
        Welcome Mr. <span className="text-blue-600">Ali Shahin</span>
      </h1>
      <p className="text-lg text-muted-foreground max-w-xl">
        I&apos;m really excited for this opportunity, and I&apos;ve prepared
        this page as a warm welcome and a quick access to the course details you
        requested.
      </p>

      <Link href="/courses/course-details">
        <Button size="lg" className="mt-4">
          Go to Course Details
        </Button>
      </Link>
    </section>
  );
};

export default Page;
