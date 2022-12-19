import React from 'react';
import PersonToManage from '../../personToManage';
import PersonToPayBack from '../../personToPayBack';
import PersonToPay from '../../personToPay';
import UserPayment from '../../../presenter/user-payment';

function PersonalPayment({ user, host, categoryTotal, equal }) {
	const presenter = new UserPayment(categoryTotal);

	const userTotal = presenter.userTotal(user);

	return (
		<li>
			{user.name === host ? '👑' : '🙂'}

			{user.name === host && (
				<PersonToManage username={user.name} cost={userTotal} />
			)}

			{user.name !== host && equal - userTotal > 0 && (
				<PersonToPay
					cost={equal - userTotal}
					username={user.name}
					host={host}
				/>
			)}

			{user.name !== host && equal - userTotal < 0 && (
				<PersonToPayBack
					username={user.name}
					host={host}
					toPayBack={userTotal - equal}
				/>
			)}
		</li>
	);
}
export default PersonalPayment;
