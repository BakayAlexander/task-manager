import React, { useEffect } from 'react';
import './Popup.css';

function Popup({ isOpen, onClose, children }) {
	useEffect(() => {
		if (!isOpen) return;
		function closeByEscape(e) {
			if (e.key === 'Escape') {
				onClose();
			}
		}
		document.addEventListener('keydown', closeByEscape);
		return () => document.removeEventListener('keydown', closeByEscape);
	}, [isOpen, onClose]);

	function handleOverlay(e) {
		if (e.target === e.currentTarget) {
			onClose();
		}
	}

	return (
		<div onClick={handleOverlay} className={`popup ${isOpen ? 'popup_is-opened' : ''}`}>
			<div className='popup__container'>
				{children} <button className='popup__button-close' type='button' onClick={onClose}></button>
			</div>
		</div>
	);
}

export default Popup;
