import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Camera, Star, Heart, Package, Users, Plus, Search, Edit, Trash2 } from 'lucide-react';

// Sample cigar data
const initialCigars = [
	{
		id: 1,
		name: "Montecristo No. 2",
		brand: "Montecristo",
		origin: "Cuba",
		vitola: "Torpedo",
		length: "6.1 inches",
		ringGauge: 52,
		wrapper: "Cuban",
		binder: "Cuban",
		filler: "Cuban",
		price: 25.50,
		dateAdded: "2024-12-15",
		timesSmoked: 3,
		isFavorite: true,
		inHumidor: true,
		notes: "Classic torpedo with excellent construction. Rich cocoa and leather notes with hints of cedar.",
		ratings: {
			appearance: 9,
			construction: 8,
			draw: 9,
			burn: 8,
			firstThird: 9,
			secondThird: 9,
			finalThird: 8,
			complexity: 9,
			strength: 7,
			overall: 8.6
		}
	},
	{
		id: 2,
		name: "Padron 1964 Anniversary",
		brand: "Padron",
		origin: "Nicaragua",
		vitola: "Robusto",
		length: "5 inches",
		ringGauge: 50,
		wrapper: "Maduro",
		binder: "Nicaraguan",
		filler: "Nicaraguan",
		price: 18.75,
		dateAdded: "2025-01-05",
		timesSmoked: 1,
		isFavorite: false,
		inHumidor: true,
		notes: "Box-pressed with excellent construction. Rich chocolate and coffee with a hint of black pepper.",
		ratings: {
			appearance: 9,
			construction: 10,
			draw: 9,
			burn: 9,
			firstThird: 8,
			secondThird: 9,
			finalThird: 8,
			complexity: 8,
			strength: 8,
			overall: 8.8
		}
	}
];

// Sample friends data
const initialFriends = [
	{
		id: 101,
		name: "James Rodriguez",
		username: "jamescigar",
		cigarsInCollection: 48,
		topCigar: "Cohiba Behike 56",
		recentActivity: "Added Arturo Fuente Don Carlos to collection"
	},
	{
		id: 102,
		name: "Sarah Chen",
		username: "sarahpuffs",
		cigarsInCollection: 32,
		topCigar: "Oliva Serie V Melanio",
		recentActivity: "Rated Padron 1926 Series No. 9"
	}
];

const CigarApp = () => {
	const [activeTab, setActiveTab] = useState("collection");
	const [cigars, setCigars] = useState(initialCigars);
	const [friends, setFriends] = useState(initialFriends);
	const [searchQuery, setSearchQuery] = useState("");
	const [showAddCigar, setShowAddCigar] = useState(false);

	const filteredCigars = cigars.filter(cigar =>
		cigar.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
		cigar.brand.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const humidorCigars = cigars.filter(cigar => cigar.inHumidor);
	const favoriteCigars = cigars.filter(cigar => cigar.isFavorite);

	const incrementTimesSmoked = (id) => {
		setCigars(cigars.map(cigar =>
			cigar.id === id ? { ...cigar, timesSmoked: cigar.timesSmoked + 1 } : cigar
		));
	};

	const toggleFavorite = (id) => {
		setCigars(cigars.map(cigar =>
			cigar.id === id ? { ...cigar, isFavorite: !cigar.isFavorite } : cigar
		));
	};

	const toggleHumidor = (id) => {
		setCigars(cigars.map(cigar =>
			cigar.id === id ? { ...cigar, inHumidor: !cigar.inHumidor } : cigar
		));
	};

	const formatRating = (rating) => {
		return typeof rating === 'number' ? rating.toFixed(1) : 'N/A';
	};

	const CigarCard = ({ cigar }) => (
		<div className="mb-4 p-4 border rounded-lg bg-white shadow-sm">
			<div className="flex items-start justify-between">
				<div className="flex-1">
					<div className="flex items-center justify-between">
						<h3 className="text-lg font-bold">{cigar.name}</h3>
						<div className="flex space-x-2">
							<button
								onClick={() => toggleFavorite(cigar.id)}
								className={`p-1 rounded-full ${cigar.isFavorite ? 'text-red-500' : 'text-gray-400'}`}
							>
								<Heart size={20} />
							</button>
							<button
								onClick={() => toggleHumidor(cigar.id)}
								className={`p-1 rounded-full ${cigar.inHumidor ? 'text-blue-500' : 'text-gray-400'}`}
							>
								<Package size={20} />
							</button>
						</div>
					</div>

					<p className="text-sm text-gray-600">{cigar.brand} | {cigar.origin} | {cigar.vitola}</p>
					<p className="text-sm text-gray-600">{cigar.length} | Ring Gauge: {cigar.ringGauge}</p>

					<div className="mt-2 grid grid-cols-2 gap-2">
						<div className="flex items-center">
							<span className="text-xs font-medium text-gray-500">Overall:</span>
							<span className="ml-1 text-sm font-bold">{formatRating(cigar.ratings.overall)}</span>
							<Star className="ml-1 text-yellow-500" size={16} />
						</div>
						<div className="flex items-center">
							<span className="text-xs font-medium text-gray-500">Draw:</span>
							<span className="ml-1 text-sm">{formatRating(cigar.ratings.draw)}</span>
						</div>
						<div className="flex items-center">
							<span className="text-xs font-medium text-gray-500">Burn:</span>
							<span className="ml-1 text-sm">{formatRating(cigar.ratings.burn)}</span>
						</div>
						<div className="flex items-center">
							<span className="text-xs font-medium text-gray-500">Complexity:</span>
							<span className="ml-1 text-sm">{formatRating(cigar.ratings.complexity)}</span>
						</div>
					</div>

					<div className="mt-2">
						<p className="text-xs text-gray-500">Times Smoked: {cigar.timesSmoked}</p>
						<button
							onClick={() => incrementTimesSmoked(cigar.id)}
							className="mt-1 px-2 py-1 text-xs bg-gray-100 rounded-md hover:bg-gray-200"
						>
							Log Smoke
						</button>
					</div>

					{cigar.notes && (
						<div className="mt-2">
							<p className="text-xs text-gray-500 font-medium">Notes:</p>
							<p className="text-xs text-gray-600 line-clamp-2">{cigar.notes}</p>
						</div>
					)}
				</div>

				<div className="ml-4 w-24 h-24 rounded-md bg-gray-200 flex items-center justify-center">
					<Camera className="text-gray-400" size={32} />
				</div>
			</div>

			<div className="mt-3 flex space-x-2">
				<button className="flex items-center text-xs text-blue-600">
					<Edit size={14} className="mr-1" /> Edit
				</button>
				<button className="flex items-center text-xs text-red-600">
					<Trash2 size={14} className="mr-1" /> Delete
				</button>
			</div>
		</div>
	);

	const FriendCard = ({ friend }) => (
		<div className="mb-4 p-4 border rounded-lg bg-white shadow-sm">
			<div className="flex items-center">
				<div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
					<Users className="text-gray-400" size={20} />
				</div>
				<div className="ml-3">
					<h3 className="font-medium">{friend.name}</h3>
					<p className="text-sm text-gray-500">@{friend.username}</p>
				</div>
			</div>

			<div className="mt-3 text-sm">
				<p className="flex justify-between">
					<span className="text-gray-500">Collection:</span>
					<span>{friend.cigarsInCollection} cigars</span>
				</p>
				<p className="flex justify-between">
					<span className="text-gray-500">Top Rated:</span>
					<span>{friend.topCigar}</span>
				</p>
			</div>

			<div className="mt-2 text-xs text-gray-500">
				<p className="font-medium">Recent Activity:</p>
				<p>{friend.recentActivity}</p>
			</div>

			<button className="mt-3 w-full py-1 text-xs text-center text-blue-600 border border-blue-600 rounded-md">
				View Profile
			</button>
		</div>
	);

	return (
		<div className="max-w-md mx-auto bg-gray-50 min-h-screen">
			{/* App Header */}
			<div className="bg-gradient-to-r from-amber-700 to-amber-900 text-white p-4">
				<h1 className="text-xl font-bold">Cigar Collection</h1>
				<p className="text-sm opacity-80">Catalog, Rate & Share Your Cigar Journey</p>
			</div>

			{/* Search Bar */}
			<div className="p-4 bg-white shadow-sm">
				<div className="relative">
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
					<input
						type="text"
						placeholder="Search cigars..."
						className="w-full pl-10 pr-4 py-2 border rounded-lg"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</div>
			</div>

			{/* Main Content Tabs */}
			<Tabs defaultValue="collection" className="p-4">
				<TabsList className="grid grid-cols-4 mb-4">
					<TabsTrigger value="collection" onClick={() => setActiveTab("collection")}>
						Collection
					</TabsTrigger>
					<TabsTrigger value="humidor" onClick={() => setActiveTab("humidor")}>
						Humidor
					</TabsTrigger>
					<TabsTrigger value="favorites" onClick={() => setActiveTab("favorites")}>
						Favorites
					</TabsTrigger>
					<TabsTrigger value="social" onClick={() => setActiveTab("social")}>
						Social
					</TabsTrigger>
				</TabsList>

				<TabsContent value="collection" className="space-y-4">
					<div className="flex justify-between items-center">
						<h2 className="text-lg font-bold">My Collection</h2>
						<button
							onClick={() => setShowAddCigar(true)}
							className="flex items-center text-sm bg-amber-700 text-white px-3 py-1 rounded-md"
						>
							<Plus size={16} className="mr-1" /> Add Cigar
						</button>
					</div>

					{filteredCigars.length > 0 ? (
						filteredCigars.map(cigar => (
							<CigarCard key={cigar.id} cigar={cigar} />
						))
					) : (
						<div className="text-center py-8 text-gray-500">
							<p>No cigars found. Add your first cigar!</p>
						</div>
					)}
				</TabsContent>

				<TabsContent value="humidor" className="space-y-4">
					<h2 className="text-lg font-bold">My Humidor</h2>
					{humidorCigars.length > 0 ? (
						humidorCigars.map(cigar => (
							<CigarCard key={cigar.id} cigar={cigar} />
						))
					) : (
						<div className="text-center py-8 text-gray-500">
							<p>No cigars in your humidor. Add some from your collection.</p>
						</div>
					)}
				</TabsContent>

				<TabsContent value="favorites" className="space-y-4">
					<h2 className="text-lg font-bold">My Favorites</h2>
					{favoriteCigars.length > 0 ? (
						favoriteCigars.map(cigar => (
							<CigarCard key={cigar.id} cigar={cigar} />
						))
					) : (
						<div className="text-center py-8 text-gray-500">
							<p>No favorite cigars yet. Mark some as favorites!</p>
						</div>
					)}
				</TabsContent>

				<TabsContent value="social" className="space-y-4">
					<h2 className="text-lg font-bold">My Cigar Network</h2>
					{friends.map(friend => (
						<FriendCard key={friend.id} friend={friend} />
					))}

					<button className="w-full py-2 bg-gray-100 rounded-md text-center text-gray-600 text-sm">
						<Plus size={16} className="inline mr-1" /> Find More Friends
					</button>
				</TabsContent>
			</Tabs>

			{/* Add New Cigar Form Modal (simplified) */}
			{showAddCigar && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
					<div className="bg-white rounded-lg p-6 w-full max-w-md">
						<h3 className="text-lg font-bold mb-4">Add New Cigar</h3>
						<div className="space-y-3">
							<div>
								<label className="block text-sm font-medium text-gray-700">Name</label>
								<input type="text" className="mt-1 w-full p-2 border rounded-md" placeholder="e.g. Cohiba Siglo VI" />
							</div>

							<div className="grid grid-cols-2 gap-3">
								<div>
									<label className="block text-sm font-medium text-gray-700">Brand</label>
									<input type="text" className="mt-1 w-full p-2 border rounded-md" placeholder="e.g. Cohiba" />
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700">Origin</label>
									<input type="text" className="mt-1 w-full p-2 border rounded-md" placeholder="e.g. Cuba" />
								</div>
							</div>

							<div className="grid grid-cols-2 gap-3">
								<div>
									<label className="block text-sm font-medium text-gray-700">Vitola</label>
									<input type="text" className="mt-1 w-full p-2 border rounded-md" placeholder="e.g. Toro" />
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700">Ring Gauge</label>
									<input type="number" className="mt-1 w-full p-2 border rounded-md" placeholder="e.g. 52" />
								</div>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700">Photo</label>
								<div className="mt-1 p-4 border border-dashed rounded-md flex flex-col items-center justify-center bg-gray-50">
									<Camera className="text-gray-400" size={32} />
									<p className="mt-2 text-sm text-gray-500">Tap to add photo</p>
								</div>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700">Notes</label>
								<textarea className="mt-1 w-full p-2 border rounded-md" rows="3" placeholder="Add tasting notes and experiences..."></textarea>
							</div>

							<div className="pt-3 border-t">
								<p className="text-sm font-medium text-gray-700 mb-2">Ratings</p>
								<div className="grid grid-cols-2 gap-3">
									<div>
										<label className="block text-xs text-gray-600">Appearance</label>
										<input type="range" min="1" max="10" className="w-full" />
									</div>
									<div>
										<label className="block text-xs text-gray-600">Construction</label>
										<input type="range" min="1" max="10" className="w-full" />
									</div>
									<div>
										<label className="block text-xs text-gray-600">Draw</label>
										<input type="range" min="1" max="10" className="w-full" />
									</div>
									<div>
										<label className="block text-xs text-gray-600">Burn</label>
										<input type="range" min="1" max="10" className="w-full" />
									</div>
								</div>
							</div>
						</div>

						<div className="mt-6 flex justify-end space-x-3">
							<button
								onClick={() => setShowAddCigar(false)}
								className="px-4 py-2 text-sm text-gray-600 border rounded-md"
							>
								Cancel
							</button>
							<button className="px-4 py-2 text-sm bg-amber-700 text-white rounded-md">
								Save Cigar
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default CigarApp;
