import Button from '../Button';
import Popup from '~/components/common/Popup';
import {PropsDialog} from './interfaces';
import {RiErrorWarningFill} from 'react-icons/ri';
import clsx from 'clsx';
import styles from './Dialog.module.scss';

function Dialog({
	titleSubmit = 'Xác nhận',
	titleCancel = 'Hủy bỏ',
	...props
}: PropsDialog) {
	return (
		<Popup open={props.open} onClose={props.onClose}>
			<div className={clsx('effectZoom', styles.popup)}>
				<div className={styles.iconWarn}>
					<RiErrorWarningFill />
				</div>
				<h4 className={styles.titlePopup}>{props.title}</h4>
				<p className={styles.note}>{props?.note}</p>
				<div className={styles.groupBtnPopup}>
					<Button
						className='click'
						grey
						rounded_8
						bold
						onClick={props.onClose}
					>
						{titleCancel}
					</Button>
					<Button
						className='click'
						primary
						bold
						rounded_8
						onClick={props.onSubmit}
						{...props}
					>
						{titleSubmit}
					</Button>
				</div>
			</div>
		</Popup>
	);
}

export default Dialog;
