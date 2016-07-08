import React from 'react';

import ImProp from 'react-immutable-proptypes';
import compose from 'recompose/compose';
// import withHandlers from 'recompose/withHandlers';
import setPropTypes from 'recompose/setPropTypes';
import classnames from 'classnames';
import pure from 'recompose/pure';
import withHandlers from 'recompose/withHandlers';
import {Card, CardTitle, CardActions} from 'react-toolbox/lib/card';
import {IconButton} from 'react-toolbox/lib/button';
import subTitle from '../helpers/subTitle';
import styles from './post.scss';

const propTypes = {
	post: ImProp.map.isRequired,
	uid: React.PropTypes.string,
	onDelete: React.PropTypes.func.isRequired,
	className: React.PropTypes.string
};

const hoc = compose(
	setPropTypes(propTypes),
	withHandlers({
		onDelete: ({onDelete, post}) => () => onDelete && onDelete(post.get('id'))
	}),
	pure);

const Full = ({post, uid, className, onDelete}) => {
	const classes = classnames(className, styles.post);
	const canDelete = uid && post.get('uid') === uid;
	return (
		<Card className={classes}>
			<div className={styles.headRow}>
				<CardTitle title={post.get('title')} subtitle={subTitle(post)} classes={styles.title}/>
				<CardActions className={styles.actions}>
					{canDelete
						? <IconButton icon="delete_forever" label="Delete" flat title="delete" onClick={onDelete}/>
						: null}
				</CardActions>
			</div>

			<div className={styles.content}>
				{post.get('content')}
			</div>
		</Card>
	);
};

Full.propTypes = propTypes;

export {Full};
export default hoc(Full);
