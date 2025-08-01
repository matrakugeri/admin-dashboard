export interface TableColumns {
  field: string;
  header: string;
  type: string;
  options?: SelectFieldOptions[];
  sortable?: boolean;
}

interface SelectFieldOptions {
  label: string;
  value: string | boolean;
}
