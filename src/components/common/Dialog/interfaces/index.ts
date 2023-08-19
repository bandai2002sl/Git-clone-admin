export interface PropsDialog {
  open: boolean;
  title: string;
  note?: string;
  onClose: () => any;
  onSubmit: () => any;
  [props: string]: any;
}
