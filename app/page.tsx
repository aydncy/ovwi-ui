export default function Home() {
  return (
    <div className="text-center space-y-6">

      <h1 className="text-4xl font-bold">
        OVWI API Infrastructure
      </h1>

      <p className="text-gray-400 max-w-xl mx-auto">
        Production-ready API with usage tracking, scaling, and real limits.
      </p>

      <div className="flex gap-4 justify-center mt-6">
        <a href="/auth/signup" className="btn btn-primary">
          Get Started
        </a>

        <a href="/docs" className="btn border border-gray-600">
          Documentation
        </a>
      </div>

    </div>
  );
}
