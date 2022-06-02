import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTasksAction } from '../../store/reducerFunctions';
import { allTaskCountSelector, tokenSelector } from '../../store/selectors';
import sortArrow from '../../images/sort-arrow.svg';
import './SortPanel.css';

function SortPanel() {
	const dispatch = useDispatch();
	const [sortedField, setSortedField] = useState('id');
	const [sortedDirection, setSortedDirection] = useState('asc');
	const [pageNumber, setPageNumber] = useState(1);
	const allTaskCount = useSelector(allTaskCountSelector);
	const token = useSelector(tokenSelector);

	let countedPages;
	let pagesArray = [];

	function handleChangeSortSettings(field) {
		if (sortedField !== field) {
			setSortedField(field);
			setSortedDirection('asc');
		} else if (sortedField === field && sortedDirection === 'asc') {
			setSortedDirection('desc');
		} else if (sortedField === field && sortedDirection === 'desc') {
			setSortedDirection('asc');
		}
	}

	if (allTaskCount) {
		countedPages = Math.ceil(allTaskCount / 3);
		for (let i = 1; i <= countedPages; i++) pagesArray.push(i);
	}

	useEffect(() => {
		dispatch(getAllTasksAction(sortedField, sortedDirection, pageNumber));
	}, [sortedField, token, sortedDirection, pageNumber, dispatch]);

	return (
		<div className='sort-panel__container'>
			<div className='sort-panel__pages-container'>
				<p className='sort-panel__pages-title'>Pages: </p>
				{pagesArray.map((number) => (
					<button
						key={number}
						className={`sort-panel__page-button ${pageNumber === number && 'sort-panel__page-button_active'}`}
						onClick={() => setPageNumber(number)}
					>
						{number}
					</button>
				))}
			</div>
			<div className='sort-panel__sort-container'>
				<span className='sort-panel__sort-title'>Sort by:</span>
				<button
					className={`sort-panel__sort-button ${sortedField === 'id' && 'sort-panel__sort-button_active'}`}
					onClick={() => handleChangeSortSettings('id')}
				>
					Number
					{sortedField === 'id' && <img src={sortArrow} className='sort-panel__sort-arrow' alt='Change sort' />}
				</button>
				<button
					className={`sort-panel__sort-button ${sortedField === 'username' && 'sort-panel__sort-button_active'}`}
					onClick={() => handleChangeSortSettings('username')}
				>
					Author
					{sortedField === 'username' && <img src={sortArrow} className='sort-panel__sort-arrow' alt='Change sort' />}
				</button>
				<button
					className={`sort-panel__sort-button ${sortedField === 'email' && 'sort-panel__sort-button_active'}`}
					onClick={() => handleChangeSortSettings('email')}
				>
					Email
					{sortedField === 'email' && <img src={sortArrow} className='sort-panel__sort-arrow' alt='Change sort' />}
				</button>
				<button
					className={`sort-panel__sort-button ${sortedField === 'status' && 'sort-panel__sort-button_active'}`}
					onClick={() => handleChangeSortSettings('status')}
				>
					Status
					{sortedField === 'status' && <img src={sortArrow} className='sort-panel__sort-arrow' alt='Change sort' />}
				</button>
			</div>
		</div>
	);
}

export default React.memo(SortPanel);
