import { useContext, useEffect } from "react";
import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import { LoginContext } from "../App";

const navigation = [
	{ name: "Employees", href: "/Employees" },
	{ name: "Customers", href: "/Customers" },
	{ name: "Dictionary", href: "/Dictionary" },
];

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function Header(props) {
	const [loggedIn, setLoggedIn] = useContext(LoginContext);

	useEffect(() => {});

	return (
		<>
			<Disclosure as="nav" className="bg-gray-800">
				{({ open }) => (
					<>
						<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
							<div className="relative flex h-14 items-center justify-between">
								<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
									{/* Mobile menu button*/}
									<DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
										<span className="absolute -inset-0.5" />
										<span className="sr-only">Open main menu</span>
										{open ? (
											<XMarkIcon className="block h-6 w-6" aria-hidden="true" />
										) : (
											<Bars3Icon className="block h-6 w-6" aria-hidden="true" />
										)}
									</DisclosureButton>
								</div>
								<div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
									<div className="hidden sm:ml-6 sm:block">
										<div className="flex space-x-4">
											{navigation.map((item) => (
												<NavLink
													key={item.name}
													to={item.href}
													// className={classNames(
													//   item.current ? 'no-underline'  : 'no-underline ',
													// )}
													className={({ isActive }) => {
														return (
															"block px-3 py-2 rounded-md text-base font-medium no-underline" +
															(!isActive
																? " text-gray-300 hover:bg-gray-700 hover:text-white"
																: "bg-gray-900 text-white no-underline")
														);
													}}
												>
													{item.name}
												</NavLink>
											))}
											{loggedIn ? (
												<NavLink
													to={"/login"}
													onClick={() => {
														setLoggedIn(false);
														localStorage.clear();
													}}
													className="rounded-md px-3 py-2 font-medium no-underline text-gray-300 text-white hover:bg-gray-700 no-underline"
												>
													Logout
												</NavLink>
											) : (
												<NavLink
													to={"/login"}
													className="rounded-md px-3 py-2 font-medium no-underline text-gray-300 text-white hover:bg-gray-700 no-underline"
												>
													Login
												</NavLink>
											)}
										</div>
									</div>
								</div>
								<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
									<button
										type="button"
										className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
									>
										<span className="absolute -inset-1.5" />
										<span className="sr-only">View notifications</span>
										<BellIcon className="h-6 w-6" aria-hidden="true" />
									</button>
								</div>
							</div>
						</div>

						<DisclosurePanel className="sm:hidden">
							<div className="space-y-1 px-2 pb-3 pt-2">
								{navigation.map((item) => (
									<NavLink
										key={item.name}
										to={item.href}
										// className={classNames(
										//   item.current ? 'no-underline'  : 'no-underline ',
										// )}
										className={({ isActive }) => {
											return (
												"block px-3 py-2 rounded-md text-base font-medium no-underline text-gray-300 hover:bg-gray-700 hover:text-white" +
												(!isActive
													? "text-gray-300 hover:bg-gray-700 hover:text-white"
													: "bg-gray-900 text-white")
											);
										}}
									>
										{item.name}
									</NavLink>
								))}
								{loggedIn ? (
									<NavLink
										to={"/login"}
										onClick={() => {
											setLoggedIn(false);
											localStorage.clear();
										}}
										className="block px-3 py-2 rounded-md text-base font-medium no-underline text-gray-300 hover:bg-gray-700 hover:text-white"
									>
										Logout
									</NavLink>
								) : (
									<NavLink
										to={"/login"}
										className="block px-3 py-2 rounded-md text-base font-medium no-underline text-gray-300 hover:bg-gray-700 hover:text-white"
									>
										Login
									</NavLink>
								)}
							</div>
						</DisclosurePanel>
					</>
				)}
			</Disclosure>
			<div className="bg-gray-300">
				<div className="max-w-7xl mx-auto min-h-screen p-3">
					{props.children}
				</div>
			</div>
		</>
	);
}
