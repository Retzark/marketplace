import React from "react";

interface PaginationProps {
    currentPage: number;
    totalItems: number;
    pageSize: number;
    onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalItems, pageSize, onPageChange }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalItems / pageSize); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="flex justify-center mt-10 mb-10 bg-[#090909]">
            <nav className="inline-flex rounded-md shadow">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-gray-700 bg-gray-800 text-sm font-medium text-white hover:bg-gray-700 disabled:opacity-50"
                >
                    Previous
                </button>
                {pageNumbers.map((number) => (
                    <button
                        key={number}
                        onClick={() => onPageChange(number)}
                        className={`px-4 py-2 border border-gray-700 bg-gray-800 text-sm font-medium text-white ${
                            currentPage === number ? "bg-primary" : "hover:bg-gray-700"
                        }`}
                    >
                        {number}
                    </button>
                ))}
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === pageNumbers.length}
                    className="px-4 py-2 border border-gray-700 bg-gray-800 text-sm font-medium text-white hover:bg-gray-700 disabled:opacity-50"
                >
                    Next
                </button>
            </nav>
        </div>
    );
};

export default Pagination;
