import React from 'react';
import PersonToManage from '../../personToManage';
import PersonToPayBack from '../../personToPayBack';
import PersonToPay from '../../personToPay';

function PersonalPayment({ user, host }) {
	const { name, toPay, paid } = user;

	return (
		<li>
			{name === host ? '👑' : '🙂'}

			{name === host && <PersonToManage username={name} cost={paid - toPay} />}

			{name !== host && paid - toPay <= 0 && (
				<PersonToPay cost={paid - toPay} username={name} host={host} />
			)}

			{name !== host && paid - toPay > 0 && (
				<PersonToPayBack username={name} host={host} toPayBack={paid - toPay} />
			)}
		</li>
	);
}
export default PersonalPayment;
