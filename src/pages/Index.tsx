import { QuoteForm } from "@/components/QuoteForm";

const Index = () => {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: "url('/images/brick-bg.jpg')",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
      }}
    >
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <QuoteForm />
      </div>
    </div>
  );
};

export default Index;
