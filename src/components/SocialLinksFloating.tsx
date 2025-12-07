'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagramSquare } from 'react-icons/fa';

export default function SocialLinksFloating() {
	const [show, setShow] = useState(false);

	useEffect(() => {
		const hero = document.getElementById('hero');
		if (!hero) {
			// Fallback: show after 60vh scrolled
			const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.6);
			window.addEventListener('scroll', onScroll, { passive: true });
			return () => window.removeEventListener('scroll', onScroll);
		}

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					// When hero is NOT intersecting, show the links
					setShow(!entry.isIntersecting);
				});
			},
			{ root: null, threshold: 0.1 }
		);
		observer.observe(hero);
		return () => observer.disconnect();
	}, []);

	return (
		<AnimatePresence>
			{show && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 20 }}
					transition={{ duration: 0.3 }}
					className="fixed right-6 md:right-8 bottom-36 md:bottom-28 flex flex-col space-y-6 z-40"
				>
					<a href="https://github.com/12princ" className="hover:text-lime transition-colors" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
						<FaGithub size={24} />
					</a>
					<a href="https://www.linkedin.com/in/priyanshu-patel-techveda" className="hover:text-lime transition-colors" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
						<FaLinkedin size={24} />
					</a>
					<a href="https://www.instagram.com/__p12.5.__/" className="hover:text-lime transition-colors" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
						<FaInstagramSquare size={24} />
					</a>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
