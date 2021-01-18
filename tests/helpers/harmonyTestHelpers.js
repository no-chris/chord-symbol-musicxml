const getDegreesAsObjects = (harmonyXml) => {
	return harmonyXml._content
		.filter((el) => el._name === 'degree')
		.map((degreeXml) => {
			const printObject =
				degreeXml._attrs && degreeXml._attrs['print-object'];

			const valueXml = degreeXml._content.find(
				(el) => el._name === 'degree-value'
			);
			const value = valueXml._content;

			const atlerXml = degreeXml._content.find(
				(el) => el._name === 'degree-alter'
			);
			const alter = atlerXml ? atlerXml._content : undefined;

			const typeXml = degreeXml._content.find(
				(el) => el._name === 'degree-type'
			);
			const type = typeXml._content;

			const degreeObject = {
				value,
				type,
			};
			if (printObject) degreeObject.printObject = printObject;
			if (alter) degreeObject.alter = alter;

			return degreeObject;
		});
};

const formatDegree = (degree) => {
	if (degree.alter === '-1') {
		return 'b' + degree.value;
	} else if (degree.alter === '1') {
		return '#' + degree.value;
	} else {
		return degree.value;
	}
};

export { getDegreesAsObjects, formatDegree };
