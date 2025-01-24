import { useState } from "react";
import Image from "next/image";
import linkedin from './../public/icons/linkedin.svg';
import avatar from './../public/images/avatar.svg';
import action from './../public/icons/action.svg';

interface Lead {
    id: number;
    name: string;
    company: string;
    source: string;
    stage: string;
    status: "Open" | "Closed";
    image: string; // Image URL for the lead
    type: string;
}

const LeadsTable: React.FC = () => {
    const [filter, setFilter] = useState({
        type: "",
        source: "",
        status: "",
    });

    // Increased number of leads to 100
    const leads: Lead[] = Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        name: `Lead ${i + 1}`,
        company: `Company ${i + 1}`,
        source: i % 2 === 0 ? "Linkedin" : "Gmail",
        stage: i % 3 === 0 ? "New lead" : "Qualified",
        status: i % 2 === 0 ? "Open" : "Closed",
        image: "https://via.placeholder.com/50",
        type: i % 2 === 0 ? "Hot" : "Cold",
    }));

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
    const [showAddModal, setShowAddModal] = useState<boolean>(false);
    const [showActionModal, setShowActionModal] = useState<boolean>(false);
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

    const leadsPerPage = 10; // Show 10 leads per page
    // const totalLeads = leads.length;

    // Filtered leads based on selected filters
    const filteredLeads = leads.filter((lead) => {
        return (
            (filter.type ? lead.type === filter.type : true) &&
            (filter.source ? lead.source === filter.source : true) &&
            (filter.status ? lead.status === filter.status : true)
        );
    });

    const totalPages = Math.ceil(filteredLeads.length / leadsPerPage);

    // Pagination logic
    const paginatedLeads = filteredLeads.slice(
        (currentPage - 1) * leadsPerPage,
        currentPage * leadsPerPage
    );

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>, field: string) => {
        setFilter({ ...filter, [field]: e.target.value });
    };

    const handleActionModalClose = () => {
        setShowActionModal(false);
        setSelectedLead(null);
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xs lg:text-sm font-medium">
                    Lead List <span className="bg-blue-100 rounded-full text-xs p-0.5 lg:p-1 ml-2">
                        {filteredLeads.length} Users</span>
                </h1>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="px-2 py-1 text-sm bg-white text-blue-950 border border-blue-950 rounded-md"
                    >
                        + Add New Lead
                    </button>
                    <button
                        onClick={() => setShowFilterModal(true)}
                        className="px-2 py-1 text-sm bg-gray-100 text-gray-700 border border-gray-300 rounded-md"
                    >
                        Filters
                    </button>
                </div>
            </div>

            {/* Lead Table */}
            <table className="min-w-full bg-white border">
                <thead>
                    <tr className="bg-gray-100 text-left text-sm">
                        <th className="p-2 border">Lead Name</th>
                        <th className="p-2 border">Company</th>
                        <th className="p-2 border">Lead Source</th>
                        <th className="p-2 border">Stage</th>
                        <th className="p-2 border">Status</th>
                        <th className="p-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedLeads.map((lead) => (
                        <tr key={lead.id} className="border-b hover:bg-gray-50">
                            <td className="p-4 border flex gap-3 items-center text-sm">
                                <Image
                                    src={avatar}
                                    alt={"source logo"}
                                    className="w-6 h-6 rounded-full mr-0"
                                />
                                {lead.name}
                            </td>
                            <td className="p-2 border text-sm">{lead.company}</td>
                            <td className="p-4 border flex gap-3 text-sm">
                                <span>
                                    <Image
                                        src={linkedin}
                                        alt={"source logo"}
                                        className="w-6 h-6 rounded-full mr-0"
                                    />
                                </span>
                                {lead.source}
                            </td>
                            <td className="p-2 border text-sm">{lead.stage}</td>
                            <td
                                className={`p-2 border font-medium text-sm ${lead.status === "Open" ? "text-green-600" : "text-red-600"
                                    }`}
                            >
                                {lead.status}
                            </td>
                            <td className="p-2 border text-sm">
                                <button
                                    onClick={() => {
                                        setSelectedLead(lead);
                                        setShowActionModal(true);
                                    }}
                                    className="text-blue-500 hover:underline text-sm"
                                >
                                    <Image
                                        src={action}
                                        alt={""}
                                        className="w-6 h-6 ml-6"
                                    />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className={`px-4 py-1 rounded-md text-xs border border-blue-950 ${currentPage === 1
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-white text-blue-950 hover:bg-blue-700"
                        }`}
                >
                    Previous
                </button>
                <span className="text-gray-700">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-1 rounded-md text-xs border border-blue-950 ${currentPage === totalPages
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-white text-blue-950 hover:bg-blue-700"
                        }`}
                >
                    Next
                </button>
            </div>

            {/* Add New Lead Modal */}
            {showAddModal && (
                <div className="fixed inset-0 mt-4 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                        <h2 className="text-sm font-semibold mb-4">Add New Lead</h2>
                        <form className="space-y-3">
                            <input
                                type="text"
                                placeholder="Lead Name"
                                className="w-full border rounded-md p-2 text-xs"
                            />
                            <input
                                type="text"
                                placeholder="Company Name"
                                className="w-full border rounded-md p-2 text-xs"
                            />
                            <input
                                type="number"
                                placeholder="Company Size"
                                className="w-full border rounded-md p-2 text-xs"
                            />
                            <select className="w-full border rounded-md p-2 text-xs">
                                <option value="">Lead Type</option>
                                <option value="Hot">Hot</option>
                                <option value="Cold">Cold</option>
                            </select>
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full border rounded-md p-2 text-xs"
                            />
                            <input
                                type="text"
                                placeholder="Phone Number"
                                className="w-full border rounded-md p-2 text-xs"
                            />
                            <select className="w-full border rounded-md p-2 text-xs">
                                <option value="">Lead Source</option>
                                <option value="Referral">Referral</option>
                                <option value="Ads">Ads</option>
                            </select>
                            <select className="w-full border rounded-md p-2 text-xs">
                                <option value="">Lead Status</option>
                                <option value="Open">Open</option>
                                <option value="Closed">Closed</option>
                            </select>
                            <textarea
                                placeholder="Notes"
                                className="w-full border rounded-md p-2 text-xs"
                            ></textarea>
                            <div className="flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={() => setShowAddModal(false)}
                                    className="px-4 py-2 bg-gray-300 rounded-md text-xs"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-950 text-white rounded-md text-xs"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Filter Modal */}
            {showFilterModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-xl font-semibold mb-4">Filter Leads</h2>
                        <form className="space-y-4">
                            <div>
                                <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                                    Lead Type
                                </label>
                                <select
                                    id="type"
                                    value={filter.type}
                                    onChange={(e) => handleFilterChange(e, "type")}
                                    className="w-full border rounded-md p-2"
                                >
                                    <option value="">All</option>
                                    <option value="Hot">Hot</option>
                                    <option value="Cold">Cold</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="source" className="block text-sm font-medium text-gray-700">
                                    Lead Source
                                </label>
                                <select
                                    id="source"
                                    value={filter.source}
                                    onChange={(e) => handleFilterChange(e, "source")}
                                    className="w-full border rounded-md p-2"
                                >
                                    <option value="">All</option>
                                    <option value="Referral">Linkedin</option>
                                    <option value="Ads">Gmail</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                                    Lead Status
                                </label>
                                <select
                                    id="status"
                                    value={filter.status}
                                    onChange={(e) => handleFilterChange(e, "status")}
                                    className="w-full border rounded-md p-2"
                                >
                                    <option value="">All</option>
                                    <option value="Open">Open</option>
                                    <option value="Closed">Closed</option>
                                </select>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setShowFilterModal(false)}
                                    className="px-4 py-2 bg-gray-300 rounded-md"
                                >
                                    Close
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Action Modal */}
            {showActionModal && selectedLead && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-xl font-semibold mb-4">Lead Actions</h2>
                        <p className="mb-4">What would you like to do with {selectedLead.name}?</p>
                        <ul className="space-y-4">
                            <li>
                                <button className="text-blue-500 hover:underline">View Lead Details</button>
                            </li>
                            <li>
                                <button className="text-blue-500 hover:underline">Send Email</button>
                            </li>
                            <li>
                                <button className="text-blue-500 hover:underline">Schedule Meeting</button>
                            </li>
                        </ul>
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={handleActionModalClose}
                                className="px-4 py-2 bg-gray-300 rounded-md"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LeadsTable;