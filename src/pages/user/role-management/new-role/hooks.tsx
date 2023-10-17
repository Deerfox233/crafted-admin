import { Form } from "@formily/core";
import { Button, StepProps, Steps } from "antd";
import { useState } from "react";

interface StepOptions {
  stepItems: StepProps[];
  stepFormComponents: React.ReactNode[];
  stepForms: React.MutableRefObject<Form>[];
  handleFinish?: () => void;
}

export const useStep = (
  options: StepOptions,
): {
  stepIndicator: React.ReactNode;
  currentStepForm: React.ReactNode;
  previousButton: React.ReactNode;
  nextButton: React.ReactNode;
} => {
  const [currentStep, setCurrentStep] = useState(0);
  const [result, setResult] = useState({});
  const { stepItems, stepFormComponents, stepForms, handleFinish } = options;

  const handlePrevious = () => {
    if (currentStep === 0) {
      return;
    }
    setResult((prev) => Object.assign(prev, { [currentStep]: null }));
    console.log("result", result);
    setCurrentStep((prev) => prev - 1);
  };

  const handleNext = async () => {
    if (currentStep === stepItems.length - 1) {
      handleFinish?.();
      return;
    }
    const formResult = await stepForms[currentStep].current?.submit();
    if (formResult == null) {
      return;
    }
    setResult((prev) => Object.assign(prev, { [currentStep]: formResult }));
    console.log("result", result);
    setCurrentStep((prev) => prev + 1);
  };

  return {
    stepIndicator: <Steps current={currentStep} items={stepItems} />,
    currentStepForm: stepFormComponents[currentStep],
    previousButton: (
      <Button type="default" onClick={handlePrevious}>
        {currentStep === 0 ? "取消" : "上一步"}
      </Button>
    ),
    nextButton: (
      <Button type="primary" onClick={void handleNext}>
        {currentStep === stepItems.length - 1 ? "确认提交" : "下一步"}
      </Button>
    ),
  };
};
