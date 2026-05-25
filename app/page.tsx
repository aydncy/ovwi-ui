import Navbar from "@/components/layout/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto pt-32 px-4">
        <Card>
          <h1 className="text-5xl font-bold">
            SaaS Infrastructure v2
          </h1>

          <p className="text-gray-400 mt-4">
            Auth • Billing • API Keys • Usage Tracking
          </p>

          <div className="mt-6">
            <Button>Start Free</Button>
          </div>
        </Card>
      </div>
    </>
  );
}
