import ThemeToggle from "@/components/ThemeToggle";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-6 px-4 text-center">
      <ThemeToggle />
      <h1 className="text-5xl font-bold text-primary">PeoplePulse</h1>
      <p className="opacity-80">Organise and join social service events in your neighbourhood.</p>
      <div className="flex gap-3">
        <button className="btn btn-primary">Primary</button>
        <button className="btn btn-secondary">Secondary</button>
        <button className="btn btn-accent">Accent</button>
      </div>
    </main>
  );
}