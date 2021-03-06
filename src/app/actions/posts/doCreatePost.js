import { auth, database } from '../../services/firebase';
import { toString } from '../../services/dates';
/**
 * Action to Create new post.
	* Will use currentUser as post author.
	* Will throw error if use is not authorized.
 * @param title - post title
	* @param content - post content
 */
const doCreatePost = (title, content) =>
	(dispatch, getState) => {
		const state = getState();
		const isAuthentificated = state.getIn(['auth', 'isAuthentificated']);
		if (!isAuthentificated) {
			throw new Error('can not create post for not authentificated user');
		}

		const uid = auth().currentUser.uid;
		const displayName = auth().currentUser.displayName;
		const ref = database().ref().child('posts');
		const id = ref.push().key;

		const postData = {
			username: displayName,
			uid,
			title,
			content,
			id,
			datetime: toString(new Date())
		};

		return ref.update({
			[id]: postData
		});
	};

export default doCreatePost;
