import { RatingProps } from './Rating.props';
import styles from './Rating.module.css';
import cn from 'classnames';
import { useEffect, useState } from 'react';
import StarIcon from './star.svg';

export const Rating = ({isEditable = false, rating, setRating, ...props}: RatingProps): JSX.Element => {
	
	const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));

	useEffect(() => {
		constructRating(rating);
	}, [rating]);

		/* В качестве параметра мы не передём Пропс rating потому что хотим сделать для данной функции возможность 
		получать значение рейтинга 2 способами: через Пропс и при изменении Hover */
	const constructRating = (currentRating: number) => {
		const updatedArray = ratingArray.map((r: JSX.Element, i: number) => {
			return (
				<StarIcon 
					className={cn(styles.star, {
						[styles.filled]: i < currentRating
					})}
				/>
			);
		});
		setRatingArray(updatedArray);
	};

	return (
		<div {...props}>
			{ratingArray.map((r, i) => (<span key={i}>{r}</span>))}
		</div>
	);
};
