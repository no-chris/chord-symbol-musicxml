/**
 * xxxx xxxxx //fixme
 * @typedef {Object} XmlNode
 * @type {Object}
 * @property {String} _name - xml tag
 * @property {String|XmlNode} [_content] - tag content
 * @property {Object} [_attrs] - tag attributes
 */

/**
 * @param {String} rootNote
 * @returns {XmlNode}
 */
const getRoot = (rootNote) => {
	return {
		_name: 'root',
		_content: {
			_name: 'root-step',
			_content: rootNote,
		},
	};
};

/**
 * @param {String} kind
 * @param {String} text
 * @returns {XmlNode}
 */
const getKind = (kind, text) => {
	return {
		_name: 'kind',
		_attrs: {
			text,
		},
		_content: kind,
	};
};

/**
 * @param {String} bassNote
 * @returns {XmlNode}
 */
const getBass = (bassNote) => {
	return {
		_name: 'bass',
		_content: {
			_name: 'bass-step',
			_content: bassNote,
		},
	};
};

/**
 * @param {XmlNode[]} _content
 * @returns {XmlNode}
 */
const getHarmony = (_content) => {
	return {
		_name: 'harmony',
		_content,
	};
};

export { getRoot, getBass, getKind, getHarmony };
