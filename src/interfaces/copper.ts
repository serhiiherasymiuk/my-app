export interface ICropperModal {
  onChange: (field: string, value: File) => void;
  field: string;
  value?: File | null;
  error?: string;
  touched?: boolean;
  aspectRatio?: number;
}
