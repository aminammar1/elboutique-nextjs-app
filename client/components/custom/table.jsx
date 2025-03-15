import * as React from 'react'

export function Table({ children, className, ...props }) {
    return (
    <table className={`w-full text-sm text-left ${className}`} {...props}>
        {children}
    </table>
  )
}

export function TableHeader({ children }) {
    return <thead className="bg-gray-200 border-b">{children}</thead>
}

export function TableBody({ children }) {
    return <tbody>{children}</tbody>
}

export function TableRow({ children }) {
    return <tr className=" hover:bg-gray-100 border-gray-50">{children}</tr>
}

export function TableHead({ children }) {
    return <th className="px-4 py-2">{children}</th>
}

export function TableCell({ children }) {
    return <td className="px-4 py-2">{children}</td>
}
