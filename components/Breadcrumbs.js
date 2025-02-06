import Link from 'next/link';
import he from 'he';
export default function Breadcrumbs({ items }) {
    return (
        <nav>
            <ol className="flex space-x-2">
                {items.map((item, index) => (
                    <li key={index} className="inline-flex items-center">
                        {index > 0 && <span className="mx-2 text-white">/</span>}
                        {item.href ? (
                            <Link href={item.href}>
                                <span className="text-white hover:underline">{he.decode(item.label)}</span>
                            </Link>
                        ) : (
                            <span className="text-white/80">{he.decode(item.label)}</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
