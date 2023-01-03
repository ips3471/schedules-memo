import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { uploadImage } from '../../api/uploader';
import { updateImage } from '../../services/database';
import FormContainer from './form/container';

function PictureViewer({ updatePictureCallback, target }) {
	const inputRef = useRef();
	const [isloading, setIsLoading] = useState(false);

	const { where, url } = target;

	const onInputClick = () => {
		inputRef.current.click();
	};

	const onChangeCapture = async e => {
		const picture = e.target.files && e.target.files[0];
		setIsLoading(true);
		const url = await uploadImage(picture);
		updateImage(target, url);
		setIsLoading(false);

		updatePictureCallback({ ...target, url });
	};

	return (
		<div className=''>
			<FormContainer
				formTitle={where + ' 영수증'}
				submitName={url ? '영수증 변경' : '영수증 등록'}
				cancelName='닫기'
				onCancelCallback={() => updatePictureCallback(null)}
				onSubmitCallback={onInputClick}
			>
				<div className='max-h-96 overflow-y-auto'>
					{!url && (
						<span className='py-4 px-2 inline-block'>
							{isloading && (
								<>
									<span>사진을 업로드중입니다 </span>
									<span className='inline-block animate-spin h-5 w-5'>🕳</span>
								</>
							)}
							{!isloading && (
								<>
									<span>아직 업로드된 영수증이 없습니다</span>
								</>
							)}
						</span>
					)}
					{url && <img src={url} alt='영수증사진' />}
				</div>
			</FormContainer>
			<div>
				<input
					ref={inputRef}
					className='hidden'
					type='file'
					accept='image/*'
					onChangeCapture={onChangeCapture}
				/>
			</div>
		</div>
	);
}

export default PictureViewer;
