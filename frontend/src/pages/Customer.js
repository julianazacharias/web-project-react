import { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import NotFound from "../components/NotFound";
import { baseUrl } from "../shared";
import { LoginContext } from "../App";

export default function Customer() {
	const [loggedIn, setLoggedIn] = useContext(LoginContext);
	const { id } = useParams();
	const navigate = useNavigate();
	const [customer, setCustomer] = useState();
	const [tempCustomer, setTempCustomer] = useState();
	const [notFound, setNotFound] = useState();
	const [changed, setChanged] = useState(false);
	const [error, setError] = useState();

	const location = useLocation();

	useEffect(() => {
		if (!customer) return;
		if (!customer) return;

		let equal = true;

		if (customer.name !== tempCustomer.name) equal = false;
		if (customer.industry !== tempCustomer.industry) equal = false;
		if (equal) setChanged(false);
	});

	useEffect(() => {
		const url = baseUrl + "api/customers/" + id;
		fetch(url, {
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("access"),
			},
		})
			.then((response) => {
				if (response.status === 404) {
					setNotFound(true);
				} else if (response.status === 401) {
					setLoggedIn(false);
					navigate("/login", {
						state: {
							previousUrl: location.pathname,
						},
					});
				}

				if (!response.ok) {
					throw new Error("Something went wrong, try again later");
				}

				return response.json();
			})
			.then((data) => {
				setCustomer(data.customer);
				setTempCustomer(data.customer);
				setError(undefined);
			})
			.catch((e) => {
				setError(e.message);
			});
	}, []);

	function updateCustomer(e) {
		e.preventDefault();
		const url = baseUrl + "api/customers/" + id;
		fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("access"),
			},
			body: JSON.stringify(tempCustomer),
		})
			.then((response) => {
				if (response.status === 401) {
					setLoggedIn(false);
					navigate("/login", {
						state: {
							previousUrl: location.pathname,
						},
					});
				}
				if (!response.ok) {
					throw new Error("Something went wrong");
				}
				return response.json();
			})
			.then((data) => {
				setCustomer(data.customer);
				setChanged(false);
				setError(undefined);
				// setCustomers([...customers, data.customer]);
			})
			.catch((e) => {
				setError(e.message);
			});
	}

	return (
		<div className="p-3">
			{notFound ? <p>The customer with id {id} was not found</p> : null}

			{customer ? (
				<div>
					<form
						className="w-full max-w-sm"
						id="customer"
						onSubmit={updateCustomer}
					>
						<div className="md:flex md:items-center mb-6">
							<div className="md:w-1/4">
								{/* <p class="m-2 block px-2"> ID: {tempCustomer.id}</p> */}
								<label for="name">Name</label>
							</div>
							<div className="md:w-3/4">
								<input
									className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
									id="Name"
									type="text"
									value={tempCustomer.name}
									onChange={(e) => {
										setChanged(true);
										setTempCustomer({
											...tempCustomer,
											name: e.target.value,
										});
									}}
								/>
							</div>
						</div>
						<div className="md:flex md:items-center mb-6">
							<div className="md:w-1/4">
								<label for="industry">Industry</label>
							</div>
							<div className="md:w-3/4">
								<input
									className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
									id="industry"
									type="text"
									value={tempCustomer.industry}
									onChange={(e) => {
										setChanged(true);
										setTempCustomer({
											...tempCustomer,
											industry: e.target.value,
										});
									}}
								/>
							</div>
						</div>
					</form>
					{changed ? (
						<div className="mb-2">
							<button
								className="bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 mr-2 rounded"
								onClick={(e) => {
									setTempCustomer({
										...customer,
									});
									setChanged(false);
								}}
							>
								{" "}
								Cancel
							</button>{" "}
							<button
								form="customer"
								className="bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded"
							>
								Save
							</button>
						</div>
					) : null}
					<div>
						<button
							className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
							onClick={(e) => {
								const url = baseUrl + "api/customers/" + id;
								fetch(url, {
									method: "DELETE",
									headers: {
										"Content-Type": "application/json",
										Authorization: "Bearer " + localStorage.getItem("access"),
									},
								})
									.then((response) => {
										if (response.status === 401) {
											setLoggedIn(false);
											navigate("/login", {
												state: {
													previousUrl: location.pathname,
												},
											});
										}
										if (!response.ok) {
											throw new Error("Something went wrong");
										}
										setError(undefined);
										navigate("/customers");
									})
									.catch((e) => {
										setError(e.message);
									});
							}}
						>
							Delete
						</button>
					</div>
				</div>
			) : null}
			{error ? <p>{error}</p> : null}
			<br />
			<Link to="/customers">
				<button className="no-underline bg-cyan-600 hover:bg-cyan-800 text-white font-bold py-2 px-4 rounded">
					⇽ Go back
				</button>
			</Link>
		</div>
	);
}
