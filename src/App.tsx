import { DigitalEcosystemAnimation } from './components/DigitalEcosystemAnimation/DigitalEcosystemAnimation';
import { WorkflowAutomationAnimation } from './components/WorkflowAutomationAnimation/WorkflowAutomationAnimation';

function App() {
  return (
    <div className="min-h-screen w-full flex items-center p-8 md:p-16 bg-[#0B0C10] relative overflow-x-auto snap-x snap-mandatory font-sans">
      {/* Intense background glow behind the cards */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-flownex-pink/10 blur-[120px] rounded-full pointer-events-none opacity-50"></div>
      
      <div className="flex flex-row gap-12 w-max mx-auto px-4">
        
        {/* === CARD 1: DIGITAL ECOSYSTEM === */}
        <div className="flex flex-col gap-5 relative group w-[85vw] sm:w-[540px] lg:w-[620px] snap-center shrink-0">
          <div className="
            w-full aspect-[4/3] sm:aspect-[16/11] 
            rounded-2xl bg-[#150b13]
            border border-white/10 group-hover:border-flownex-pink/40 
            transition-colors duration-500 relative overflow-hidden shrink-0
            shadow-2xl
          ">
            <div className="absolute inset-0">
              <DigitalEcosystemAnimation autoplay loop />
            </div>
          </div>
          <div className="flex flex-col mt-1 px-1">
            <h3 className="text-[17px] font-medium text-[#f3f3f3] mb-0.5 tracking-tight">
              Digital Ecosystem Implementation
            </h3>
            <p className="text-[14px] text-white/40 tracking-wide font-light">
              Bring essential digital tools into one connected workspace.
            </p>
          </div>
        </div>

        {/* === CARD 2: WORKFLOW AUTOMATION === */}
        <div className="flex flex-col gap-5 relative group w-[85vw] sm:w-[540px] lg:w-[620px] snap-center shrink-0">
          <div className="
            w-full aspect-[4/3] sm:aspect-[16/11] 
            rounded-2xl bg-[#150b13]
            border border-white/10 group-hover:border-flownex-pink/40 
            transition-colors duration-500 relative overflow-hidden shrink-0
            shadow-2xl
          ">
            <div className="absolute inset-0">
              <WorkflowAutomationAnimation autoplay />
            </div>
          </div>
          <div className="flex flex-col mt-1 px-1">
            <h3 className="text-[17px] font-medium text-[#f3f3f3] mb-0.5 tracking-tight">
              Workflow Automation
            </h3>
            <p className="text-[14px] text-white/40 tracking-wide font-light">
              One tap runs approvals, alerts, reports, and infinity engines.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
