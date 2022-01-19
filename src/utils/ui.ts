import { store } from 'reducer/store';

import { ModalType } from '@/config/interface';
import { addModal } from '@/reducer/modals.slice';
function alertDanger(
  title: string | React.ReactElement,
  msg: string | React.ReactElement
) {
  store.dispatch(addModal({ type: ModalType.Alert, title, msg }));
}
function alertSuccess(
  title: string | React.ReactElement,
  msg?: string | React.ReactElement
) {
  store.dispatch(addModal({ type: ModalType.Success, title, msg }));
}
function alertFailed(
  title: string | React.ReactElement,
  msg?: string | React.ReactElement
) {
  store.dispatch(addModal({ type: ModalType.Failed, title, msg }));
}
function alertResetPasswordSuccess(
  title: string | React.ReactElement,
  msg?: string | React.ReactElement
) {
  store.dispatch(
    addModal({ type: ModalType.ResetPasswordSuccess, title, msg })
  );
}
function alertMailOtp(
  title: string | React.ReactElement,
  msg: string | React.ReactElement,
  handleClick: () => void
) {
  store.dispatch(
    addModal({
      type: ModalType.MailOtp,
      title,
      msg,
      handleClick,
    })
  );
}
const ui = {
  alertDanger,
  alertSuccess,
  alertFailed,
  alertResetPasswordSuccess,
  alertMailOtp,
};
export default ui;
