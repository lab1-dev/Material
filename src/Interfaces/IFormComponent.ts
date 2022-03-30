
export interface IFormComponent {
    required: boolean;
    error: boolean;
    hasErrors: boolean;
    touched: boolean;
    validationErrors: Array<string>;
    validate() : Promise<void>;
    reset() : void;
    resetValidation() : void;
}
