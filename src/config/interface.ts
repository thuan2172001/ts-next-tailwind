export enum Status {
  PENDING,
  SUCCESS,
  FAILED,
}

export type PopUpItemsProps = {
  name: string;
  description?: string;
  href?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (e: any) => void;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
};

export type CarouselItem = {
  src: string;
};

export type ProductProps = {
  imageSrc?: string;
  imageAlt?: string;
  id?: string | number;
  href?: string;
  name?: string;
  price?: number | string;
};

export enum ModalType {
  Alert,
  Success,
  Failed,
  ResetPasswordSuccess,
  MailOtp,
}
