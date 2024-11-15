export type TDocumentData = {
	label: string;
	image: string;
};

const documents: Record<string, TDocumentData> = {
	'Proof of Identity': {
		label: 'status.documents.proofOfIdentity',
		image: '/images/documents/identity.png',
	},
	'Proof of Residence': {
		label: 'status.documents.proofOfResidence',
		image: '/images/documents/documents.png',
	},
};

export const getDocumentData = (document: string): TDocumentData =>
	documents[document] || {
		label: document,
		image: '/images/documents/documents.png',
	};
