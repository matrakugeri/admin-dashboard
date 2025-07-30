export interface TableColumns {
  field: string;
  header: string;
  type: string;
  options?: SelectFieldOptions[];
}

interface SelectFieldOptions {
  label: string;
  value: string | boolean;
}
