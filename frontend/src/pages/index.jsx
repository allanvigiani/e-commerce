import { getCookie } from 'cookies-next';
import { validadeToken } from '../services/AuthService';

import Market from './market/index'

export default function Home() {

	return (
		<div>
			<Market />
		</div>
	)
}

export const getServerSideProps = async ({ req, res }) => {
	try {
		const token = getCookie('user_auth_information', (req, res));

		if (!token) {
			throw new Error('Token inválido!');
		}

		validadeToken(token);

		return {
			props: {}
		}

	} catch (error) {

		return {
			redirect: {
				permanent: false,
				destination: '/login'
			},
			props: {}
		}
	}
};