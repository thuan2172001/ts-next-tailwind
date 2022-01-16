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
const ui = { alertDanger, alertSuccess, alertFailed };
export default ui;
