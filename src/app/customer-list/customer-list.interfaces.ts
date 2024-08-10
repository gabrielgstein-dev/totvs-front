export interface TableColumn {
  property: string;
  label: string;
  type?:
    | 'string'
    | 'number'
    | 'date'
    | 'time'
    | 'currency'
    | 'boolean'
    | 'function';
  function?: (value: any) => string;
}
