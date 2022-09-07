import { useRouter } from 'next/router';
import Link from 'next/link';
import PropTypes from 'prop-types';

export { NavLink };

type NavLinkProps = {
    href: string;
    exact?: boolean;
    children: React.ReactNode;
    className?: string;
};

function NavLink({ href, exact, children, ...props }: NavLinkProps) {
    const { pathname } = useRouter();
    if (href == "/") {
        exact = true;
    }

    const isActive = exact ? pathname === href : pathname.startsWith(href);

    if (isActive) {
        props.className = `${props.className || ''} active`.trim();
    }

    return (
        <Link href={href} passHref>
            <a {...props}>
                {children}
            </a>
        </Link>
    );
}

export default NavLink;