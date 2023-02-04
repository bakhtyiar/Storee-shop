export const dummyjsonURL = `https://dummyjson.com`;
export const pageLimit = 30;
export const routes = {
	home: { path: "/" },
	products: { path: "/products" },
	product: { path: "/product" },
	news: { path: "/news" },
	cart: { path: "/cart"},
	orderMaking: {path: "/orderMaking"},
	orderCompleted: {path: "/order_completed"},
	post: { path: "/post" },
	profile: { path: "/profile"},
	login: {path: "/login"},
	register: {path: "/register"},
	notFound: { path: "/page_not_found" },
};
export const encryptKey = 'StoreeEncryptKey2023';
export const states = [
	{ value: 'AL', label: 'Alabama (AL)' },
	{ value: 'AK', label: 'Alaska (AK)' },
	{ value: 'AZ', label: 'Arizona (AZ)' },
	{ value: 'AR', label: 'Arkansas (AR)' },
	{ value: 'CA', label: 'California (CA)' },
	{ value: 'CO', label: 'Colorado (CO)' },
	{ value: 'CT', label: 'Connecticut (CT)' },
	{ value: 'DE', label: 'Delaware (DE)' },
	{ value: 'FL', label: 'Florida (FL)' },
	{ value: 'GA', label: 'Georgia (GA)' },
	{ value: 'HI', label: 'Hawaii (HI)' },
	{ value: 'ID', label: 'Idaho (ID)' },
	{ value: 'IL', label: 'Illinois (IL)' },
	{ value: 'IN', label: 'Indiana (IN)' },
	{ value: 'IA', label: 'Iowa (IA)' },
	{ value: 'KS', label: 'Kansas (KS)' },
	{ value: 'KY', label: 'Kentucky (KY)' },
	{ value: 'LA', label: 'Louisiana (LA)' },
	{ value: 'ME', label: 'Maine (ME)' },
	{ value: 'MD', label: 'Maryland (MD)' },
	{ value: 'MA', label: 'Massachusetts (MA)' },
	{ value: 'MI', label: 'Michigan (MI)' },
	{ value: 'MN', label: 'Minnesota (MN)' },
	{ value: 'MS', label: 'Mississippi (MS)' },
	{ value: 'MO', label: 'Missouri (MO)' },
	{ value: 'MT', label: 'Montana (MT)' },
	{ value: 'NE', label: 'Nebraska (NE)' },
	{ value: 'NV', label: 'Nevada (NV)' },
	{ value: 'NH', label: 'New Hampshire (NH)' },
	{ value: 'NJ', label: 'New Jersey (NJ)' },
	{ value: 'NM', label: 'New Mexico (NM)' },
	{ value: 'NY', label: 'New York (NY)' },
	{ value: 'NC', label: 'North Carolina (NC)' },
	{ value: 'ND', label: 'North Dakota (ND)' },
	{ value: 'OH', label: 'Ohio (OH)' },
	{ value: 'OK', label: 'Oklahoma (OK)' },
	{ value: 'OR', label: 'Oregon (OR)' },
	{ value: 'PA', label: 'Pennsylvania (PA)' },
	{ value: 'RI', label: 'Rhode Island (RI)' },
	{ value: 'SC', label: 'South Carolina (SC)' },
	{ value: 'SD', label: 'South Dakota (SD)' },
	{ value: 'TN', label: 'Tennessee (TN)' },
	{ value: 'TX', label: 'Texas (TX)' },
	{ value: 'UT', label: 'Utah (UT)' },
	{ value: 'VT', label: 'Vermont (VT)' },
	{ value: 'VA', label: 'Virginia (VA)' },
	{ value: 'WA', label: 'Washington (WA)' },
	{ value: 'WV', label: 'West Virginia (WV)' },
	{ value: 'WI', label: 'Wisconsin (WI)' },
	{ value: 'WY', label: 'Wyoming (WY)' }
]
export const shipmentMethods = {
	'warehouse': {
		value: 'warehouse',
		label: 'Pick up from warehouse',
	},
	'courier': {
		value: 'courier',
		label: 'Courier delivery',
	},
	'postOffice': {
		value: 'postOffice',
		label: 'Delivery to the post office',
	},
	'airDrone': {
		value: 'airDrone',
		label: 'Air drone shipment',
	},
}
export const warehouses = [
	{
		address: 'California Main st. 11',
		id: '001',
	},
	{
		address: 'Kansas Main st. 25',
		id: '002',
	},
	{
		address: 'Ohio Main st. 7',
		id: '003',
	},
	{
		address: 'Washington Main st. 2',
		id: '004',
	},
	{
		address: 'Louisiana Main st. 21',
		id: '005',
	},
	{
		address: 'Hawaii Main st. 6',
		id: '006',
	},
]
export const paymentMethods = {
    'card': {
		value: 'card',
		label: 'Debit card',
	},
	'cash': {
		value: 'cash',
		label: 'Cash on receive',
	},
	'inShare': {
		value: 'inShare',
		label: 'Payment in shares',
	},
}