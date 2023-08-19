import Button from '~/components/common/Button';
import ImageFill from '~/components/common/ImageFill';
import {PropsNoti} from './interfaces';
import backgrounds from '~/constants/images/backgrounds';
import styles from './Noti.module.scss';

function Noti({
	disableButton,
	img = backgrounds.empty,
	title = 'Không có dự án',
	des = 'Hiện tại công ty bạn chưa có dự án nào. Tạo ngay dự án dưới đây.',
	titleButton = ' Tạo ngay',
	onClick = () => {},
}: PropsNoti) {
	return (
		<div className={styles.container}>
			<div className={styles.img}>
				<ImageFill className={styles.icon} src={img} />
			</div>
			<h3>{title}</h3>
			<p>{des}</p>
			{!disableButton ? (
				<div className={styles.btn}>
					<Button primary bold rounded_8 onClick={onClick}>
						{titleButton}
					</Button>
				</div>
			) : null}
		</div>
	);
}

export default Noti;
