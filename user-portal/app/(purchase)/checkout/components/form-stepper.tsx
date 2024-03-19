type TFormStepper = {
  currentStep?: number;
  steps: { name: string }[];
};

function FormStepper({ currentStep = 0, steps }: TFormStepper) {
  console.log({ currentStep });

  return (
    <nav aria-label="Progress">
      <ol
        role="list"
        className="flex w-full items-center justify-center gap-x-4"
      >
        {steps.map((step, index) => (
          <li key={step.name} className="flex-1">
            {currentStep > index ? (
              <div className="duration flex w-full flex-col items-center border-t-4 border-sky-600 px-4 pt-2 transition-colors">
                <span className="text-sm font-medium">{step.name}</span>
              </div>
            ) : currentStep === index ? (
              <div
                className="flex w-full grow flex-col items-center border-t-4 border-sky-600 px-4 pt-2 transition-colors"
                aria-current="step"
              >
                <span className="text-sm font-medium">{step.name}</span>
              </div>
            ) : (
              <div className="flex w-full grow flex-col items-center border-t-4 border-gray-200 px-4 pt-2 transition-colors">
                <span className="text-sm font-medium">{step.name}</span>
              </div>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default FormStepper;
