export enum Status {
  PENDING,
  SUCCESS,
  FAILED,
}

export type PopUpItemsProps = {
  name: string;
  description?: string;
  href: string;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
};
