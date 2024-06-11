import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { baseUrl } from "../shared";
import AddCustomer from "../components/AddCustomer";
import { LoginContext } from "../App";

export default function Customers() {
	const [loggedIn, setLoggedIn] = useContext(LoginContext);
	const [customers, setCustomers] = useState();
	const [show, setShow] = useState(false);

	function toggleShow() {
		setShow(!show);
	}

	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		const url = baseUrl + "/api/customers/";
		fetch(url, {
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
				return response.json();
			})
			.then((data) => {
				setCustomers(data.customers);
			});
	}, []);

	function newCustomer(name, industry) {
		const data = {
			name: name,
			industry: industry,
		};
		const url = baseUrl + "api/customers/";
		fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Something went wrong");
				}
				return response.json();
			})
			.then((data) => {
				toggleShow();
				setCustomers([...customers, data.customer]);
			})
			.catch((e) => {
				console.log(e);
			});
	}
	return (
		<>
			<h1>Customers:</h1>

			{customers
				? customers.map((customer) => {
						return (
							<div className="m-2" key={customer.id}>
								<Link to={"/customers/" + customer.id}>
									<button className="no-underline bg-cyan-600 hover:bg-cyan-800 text-white font-bold py-2 px-4 rounded">
										{customer.name}
									</button>
								</Link>
							</div>
						);
				  })
				: null}

			<AddCustomer
				newCustomer={newCustomer}
				show={show}
				toggleShow={toggleShow}
			/>
		</>
	);
}
