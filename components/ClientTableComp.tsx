'use client'
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import Image from "next/image";
import edit_icon from './../public/icons/edit_icon.svg';
import arrow_left from './../public/icons/arrow_left.svg';
import arrow_right from './../public/icons/arrow_right.svg';
import doe from './../public/images/doe.png';
// import axios from "axios";


// Define types
type Client = {
    // imageUrl: string | undefined;
    id: number;
    name: string;
    dealStage: "Closed" | "Lead" | "Negotiation";
    expectedCloseDate: string;
    dealSize: "Single driver" | "Enterprise";
    loadingPercentage: number; // Each deal will have its unique loading percentage
};

const initialClients: Client[] = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `Client ${i + 1}`,
    dealStage: ["Closed", "Lead", "Negotiation"][i % 3] as Client["dealStage"],
    expectedCloseDate: new Date(2025, i % 12, (i % 28) + 1).toISOString().slice(0, 10),
    dealSize: ["Single Driver", "Enterprise"][i % 2] as Client["dealSize"],
    loadingPercentage: Math.floor(Math.random() * 100), // Unique random loading percentage for each deal
    // imageUrl: `https://ui-avatars.com/api/?name=Client+${i + 1}&background=random&size=128`, // Generate headshot
}));

const PAGE_SIZE = 10;

export default function ClientTable() {
    const [clients, setClients] = useState<Client[]>(initialClients);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [filterSize, setFilterSize] = useState<string>("");
    const [editableClient, setEditableClient] = useState<Client | null>(null);
    // const [isLoading, setIsLoading] = useState<boolean>(true);
    // const [error, setError] = useState<string | null>(null);

    // useEffect(() => {
    //     const fetchClients = async () => {
    //       setIsLoading(true);
    //       setError(null);
    //       try {
    //         const response = await axios.get("/api/clients"); // Replace with your backend API URL
    //         setClients(response.data);
    //       } catch (err) {
    //         setError("Failed to fetch clients. Please try again.");
    //       } finally {
    //         setIsLoading(false);
    //       }
    //     };
    
    //     fetchClients();
    //   }, []);

    // Determine the background color based on deal stage
    const getDealStageBgColor = (dealStage: Client["dealStage"]) => {
        switch (dealStage) {
            case "Closed":
                return "bg-blue-100 text-blue-700";
            case "Lead":
                return "bg-green-100 text-green-700";
            case "Negotiation":
                return "bg-purple-100 text-yellow-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    const filteredClients = filterSize
        ? clients.filter((client) => client.dealSize === filterSize)
        : clients;

    const paginatedClients = filteredClients.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
    );

    const handleEditClick = (client: Client) => {
        setEditableClient(client);
        setIsModalOpen(true);
    };

    const handleUpdateClient = () => {
        if (editableClient) {
            setClients((prev) =>
                prev.map((client) =>
                    client.id === editableClient.id ? editableClient : client
                )
            );
        }
        setIsModalOpen(false);
    };

    // const handleUpdateClient = async () => {
    //     if (editableClient) {
    //       try {
    //         await axios.put(`/api/clients/${editableClient.id}`, editableClient); // Replace with your update API
    //         setClients((prev) =>
    //           prev.map((client) =>
    //             client.id === editableClient.id ? editableClient : client
    //           )
    //         );
    //         setIsModalOpen(false);
    //       } catch {
    //         alert("Failed to update client. Please try again.");
    //       }
    //     }
    //   };

    // if (isLoading) {
    //     return <div className="p-6">Loading clients...</div>;
    //   }
    
    //   if (error) {
    //     return <div className="p-6 text-red-500">{error}</div>;
    //   }

    return (
        <div className="p-3 lg:p-6">
            {/* Header with total users */}
            <div className="flex justify-between mb-4">
                <h1 className="text-sm font-medium">
                    Client List <span className="bg-blue-100 rounded-full text-xs p-1 ml-2">
                        {filteredClients.length} Users</span>
                </h1>
                <select
                    className="border border-slate-300 px-1 lg:px-4 py-2 rounded-lg text-xs"
                    onChange={(e) => setFilterSize(e.target.value)}
                    value={filterSize}
                >
                    <option value="">Filter by Deal Size</option>
                    <option value="Single Driver">Single driver</option>
                    <option value="Enterprise">Enterprise</option>
                </select>
            </div>

            {/* Client Table */}
            <table className="w-full lg:w-full border-collapse border border-gray-200">
                <thead className="bg-gray-100 text-xs text-left">
                    <tr>
                        <th className="border px-1 lg:px-4 py-2 font-normal">Client Name</th>
                        <th className="border px-1 lg:px-4 py-2 font-normal">Deal Stage</th>
                        <th className="border px-1 lg:px-4 py-2 font-normal">Expected Close Date</th>
                        <th className="border px-4 py-2 font-normal">Deal Size</th>
                        <th className="border px-1 lg:px-4 py-2 font-normal">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedClients.map((client) => (
                        <tr key={client.id}>
                            <td className="border px-1 py-5 lg:px-4 lg:py-2 flex flex-col lg:flex-row items-center space-x-3">
                                <Image
                                    src={doe}
                                    alt={`${client.name} Logo`}
                                    className="w-6 h-6 rounded-full"
                                />
                                <span className="text-xs">{client.name}</span>
                            </td>
                            <td className="border px-1 lg:px-4 py-2">
                                <span className={`border px-2 py-0.5 rounded-2xl text-xs ${getDealStageBgColor(
                                    client.dealStage
                                )}`}>{client.dealStage}
                                </span></td>
                            <td className="border px-1 lg:px-4 py-2">
                                <div className="relative flex flex-col lg:flex-row gap-6 items-center">
                                    <div className="text-xs text-left text-gray-700 mb-1">
                                        {client.expectedCloseDate}
                                    </div>
                                    <div className="w-14 lg:w-36 bg-gray-200 rounded-lg h-4 relative">
                                        <div
                                            className="bg-blue-500 h-4 rounded-lg"
                                            style={{ width: `${client.loadingPercentage}%` }}
                                        ></div>
                                        <span
                                            className="absolute inset-0 flex items-center justify-center text-white font-medium text-xs"
                                            style={{
                                                color: client.loadingPercentage > 50 ? "white" : "black",
                                            }}
                                        >
                                            {client.loadingPercentage}%
                                        </span>
                                    </div>
                                </div>
                            </td>
                            <td className="border px-4 py-2 text-xs">{client.dealSize}</td>
                            <td className="border px-1 lg:px-4 py-2">
                                <button
                                    className="text-blue-500 hover:underline"
                                    onClick={() => handleEditClick(client)}
                                >
                                    <Image
                                        src={edit_icon}
                                        alt=""
                                        className="w-4 h-4 ml-3 object-cover"
                                    />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
                <div className="flex items-center">
                    <Image
                        src={arrow_left}
                        alt=""
                        className="absolute w-4 h-4 ml-3 object-cover"
                    />
                    <button
                        className="px-4 py-2 pl-8 text-xs bg-white text-blue-900 shadow rounded"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((prev) => prev - 1)}
                    >
                        Previous
                    </button>
                </div>
                <span className="text-xs">
                    Page {currentPage} of {Math.ceil(filteredClients.length / PAGE_SIZE)}
                </span>
                <div className="flex items-center">
                    <button
                        className="px-4 py-2 pr-8 text-xs bg-white text-blue-900 shadow rounded"
                        disabled={currentPage === Math.ceil(filteredClients.length / PAGE_SIZE)}
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                    >
                        Next
                    </button>
                    <Image
                        src={arrow_right}
                        alt=""
                        className="absolute w-4 h-4 ml-12 object-cover"
                    />
                </div>
            </div>

            {/* Edit Modal */}
            {isModalOpen && editableClient && (
                <Dialog
                    open={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    className="fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-50"
                >
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h2 className="text-sm font-bold mb-4">Edit Client</h2>
                        <div className="space-y-4">
                            <input
                                type="text"
                                className="w-full border px-4 py-2 rounded text-sm"
                                value={editableClient.name}
                                onChange={(e) =>
                                    setEditableClient({ ...editableClient, name: e.target.value })
                                }
                                placeholder="Client Name"
                            />
                            <select
                                className="w-full border px-4 py-2 rounded text-sm"
                                value={editableClient.dealStage}
                                onChange={(e) =>
                                    setEditableClient({
                                        ...editableClient,
                                        dealStage: e.target.value as Client["dealStage"],
                                    })
                                }
                            >
                                <option value="Closed">Closed</option>
                                <option value="Lead">Lead</option>
                                <option value="Negotiation">Negotiation</option>
                            </select>
                            <input
                                type="date"
                                className="w-full border px-4 py-2 rounded text-sm"
                                value={editableClient.expectedCloseDate}
                                onChange={(e) =>
                                    setEditableClient({
                                        ...editableClient,
                                        expectedCloseDate: e.target.value,
                                    })
                                }
                            />
                            <select
                                className="w-full border px-4 py-2 rounded text-sm"
                                value={editableClient.dealSize}
                                onChange={(e) =>
                                    setEditableClient({
                                        ...editableClient,
                                        dealSize: e.target.value as Client["dealSize"],
                                    })
                                }
                            >
                                <option value="Small">Small</option>
                                <option value="Medium">Medium</option>
                                <option value="Large">Large</option>
                            </select>
                        </div>
                        <div className="mt-4 flex justify-end space-x-2">
                            <button
                                className="px-4 py-2 bg-gray-200 rounded text-sm"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded text-sm"
                                onClick={handleUpdateClient}
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </Dialog>
            )}
        </div>
    );
}