import { useState } from "react";
import { SuccessScreen } from "./components/ui/SuccessScreen";
import { Header } from "./components/layout/Header";
import HeroSection from "./components/sections/HeroSection";
import FormSection from "./components/sections/FormSection";
import { DoctorsSection } from "./components/doctors/DoctorsSection";
import InfoBanner from "./components/sections/InfoBanner";
import { SubmissionResult } from "./types/form";

function App() {
  const [submission, setSubmission] = useState<SubmissionResult | null>(null);

  if (submission) {
    return (
      <SuccessScreen
        regNumber={submission.regNumber}
        formData={submission.formData}
        onReset={() => setSubmission(null)}
      />
    );
  }

  return (
    <div id="top" className="min-h-screen bg-[var(--color-army-black)]">
      <a href="#main-content" className="skip-link">Перейти до основного вмісту</a>
      <Header />
      <main id="main-content">
        <HeroSection />
        <InfoBanner />
        <FormSection onSubmitSuccess={(regNumber, formData) => setSubmission({ regNumber, formData })} />
        <DoctorsSection />
      </main>
      <footer />
    </div>
  );
}

export default App;
