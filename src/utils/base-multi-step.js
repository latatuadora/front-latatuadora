export class BaseMultiStep {
  constructor() {
    this.backButtonActive = false;
    this.completeButtonActive = false;
    this.nextButtonActive = true;

    this.currentViewModelPath;
    this.currentStep = 1;
    this.totalSteps = 0;

    this.composeRef;
    this.model = {};
  }

  bind() {
    if (!this.cancel) {
      throw new Error(`bindable property 'cancel' must be defined on ${this.constructor.name} class.`);
    }
    if (!this.complete) {
      throw new Error(`bindable property 'complete' must be defined on ${this.constructor.name} class.`);
    }
    if (!this.viewModels) {
      throw new Error(`bindable property 'viewModels' must be defined on ${this.constructor.name} class.`);
    }
    this.totalSteps = this.viewModels.length;
    this.update();
  }

  back() {
    this.currentStep--;
    this.update();
  }

  next() {
    if (!this.isValidView()) return;
    this.currentStep++;
    this.update();
  }

  complete() {
    if (!this.isValidView()) return false;
  }

  update() {
    this.setButtons();
    this.setViewModel();
    window.scrollTo(0, 0);
  }

  setViewModel() {
    this.currentViewModelPath = this.viewModels[this.currentStep - 1];
  }

  setButtons() {
    this.backButtonActive = this.currentStep > 1;
    this.nextButtonActive = this.currentStep < this.totalSteps;
    this.completeButtonActive = this.currentStep === this.totalSteps;
  }

  isValidView() {
    if (!this.composeRef.currentViewModel.isValid) {
      throw new Error(`${this.composeRef.viewModel} must implement an isValid method returning a boolean`);
    }
    return this.composeRef.currentViewModel.isValid();
  }
}