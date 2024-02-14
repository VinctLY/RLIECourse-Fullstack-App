import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import useAuth from "../hooks/useAuth";

const Navbar = () => {
	const auth = useAuth();

	const navbarRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const body = document.body as HTMLElement;

		if (navbarRef !== null && navbarRef.current !== null) {
			body.style.paddingTop = navbarRef.current.offsetHeight.toString() + "px";
		}

		let prevScroll = 0;
		document.addEventListener("scroll", () => {
			if (navbarRef !== null && navbarRef.current !== null) {
				if (window.scrollY > prevScroll && window.scrollY > navbarRef.current.offsetHeight) {
					navbarRef.current.style.transform = "translateY(-100%)";
				} else {
					navbarRef.current.style.transform = "translateY(0%)";
				}

				prevScroll = window.scrollY;
			}
		});
	}, [navbarRef]);

	return (
		<header
			className="fixed w-full h-16 z-50 top-0 transition-transform bg-white shadow-md"
			ref={navbarRef}>
			<nav className="flex items-center h-full px-8 py-2 justify-between">
				<Link className="text-2xl font-bold" to="/">
					RLIECourse
				</Link>
				<ul className="flex items-center gap-8 text-dark-50">
					<li>
						<Link to="/" className="hover:text-dark">
							Home
						</Link>
					</li>
					<li>
						<Link to="/about" className="hover:text-dark">
							About This Course
						</Link>
					</li>
				</ul>
				{!auth.user ? (
					<Link
						className="bg-primary-100 text-white px-6 py-3 font-medium tracking-wider rounded-md"
						to="/login">
						Sign In
					</Link>
				) : (
					<Link to="/profile" title="View profile">
						<FontAwesomeIcon
							icon={faUser}
							className="bg-primary-100 text-light size-5 p-2 rounded-full active:scale-95 transition-transform"
						/>
					</Link>
				)}
			</nav>
		</header>
	);
};

export default Navbar;
